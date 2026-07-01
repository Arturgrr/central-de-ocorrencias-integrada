import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  FileText, 
  Upload, 
  MapPin, 
  Camera,
  Save, 
  Send, 
  X
} from "lucide-react";

export const Route = createFileRoute("/novo-bo")({
  component: NovaOcorrenciaScreen,
});

function NovaOcorrenciaScreen() {
  // Instanciamos o navegador para podermos voltar ao painel
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8 text-slate-200 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3 tracking-wide">
              <FileText className="text-blue-500 w-8 h-8" />
              NOVO REGISTRO DE OCORRÊNCIA
            </h1>
            <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider font-semibold">
              Preencha os dados do chamado para despacho imediato
            </p>
          </div>
          {/* AQUI: Adicionamos a ação de voltar ao clicar no 'X' */}
          <button 
            onClick={() => navigate({ to: '/dashboard' })}
            className="text-slate-500 hover:text-white transition-colors bg-slate-900 p-2 rounded-lg border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* FORMULÁRIO (Esquerda) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h3 className="font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Informações do Solicitante
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Nome do Solicitante</label>
                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none text-slate-200" placeholder="Ex: João da Silva" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Telefone / Contato</label>
                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none text-slate-200" placeholder="(00) 00000-0000" />
              </div>
            </div>

            <h3 className="font-bold text-white border-b border-slate-800 pb-2 pt-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Dados da Ocorrência
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Tipo de Emergência</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none text-slate-200">
                  <option>Selecione a categoria...</option>
                  <option>Deslizamento de Terra</option>
                  <option>Inundação / Alagamento</option>
                  <option>Queda de Árvore</option>
                  <option>Acidente de Trânsito</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Endereço da Ocorrência</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 p-2.5 text-sm focus:border-blue-500 outline-none text-slate-200" placeholder="Rua, Número, Bairro..." />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Descrição Detalhada</label>
                <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm h-32 focus:border-blue-500 outline-none resize-none text-slate-200" placeholder="Descreva os detalhes da situação de forma clara e objetiva..."></textarea>
              </div>
            </div>
          </div>

          {/* UPLOAD E AÇÕES (Direita) */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Camera className="w-4 h-4 text-slate-500" /> Evidências Multimídia
              </h3>
              <div className="border-2 border-dashed border-slate-700 bg-slate-950/50 rounded-xl p-10 flex flex-col items-center justify-center text-slate-500 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-slate-300">Arraste fotos ou vídeos aqui</p>
                <p className="text-[11px] mt-2 tracking-wider uppercase font-semibold">ou clique para buscar no computador</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-700">
                <Save className="w-4 h-4" /> Salvar Rascunho
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20">
                <Send className="w-4 h-4" /> Despachar Equipe
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}