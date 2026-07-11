import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  Shield, 
  AlertTriangle, 
  PlusCircle, 
  Clock, 
  MapPin, 
  Bell, 
  LogOut,
  Info,
  CheckCircle,
  Truck
} from "lucide-react";

export const Route = createFileRoute("/portal-cidadao")({
  component: PortalCidadaoScreen,
});

function PortalCidadaoScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      
      {/* HEADER DO CIDADÃO */}
      <header className="bg-blue-950/40 border-b border-blue-900/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">Portal de Proteção</h1>
              <p className="text-[11px] text-blue-400 uppercase tracking-wider font-bold">Defesa Civil • João Monlevade</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 hover:text-white transition-colors p-2">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <button 
              onClick={() => navigate({ to: '/' })}
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* SAUDAÇÃO E AÇÃO PRINCIPAL */}
        <section className="flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Olá, João da Silva</h2>
            <p className="text-slate-400 text-sm sm:text-base">Como a Defesa Civil pode te ajudar hoje?</p>
          </div>
          
          <button className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-red-900/30 transition-all hover:scale-105 active:scale-95 z-10">
            <PlusCircle className="w-6 h-6" />
            Solicitar Resgate / B.O.
          </button>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA ESQUERDA: MEUS CHAMADOS (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-white text-lg flex items-center gap-2 border-b border-slate-800 pb-2">
              <Clock className="w-5 h-5 text-blue-500" /> 
              Acompanhamento de Ocorrências
            </h3>
            
            <div className="space-y-4">
              
              {/* CARD DE B.O. EM ANDAMENTO */}
              <div className="bg-slate-900 border-2 border-amber-500/30 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                      Em Atendimento
                    </span>
                    <h4 className="font-bold text-white text-lg">Queda de Árvore no Muro</h4>
                    <p className="text-xs text-slate-400 font-mono mt-1">Protocolo: #4092-A</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Status Atual</p>
                    <p className="text-sm font-bold text-amber-400 flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <Truck className="w-4 h-4 animate-bounce" /> Viatura a Caminho
                    </p>
                  </div>
                </div>
                <div className="bg-slate-950 rounded-lg p-3 text-sm text-slate-300 flex items-start gap-2 border border-slate-800">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <p>Rua das Acácias, 142 - Bairro República</p>
                </div>
              </div>

              {/* CARD DE B.O. FINALIZADO */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 opacity-75 hover:opacity-100 transition-opacity">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                      Finalizado
                    </span>
                    <h4 className="font-bold text-slate-200">Alagamento de Via Pública</h4>
                    <p className="text-xs text-slate-500 font-mono mt-1">Protocolo: #3811-C</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Data de Encerramento</p>
                    <p className="text-sm font-bold text-emerald-500 flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <CheckCircle className="w-4 h-4" /> 12 de Junho, 2026
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* COLUNA DIREITA: AVISOS PÚBLICOS (1/3) */}
          <div className="space-y-6">
            <h3 className="font-bold text-white text-lg flex items-center gap-2 border-b border-slate-800 pb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> 
              Avisos da Prefeitura
            </h3>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
              {/* Alerta Importante */}
              <div className="p-4 border-b border-slate-800 bg-amber-500/5">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-1">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Alerta Laranja: Tempestade</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Previsão de chuvas intensas (50 a 100 mm/dia) para esta madrugada. Evite áreas de encosta.
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-2">Publicado há 2 horas</p>
                  </div>
                </div>
              </div>

              {/* Informação Útil */}
              <div className="p-4">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1 border border-blue-500/20">
                    <Info className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Campanha do Agasalho</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      A Defesa Civil está recebendo cobertores e agasalhos na base central.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cartão de Contatos */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-3 text-center">Telefones Úteis</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-lg text-center">
                  <p className="text-sm font-bold text-white">199</p>
                  <p className="text-[9px] text-slate-500 uppercase">Defesa Civil</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-lg text-center">
                  <p className="text-sm font-bold text-white">193</p>
                  <p className="text-[9px] text-slate-500 uppercase">Bombeiros</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}