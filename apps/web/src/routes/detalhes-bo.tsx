import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Camera, 
  AlertTriangle, 
  Radio, 
  User, 
  Phone, 
  CheckCircle,
  ShieldAlert,
  Image as ImageIcon
} from "lucide-react";

export const Route = createFileRoute("/detalhes-bo")({
  component: DetalhesOcorrenciaScreen,
});

function DetalhesOcorrenciaScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8 text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO DE STATUS */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate({ to: '/dashboard' })}
              className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white tracking-wide">B.O. #4092-A</h1>
                <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Radio className="w-3 h-3 animate-pulse" />
                  Em Andamento
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider font-semibold">
                Deslizamento de Terra • Risco Estrutural
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 px-4 rounded-xl">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nível de Prioridade</p>
              <p className="text-sm font-bold text-red-500 uppercase">Crítico - Nível 1</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUNA ESQUERDA: Informações e Timeline */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* DADOS DA OCORRÊNCIA */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Detalhes do Incidente
                </h3>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Localização Exata</p>
                    <p className="text-sm text-slate-200 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      Rua das Pedras, 142 - Encosta Norte, Setor 4
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Solicitante</p>
                    <div className="flex flex-col gap-1 text-sm text-slate-300">
                      <span className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-slate-500" /> Maria Aparecida</span>
                      <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-500" /> (00) 91234-5678</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Descrição Registrada</p>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                    Moradora relata que parte do barranco cedeu durante a madrugada. Há uma árvore de grande porte escorada no muro da residência, com risco iminente de queda sobre o teto.
                  </p>
                </div>
              </div>
            </div>

            {/* TIMELINE (LINHA DO TEMPO) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Cronologia da Operação
              </h3>
              
              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                
                {/* Item Timeline 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active pb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-blue-600 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-950 shadow">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white text-sm">Viatura Acionada</h4>
                      <time className="text-[10px] font-mono text-blue-400 font-bold">14:05</time>
                    </div>
                    <p className="text-xs text-slate-400">VTR-42 despachada para o local sob código 3.</p>
                  </div>
                </div>

                {/* Item Timeline 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group pb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 text-slate-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-950/50">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-300 text-sm">Chamado Recebido</h4>
                      <time className="text-[10px] font-mono text-slate-500 font-bold">14:00</time>
                    </div>
                    <p className="text-xs text-slate-500">Operador 04 registrou o B.O. via central telefônica.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* COLUNA DIREITA: Galeria e Ações */}
          <div className="space-y-6">
            
            {/* GALERIA DE MÍDIA */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-500" />
                Evidências Anexadas
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Placeholder de Imagem 1 */}
                <div className="aspect-square bg-slate-950 border border-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-600 hover:border-slate-600 transition-colors cursor-pointer group relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-800/20 group-hover:bg-transparent transition-colors"></div>
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Foto_Local_01</span>
                </div>
                {/* Placeholder de Imagem 2 */}
                <div className="aspect-square bg-slate-950 border border-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-600 hover:border-slate-600 transition-colors cursor-pointer group relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-800/20 group-hover:bg-transparent transition-colors"></div>
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Foto_Local_02</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" /> Adicionar Mídia
              </button>
            </div>

            {/* AÇÕES DA EQUIPE */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-white mb-4 text-sm">Atualizar Status Tático</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
                  <MapPin className="w-4 h-4" /> Chegada no Local (QTR)
                </button>
                <button className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-700 text-emerald-500 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <CheckCircle className="w-4 h-4" /> Finalizar Ocorrência
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}