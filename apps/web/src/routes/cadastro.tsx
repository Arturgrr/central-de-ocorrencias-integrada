import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { 
  Shield, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowLeft,
  UserPlus,
  IdCard,
  MapPin
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cadastro")({
  component: CadastroScreen,
});

function CadastroScreen() {
  const navigate = useNavigate();
  // Estado para alternar entre cadastro de Cidadão e Agente (espelhando seu BD)
  const [tipoUsuario, setTipoUsuario] = useState<'cidadao' | 'agente'>('cidadao');

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-200 font-sans relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-900/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-900/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Header do Form */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-900/20">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Criar Conta no COI</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Central de Ocorrências Integrada
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          <button 
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Login
          </button>

          {/* Toggle de Tipo de Usuário */}
          <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-lg mb-6">
            <button 
              onClick={() => setTipoUsuario('cidadao')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${tipoUsuario === 'cidadao' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Cidadão
            </button>
            <button 
              onClick={() => setTipoUsuario('agente')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${tipoUsuario === 'agente' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Agente / Policial
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            {/* Campos Base (Tabela Usuário) */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 p-3 text-sm focus:border-blue-500 outline-none text-slate-200 transition-colors" placeholder="João da Silva" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 p-3 text-sm focus:border-blue-500 outline-none text-slate-200 transition-colors" placeholder="joao@exemplo.com" />
              </div>
            </div>

            {/* Campos Condicionais baseados na escolha */}
            {tipoUsuario === 'cidadao' ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 p-3 text-sm focus:border-blue-500 outline-none text-slate-200 transition-colors" placeholder="(00) 00000-0000" />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Matrícula Funcional</label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 p-3 text-sm focus:border-emerald-500 outline-none text-slate-200 transition-colors" placeholder="Ex: 14253-A" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="password" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 p-3 text-sm focus:border-blue-500 outline-none text-slate-200 transition-colors" placeholder="••••••••" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="password" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 p-3 text-sm focus:border-blue-500 outline-none text-slate-200 transition-colors" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate({ to: '/' })}
              className={`w-full mt-6 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg ${tipoUsuario === 'cidadao' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20'} text-white`}
            >
              <UserPlus className="w-5 h-5" />
              Finalizar Cadastro
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Já possui uma conta?{' '}
              <Link to="/" className="text-blue-500 hover:text-blue-400 font-bold ml-1">
                Faça login aqui
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}