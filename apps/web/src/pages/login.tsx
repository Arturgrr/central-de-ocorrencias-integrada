import React, { useState } from 'react';
import { Shield, ShieldCheck, User, Key, ArrowRight, Lock } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState<'atendente' | 'policial'>('atendente');

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background estilizado simulando o mapa (você pode trocar por uma imagem real depois) */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black pointer-events-none" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: '0.2' }} />

      {/* Container Principal */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden relative z-10">
        
        {/* Header Escuro */}
        <div className="bg-slate-900 text-white p-8 flex flex-col items-center border-b-4 border-blue-600">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold tracking-wider">COI</h1>
          </div>
          <p className="text-slate-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Defesa Civil & Segurança
          </p>
          <div className="bg-slate-800/80 text-blue-400 text-xs px-4 py-1.5 rounded-full flex items-center gap-2 border border-slate-700">
            <Lock className="w-3 h-3" />
            NÓ DE ACESSO SEGURO
          </div>
        </div>

        {/* Corpo do Formulário */}
        <div className="p-8">
          
          {/* Seletor de Perfil */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Perfil de Operação
            </label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setRole('atendente')}
                className={`flex-1 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${
                  role === 'atendente' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <User className="w-4 h-4" />
                Atendente
              </button>
              <button
                onClick={() => setRole('policial')}
                className={`flex-1 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${
                  role === 'policial' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Shield className="w-4 h-4" />
                Agente / Policial
              </button>
            </div>
          </div>

          <form className="space-y-5">
            {/* Input ID/Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                ID do Operador / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50 text-slate-900 text-sm"
                  placeholder="Insira suas credenciais"
                />
              </div>
            </div>

            {/* Input Senha */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Chave de Acesso
                </label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800">
                  RECUPERAR ACESSO
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50 text-slate-900 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Aviso 2FA */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-blue-900">2FA PRONTO</p>
                <p className="text-xs text-blue-700">Verificação de identidade exigida após o acesso.</p>
              </div>
            </div>

            {/* Botão Submeter */}
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
            >
              <ArrowRight className="w-5 h-5" />
              AUTORIZAR ACESSO
            </button>
          </form>
        </div>

        {/* Footer do Card */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            NODE: 04-DISPATCH
          </span>
          <span>v4.8.2-STABLE</span>
        </div>
      </div>

      {/* Footer da Página */}
      <div className="mt-8 text-center text-slate-500 text-xs font-medium tracking-widest relative z-10">
        <p>PORTAL OFICIAL DA CENTRAL DE OCORRÊNCIA INTEGRADA</p>
        <p className="mt-1 opacity-75">RECURSO GOVERNAMENTAL CLASSIFICADO - ACESSO RESTRITO</p>
      </div>
    </div>
  );
}