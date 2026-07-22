import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { ArrowRight, Key, Lock, Shield, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { homeRouteForRole, type UserRole } from "@/lib/coi";

export const Route = createFileRoute("/")({
	beforeLoad: async () => {
		const { data } = await authClient.getSession();
		if (data) {
			const role = data.user.role as UserRole;
			throw redirect({ to: homeRouteForRole(role) });
		}
	},
	component: LoginScreen,
});

function LoginScreen() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleLogin(event: React.FormEvent) {
		event.preventDefault();
		setIsSubmitting(true);

		const { data, error } = await authClient.signIn.email({ email, password });

		setIsSubmitting(false);

		if (error || !data) {
			toast.error(error?.message ?? "Credenciais inválidas");
			return;
		}

		const role = data.user.role as UserRole;
		toast.success(`Acesso autorizado — ${data.user.name}`);
		navigate({ to: homeRouteForRole(role) });
	}

	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900 p-4 py-8 sm:p-8">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black opacity-20" />
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: "radial-gradient(#334155 1px, transparent 1px)",
					backgroundSize: "32px 32px",
					opacity: "0.2",
				}}
			/>

			<div className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
				<div className="flex shrink-0 flex-col items-center border-blue-600 border-b-4 bg-slate-900 p-6 text-white sm:p-8">
					<div className="mb-2 flex items-center gap-3">
						<Shield className="h-8 w-8 text-blue-500" />
						<h1 className="font-bold text-2xl tracking-wider sm:text-3xl">
							COI
						</h1>
					</div>
					<p className="mb-4 text-center font-semibold text-slate-400 text-xs uppercase tracking-widest sm:text-sm">
						Defesa Civil &amp; Segurança
					</p>
					<div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-[10px] text-blue-400 sm:text-xs">
						<Lock className="h-3 w-3" />
						NÓ DE ACESSO SEGURO
					</div>
				</div>

				<form
					className="space-y-4 overflow-y-auto p-6 sm:space-y-5 sm:p-8"
					onSubmit={handleLogin}
				>
					<div>
						<label
							htmlFor="email"
							className="mb-1 block font-bold text-[10px] text-slate-500 uppercase tracking-wider sm:text-xs"
						>
							E-mail do Operador
						</label>
						<div className="relative">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<User className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
							</div>
							<input
								id="email"
								type="email"
								required
								autoComplete="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pr-3 pl-9 text-slate-900 text-xs focus:border-blue-600 focus:ring-2 focus:ring-blue-600 sm:py-2.5 sm:pl-10 sm:text-sm"
								placeholder="atendente@coi.gov.br"
							/>
						</div>
					</div>

					<div>
						<div className="mb-1 flex items-center justify-between">
							<label
								htmlFor="password"
								className="block font-bold text-[10px] text-slate-500 uppercase tracking-wider sm:text-xs"
							>
								Chave de Acesso
							</label>
						</div>
						<div className="relative">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<Key className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
							</div>
							<input
								id="password"
								type="password"
								required
								autoComplete="current-password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pr-3 pl-9 text-slate-900 text-xs focus:border-blue-600 focus:ring-2 focus:ring-blue-600 sm:py-2.5 sm:pl-10 sm:text-sm"
								placeholder="••••••••"
							/>
						</div>
					</div>

					<div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 p-2.5 sm:gap-3 sm:p-3">
						<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 sm:h-5 sm:w-5" />
						<div>
							<p className="font-bold text-[10px] text-blue-900 sm:text-xs">
								SESSÃO PROTEGIDA
							</p>
							<p className="mt-0.5 text-[10px] text-blue-700 leading-tight sm:text-xs">
								O acesso é registrado e vinculado ao seu perfil operacional.
							</p>
						</div>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 font-bold text-white transition-colors hover:bg-slate-800 disabled:opacity-60 sm:py-3"
					>
						<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
						<span className="text-xs sm:text-sm">
							{isSubmitting ? "AUTENTICANDO..." : "AUTORIZAR ACESSO"}
						</span>
					</button>

					<p className="text-center text-slate-500 text-xs">
						Não possui cadastro?{" "}
						<Link
							to="/cadastro"
							className="ml-1 font-bold text-blue-600 hover:text-blue-800"
						>
							Criar conta
						</Link>
					</p>
				</form>

				<div className="flex shrink-0 items-center justify-between border-slate-100 border-t bg-slate-50 p-3 font-medium text-[10px] text-slate-500 sm:p-4 sm:text-xs">
					<span className="flex items-center gap-1">
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 sm:h-2 sm:w-2" />
						NODE: 04-DISPATCH
					</span>
					<span>v1.0.0</span>
				</div>
			</div>

			<div className="relative z-10 mt-6 px-4 text-center font-medium text-[9px] text-slate-500 tracking-widest sm:mt-8 sm:text-xs">
				<p>PORTAL OFICIAL DA CENTRAL DE OCORRÊNCIA INTEGRADA</p>
				<p className="mt-1 opacity-75">
					RECURSO GOVERNAMENTAL — ACESSO RESTRITO
				</p>
			</div>
		</div>
	);
}
