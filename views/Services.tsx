
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Zap,
  Building2,
  Scale,
  CreditCard,
  ChevronRight
} from 'lucide-react';

const serviceCategories = [
  {
    id: 'documentacao',
    title: 'Documentação & Transferência',
    icon: FileText,
    services: [
      {
        name: 'Transferência de Propriedade',
        description: 'Mudança de dono do veículo com agilidade e verificação de histórico.',
        estimate: '2 a 5 dias úteis',
        docs: ['CRV (Recibo)', 'Vistoria', 'CNH', 'Comprovante de Residência']
      },
      {
        name: 'Emissão de CRLV-e / CRV',
        description: 'Segunda via ou atualização anual do licenciamento digital.',
        estimate: 'Até 24h',
        docs: ['Documento antigo', 'Comprovante de pagamento de débitos']
      },
      {
        name: 'Comunicação de Venda',
        description: 'Proteção imediata para o vendedor contra multas e responsabilidade civil.',
        estimate: 'Imediato',
        docs: ['Cópia autenticada do CRV']
      }
    ]
  },
  {
    id: 'regularizacao',
    title: 'Regularização & Vistoria',
    icon: ShieldCheck,
    services: [
      {
        name: 'Troca de Placa (Mercosul)',
        description: 'Adequação ao novo padrão nacional obrigatório em transferências.',
        estimate: '1 a 2 dias',
        docs: ['Documento do veículo']
      },
      {
        name: 'Regularização de Motor/Chassi',
        description: 'Legalização de motores trocados ou chassis remarcados.',
        estimate: '7 a 15 dias',
        docs: ['Nota fiscal do motor', 'Laudo técnico']
      },
      {
        name: 'Alteração de Características',
        description: 'Cor, combustível, suspensão ou blindagem.',
        estimate: '5 a 10 dias',
        docs: ['Autorização prévia', 'Certificado de Segurança Veicular']
      }
    ]
  },
  {
    id: 'juridico',
    title: 'Assessoria & Consultas',
    icon: Scale,
    services: [
      {
        name: 'Recurso de Multas',
        description: 'Defesa técnica contra autuações indevidas ou com erros formais.',
        estimate: 'Variável (Prazo legal)',
        docs: ['Auto de infração', 'Argumentação técnica']
      },
      {
        name: 'Baixa de Gravame / Restrições',
        description: 'Retirada de restrições financeiras (Leasing/Financiamento) após quitação.',
        estimate: '2 a 3 dias',
        docs: ['Baixa no sistema bancário']
      },
      {
        name: 'Consultas Especializadas',
        description: 'Levantamento completo de histórico, bloqueios e débitos estaduais.',
        estimate: 'Minutos',
        docs: ['Placa e RENAVAM']
      }
    ]
  }
];

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">PRO<span className="text-blue-600">DOC</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/como-funciona" className="text-sm font-bold text-slate-500 hover:text-blue-600">Como Funciona</Link>
              <Link to="/" className="text-sm font-bold text-blue-600 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar para Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Nossos <span className="text-blue-600">Serviços</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium">
            Da transferência simples à regularização de casos complexos. 
            Soluções completas para proprietários e lojistas.
          </p>
        </section>

        {/* Categories Tabs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${
                  activeCategory === cat.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 ring-4 ring-blue-100' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.title}
              </button>
            ))}
          </div>
        </section>

        {/* Services List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceCategories.find(c => c.id === activeCategory)?.services.map((service, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-blue-50 p-3 rounded-2xl">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    {service.estimate}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-4">{service.name}</h3>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-auto space-y-4">
                  <div className="pt-6 border-t border-slate-50">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Documentos Comuns</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.docs.map((doc, dIdx) => (
                        <span key={dIdx} className="text-[11px] font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-lg">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to="/"
                    className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all group"
                  >
                    Iniciar Processo
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Specialized Dealer Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/30">
                  <Building2 className="w-4 h-4" />
                  Serviços para Lojistas (B2B)
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-6">Volume e Gestão para sua Loja</h2>
                <p className="text-xl text-blue-100 mb-8 font-medium">
                  Temos condições especiais para lojistas que precisam processar múltiplos veículos mensalmente. Centralize tudo no PRODOC.
                </p>
                <Link to="/login" className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl">
                  Seja um Parceiro PRODOC
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {[
                  { label: 'Faturamento Mensal', icon: CreditCard },
                  { label: 'Entrega VIP', icon: Car },
                  { label: 'Suporte Prioritário', icon: Zap },
                  { label: 'Dashboard Multi-Placa', icon: FileText }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20 flex flex-col items-center text-center gap-3">
                    <item.icon className="w-8 h-8 text-blue-200" />
                    <span className="text-xs font-bold uppercase tracking-tight leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="max-w-3xl mx-auto px-4 text-center mt-24">
          <div className="bg-orange-50 border border-orange-100 p-8 rounded-[2.5rem] flex flex-col items-center">
            <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Não encontrou o que procurava?</h3>
            <p className="text-slate-600 font-medium mb-6">
              Existem dezenas de outros serviços e casos específicos. Nossa equipe de especialistas está pronta para analisar seu problema individualmente.
            </p>
            <Link to="/" className="text-blue-600 font-black hover:underline flex items-center gap-2">
              Clique para solicitar uma análise personalizada <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm font-medium">
          © 2024 PRODOC. Todos os serviços são realizados em conformidade com as resoluções do CONTRAN.
        </div>
      </footer>
    </div>
  );
};
