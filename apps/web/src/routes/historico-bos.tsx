import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin
} from "lucide-react";

export const Route = createFileRoute("/historico-bos")({
  component: HistoricoBosScreen,
});

function HistoricoBosScreen() {
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
                <FileText className="w-7 h-7 text-blue-500" />
                Arquivo de Ocorrências
              </h1>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider font-semibold">
                Gestão e auditoria de todos os B.O.s registrados
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> Exportar Relatório
            </button>
          </div>
        </div>

        {/* BARRA DE FILTROS (Baseada no ER) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por ID, Solicitante ou Endereço..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 p-2.5 text-sm focus:border-blue-500 outline-none text-slate-200 transition-colors" 
            />
          </div>
          
          <div className="flex gap-4">
            <select className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none text-slate-400 w-40">
              <option>Todos os Status</option>
              <option>Pendente</option>
              <option>Em Andamento</option>
              <option>Finalizado</option>
            </select>

            <select className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none text-slate-400 w-48">
              <option>Todas as Categorias</option>
              <option>Deslizamento</option>
              <option>Alagamento</option>
              <option>Acidente de Trânsito</option>
            </select>

            <button className="bg-slate-950 border border-slate-800 text-slate-400 hover:text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Filter className="w-4 h-4" /> Filtros Avançados
            </button>
          </div>
        </div>

        {/* DATA GRID (TABELA) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="p-4">ID / Protocolo</th>
                  <th className="p-4">Data e Hora</th>
                  <th className="p-4">Tipo de Ocorrência</th>
                  <th className="p-4">Localização (Bairro)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-800/50">
                
                {/* Linha 1 */}
                <tr className="hover:bg-slate-800/20 transition-colors group">
                  <td className="p-4 font-mono font-bold text-slate-300">#4092-A</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" /> 01 Jul, 14:00
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-white">Deslizamento de Terra</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" /> República, João Monlevade
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      Em Andamento
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => navigate({ to: '/detalhes-bo' })}
                      className="text-slate-500 hover:text-blue-500 transition-colors p-1"
                      title="Ver Detalhes"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

                {/* Linha 2 */}
                <tr className="hover:bg-slate-800/20 transition-colors group">
                  <td className="p-4 font-mono font-bold text-slate-300">#3811-C</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" /> 12 Jun, 09:30
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-white">Alagamento de Via Pública</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" /> Cruzeiro Celeste, João Monlevade
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Finalizado
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => navigate({ to: '/detalhes-bo' })}
                      className="text-slate-500 hover:text-blue-500 transition-colors p-1"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

                {/* Linha 3 */}
                <tr className="hover:bg-slate-800/20 transition-colors group">
                  <td className="p-4 font-mono font-bold text-slate-300">#3810-A</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" /> 11 Jun, 21:15
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-white">Acidente de Trânsito</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" /> Centro, João Monlevade
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Finalizado
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => navigate({ to: '/detalhes-bo' })}
                      className="text-slate-500 hover:text-blue-500 transition-colors p-1"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* PAGINAÇÃO */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between text-sm text-slate-400">
            <div>
              Mostrando <span className="text-white font-bold">1</span> a <span className="text-white font-bold">3</span> de <span className="text-white font-bold">124</span> registros
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 rounded bg-slate-950 border border-slate-800 hover:text-white transition-colors disabled:opacity-50" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded bg-slate-950 border border-slate-800 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}