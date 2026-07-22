import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileText, MapPin, Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCreateCitizen } from "@/gen/hooks/citizens/useCreateCitizen";
import { useListCities } from "@/gen/hooks/geo/useListCities";
import { useListNeighborhoods } from "@/gen/hooks/geo/useListNeighborhoods";
import { useCreateOccurrence } from "@/gen/hooks/occurrences/useCreateOccurrence";
import { useListOccurrenceTypes } from "@/gen/hooks/occurrenceTypes/useListOccurrenceTypes";
import { useCreateTimelineEvent } from "@/gen/hooks/timeline/useCreateTimelineEvent";
import { requireRole } from "@/lib/auth-client";
import { OCCURRENCE_PRIORITY, type OccurrencePriority } from "@/lib/coi";

export const Route = createFileRoute("/novo-bo")({
	beforeLoad: () => requireRole("admin", "attendant"),
	component: NovaOcorrenciaScreen,
});

function NovaOcorrenciaScreen() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		citizenName: "",
		citizenPhone: "",
		typeId: "",
		title: "",
		addressLine: "",
		description: "",
		priority: "medium" as OccurrencePriority,
		cityId: "",
		neighborhoodId: "",
		latitude: "",
		longitude: "",
	});

	const types = useListOccurrenceTypes({ params: { activeOnly: "true" } });
	const cities = useListCities();
	const neighborhoods = useListNeighborhoods({
		params: form.cityId ? { cityId: form.cityId } : {},
	});

	const createCitizen = useCreateCitizen();
	const createOccurrence = useCreateOccurrence();
	const createTimelineEvent = useCreateTimelineEvent();

	const isSubmitting =
		createCitizen.isPending ||
		createOccurrence.isPending ||
		createTimelineEvent.isPending;

	function update<K extends keyof typeof form>(
		field: K,
		value: (typeof form)[K],
	) {
		setForm((current) => ({ ...current, [field]: value }));
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		try {
			let citizenId: string | undefined;
			if (form.citizenName.trim() && form.citizenPhone.trim()) {
				const citizen = await createCitizen.mutateAsync({
					data: {
						name: form.citizenName.trim(),
						phone: form.citizenPhone.trim(),
					},
				});
				citizenId = citizen.id;
			}

			const occurrence = await createOccurrence.mutateAsync({
				data: {
					typeId: form.typeId,
					title: form.title.trim(),
					addressLine: form.addressLine.trim(),
					description: form.description.trim() || undefined,
					priority: form.priority,
					citizenId,
					cityId: form.cityId || undefined,
					neighborhoodId: form.neighborhoodId || undefined,
					latitude: form.latitude ? Number(form.latitude) : undefined,
					longitude: form.longitude ? Number(form.longitude) : undefined,
				},
			});

			await createTimelineEvent.mutateAsync({
				id: occurrence.id,
				data: {
					type: "created",
					description: "Ocorrência registrada pela central de atendimento.",
				},
			});

			toast.success(`Ocorrência ${occurrence.protocol} registrada`);
			navigate({
				to: "/detalhes-bo/$occurrenceId",
				params: { occurrenceId: occurrence.id },
			});
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Falha ao registrar a ocorrência",
			);
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 p-4 font-sans text-slate-200 sm:p-8">
			<form className="mx-auto max-w-5xl" onSubmit={handleSubmit}>
				<div className="mb-8 flex items-center justify-between border-slate-800 border-b pb-4">
					<div>
						<h1 className="flex items-center gap-3 font-bold text-2xl text-white tracking-wide">
							<FileText className="h-8 w-8 text-blue-500" />
							NOVO REGISTRO DE OCORRÊNCIA
						</h1>
						<p className="mt-1 font-semibold text-slate-500 text-sm uppercase tracking-wider">
							Preencha os dados do chamado para despacho imediato
						</p>
					</div>
					<button
						type="button"
						onClick={() => navigate({ to: "/dashboard" })}
						className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-500 transition-colors hover:text-white"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
						<h3 className="flex items-center gap-2 border-slate-800 border-b pb-2 font-bold text-white">
							<span className="h-2 w-2 rounded-full bg-blue-500" />
							Informações do Solicitante
						</h3>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<Field label="Nome do Solicitante">
								<input
									type="text"
									value={form.citizenName}
									onChange={(event) =>
										update("citizenName", event.target.value)
									}
									className={inputClass}
									placeholder="Ex: João da Silva"
								/>
							</Field>
							<Field label="Telefone / Contato">
								<input
									type="text"
									value={form.citizenPhone}
									onChange={(event) =>
										update("citizenPhone", event.target.value)
									}
									className={inputClass}
									placeholder="(00) 00000-0000"
								/>
							</Field>
						</div>

						<h3 className="flex items-center gap-2 border-slate-800 border-b pt-4 pb-2 font-bold text-white">
							<span className="h-2 w-2 rounded-full bg-red-500" />
							Dados da Ocorrência
						</h3>

						<div className="space-y-4">
							<Field label="Tipo de Emergência">
								<select
									required
									value={form.typeId}
									onChange={(event) => update("typeId", event.target.value)}
									className={inputClass}
								>
									<option value="">Selecione a categoria...</option>
									{types.data?.map((type) => (
										<option key={type.id} value={type.id}>
											{type.name}
										</option>
									))}
								</select>
							</Field>

							<Field label="Título do Chamado">
								<input
									type="text"
									required
									value={form.title}
									onChange={(event) => update("title", event.target.value)}
									className={inputClass}
									placeholder="Ex: Deslizamento de terra em encosta"
								/>
							</Field>

							<Field label="Prioridade">
								<select
									value={form.priority}
									onChange={(event) =>
										update("priority", event.target.value as OccurrencePriority)
									}
									className={inputClass}
								>
									{Object.entries(OCCURRENCE_PRIORITY).map(([value, badge]) => (
										<option key={value} value={value}>
											{badge.label}
										</option>
									))}
								</select>
							</Field>

							<Field label="Endereço da Ocorrência">
								<div className="relative">
									<MapPin className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
									<input
										type="text"
										required
										value={form.addressLine}
										onChange={(event) =>
											update("addressLine", event.target.value)
										}
										className={`${inputClass} pl-9`}
										placeholder="Rua, Número, Referência..."
									/>
								</div>
							</Field>

							<Field label="Descrição Detalhada">
								<textarea
									value={form.description}
									onChange={(event) =>
										update("description", event.target.value)
									}
									className={`${inputClass} h-32 resize-none`}
									placeholder="Descreva os detalhes da situação de forma clara e objetiva..."
								/>
							</Field>
						</div>
					</div>

					<div className="space-y-6">
						<div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
							<h3 className="flex items-center gap-2 border-slate-800 border-b pb-2 font-bold text-white">
								<MapPin className="h-4 w-4 text-emerald-500" />
								Georreferenciamento
							</h3>

							<Field label="Município">
								<select
									value={form.cityId}
									onChange={(event) => {
										update("cityId", event.target.value);
										update("neighborhoodId", "");
									}}
									className={inputClass}
								>
									<option value="">Selecione o município...</option>
									{cities.data?.map((city) => (
										<option key={city.id} value={city.id}>
											{city.name} / {city.state}
										</option>
									))}
								</select>
							</Field>

							<Field label="Bairro">
								<select
									value={form.neighborhoodId}
									onChange={(event) =>
										update("neighborhoodId", event.target.value)
									}
									disabled={!form.cityId}
									className={`${inputClass} disabled:opacity-50`}
								>
									<option value="">Selecione o bairro...</option>
									{neighborhoods.data?.map((neighborhood) => (
										<option key={neighborhood.id} value={neighborhood.id}>
											{neighborhood.name}
										</option>
									))}
								</select>
							</Field>

							<div className="grid grid-cols-2 gap-4">
								<Field label="Latitude">
									<input
										type="number"
										step="any"
										value={form.latitude}
										onChange={(event) => update("latitude", event.target.value)}
										className={inputClass}
										placeholder="-19.8261"
									/>
								</Field>
								<Field label="Longitude">
									<input
										type="number"
										step="any"
										value={form.longitude}
										onChange={(event) =>
											update("longitude", event.target.value)
										}
										className={inputClass}
										placeholder="-43.1739"
									/>
								</Field>
							</div>

							<p className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-[11px] text-slate-500 leading-relaxed">
								As coordenadas alimentam o mapa tático do painel de controle.
								Ocorrências sem coordenadas continuam válidas, mas não aparecem
								no monitoramento em tempo real.
							</p>
						</div>

						<div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
							<h3 className="mb-3 font-bold text-white">
								Evidências Multimídia
							</h3>
							<p className="text-slate-500 text-sm leading-relaxed">
								As fotos, vídeos e laudos são anexados na tela de detalhes do
								B.O., já vinculados ao protocolo gerado — inclusive pelo agente
								em campo.
							</p>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-bold text-white shadow-blue-900/20 shadow-lg transition-colors hover:bg-blue-500 disabled:opacity-60"
						>
							<Send className="h-4 w-4" />
							{isSubmitting ? "Registrando..." : "Registrar e Abrir Ocorrência"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

const inputClass =
	"w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 text-sm outline-none transition-colors focus:border-blue-500";

function Field({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: controle aninhado via children
		<label className="block space-y-1.5">
			<span className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">
				{label}
			</span>
			{children}
		</label>
	);
}
