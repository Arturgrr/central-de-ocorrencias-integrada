import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowLeft,
	Car,
	CheckCircle,
	Clock,
	MapPin,
	Phone,
	Radio,
	Send,
	ShieldAlert,
	User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { StatusBadge } from "@/components/status-badge";
import { useCreateAssignment } from "@/gen/hooks/assignments/useCreateAssignment";
import { useCloseOccurrence } from "@/gen/hooks/occurrences/useCloseOccurrence";
import {
	getOccurrenceQueryKey,
	useGetOccurrence,
} from "@/gen/hooks/occurrences/useGetOccurrence";
import { listOccurrencesQueryKey } from "@/gen/hooks/occurrences/useListOccurrences";
import { useUpdateOccurrence } from "@/gen/hooks/occurrences/useUpdateOccurrence";
import { useCreateTimelineEvent } from "@/gen/hooks/timeline/useCreateTimelineEvent";
import { useListAgents } from "@/gen/hooks/users/useListAgents";
import { useListVehicles } from "@/gen/hooks/vehicles/useListVehicles";
import { requireRole } from "@/lib/auth-client";
import {
	ASSIGNMENT_STATUS,
	formatDateTime,
	formatTime,
	OCCURRENCE_PRIORITY,
	OCCURRENCE_STATUS,
	TIMELINE_EVENT,
} from "@/lib/coi";

export const Route = createFileRoute("/detalhes-bo/$occurrenceId")({
	beforeLoad: () => requireRole("admin", "attendant", "agent"),
	component: DetalhesOcorrenciaScreen,
});

function DetalhesOcorrenciaScreen() {
	const { occurrenceId } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const occurrence = useGetOccurrence({ id: occurrenceId });
	const vehicles = useListVehicles({ params: { status: "available" } });
	const agents = useListAgents();

	const [note, setNote] = useState("");
	const [vehicleId, setVehicleId] = useState("");
	const [agentUserId, setAgentUserId] = useState("");

	function refresh() {
		queryClient.invalidateQueries({
			queryKey: getOccurrenceQueryKey({ id: occurrenceId }),
		});
		queryClient.invalidateQueries({ queryKey: listOccurrencesQueryKey() });
	}

	const createTimelineEvent = useCreateTimelineEvent({
		mutation: {
			onSuccess: () => {
				setNote("");
				toast.success("Registro adicionado à cronologia");
				refresh();
			},
		},
	});

	const createAssignment = useCreateAssignment({
		mutation: {
			onSuccess: () => {
				setVehicleId("");
				setAgentUserId("");
				toast.success("Equipe despachada");
				refresh();
			},
		},
	});

	const updateOccurrence = useUpdateOccurrence({
		mutation: {
			onSuccess: () => {
				toast.success("Status atualizado");
				refresh();
			},
		},
	});

	const closeOccurrence = useCloseOccurrence({
		mutation: {
			onSuccess: () => {
				toast.success("Ocorrência finalizada");
				refresh();
			},
		},
	});

	if (occurrence.isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
				Carregando ocorrência...
			</div>
		);
	}

	if (!occurrence.data) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-slate-400">
				<p>Ocorrência não encontrada.</p>
				<button
					type="button"
					onClick={() => navigate({ to: "/historico-bos" })}
					className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm hover:text-white"
				>
					Voltar ao arquivo
				</button>
			</div>
		);
	}

	const data = occurrence.data;
	const status = OCCURRENCE_STATUS[data.status];
	const priority = OCCURRENCE_PRIORITY[data.priority];
	const isClosed = data.status === "resolved" || data.status === "cancelled";

	return (
		<div className="min-h-screen bg-slate-950 p-4 font-sans text-slate-200 sm:p-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 flex flex-col justify-between gap-4 border-slate-800 border-b pb-6 sm:flex-row sm:items-center">
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={() => navigate({ to: "/dashboard" })}
							className="rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
						>
							<ArrowLeft className="h-5 w-5" />
						</button>
						<div>
							<div className="flex items-center gap-3">
								<h1 className="font-bold text-2xl text-white tracking-wide">
									B.O. {data.protocol}
								</h1>
								<StatusBadge
									label={status.label}
									className={`${status.className} rounded-full px-3 py-1`}
									icon={<Radio className="h-3 w-3 animate-pulse" />}
								/>
							</div>
							<p className="mt-1 font-semibold text-slate-500 text-sm uppercase tracking-wider">
								{data.type.name} • Aberto em {formatDateTime(data.openedAt)}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-2 px-4">
						<ShieldAlert className="h-8 w-8 text-red-500" />
						<div>
							<p className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">
								Nível de Prioridade
							</p>
							<p className="font-bold text-red-500 text-sm uppercase">
								{priority.label}
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-2">
						<section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
							<div className="border-slate-800 border-b bg-slate-900/50 p-5">
								<h3 className="flex items-center gap-2 font-bold text-white">
									<AlertTriangle className="h-4 w-4 text-amber-500" />
									Detalhes do Incidente
								</h3>
							</div>
							<div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2">
								<div className="space-y-4">
									<div>
										<p className="mb-1 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
											Localização
										</p>
										<p className="flex items-start gap-2 text-slate-200 text-sm">
											<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
											<span>
												{data.addressLine}
												{data.neighborhood && ` — ${data.neighborhood.name}`}
												{data.city && `, ${data.city.name}/${data.city.state}`}
											</span>
										</p>
									</div>
									<div>
										<p className="mb-1 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
											Solicitante
										</p>
										{data.citizen ? (
											<div className="flex flex-col gap-1 text-slate-300 text-sm">
												<span className="flex items-center gap-2">
													<User className="h-3.5 w-3.5 text-slate-500" />
													{data.citizen.name}
												</span>
												<span className="flex items-center gap-2">
													<Phone className="h-3.5 w-3.5 text-slate-500" />
													{data.citizen.phone}
												</span>
											</div>
										) : (
											<p className="text-slate-500 text-sm">Não informado</p>
										)}
									</div>
									<div>
										<p className="mb-1 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
											Registrado por
										</p>
										<p className="text-slate-300 text-sm">
											{data.openedBy.name}
										</p>
									</div>
								</div>
								<div>
									<p className="mb-1 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
										Descrição Registrada
									</p>
									<p className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-slate-300 text-sm leading-relaxed">
										{data.description ?? "Sem descrição registrada."}
									</p>
								</div>
							</div>
						</section>

						<section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
							<h3 className="mb-4 flex items-center gap-2 font-bold text-white">
								<Car className="h-4 w-4 text-emerald-500" />
								Equipes Despachadas
							</h3>

							<div className="mb-4 space-y-2">
								{data.assignments.length === 0 && (
									<p className="text-slate-500 text-sm">
										Nenhuma equipe despachada até o momento.
									</p>
								)}
								{data.assignments.map((assignment) => {
									const assignmentStatus = ASSIGNMENT_STATUS[assignment.status];
									return (
										<div
											key={assignment.id}
											className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3"
										>
											<div>
												<p className="font-bold text-sm text-white">
													{assignment.vehicle?.code ?? "Sem viatura"}
													{assignment.agent && ` • ${assignment.agent.name}`}
												</p>
												<p className="text-[11px] text-slate-500">
													Designado em {formatDateTime(assignment.assignedAt)}
												</p>
											</div>
											<StatusBadge
												label={assignmentStatus.label}
												className={assignmentStatus.className}
											/>
										</div>
									);
								})}
							</div>

							{!isClosed && (
								<form
									className="flex flex-col gap-3 border-slate-800 border-t pt-4 sm:flex-row"
									onSubmit={(event) => {
										event.preventDefault();
										if (!vehicleId && !agentUserId) {
											toast.error("Selecione uma viatura ou um agente");
											return;
										}
										createAssignment.mutate({
											id: occurrenceId,
											data: {
												vehicleId: vehicleId || undefined,
												agentUserId: agentUserId || undefined,
											},
										});
									}}
								>
									<select
										value={vehicleId}
										onChange={(event) => setVehicleId(event.target.value)}
										className="flex-1 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-300 text-sm outline-none focus:border-emerald-500"
									>
										<option value="">Viatura disponível...</option>
										{vehicles.data?.map((vehicle) => (
											<option key={vehicle.id} value={vehicle.id}>
												{vehicle.code} — {vehicle.plate}
											</option>
										))}
									</select>
									<select
										value={agentUserId}
										onChange={(event) => setAgentUserId(event.target.value)}
										className="flex-1 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-300 text-sm outline-none focus:border-emerald-500"
									>
										<option value="">Agente responsável...</option>
										{agents.data?.map((agent) => (
											<option key={agent.id} value={agent.id}>
												{agent.name}
											</option>
										))}
									</select>
									<button
										type="submit"
										disabled={createAssignment.isPending}
										className="rounded-lg bg-emerald-600 px-4 py-2.5 font-bold text-sm text-white transition-colors hover:bg-emerald-500 disabled:opacity-60"
									>
										Despachar
									</button>
								</form>
							)}
						</section>

						<section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
							<h3 className="mb-6 flex items-center gap-2 font-bold text-white">
								<Clock className="h-4 w-4 text-blue-500" />
								Cronologia da Operação
							</h3>

							<div className="space-y-3">
								{data.timelineEvents.length === 0 && (
									<p className="text-slate-500 text-sm">
										Nenhum evento registrado ainda.
									</p>
								)}
								{[...data.timelineEvents]
									.sort(
										(a, b) =>
											new Date(b.createdAt).getTime() -
											new Date(a.createdAt).getTime(),
									)
									.map((event, index) => (
										<div key={event.id} className="flex gap-4">
											<div className="flex flex-col items-center">
												<div
													className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-slate-900 ${
														index === 0
															? "bg-blue-600 text-white"
															: "bg-slate-800 text-slate-400"
													}`}
												>
													<Radio className="h-4 w-4" />
												</div>
												<div className="w-0.5 flex-1 bg-slate-800" />
											</div>
											<div className="mb-2 flex-1 rounded-xl border border-slate-800 bg-slate-950 p-4">
												<div className="mb-1 flex items-center justify-between">
													<h4 className="font-bold text-sm text-white">
														{TIMELINE_EVENT[event.type]}
													</h4>
													<time className="font-bold font-mono text-[10px] text-blue-400">
														{formatTime(event.createdAt)}
													</time>
												</div>
												<p className="text-slate-400 text-xs">
													{event.description}
												</p>
											</div>
										</div>
									))}
							</div>

							{!isClosed && (
								<form
									className="mt-4 flex gap-2 border-slate-800 border-t pt-4"
									onSubmit={(event) => {
										event.preventDefault();
										if (!note.trim()) return;
										createTimelineEvent.mutate({
											id: occurrenceId,
											data: { type: "agent_update", description: note.trim() },
										});
									}}
								>
									<input
										type="text"
										value={note}
										onChange={(event) => setNote(event.target.value)}
										placeholder="Registrar atualização da equipe..."
										className="flex-1 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 text-sm outline-none focus:border-blue-500"
									/>
									<button
										type="submit"
										disabled={createTimelineEvent.isPending}
										className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-bold text-sm text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
									>
										<Send className="h-4 w-4" /> Registrar
									</button>
								</form>
							)}
						</section>
					</div>

					<div className="space-y-6">
						<section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
							<h3 className="mb-4 font-bold text-sm text-white">
								Atualizar Status Tático
							</h3>
							<div className="space-y-3">
								<button
									type="button"
									disabled={isClosed || updateOccurrence.isPending}
									onClick={() =>
										updateOccurrence.mutate({
											id: occurrenceId,
											data: { status: "in_progress" },
										})
									}
									className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-bold text-white shadow-blue-900/20 shadow-lg transition-colors hover:bg-blue-500 disabled:opacity-40"
								>
									<MapPin className="h-4 w-4" /> Chegada no Local (QTR)
								</button>
								<button
									type="button"
									disabled={isClosed || closeOccurrence.isPending}
									onClick={() => closeOccurrence.mutate({ id: occurrenceId })}
									className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 py-3.5 font-bold text-emerald-500 transition-colors hover:bg-slate-800 disabled:opacity-40"
								>
									<CheckCircle className="h-4 w-4" /> Finalizar Ocorrência
								</button>
								{isClosed && (
									<p className="text-center text-[11px] text-slate-500">
										Ocorrência encerrada
										{data.closedAt && ` em ${formatDateTime(data.closedAt)}`}.
									</p>
								)}
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
