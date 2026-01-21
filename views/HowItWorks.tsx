
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  ArrowLeft, 
  CheckCircle2, 
  Search, 
  ClipboardCheck, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Building2, 
  LayoutDashboard,
  MessageSquare,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "1. Consulta e Cadastro",
    description: "Você nos informa a placa e o problema. Nossa tecnologia faz uma varredura inicial nos dados do veículo gratuitamente.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: ClipboardCheck,
    title: "2. Análise Especializada",
    description: "Nossos despachantes analisam a viabilidade e o melhor caminho jurídico e administrativo para o seu caso.",
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    icon: CreditCard,
    title: "3. Orçamento e Início",
    description: "Enviamos o orçamento transparente via WhatsApp. Após a aprovação, damos início imediato aos protocolos.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Zap,
    title: "4. Execução Ágil",
    description: "Cuidamos de toda a papelada e idas ao DETRAN. Você acompanha cada mudança de status pelo portal ou celular.",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: CheckCircle2,
    title: "5. Entrega Concluída",
    description: "Documento emitido ou pendência resolvida. Você recebe a confirmação digital e, se necessário, o físico no seu endereço.",
    color: "bg-green-50 text-green-600"
  }
];

const faqs = [
  {
    q: "Quanto tempo leva um processo de transferência?",
    a: "Em média, nossos processos de transferência levam de 2 a 5 dias úteis, dependendo da agilidade do DETRAN local e da documentação completa."
  },
  {
    q: "A PRODOC atende lojistas de outros estados?",
    a: "Sim! Temos uma rede de parceiros e tecnologia para gerenciar processos em diversos estados, centralizando tudo no seu painel PRODOC."
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Aceitamos PIX, Cartão de Crédito em até 12x e boleto bancário para faturamento mensal de lojistas parceiros."
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">PRO<span className="text-blue-600">DOC</span></span>
            </Link>
            <Link to="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-all flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <ShieldCheck className="w-4 h-4" />
            Transparência do início ao fim
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Como funciona a <br />
            <span className="text-blue-600">Experiência PRODOC?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Eliminamos a incerteza dos processos veiculares. Criamos um fluxo digital onde você sempre sabe o que está acontecendo com o seu documento.
          </p>
        </section>

        {/* Steps Timeline */}
        <section className="bg-slate-50 py-24 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-white/50 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.description}</p>
                  
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-slate-200 -z-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portal do Lojista Detail */}
        <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 relative">
              <div className="flex-1 z-10">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-500/20">
                  <Building2 className="w-4 h-4" />
                  B2B - Solução para Empresas
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Sou lojista, o que muda?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-2 rounded-xl h-fit"><LayoutDashboard className="w-5 h-5 text-blue-400" /></div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Painel Centralizado</h4>
                      <p className="text-slate-400 text-sm">Gerencie 1 ou 100 processos simultaneamente em uma única tela. Filtre por placas ou status.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-2 rounded-xl h-fit"><MessageSquare className="w-5 h-5 text-blue-400" /></div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Status em Tempo Real</h4>
                      <p className="text-slate-400 text-sm">Chega de ligar para saber do documento. Se o status mudar no DETRAN, muda no seu painel.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-2 rounded-xl h-fit"><Zap className="w-5 h-5 text-blue-400" /></div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Faturamento Mensal</h4>
                      <p className="text-slate-400 text-sm">Facilitamos o fluxo de caixa da sua loja com opções de faturamento por volume de serviço.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <Link to="/login" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all">
                    Acessar Área do Lojista
                    <Zap className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="bg-white/5 rounded-3xl p-4 border border-white/10 rotate-3 translate-y-8">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                    alt="Dashboard Preview" 
                    className="rounded-2xl opacity-60 grayscale"
                  />
                </div>
                <div className="absolute top-0 right-0 bg-blue-600 p-8 rounded-3xl shadow-2xl -translate-y-4 translate-x-4">
                  <p className="text-white text-4xl font-black mb-1">40%</p>
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Mais rápido que o tradicional</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-16">
              <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-slate-900">Ficou com alguma dúvida?</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                  <h4 className="font-bold text-slate-900 flex justify-between items-center cursor-pointer">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </h4>
                  <p className="text-slate-500 text-sm mt-3 font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-slate-50 text-center border-t border-slate-100">
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">Pronto para resolver <br /> seu documento?</h2>
           <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-2xl text-xl font-black hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
           >
            Começar Agora Grátis
            <Zap className="w-6 h-6" />
           </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm font-medium">
          © 2024 PRODOC. Gestão Inteligente de Processos Veiculares.
        </div>
      </footer>
    </div>
  );
};
