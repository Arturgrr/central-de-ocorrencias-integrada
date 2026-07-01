import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  Car, 
  Shield, 
  User, 
  Plus, 
  Search, 
  MoreVertical,
  Radio
} from "lucide-react";

export const Route = createFileRoute("/equipes")({
  component: EquipesScreen,
});

function EquipesScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8 text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate({ to: '/dashboard' })}
              className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
                <Shield className="w-7 h-7 text-emerald-500" />
                Viaturas & Agentes
              </h1>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider font-semibold">
                Gerenciamento de frota e efetivo operacional
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <User className="w-4 h-4" /> Novo Agente
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-900/20">
              <Car className="w-4 h-4" /> Nova Viatura
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA ESQUERDA: LISTA DE VIATURAS (VEÍCULOS) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white text-lg">Viaturas Ativas</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Buscar por placa..." 
                  className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-emerald-500 w-56 text-slate-200 placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* CARD DE VIATURA 1 (Com base nos atributos do ER) */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <Car className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold tracking-wider">VTR-42</p>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Radio className="w-3 h-3" /> Em Patrulha
                      </p>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-white"><MoreVertical className="w-5 h-5" /></button>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-semibold text-[11px] uppercase">Placa</span>
                    <span className="text-slate-300 font-mono font-bold">RMT-9G34</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-semibold text-[11px] uppercase">Veículo</span>
                    <span className="text-slate-300">Mitsubishi L200 (Branca)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Policial Responsável</p>
                    <p className="text-sm font-bold text-white">Sgt. Oliveira</p>
                  </div>
                </div>
              </div>

              {/* CARD DE VIATURA 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                      <Car className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold tracking-wider">VTR-15</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Na Base</p>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-white"><MoreVertical className="w-5 h-5" /></button>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-semibold text-[11px] uppercase">Placa</span>
                    <span className="text-slate-300 font-mono font-bold">QWY-2B11</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-semibold text-[11px] uppercase">Veículo</span>
                    <span className="text-slate-300">Renault Duster (Preta)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 border-dashed">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Policial Responsável</p>
                    <p className="text-sm font-bold text-amber-500">Sem atribuição</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* COLUNA DIREITA: EFETIVO (POLICIAIS/AGENTES) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white text-lg">Efetivo Disponível</h3>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
              <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Agente</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Matrícula</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between hover:border-slate-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Sgt. Oliveira</p>
                      <p className="text-[10px] text-emerald-500 uppercase tracking-wider font-bold">Em Serviço</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">14253-A</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between hover:border-slate-700 transition-colors cursor-pointer opacity-70">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-300">Ag. Silva</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Folga</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">88912-B</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}