
import React, { useState } from 'react';
import {
  User,
  Process,
  ProcessStatus,
  DETRAN_SERVICES
} from '../types';
import {
  LogOut,
  Plus,
  FileText,
  Clock,
  Car,
  Search,
  ChevronRight,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  UserCheck
} from 'lucide-react';

interface PartnerDashboardProps {
  user: User;
  processes: Process[];
  onLogout: () => void;
  onAddProcess: (p: Omit<Process, 'id' | 'createdAt' | 'updatedAt' | 'documents' | 'status' | 'partnerId'>) => void;
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({
  user,
  processes,
  onLogout,
  onAddProcess
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [newProcData, setNewProcData] = useState({
    customerName: '',
    plate: '',
    services: [] as string[]
  });

  const filteredProcesses = (processes || []).filter(p => {
    const name = p.customerName || '';
    const plate = p.plate || '';
    const matchesSearch = plate.toLowerCase().includes(filter.toLowerCase()) ||
      name.toLowerCase().includes(filter.toLowerCase());

    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'FINISHED') return matchesSearch && p.status === ProcessStatus.FINISHED;
    if (statusFilter === 'PROBLEM') return matchesSearch && p.status === ProcessStatus.PROBLEM_IDENTIFIED;
    if (statusFilter === 'ACTIVE') return matchesSearch && p.status !== ProcessStatus.FINISHED;
    return matchesSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAddProcess(newProcData);
      setShowAddModal(false);
      setNewProcData({ customerName: '', plate: '', services: [] });
    } catch (error) {
      console.error("Erro ao cadastrar processo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: ProcessStatus) => {
    switch (status) {
      case ProcessStatus.FINISHED: return 'text-green-600 bg-green-50 border-green-100';
      case ProcessStatus.PROBLEM_IDENTIFIED: return 'text-red-600 bg-red-50 border-red-100';
      case ProcessStatus.PENDING_DOCS: return 'text-orange-600 bg-orange-50 border-orange-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  const getProgressWidth = (status: ProcessStatus) => {
    switch (status) {
      case ProcessStatus.FINISHED: return '100%';
      case ProcessStatus.FILED: return '75%';
      case ProcessStatus.IN_PROGRESS: return '50%';
      case ProcessStatus.RECEIVED: return '25%';
      default: return '40%';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-slate-900 p-2.5 rounded-xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">PRO<span className="text-blue-600">DOC</span></span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portal do Parceiro</span>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">| {user.company || user.name}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-red-600 font-bold text-xs transition-all px-3 py-2 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Painel de Acompanhamento</h1>
            <p className="text-slate-500 font-medium">Acompanhe o status real de cada processo veicular.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
          >
            <Plus className="w-5 h-5" />
            Novo Processo
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por placa ou cliente..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button onClick={() => setStatusFilter('ALL')} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold ${statusFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>Todos</button>
            <button onClick={() => setStatusFilter('ACTIVE')} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold ${statusFilter === 'ACTIVE' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>Ativos</button>
            <button onClick={() => setStatusFilter('FINISHED')} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold ${statusFilter === 'FINISHED' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-500'}`}>Concluídos</button>
            <button onClick={() => setStatusFilter('PROBLEM')} className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold ${statusFilter === 'PROBLEM' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}>Problemas</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcesses.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-[2rem] border-2 border-dashed border-slate-200 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-bold">Nenhum processo para exibir.</p>
            </div>
          ) : (
            filteredProcesses.map(p => (
              <div key={p.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden">
                <div className="p-6 pb-4 border-b border-slate-50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-900 rounded-lg p-1.5 px-3 flex flex-col items-center shadow-sm">
                      <span className="text-[6px] font-bold text-white uppercase tracking-tighter leading-none mb-0.5">Brasil</span>
                      <span className="text-sm font-black text-white leading-none tracking-tight">{p.plate}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(p.status)}`}>
                      {p.status}
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 truncate mb-1">{p.customerName}</h3>
                  <p className="text-xs font-bold text-blue-600">{p.services[0]}</p>
                </div>

                <div className="p-6 flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-300" />
                    <p className="text-xs font-bold text-slate-700">Progresso: <span className="text-slate-500">{p.status}</span></p>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: getProgressWidth(p.status) }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Abertura</p>
                      <p className="text-xs font-bold text-slate-700">{new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Última Att</p>
                      <p className="text-xs font-bold text-slate-700">{new Date(p.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button className="w-full bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                    Ver Detalhes
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-2xl font-extrabold text-slate-900">Novo Processo</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400">Fechar</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Cliente Final</label>
                <input
                  required
                  type="text"
                  value={newProcData.customerName}
                  onChange={e => setNewProcData({ ...newProcData, customerName: e.target.value })}
                  className="w-full px-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Placa</label>
                  <input
                    required
                    type="text"
                    value={newProcData.plate}
                    onChange={e => setNewProcData({ ...newProcData, plate: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center font-bold"
                    placeholder="ABC1D23"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Serviço</label>
                  <select
                    required
                    className="w-full px-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none"
                    onChange={e => setNewProcData({ ...newProcData, services: [e.target.value] })}
                  >
                    <option value="">Selecione...</option>
                    {DETRAN_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Cadastrando...
                  </>
                ) : 'Cadastrar Processo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
