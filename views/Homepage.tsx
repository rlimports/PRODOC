
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  ShieldCheck,
  ClipboardCheck,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  FileText,
  Search,
  AlertTriangle,
  UserCheck,
  Building2,
  Shield,
  LayoutDashboard,
  ExternalLink,
  Clock,
  // Added Zap to imports
  Zap
} from 'lucide-react';
import { Lead, DETRAN_SERVICES } from '../types';

interface HomepageProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ onAddLead }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    plate: '',
    renavam: '',
    services: [] as string[],
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (service?: string) => {
    if (service) {
      setFormData(prev => ({
        ...prev,
        services: prev.services.includes(service) ? prev.services : [...prev.services, service]
      }));
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAddLead(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', whatsapp: '', plate: '', renavam: '', services: [], description: '' });
      }, 5000);
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">PRO<span className="text-blue-600">DOC</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/servicos" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Serviços</Link>
              <Link to="/como-funciona" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Como Funciona</Link>
              <a href="#area-lojistas" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Área dos Lojistas</a>

              <Link
                to="/login"
                title="Acesso Administrativo"
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all border border-transparent hover:border-blue-100"
              >
                <Shield className="w-5 h-5" />
              </Link>

              <button
                onClick={() => scrollToForm()}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Analisar meu problema
              </button>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden flex items-center gap-4">
              <Link
                to="/login"
                className="p-2 text-slate-400"
              >
                <Shield className="w-6 h-6" />
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 flex flex-col gap-4 shadow-xl">
            <Link to="/servicos" className="px-4 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Serviços</Link>
            <Link to="/como-funciona" className="px-4 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Como Funciona</Link>
            <a href="#area-lojistas" className="px-4 py-2 font-bold text-blue-600" onClick={() => setMobileMenuOpen(false)}>Área dos Lojistas</a>
            <button
              onClick={() => { scrollToForm(); setMobileMenuOpen(false); }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Analisar meu problema
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Especialistas em Processos DETRAN</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Problemas com o DETRAN? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Resolva aqui agora.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
            A PRODOC analisa e resolve seus processos veiculares com transparência, rapidez e tecnologia. Deixe a burocracia com quem entende.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToForm()}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
            >
              Analisar meu problema agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/como-funciona" className="w-full sm:w-auto px-8 py-4 rounded-2xl text-lg font-semibold text-slate-600 hover:bg-slate-50 transition-all">
              Ver como funciona
            </Link>
          </div>
        </div>
      </section>

      {/* Analysis Form Section */}
      <section ref={formRef} className="py-24 bg-slate-50 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="bg-blue-600 p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-2">Formulário de Análise</h2>
              <p className="text-blue-100">Inicie seu processo e nossa equipe entrará em contato.</p>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Solicitação Enviada!</h3>
                <p className="text-slate-600">Nossa equipe analisará seu caso e entrará em contato via WhatsApp em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nome Completo</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: João da Silva"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">WhatsApp</label>
                    <input
                      required
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Placa do Veículo</label>
                    <input
                      required
                      type="text"
                      placeholder="ABC1D23"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.plate}
                      onChange={e => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Renavam (opcional)</label>
                    <input
                      type="text"
                      placeholder="00000000000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.renavam}
                      onChange={e => setFormData({ ...formData, renavam: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700">Qual o seu problema ou serviço?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {DETRAN_SERVICES.map(service => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-all ${formData.services.includes(service)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                          }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${formData.services.includes(service) ? 'bg-white border-white' : 'border-slate-300'
                          }`}>
                          {formData.services.includes(service) && <CheckCircle2 className="w-3 h-3 text-blue-600" />}
                        </div>
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Descrição do Caso</label>
                  <textarea
                    rows={4}
                    placeholder="Conte-nos brevemente sobre o seu problema..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processando...
                    </>
                  ) : 'Solicitar Análise Gratuita'}
                </button>
                <p className="text-center text-sm text-slate-500">
                  Nossa equipe analisará seu caso e entrará em contato via WhatsApp.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Como funciona?</h2>
          <p className="text-slate-600 mb-16">O processo é simples, rápido e transparente.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-16">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-slate-100 -z-10"></div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <ClipboardCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Informe seu problema</h3>
              <p className="text-slate-600">Preencha o formulário com os dados básicos do veículo e o serviço desejado.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-200">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Nossa equipe analisa</h3>
              <p className="text-slate-600">Especialistas verificam a situação legal e os procedimentos necessários.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <MessageSquare className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Retorno via WhatsApp</h3>
              <p className="text-slate-600">Enviamos a solução e os próximos passos diretamente no seu celular.</p>
            </div>
          </div>
          <Link
            to="/como-funciona"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
          >
            Ver fluxo completo detalhado <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Serviços DETRAN</h2>
            <p className="text-slate-600">Soluções completas para todas as suas necessidades veiculares.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DETRAN_SERVICES.slice(0, 8).map((service, idx) => (
              <Link
                key={idx}
                to="/servicos"
                className="group p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-500 transition-all text-left hover:bg-white hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{service}</h3>
                <p className="text-sm text-slate-500">Análise técnica e execução rápida do processo junto ao órgão.</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
            >
              Ver todos os serviços
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* AREA DOS LOJISTAS */}
      <section id="area-lojistas" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 -z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] border border-slate-700 p-8 md:p-16 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-indigo-500/20">
                  <Building2 className="w-4 h-4" />
                  <span>Portal do Lojista Parceiro</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Área dos <span className="text-indigo-400">Lojistas</span>
                </h2>
                <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl">
                  Centralize a gestão de todos os seus processos veiculares em um único lugar. Acompanhe em tempo real, envie documentação e reduza o tempo de espera dos seus clientes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to="/login"
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/40 flex items-center justify-center gap-2 group"
                  >
                    Acessar meu Painel
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-slate-300">
                    <UserCheck className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-medium">Exclusivo para parceiros cadastrados</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                    <LayoutDashboard className="w-8 h-8 text-indigo-400" />
                    <h4 className="font-bold text-white text-sm">Gestão Total</h4>
                  </div>
                  <div className="bg-indigo-600 p-6 rounded-3xl space-y-4 translate-y-8">
                    <FileText className="w-8 h-8 text-white" />
                    <h4 className="font-bold text-white text-sm">Docs Online</h4>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                    <Clock className="w-8 h-8 text-indigo-400" />
                    <h4 className="font-bold text-white text-sm">Tempo Real</h4>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4 translate-y-8">
                    <ShieldCheck className="w-8 h-8 text-indigo-400" />
                    <h4 className="font-bold text-white text-sm">Segurança</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <UserCheck className="w-4 h-4" />
              <span>Autoridade e Confiança</span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Por que escolher a PRODOC?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 text-blue-600 flex-shrink-0"><CheckCircle2 className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-slate-900">Especialização em DETRAN</h4>
                  <p className="text-slate-600">Nossa equipe domina todos os fluxos e leis de trânsito vigentes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 text-blue-600 flex-shrink-0"><CheckCircle2 className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-slate-900">Atendimento Humano</h4>
                  <p className="text-slate-600">Você fala com pessoas reais que entendem seu problema e buscam a melhor solução.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 text-blue-600 flex-shrink-0"><CheckCircle2 className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-slate-900">Transparência Total</h4>
                  <p className="text-slate-600">Acompanhamento em tempo real de cada etapa do seu processo.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800"
                alt="Equipe Profissional"
                className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl">
                <p className="text-4xl font-extrabold mb-1">100%</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Comprometimento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">PRO<span className="text-blue-600">DOC</span></span>
              </div>
              <p className="text-sm text-slate-500">Gestão Inteligente de Processos Veiculares</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-6">
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><MessageSquare className="w-5 h-5" /></a>
                <Link to="/login" title="Acesso Restrito" className="text-slate-400 hover:text-blue-600 transition-colors">
                  <Shield className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-xs text-slate-400">© 2024 PRODOC. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
