import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	IdCard,
	Lock,
	Mail,
	Phone,
	Shield,
	User,
	UserPlus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/cadastro")({
	component: CadastroScreen,
});

function CadastroScreen() {
	const navigate = useNavigate();

	const [tipoUsuario, setTipoUsuario] = useState<"cidadao" | "agente">(
		"cidadao",
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		registrationNumber: "",
		password: "",
		confirmPassword: "",
	});

	function update(field: keyof typeof form, value: string) {
		setForm((current) => ({ ...current, [field]: value }));
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (form.password !== form.confirmPassword) {
			toast.error("As senhas não conferem");
			return;
		}
		if (form.password.length < 8) {
			toast.error("A senha precisa ter ao menos 8 caracteres");
			return;
		}

		setIsSubmitting(true);
		const { error } = await authClient.signUp.email({
			name: form.name,
			email: form.email,
			password: form.password,
			phone: form.phone || undefined,
			registrationNumber: form.registrationNumber || undefined,
		});
		setIsSubmitting(false);

		if (error) {
			toast.error(error.message ?? "Não foi possível concluir o cadastro");
			return;
		}

		toast.success("Cadastro concluído! Acesse com suas credenciais.");
		navigate({ to: "/" });
	}

	const accent = tipoUsuario === "cidadao" ? "blue" : "emerald";

	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 font-sans text-slate-200">
			<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
				<div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-blue-900/10 to-transparent blur-3xl" />
				<div className="absolute -right-1/2 -bottom-1/2 h-full w-full rounded-full bg-gradient-to-tl from-emerald-900/10 to-transparent blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-md">
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 shadow-blue-900/20 shadow-xl">
						<Shield className="h-8 w-8 text-blue-500" />
					</div>
					<h1 className="font-bold text-2xl text-white tracking-wide">
						Criar Conta no COI
					</h1>
					<p className="mt-2 font-medium text-slate-500 text-sm">
						Central de Ocorrências Integrada
					</p>
				</div>

				<div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md sm:p-8">
					<Link
						to="/"
						className="mb-6 flex items-center gap-2 font-bold text-slate-500 text-xs uppercase tracking-wider transition-colors hover:text-white"
					>
						<ArrowLeft className="h-4 w-4" /> Voltar para o Login
					</Link>

					<div className="mb-6 flex rounded-lg border border-slate-800 bg-slate-950 p-1">
						{(["cidadao", "agente"] as const).map((tipo) => (
							<button
								key={tipo}
								type="button"
								onClick={() => setTipoUsuario(tipo)}
								className={`flex-1 rounded-md py-2 font-bold text-xs uppercase tracking-wider transition-all ${
									tipoUsuario === tipo
										? "bg-slate-800 text-white shadow"
										: "text-slate-500 hover:text-slate-300"
								}`}
							>
								{tipo === "cidadao" ? "Cidadão" : "Agente / Policial"}
							</button>
						))}
					</div>

					<form className="space-y-4" onSubmit={handleSubmit}>
						<Field
							label="Nome Completo"
							icon={<User className="h-4 w-4 text-slate-500" />}
						>
							<input
								type="text"
								required
								value={form.name}
								onChange={(event) => update("name", event.target.value)}
								className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 pl-10 text-slate-200 text-sm outline-none transition-colors focus:border-blue-500"
								placeholder="João da Silva"
							/>
						</Field>

						<Field
							label="E-mail"
							icon={<Mail className="h-4 w-4 text-slate-500" />}
						>
							<input
								type="email"
								required
								value={form.email}
								onChange={(event) => update("email", event.target.value)}
								className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 pl-10 text-slate-200 text-sm outline-none transition-colors focus:border-blue-500"
								placeholder="joao@exemplo.com"
							/>
						</Field>

						{tipoUsuario === "cidadao" ? (
							<Field
								label="Telefone"
								icon={<Phone className="h-4 w-4 text-slate-500" />}
							>
								<input
									type="text"
									value={form.phone}
									onChange={(event) => update("phone", event.target.value)}
									className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 pl-10 text-slate-200 text-sm outline-none transition-colors focus:border-blue-500"
									placeholder="(00) 00000-0000"
								/>
							</Field>
						) : (
							<Field
								label="Matrícula Funcional"
								icon={<IdCard className="h-4 w-4 text-slate-500" />}
							>
								<input
									type="text"
									value={form.registrationNumber}
									onChange={(event) =>
										update("registrationNumber", event.target.value)
									}
									className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 pl-10 text-slate-200 text-sm outline-none transition-colors focus:border-emerald-500"
									placeholder="Ex: 14253-A"
								/>
							</Field>
						)}

						<div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
							<Field
								label="Senha"
								icon={<Lock className="h-4 w-4 text-slate-500" />}
							>
								<input
									type="password"
									required
									value={form.password}
									onChange={(event) => update("password", event.target.value)}
									className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 pl-10 text-slate-200 text-sm outline-none transition-colors focus:border-blue-500"
									placeholder="••••••••"
								/>
							</Field>
							<Field
								label="Confirmar Senha"
								icon={<Lock className="h-4 w-4 text-slate-500" />}
							>
								<input
									type="password"
									required
									value={form.confirmPassword}
									onChange={(event) =>
										update("confirmPassword", event.target.value)
									}
									className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 pl-10 text-slate-200 text-sm outline-none transition-colors focus:border-blue-500"
									placeholder="••••••••"
								/>
							</Field>
						</div>

						{tipoUsuario === "agente" && (
							<p className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-500/90 leading-relaxed">
								Contas de agente são criadas como cidadão e liberadas por um
								administrador após a validação da matrícula.
							</p>
						)}

						<button
							type="submit"
							disabled={isSubmitting}
							className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 font-bold text-white shadow-lg transition-colors disabled:opacity-60 ${
								accent === "blue"
									? "bg-blue-600 shadow-blue-900/20 hover:bg-blue-500"
									: "bg-emerald-600 shadow-emerald-900/20 hover:bg-emerald-500"
							}`}
						>
							<UserPlus className="h-5 w-5" />
							{isSubmitting ? "Enviando..." : "Finalizar Cadastro"}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-slate-500 text-xs">
							Já possui uma conta?{" "}
							<Link
								to="/"
								className="ml-1 font-bold text-blue-500 hover:text-blue-400"
							>
								Faça login aqui
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function Field({
	label,
	icon,
	children,
}: {
	label: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: controle aninhado via children
		<label className="block space-y-1.5">
			<span className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">
				{label}
			</span>
			<div className="relative">
				<div className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</div>
				{children}
			</div>
		</label>
	);
}
