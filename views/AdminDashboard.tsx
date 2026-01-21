
import React, { useState } from 'react';
import {
  User,
  Lead,
  Process,
  ProcessStatus,
  DETRAN_SERVICES,
  UserRole
} from '../types';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Users,
  FileBox,
  TrendingUp,
  LogOut,
  Search,
  Filter,
  MoreVertical,
  Phone,
  ArrowRightCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Building2,
  Mail,
  Shield,
  UserPlus,
  Eye,
  MessageSquare
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AdminDashboardProps {
  user: User;
  leads: Lead[];
  processes: Process[];
  partners: User[];
  onLogout: () => void;
  onConvert: (leadId: string) => void;
  onUpdateStatus: (processId: string, status: ProcessStatus) => void;
  onAddProcess: (p: Omit<Process, 'id' | 'createdAt' | 'updatedAt' | 'documents' | 'status'>) => void;
  onAddPartner: (p: Omit<User, 'id' | 'role'>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  leads,
  processes,
  partners,
  onLogout,
  onConvert,
  onUpdateStatus,
  onAddProcess,
  onAddPartner
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'processes' | 'partners' | 'reports'>('leads');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newProcData, setNewProcData] = useState({
    customerName: '',
    plate: '',
    services: [] as string[],
    partnerId: ''
  });

  const [newPartnerData, setNewPartnerData] = useState({
    name: '',
    email: '',
    company: '',
    password: ''
  });

  const stats = [
    { label: 'Leads Pendentes', value: leads.filter(l => l.status === 'PENDING').length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Processos Ativos', value: processes.filter(p => p.status !== ProcessStatus.FINISHED).length, icon: FileBox, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Lojistas Parceiros', value: partners.length, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Concluídos (Mês)', value: processes.filter(p => p.status === ProcessStatus.FINISHED).length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProcess({
      customerName: newProcData.customerName,
      plate: newProcData.plate,
      services: newProcData.services,
      partnerId: newProcData.partnerId || undefined
    });
    setShowAddModal(false);
    setNewProcData({ customerName: '', plate: '', services: [], partnerId: '' });
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Registrar no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: newPartnerData.email,
        password: newPartnerData.password,
        options: {
          data: {
            name: newPartnerData.name,
            company: newPartnerData.company,
            role: UserRole.PARTNER
          }
        }
      });

      if (error) throw error;
      if (data.user) {
        onAddPartner({
          name: newPartnerData.name,
          email: newPartnerData.email,
          company: newPartnerData.company
        });
        setShowPartnerModal(false);
        setNewPartnerData({ name: '', email: '', company: '', password: '' });
      }
    } catch (err: any) {
      alert(err.message || "Erro ao cadastrar parceiro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const chartData = [
    { name: 'Seg', leads: 4, processes: 2 },
    { name: 'Ter', leads: 7, processes: 5 },
    { name: 'Qua', leads: 5, processes: 8 },
    { name: 'Qui', leads: 10, processes: 6 },
    { name: 'Sex', leads: 8, processes: 9 },
  ];

  const COLORS = ['#3b82f6', '#f97316', '#22c55e', '#ef4444', '#a855f7'];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">PRO<span className="text-blue-600">DOC</span></span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'leads' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Users className="w-5 h-5" />
            Leads Recebidos
          </button>
          <button
            onClick={() => setActiveTab('processes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'processes' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <FileBox className="w-5 h-5" />
            Gestão de Processos
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'partners' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Building2 className="w-5 h-5" />
            Lojistas Parceiros
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'reports' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Relatórios Gerais
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">Administrador</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">
              {activeTab === 'leads' && 'Leads Recebidos'}
              {activeTab === 'processes' && 'Gestão de Processos'}
              {activeTab === 'partners' && 'Lojistas Parceiros'}
              {activeTab === 'reports' && 'Relatórios e Performance'}
            </h2>
            {activeTab === 'processes' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
              >
                <Plus className="w-4 h-4" /> Incluir Processo
              </button>
            )}
            {activeTab === 'partners' && (
              <button
                onClick={() => setShowPartnerModal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-100"
              >
                <Plus className="w-4 h-4" /> Cadastrar Lojista
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {activeTab === 'leads' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Lead</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Veículo / Serviços</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Data</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{lead.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{lead.whatsapp}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1.5">
                          <span className="inline-block bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded-md font-bold w-fit tracking-wider shadow-sm">{lead.plate}</span>
                          <div className="flex gap-1 flex-wrap">
                            {lead.services.slice(0, 2).map((s, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{s}</span>
                            ))}
                            {lead.services.length > 2 && <span className="text-[10px] text-slate-400 font-bold">+{lead.services.length - 2}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <p className="text-sm font-bold text-slate-700">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</p>
                          <p className="text-[10px] text-slate-400">{new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${lead.status === 'CONVERTED'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}>
                          {lead.status === 'CONVERTED' ? 'Convertido' : 'Pendente'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm"
                            title="Ver Detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <a
                            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all shadow-sm"
                            title="WhatsApp"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          {lead.status === 'PENDING' && (
                            <button
                              onClick={() => onConvert(lead.id)}
                              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
                            >
                              Converter <ArrowRightCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'processes' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">ID / Cliente</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Placa / Serviço</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Vínculo</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status Atual</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Mudar Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {processes.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Nenhum processo ativo no momento.</td>
                    </tr>
                  ) : (
                    processes.map(proc => (
                      <tr key={proc.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-blue-600">{proc.id}</span>
                            <span className="font-bold text-slate-900">{proc.customerName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="inline-block bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded font-bold w-fit">{proc.plate}</span>
                            <span className="text-xs text-slate-600">{proc.services[0]}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {proc.partnerId ? (
                            <div className="flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-purple-500" />
                              <span className="text-xs font-semibold text-slate-600 truncate max-w-[120px]">
                                {partners.find(p => p.id === proc.partnerId)?.company || 'Lojista'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">Geral (Admin)</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 text-xs font-bold ${proc.status === ProcessStatus.FINISHED ? 'text-green-600' :
                            proc.status === ProcessStatus.PROBLEM_IDENTIFIED ? 'text-red-600' :
                              'text-orange-600'
                            }`}>
                            <Clock className="w-3.5 h-3.5" />
                            {proc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                            value={proc.status}
                            onChange={(e) => onUpdateStatus(proc.id, e.target.value as ProcessStatus)}
                          >
                            {Object.values(ProcessStatus).map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Lojista / Empresa</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">E-mail de Acesso</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Processos Ativos</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {partners.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{p.name}</p>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">{p.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {p.email}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                            {processes.filter(proc => proc.partnerId === p.id).length}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                            <Shield className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Volume Diário (Leads vs Processos)</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      />
                      <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Novos Leads" />
                      <Bar dataKey="processes" fill="#f97316" radius={[4, 4, 0, 0]} name="Proc. Iniciados" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Distribuição de Status</h3>
                <div className="h-80 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Em análise', value: 40 },
                          { name: 'Protocolados', value: 30 },
                          { name: 'Concluídos', value: 20 },
                          { name: 'Problemas', value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[0, 1, 2, 3].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Incluir Processo */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 text-slate-900">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Incluir Novo Processo Manual
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nome do Cliente</label>
                <input
                  required
                  type="text"
                  value={newProcData.customerName}
                  onChange={e => setNewProcData({ ...newProcData, customerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                  placeholder="Nome completo do cliente"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Placa do Veículo</label>
                  <input
                    required
                    type="text"
                    value={newProcData.plate}
                    onChange={e => setNewProcData({ ...newProcData, plate: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                    placeholder="ABC1D23"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Tipo de Serviço</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white text-slate-900"
                    onChange={e => setNewProcData({ ...newProcData, services: [e.target.value] })}
                  >
                    <option value="">Selecione...</option>
                    {DETRAN_SERVICES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-purple-600" />
                  Vincular a Lojista (Opcional)
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white text-slate-900"
                  value={newProcData.partnerId}
                  onChange={e => setNewProcData({ ...newProcData, partnerId: e.target.value })}
                >
                  <option value="">Não vincular (Processo Geral)</option>
                  {partners.map(p => (
                    <option key={p.id} value={p.id}>{p.company} ({p.name})</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400">Ao vincular, este processo aparecerá apenas no painel do lojista selecionado.</p>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Confirmar Inclusão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Cadastrar Lojista Parceiro */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 text-slate-900">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Novo Lojista Parceiro
              </h3>
              <button onClick={() => setShowPartnerModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handlePartnerSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nome do Responsável</label>
                <input
                  required
                  type="text"
                  value={newPartnerData.name}
                  onChange={e => setNewPartnerData({ ...newPartnerData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500 transition-all text-slate-900"
                  placeholder="Ex: Roberto Mendes"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nome da Empresa / Loja</label>
                <input
                  required
                  type="text"
                  value={newPartnerData.company}
                  onChange={e => setNewPartnerData({ ...newPartnerData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500 transition-all text-slate-900"
                  placeholder="Ex: Mendes Multimarcas"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">E-mail de Acesso</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="email"
                    value={newPartnerData.email}
                    onChange={e => setNewPartnerData({ ...newPartnerData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500 transition-all text-slate-900"
                    placeholder="email@daempresa.com"
                  />
                </div>
              </div>

              <div className="space-y-2 text-slate-900">
                <label className="text-sm font-semibold text-slate-700">Senha Inicial</label>
                <input
                  required
                  type="text"
                  value={newPartnerData.password}
                  onChange={e => setNewPartnerData({ ...newPartnerData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Defina uma senha provisória"
                />
                <p className="text-[10px] text-slate-400">Dica: Utilize senhas padrão como 'parceiro' ou '123456' para este protótipo.</p>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPartnerModal(false)}
                  className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="flex-[2] bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Cadastrando...
                    </>
                  ) : 'Cadastrar Parceiro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Detalhes do Lead */}
      {selectedLead && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-50 flex justify-between items-start">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-xl shadow-blue-200">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">
                    {selectedLead.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest"># ID: {selectedLead.id.slice(0, 8)}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${selectedLead.status === 'CONVERTED' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {selectedLead.status === 'CONVERTED' ? 'Convertido' : 'Pendente'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Recebido em
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {new Date(selectedLead.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> Contato WhatsApp
                  </p>
                  <p className="text-lg font-extrabold text-blue-600">
                    {selectedLead.whatsapp}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Dados do Veículo</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{selectedLead.plate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">RENAVAM</p>
                    <p className="text-lg font-bold text-slate-300">{selectedLead.renavam || 'Não informado'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileBox className="w-4 h-4 text-blue-600" /> Serviços Solicitados
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.services.map((s, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100/50">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" /> Mensagem do Cliente
                </p>
                <div className="bg-blue-50/30 p-6 rounded-3xl border border-blue-100/30 text-slate-700 leading-relaxed italic">
                  "{selectedLead.description || 'Nenhuma mensagem adicional.'}"
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex gap-4">
              <a
                href={`https://wa.me/55${selectedLead.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                className="flex-1 bg-green-500 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-green-600 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3 active:scale-95"
              >
                <Phone className="w-6 h-6" /> Falar no WhatsApp
              </a>
              {selectedLead.status === 'PENDING' && (
                <button
                  onClick={() => {
                    onConvert(selectedLead.id);
                    setSelectedLead(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
                >
                  Converter em Processo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
