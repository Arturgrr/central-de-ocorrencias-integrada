import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	AlertTriangle,
	CheckCircle,
	Clock,
	Info,
	LogOut,
	MapPin,
	PlusCircle,
	Shield,
	Truck,
	X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { StatusBadge } from "@/components/status-badge";
import { useCreateCitizen } from "@/gen/hooks/citizens/useCreateCitizen";
import { useCreateOccurrence } from "@/gen/hooks/occurrences/useCreateOccurrence";
import {
	listOccurrencesQueryKey,
	useListOccurrences,
} from "@/gen/hooks/occurrences/useListOccurrences";
import { useListOccurrenceTypes } from "@/gen/hooks/occurrenceTypes/useListOccurrenceTypes";
import { useGetMe } from "@/gen/hooks/users/useGetMe";
import { authClient, requireSession } from "@/lib/auth-client";
import { formatDate, formatDateTime, OCCURRENCE_STATUS } from "@/lib/coi";

export const Route = createFileRoute("/portal-cidadao")({
	beforeLoad: () => requireSession(),
	component: PortalCidadaoScreen,
});

function PortalCidadaoScreen() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [isRequesting, setIsRequesting] = useState(false);

	const me = useGetMe();

	const occurrences = useListOccurrences({
		params: { mine: "true", page: 1, pageSize: 20 },
	});

	async function handleSignOut() {
		await authClient.signOut();
		navigate({ to: "/" });
	}

	return (
		<div className="min-h-screen bg-slate-950 font-sans text-slate-200">
			<header className="sticky top-0 z-50 border-blue-900/50 border-b bg-blue-950/40 backdrop-blur-md">
				<div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-blue-900/20 shadow-lg">
							<Shield className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="font-bold text-lg text-white leading-tight">
								Portal de Proteção
							</h1>
							<p className="font-bold text-[11px] text-blue-400 uppercase tracking-wider">
								Defesa Civil • João Monlevade
							</p>
						</div>
					</div>

					<button
						type="button"
						onClick={handleSignOut}
						className="hidden items-center gap-2 font-bold text-slate-400 text-sm transition-colors hover:text-red-400 sm:flex"
					>
						<LogOut className="h-4 w-4" /> Sair
					</button>
				</div>
			</header>

			<main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6">
				<section className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 md:flex-row">
					<div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/4 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

					<div className="z-10">
						<h2 className="mb-2 font-bold text-2xl text-white sm:text-3xl">
							Olá, {me.data?.name ?? "cidadão"}
						</h2>
						<p className="text-slate-400 text-sm sm:text-base">
							Como a Defesa Civil pode te ajudar hoje?
						</p>
					</div>

					<button
						type="button"
						onClick={() => setIsRequesting(true)}
						className="z-10 flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-bold text-white uppercase tracking-wider shadow-lg shadow-red-900/30 transition-all hover:scale-105 hover:bg-red-500 active:scale-95 md:w-auto"
					>
						<PlusCircle className="h-6 w-6" />
						Solicitar Resgate / B.O.
					</button>
				</section>

				{isRequesting && (
					<NovaSolicitacao
						defaultPhone={me.data?.phone ?? ""}
						defaultName={me.data?.name ?? ""}
						onClose={() => setIsRequesting(false)}
						onCreated={() => {
							setIsRequesting(false);
							queryClient.invalidateQueries({
								queryKey: listOccurrencesQueryKey(),
							});
						}}
					/>
				)}

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-2">
						<h3 className="flex items-center gap-2 border-slate-800 border-b pb-2 font-bold text-lg text-white">
							<Clock className="h-5 w-5 text-blue-500" />
							Acompanhamento de Ocorrências
						</h3>

						<div className="space-y-4">
							{occurrences.isLoading && (
								<p className="text-slate-500 text-sm">
									Carregando seus chamados...
								</p>
							)}

							{!occurrences.isLoading &&
								occurrences.data?.items.length === 0 && (
									<div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
										<p className="text-slate-400 text-sm">
											Você ainda não possui chamados registrados.
										</p>
									</div>
								)}

							{occurrences.data?.items.map((occurrence) => {
								const status = OCCURRENCE_STATUS[occurrence.status];
								const isOpen =
									occurrence.status !== "resolved" &&
									occurrence.status !== "cancelled";

								return (
									<article
										key={occurrence.id}
										className={`relative overflow-hidden rounded-xl p-5 ${
											isOpen
												? "border-2 border-amber-500/30 bg-slate-900"
												: "border border-slate-800 bg-slate-900 opacity-80 transition-opacity hover:opacity-100"
										}`}
									>
										{isOpen && (
											<div className="absolute top-0 left-0 h-full w-1 bg-amber-500" />
										)}
										<div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
											<div>
												<StatusBadge
													label={status.label}
													className={`${status.className} mb-2 rounded-full px-3 py-1`}
												/>
												<h4 className="font-bold text-lg text-white">
													{occurrence.title}
												</h4>
												<p className="mt-1 font-mono text-slate-400 text-xs">
													Protocolo: {occurrence.protocol}
												</p>
											</div>
											<div className="text-left sm:text-right">
												<p className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">
													{isOpen ? "Aberto em" : "Encerrado em"}
												</p>
												<p
													className={`mt-0.5 flex items-center gap-1.5 font-bold text-sm sm:justify-end ${
														isOpen ? "text-amber-400" : "text-emerald-500"
													}`}
												>
													{isOpen ? (
														<Truck className="h-4 w-4" />
													) : (
														<CheckCircle className="h-4 w-4" />
													)}
													{isOpen
														? formatDateTime(occurrence.openedAt)
														: occurrence.closedAt
															? formatDate(occurrence.closedAt)
															: "—"}
												</p>
											</div>
										</div>
										<div className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-950 p-3 text-slate-300 text-sm">
											<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
											<p>{occurrence.addressLine}</p>
										</div>
									</article>
								);
							})}
						</div>
					</div>

					<div className="space-y-6">
						<h3 className="flex items-center gap-2 border-slate-800 border-b pb-2 font-bold text-lg text-white">
							<AlertTriangle className="h-5 w-5 text-amber-500" />
							Avisos da Prefeitura
						</h3>

						<div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
							<div className="border-slate-800 border-b bg-amber-500/5 p-4">
								<div className="flex items-start gap-3">
									<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
										<AlertTriangle className="h-4 w-4 text-amber-500" />
									</div>
									<div>
										<h4 className="font-bold text-sm text-white">
											Em caso de emergência
										</h4>
										<p className="mt-1 text-slate-400 text-xs leading-relaxed">
											Situações com risco iminente à vida devem ser comunicadas
											imediatamente pelos telefones abaixo. O portal é destinado
											ao registro e acompanhamento de chamados.
										</p>
									</div>
								</div>
							</div>

							<div className="p-4">
								<div className="flex items-start gap-3">
									<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10">
										<Info className="h-4 w-4 text-blue-400" />
									</div>
									<div>
										<h4 className="font-bold text-sm text-white">
											Acompanhe seu protocolo
										</h4>
										<p className="mt-1 text-slate-400 text-xs leading-relaxed">
											Cada chamado recebe um protocolo único e um histórico
											auditável de todas as ações da equipe em campo.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
							<p className="mb-3 text-center font-bold text-[10px] text-slate-500 uppercase tracking-wider">
								Telefones Úteis
							</p>
							<div className="grid grid-cols-2 gap-2">
								<div className="rounded-lg border border-slate-800 bg-slate-950 p-2 text-center">
									<p className="font-bold text-sm text-white">199</p>
									<p className="text-[9px] text-slate-500 uppercase">
										Defesa Civil
									</p>
								</div>
								<div className="rounded-lg border border-slate-800 bg-slate-950 p-2 text-center">
									<p className="font-bold text-sm text-white">193</p>
									<p className="text-[9px] text-slate-500 uppercase">
										Bombeiros
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

function NovaSolicitacao({
	defaultName,
	defaultPhone,
	onClose,
	onCreated,
}: {
	defaultName: string;
	defaultPhone: string;
	onClose: () => void;
	onCreated: () => void;
}) {
	const [form, setForm] = useState({
		typeId: "",
		title: "",
		addressLine: "",
		description: "",
		phone: defaultPhone,
	});

	const types = useListOccurrenceTypes({ params: { activeOnly: "true" } });
	const createCitizen = useCreateCitizen();
	const createOccurrence = useCreateOccurrence();

	const isSubmitting = createCitizen.isPending || createOccurrence.isPending;

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		try {
			const citizen = await createCitizen.mutateAsync({
				data: { name: defaultName, phone: form.phone || "não informado" },
			});

			const occurrence = await createOccurrence.mutateAsync({
				data: {
					typeId: form.typeId,
					title: form.title.trim(),
					addressLine: form.addressLine.trim(),
					description: form.description.trim() || undefined,
					citizenId: citizen.id,
				},
			});

			toast.success(`Chamado registrado — protocolo ${occurrence.protocol}`);
			onCreated();
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Não foi possível abrir o chamado",
			);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 rounded-2xl border border-red-500/20 bg-slate-900 p-6"
		>
			<div className="flex items-center justify-between border-slate-800 border-b pb-3">
				<h3 className="font-bold text-lg text-white">Novo Chamado</h3>
				<button
					type="button"
					onClick={onClose}
					className="rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-500 hover:text-white"
				>
					<X className="h-4 w-4" />
				</button>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<label className="block space-y-1.5">
					<span className={labelClass}>Tipo de Emergência</span>
					<select
						required
						value={form.typeId}
						onChange={(event) =>
							setForm((f) => ({ ...f, typeId: event.target.value }))
						}
						className={inputClass}
					>
						<option value="">Selecione...</option>
						{types.data?.map((type) => (
							<option key={type.id} value={type.id}>
								{type.name}
							</option>
						))}
					</select>
				</label>

				<label className="block space-y-1.5">
					<span className={labelClass}>Telefone para contato</span>
					<input
						type="text"
						value={form.phone}
						onChange={(event) =>
							setForm((f) => ({ ...f, phone: event.target.value }))
						}
						className={inputClass}
						placeholder="(00) 00000-0000"
					/>
				</label>
			</div>

			<label className="block space-y-1.5">
				<span className={labelClass}>Resumo da situação</span>
				<input
					type="text"
					required
					value={form.title}
					onChange={(event) =>
						setForm((f) => ({ ...f, title: event.target.value }))
					}
					className={inputClass}
					placeholder="Ex: Queda de árvore sobre o muro"
				/>
			</label>

			<label className="block space-y-1.5">
				<span className={labelClass}>Endereço</span>
				<input
					type="text"
					required
					value={form.addressLine}
					onChange={(event) =>
						setForm((f) => ({ ...f, addressLine: event.target.value }))
					}
					className={inputClass}
					placeholder="Rua, número, bairro e ponto de referência"
				/>
			</label>

			<label className="block space-y-1.5">
				<span className={labelClass}>Detalhes</span>
				<textarea
					value={form.description}
					onChange={(event) =>
						setForm((f) => ({ ...f, description: event.target.value }))
					}
					className={`${inputClass} h-24 resize-none`}
					placeholder="Descreva o que está acontecendo..."
				/>
			</label>

			<button
				type="submit"
				disabled={isSubmitting}
				className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 font-bold text-white uppercase tracking-wider transition-colors hover:bg-red-500 disabled:opacity-60"
			>
				<PlusCircle className="h-5 w-5" />
				{isSubmitting ? "Enviando..." : "Enviar Solicitação"}
			</button>
		</form>
	);
}

const inputClass =
	"w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 text-sm outline-none transition-colors focus:border-blue-500";
const labelClass =
	"font-bold text-[10px] text-slate-500 uppercase tracking-wider";
