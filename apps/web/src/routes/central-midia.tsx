import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Folder,
  Filter,
  HardDrive,
  MoreVertical,
  Camera
} from "lucide-react";

export const Route = createFileRoute("/central-midia")({
  component: CentralMidiaScreen,
});

function CentralMidiaScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8 text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
        
        {/* CABEÇALHO */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate({ to: '/dashboard' })}
              className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
                <HardDrive className="w-7 h-7 text-emerald-500" />
                Central de Mídia e Evidências
              </h1>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider font-semibold">
                Repositório de arquivos vinculados aos B.O.s
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar por nome do arquivo..." 
                className="w-64 bg-slate-900 border border-slate-800 rounded-lg pl-9 p-2.5 text-sm focus:border-emerald-500 outline-none text-slate-200 transition-colors" 
              />
            </div>
            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 p-2.5 rounded-lg transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-900/20">
              <Download className="w-4 h-4" /> Baixar Seleção
            </button>
          </div>
        </div>

        {/* ÁREA PRINCIPAL COM SIDEBAR */}
        <div className="flex flex-1 gap-6 min-h-0">
          
          {/* SIDEBAR DE PASTAS/FILTROS */}
          <aside className="w-64 bg-slate-900 border border-slate-800 rounded-xl p-4 hidden lg:flex flex-col gap-6 overflow-y-auto">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Categorias</p>
              <nav className="space-y-1">
                <button className="w-full flex items-center justify-between bg-emerald-500/10 text-emerald-500 px-3 py-2 rounded-lg font-medium text-sm">
                  <div className="flex items-center gap-2"><Folder className="w-4 h-4" /> Todos os Arquivos</div>
                  <span className="text-xs font-bold">1.2k</span>
                </button>
                <button className="w-full flex items-center justify-between text-slate-400 hover:bg-slate-800 hover:text-slate-200 px-3 py-2 rounded-lg font-medium text-sm transition-colors">
                  <div className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Fotografias</div>
                  <span className="text-xs">842</span>
                </button>
                <button className="w-full flex items-center justify-between text-slate-400 hover:bg-slate-800 hover:text-slate-200 px-3 py-2 rounded-lg font-medium text-sm transition-colors">
                  <div className="flex items-center gap-2"><Video className="w-4 h-4" /> Vídeos (Câmeras/Drones)</div>
                  <span className="text-xs">156</span>
                </button>
                <button className="w-full flex items-center justify-between text-slate-400 hover:bg-slate-800 hover:text-slate-200 px-3 py-2 rounded-lg font-medium text-sm transition-colors">
                  <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Documentos & Laudos</div>
                  <span className="text-xs">210</span>
                </button>
              </nav>
            </div>

            <div className="mt-auto bg-slate-950 border border-slate-800 rounded-lg p-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Armazenamento (S3)</p>
              <div className="w-full bg-slate-800 h-2 rounded-full mb-2 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[65%] rounded-full"></div>
              </div>
              <p className="text-xs text-slate-400 font-mono">650 GB / 1 TB utilizado</p>
            </div>
          </aside>

          {/* GRID DE ARQUIVOS */}
          <main className="flex-1 overflow-y-auto bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white text-lg">Adicionados Recentemente</h3>
              <div className="text-xs font-bold text-slate-500 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800">
                Data: 01 de Julho, 2026
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              
              {/* CARD ARQUIVO 1 (Foto) */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors group cursor-pointer relative">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
                  <button className="bg-slate-900/80 backdrop-blur p-1.5 rounded-md text-white hover:bg-emerald-600 transition-colors"><Download className="w-4 h-4" /></button>
                </div>
                <div className="h-32 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                  {/* Placeholder Visual Simulando Imagem */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-700 to-slate-600 opacity-50"></div>
                  <Camera className="w-8 h-8 text-slate-400 relative z-10 opacity-50" />
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-slate-300">.JPG</span>
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-bold text-white truncate pr-2" title="deslizamento_encosta_vtr42.jpg">deslizamento_encosta_vtr42.jpg</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-slate-500 font-mono">2.4 MB</p>
                    <p className="text-[9px] text-blue-400 font-bold uppercase tracking-wider bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors">B.O. #4092-A</p>
                  </div>
                </div>
              </div>

              {/* CARD ARQUIVO 2 (Vídeo) */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors group cursor-pointer relative">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
                  <button className="bg-slate-900/80 backdrop-blur p-1.5 rounded-md text-white hover:bg-emerald-600 transition-colors"><Download className="w-4 h-4" /></button>
                </div>
                <div className="h-32 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 opacity-50"></div>
                  <div className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur flex items-center justify-center border border-slate-700 relative z-10">
                    <Video className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-slate-300">.MP4</span>
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur text-[9px] font-bold font-mono px-2 py-0.5 rounded text-slate-300">01:42</span>
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-bold text-white truncate pr-2" title="drone_sobrevoo_alagamento.mp4">drone_sobrevoo_alagamento.mp4</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-slate-500 font-mono">142.8 MB</p>
                    <p className="text-[9px] text-blue-400 font-bold uppercase tracking-wider bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors">B.O. #3811-C</p>
                  </div>
                </div>
              </div>

              {/* CARD ARQUIVO 3 (Documento) */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors group cursor-pointer relative">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
                  <button className="bg-slate-900/80 backdrop-blur p-1.5 rounded-md text-white hover:bg-emerald-600 transition-colors"><Download className="w-4 h-4" /></button>
                </div>
                <div className="h-32 bg-slate-900 relative flex flex-col items-center justify-center overflow-hidden border-b border-slate-800">
                  <FileText className="w-10 h-10 text-blue-400 mb-2 opacity-80" />
                  <span className="bg-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-blue-500/20">.PDF</span>
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-bold text-white truncate pr-2" title="laudo_pericial_preliminar.pdf">laudo_pericial_preliminar.pdf</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-slate-500 font-mono">1.1 MB</p>
                    <p className="text-[9px] text-blue-400 font-bold uppercase tracking-wider bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors">B.O. #3810-A</p>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}