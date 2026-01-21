
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Homepage } from './views/Homepage';
import { Login } from './views/Login';
import { AdminDashboard } from './views/AdminDashboard';
import { PartnerDashboard } from './views/PartnerDashboard';
import { HowItWorks } from './views/HowItWorks';
import { Services } from './views/Services';
import { User, UserRole, Lead, Process, ProcessStatus } from './types';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [partners, setPartners] = useState<User[]>([
    { id: 'partner-1', name: 'Lojista Exemplo', email: 'parceiro@loja.com', role: UserRole.PARTNER, company: 'Lojista Veículos' }
  ]);

  // Carregamento inicial seguro e Ouvinte de Auth do Supabase
  useEffect(() => {
    const initAuth = async () => {
      // 1. Tentar carregar do localStorage (Bypass para Admin Hardcoded)
      const bypassUser = localStorage.getItem('prodoc_admin_bypass');
      if (bypassUser) {
        try {
          setUser(JSON.parse(bypassUser));
          setIsLoading(false);
          return;
        } catch (e) {
          localStorage.removeItem('prodoc_admin_bypass');
        }
      }

      // 2. Tentar carregar do Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            name: profile.name || '',
            email: profile.email || '',
            role: profile.role as UserRole,
            company: profile.company
          });
        }
      }
      setIsLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            name: profile.name || '',
            email: profile.email || '',
            role: profile.role as UserRole,
            company: profile.company
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch Leads e Processes do Supabase
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch Leads (só para admin)
        if (user.role === UserRole.ADMIN) {
          const { data: leadsData } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });
          if (leadsData) {
            setLeads(leadsData.map(l => ({
              ...l,
              createdAt: l.created_at
            })) as any);
          }
        }

        // Fetch Processes
        let query = supabase.from('processes').select('*').order('created_at', { ascending: false });
        if (user.role === UserRole.PARTNER) {
          query = query.eq('partner_id', user.id);
        }

        const { data: processesData } = await query;
        if (processesData) {
          setProcesses(processesData.map(p => ({
            ...p,
            customerName: p.customer_name,
            leadId: p.lead_id,
            partnerId: p.partner_id,
            createdAt: p.created_at,
            updatedAt: p.updated_at
          })) as any);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Supabase:", error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    // Carregamento de dados adicionais se necessário
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    if (u.id === 'admin-master') {
      localStorage.setItem('prodoc_admin_bypass', JSON.stringify(u));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('prodoc_admin_bypass');
    setUser(null);
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();

    if (!error && data) {
      setLeads(prev => [data as any, ...prev]);
    }
  };

  const convertLeadToProcess = async (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const processId = `PROC-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const newProcess: any = {
      id: processId,
      lead_id: lead.id,
      customer_name: lead.name,
      plate: lead.plate,
      services: lead.services,
      status: ProcessStatus.RECEIVED,
      documents: []
    };

    const { error: processError } = await supabase.from('processes').insert([newProcess]);
    if (processError) return;

    const { error: leadError } = await supabase.from('leads').update({ status: 'CONVERTED' }).eq('id', lead.id);
    if (leadError) return;

    setProcesses(prev => [{ ...newProcess, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as any, ...prev]);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: 'CONVERTED' } : l));
  };

  const updateProcessStatus = async (processId: string, status: ProcessStatus) => {
    const { error } = await supabase
      .from('processes')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', processId);

    if (!error) {
      setProcesses(prev => prev.map(p => p.id === processId ? { ...p, status, updatedAt: new Date().toISOString() } : p));
    }
  };

  const addProcess = (p: Omit<Process, 'id' | 'createdAt' | 'updatedAt' | 'documents' | 'status'>) => {
    const newProcess: Process = {
      ...p,
      id: `PROC-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      status: ProcessStatus.RECEIVED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: []
    };
    setProcesses(prev => [newProcess, ...prev]);
  };

  const addPartner = (p: Omit<User, 'id' | 'role'>) => {
    const newPartner: User = {
      ...p,
      id: `PART-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      role: UserRole.PARTNER
    };
    setPartners(prev => [...prev, newPartner]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage onAddLead={addLead} />} />
        <Route path="/como-funciona" element={<HowItWorks />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/login" element={<Login onLogin={handleLogin} partners={partners} />} />

        <Route
          path="/admin/*"
          element={
            user?.role === UserRole.ADMIN ? (
              <AdminDashboard
                user={user}
                leads={leads}
                processes={processes}
                partners={partners}
                onLogout={handleLogout}
                onConvert={convertLeadToProcess}
                onUpdateStatus={updateProcessStatus}
                onAddProcess={addProcess}
                onAddPartner={addPartner}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/partner/*"
          element={
            user?.role === UserRole.PARTNER ? (
              <PartnerDashboard
                user={user}
                processes={processes.filter(p => p.partnerId === user.id)}
                onLogout={handleLogout}
                onAddProcess={(p) => addProcess({ ...p, partnerId: user.id })}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
