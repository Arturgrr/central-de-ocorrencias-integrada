import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Activity, Car, FileText, LogOut, Search, Shield } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { useGetMe } from "@/gen/hooks/users/useGetMe";
import { authClient } from "@/lib/auth-client";
import { USER_ROLE } from "@/lib/coi";

const NAV_ITEMS = [
	{ to: "/dashboard", label: "Painel de Controle", icon: Activity },
	{ to: "/historico-bos", label: "Arquivo Geral", icon: Search },
	{ to: "/novo-bo", label: "Novo Boletim (B.O.)", icon: FileText },
	{ to: "/equipes", label: "Viaturas & Agentes", icon: Car },
] as const;

export default function AppShell({
	title,
	actions,
	children,
}: {
	title: string;
	actions?: ReactNode;
	children: ReactNode;
}) {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { data: me } = useGetMe();

	async function handleSignOut() {
		await authClient.signOut();
		toast.success("Sessão encerrada");
		navigate({ to: "/" });
	}

	return (
		<div className="flex h-screen w-full overflow-hidden bg-slate-950 font-sans text-slate-300">
			<aside className="flex w-20 shrink-0 flex-col border-slate-800 border-r bg-slate-900 transition-all duration-300 sm:w-64">
				<div className="flex h-16 shrink-0 items-center justify-center border-slate-800 border-b sm:justify-start sm:px-6">
					<Shield className="h-8 w-8 text-blue-500" />
					<span className="ml-3 hidden font-bold text-white text-xl tracking-wider sm:block">
						COI
					</span>
				</div>

				<nav className="flex flex-1 flex-col gap-2 px-2 py-4 sm:px-4">
					{NAV_ITEMS.map(({ to, label, icon: Icon }) => {
						const active = pathname === to;
						return (
							<Link
								key={to}
								to={to}
								className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
									active
										? "bg-blue-600/10 text-blue-500 hover:bg-blue-600/20"
										: "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
								}`}
							>
								<Icon className="h-5 w-5 shrink-0" />
								<span className="hidden font-semibold text-sm sm:block">
									{label}
								</span>
							</Link>
						);
					})}
				</nav>

				<div className="border-slate-800 border-t p-4">
					<button
						type="button"
						onClick={handleSignOut}
						className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-slate-400 transition-colors hover:bg-slate-800 hover:text-red-400"
					>
						<LogOut className="h-5 w-5 shrink-0" />
						<span className="hidden font-semibold text-sm sm:block">Sair</span>
					</button>
				</div>
			</aside>

			<main className="flex min-w-0 flex-1 flex-col overflow-hidden">
				<header className="flex h-16 shrink-0 items-center justify-between border-slate-800 border-b bg-slate-900 px-4 sm:px-8">
					<h2 className="font-semibold text-lg text-white tracking-wide">
						{title}
					</h2>

					<div className="flex items-center gap-4 sm:gap-6">
						{actions}
						<div className="flex items-center gap-3 border-slate-800 border-l pl-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
								<Shield className="h-4 w-4 text-slate-400" />
							</div>
							<div className="hidden text-left sm:block">
								<p className="font-bold text-white text-xs leading-tight">
									{me?.name ?? "—"}
								</p>
								<p className="text-[10px] text-slate-500 uppercase tracking-wider">
									{me ? USER_ROLE[me.role] : ""}
								</p>
							</div>
						</div>
					</div>
				</header>

				<div className="flex-1 overflow-y-auto">{children}</div>
			</main>
		</div>
	);
}
