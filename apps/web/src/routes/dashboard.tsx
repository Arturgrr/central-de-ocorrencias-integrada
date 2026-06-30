import { createFileRoute } from "@tanstack/react-router";
import { 
  Shield, 
  Map as MapIcon, 
  FileText, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  AlertTriangle, 
  MapPin, 
  Clock,
  Activity
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardScreen,
});

// AQUI ESTÁ O SEGREDO: O export antes da função para o index.tsx conseguir ler!
export function DashboardScreen() {
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-300 font-sans overflow-hidden">
      
      {/* SIDEBAR TÁTICA */}
      <aside className="w-20 sm:w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 shrink-0">
        <div className="h-16 flex items-center justify-center sm:justify-start sm:px-6 border-b border-slate-800 shrink-0">
          <Shield className="w-8 h-8 text-blue-500" />
          <span className="ml-3 font-bold text-xl text-white hidden sm:block tracking-wider">COI</span>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-2 px-2 sm:px-4">
          <button className="flex items-center gap-3 px-3 py-3 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600/20 transition-colors w-full">
            <Activity className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold hidden sm:block">Painel de Controle</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-3 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors w-full">
            <FileText className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold hidden sm:block">Boletins (B.O.)</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-3 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors w-full">
            <MapIcon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold hidden sm:block">Mapa Tático</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-3 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors w-full">
            <Users className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold hidden sm:block">Viaturas & Agentes</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-3 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors w-full">
            <Settings className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold hidden sm:block">Configurações</span>
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER DA PÁGINA */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <h2 className="text-lg font-semibold text-white tracking-wide">Visão Geral da Operação</h2>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar B.O. ou Viatura..." 
                className="bg-slate-950 border border-slate-800 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-64 text-slate-200 placeholder:text-slate-600"
              />
            </div>
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <Shield className="w-4 h-4 text-slate-400" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">Operador 04</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Atendente</p>
              </div>
            </div>
          </div>
        </header>

        {/* ÁREA DE SCROLL DO DASHBOARD */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          
          {/* CARDS DE MÉTRICAS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <AlertTriangle className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ocorrências Ativas</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Users className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Viaturas em Campo</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <Activity className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prioridade Alta</p>
                <p className="text-2xl font-bold text-white">03</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tempo Médio</p>
                <p className="text-2xl font-bold text-white">8m 42s</p>
              </div>
            </div>
          </div>

          {/* GRID PRINCIPAL: MAPA + FILA DE B.O. */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[500px]">
            
            {/* MAPA TÁTICO */}
            <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col relative group">
              <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-white tracking-wider">MONITORAMENTO EM TEMPO REAL</span>
              </div>
              
              <div className="flex-1 bg-slate-800 relative" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center animate-ping absolute" />
                  <MapPin className="w-6 h-6 text-red-500 relative z-10" />
                  <span className="mt-1 text-[10px] font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">QTH-01</span>
                </div>
                
                <div className="absolute bottom-1/4 right-1/3 flex flex-col items-center">
                  <MapPin className="w-5 h-5 text-blue-500 relative z-10" />
                  <span className="mt-1 text-[10px] font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">VTR-42</span>
                </div>
              </div>
            </div>

            {/* FILA DE B.O.s RECENTES */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h3 className="font-semibold text-white text-sm">Ocorrências Recentes</h3>
                <button className="text-xs text-blue-500 hover:text-blue-400 font-medium">Ver Todas</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                <div className="p-3 bg-slate-950 border border-red-500/30 rounded-lg hover:border-red-500/60 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold bg-red-500/10 text-red-500 px-2 py-0.5 rounded uppercase tracking-wider">Crítico</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> 2 min atrás</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Deslizamento de Terra</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3"/> R. das Pedras, 142</p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded uppercase tracking-wider">Atenção</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> 15 min atrás</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Acidente de Trânsito</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3"/> Av. Principal, Km 12</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}