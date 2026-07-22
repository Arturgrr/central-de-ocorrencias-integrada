import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Calendar, Eye, FileText, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import AppShell from "@/components/app-shell";
import Pagination from "@/components/pagination";
import { StatusBadge } from "@/components/status-badge";
import { useListOccurrences } from "@/gen/hooks/occurrences/useListOccurrences";
import { useListOccurrenceTypes } from "@/gen/hooks/occurrenceTypes/useListOccurrenceTypes";
import { requireRole } from "@/lib/auth-client";
import {
	formatDateTime,
	OCCURRENCE_PRIORITY,
	OCCURRENCE_STATUS,
	type OccurrenceStatus,
} from "@/lib/coi";

const PAGE_SIZE = 10;

const searchSchema = z.object({
	page: z.coerce.number().int().min(1).optional(),
	status: z
		.enum(["open", "dispatched", "in_progress", "resolved", "cancelled"])
		.optional(),
	typeId: z.string().uuid().optional(),
	search: z.string().optional(),
});

export const Route = createFileRoute("/historico-bos")({
	beforeLoad: () => requireRole("admin", "attendant", "agent"),
	validateSearch: searchSchema,
	component: HistoricoBosScreen,
});

function HistoricoBosScreen() {
	const navigate = useNavigate({ from: "/historico-bos" });
	const { page = 1, status, typeId, search } = Route.useSearch();

	const [searchInput, setSearchInput] = useState(search ?? "");

	useEffect(() => {
		const timeout = setTimeout(() => {
			if ((search ?? "") === searchInput) return;
			navigate({
				search: (prev) => ({
					...prev,
					search: searchInput || undefined,
					page: undefined,
				}),
			});
		}, 400);

		return () => clearTimeout(timeout);
	}, [searchInput, search, navigate]);

	const types = useListOccurrenceTypes({ params: {} });
	const occurrences = useListOccurrences({
		params: { page, pageSize: PAGE_SIZE, status, typeId, search },
	});

	function setFilter(patch: Record<string, string | undefined>) {
		navigate({ search: (prev) => ({ ...prev, ...patch, page: undefined }) });
	}

	return (
		<AppShell title="Arquivo de Ocorrências">
			<div className="p-4 sm:p-8">
				<div className="mb-6 flex items-center gap-4 border-slate-800 border-b pb-6">
					<FileText className="h-7 w-7 text-blue-500" />
					<div>
						<h1 className="font-bold text-white text-xl tracking-wide">
							Gestão e Auditoria de B.O.s
						</h1>
						<p className="mt-1 font-semibold text-slate-500 text-sm uppercase tracking-wider">
							{occurrences.data?.total ?? 0} registro(s) encontrado(s)
						</p>
					</div>
				</div>

				<div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 lg:flex-row">
					<div className="relative flex-1">
						<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
						<input
							type="text"
							value={searchInput}
							onChange={(event) => setSearchInput(event.target.value)}
							placeholder="Buscar por protocolo, título ou endereço..."
							className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 pl-9 text-slate-200 text-sm outline-none transition-colors focus:border-blue-500"
						/>
					</div>

					<div className="flex gap-4">
						<select
							value={status ?? ""}
							onChange={(event) =>
								setFilter({ status: event.target.value || undefined })
							}
							className="w-44 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-300 text-sm outline-none focus:border-blue-500"
						>
							<option value="">Todos os Status</option>
							{Object.entries(OCCURRENCE_STATUS).map(([value, badge]) => (
								<option key={value} value={value}>
									{badge.label}
								</option>
							))}
						</select>

						<select
							value={typeId ?? ""}
							onChange={(event) =>
								setFilter({ typeId: event.target.value || undefined })
							}
							className="w-52 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-300 text-sm outline-none focus:border-blue-500"
						>
							<option value="">Todas as Categorias</option>
							{types.data?.map((type) => (
								<option key={type.id} value={type.id}>
									{type.name}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-left">
							<thead>
								<tr className="border-slate-800 border-b bg-slate-950/50 font-bold text-[10px] text-slate-500 uppercase tracking-wider">
									<th className="p-4">Protocolo</th>
									<th className="p-4">Data e Hora</th>
									<th className="p-4">Ocorrência</th>
									<th className="p-4">Endereço</th>
									<th className="p-4">Prioridade</th>
									<th className="p-4">Status</th>
									<th className="p-4 text-center">Ações</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-800/50 text-sm">
								{occurrences.isLoading && (
									<tr>
										<td colSpan={7} className="p-8 text-center text-slate-500">
											Carregando registros...
										</td>
									</tr>
								)}

								{occurrences.data?.items.length === 0 && (
									<tr>
										<td colSpan={7} className="p-8 text-center text-slate-500">
											Nenhuma ocorrência encontrada com os filtros atuais.
										</td>
									</tr>
								)}

								{occurrences.data?.items.map((occurrence) => (
									<OccurrenceRow key={occurrence.id} occurrence={occurrence} />
								))}
							</tbody>
						</table>
					</div>

					<Pagination
						page={page}
						pageSize={PAGE_SIZE}
						total={occurrences.data?.total ?? 0}
						onPageChange={(next) =>
							navigate({ search: (prev) => ({ ...prev, page: next }) })
						}
					/>
				</div>
			</div>
		</AppShell>
	);
}

function OccurrenceRow({
	occurrence,
}: {
	occurrence: {
		id: string;
		protocol: string;
		openedAt: string;
		title: string;
		addressLine: string;
		priority: keyof typeof OCCURRENCE_PRIORITY;
		status: OccurrenceStatus;
	};
}) {
	const navigate = useNavigate();
	const status = OCCURRENCE_STATUS[occurrence.status];
	const priority = OCCURRENCE_PRIORITY[occurrence.priority];

	return (
		<tr className="group transition-colors hover:bg-slate-800/20">
			<td className="p-4 font-bold font-mono text-slate-300">
				{occurrence.protocol}
			</td>
			<td className="p-4">
				<div className="flex items-center gap-2 text-slate-400">
					<Calendar className="h-3.5 w-3.5" />{" "}
					{formatDateTime(occurrence.openedAt)}
				</div>
			</td>
			<td className="p-4 font-semibold text-white">{occurrence.title}</td>
			<td className="p-4">
				<div className="flex items-center gap-2 text-slate-400">
					<MapPin className="h-3.5 w-3.5" /> {occurrence.addressLine}
				</div>
			</td>
			<td className="p-4">
				<StatusBadge label={priority.label} className={priority.className} />
			</td>
			<td className="p-4">
				<StatusBadge label={status.label} className={status.className} />
			</td>
			<td className="p-4 text-center">
				<button
					type="button"
					onClick={() =>
						navigate({
							to: "/detalhes-bo/$occurrenceId",
							params: { occurrenceId: occurrence.id },
						})
					}
					className="p-1 text-slate-500 transition-colors hover:text-blue-500"
					title="Ver detalhes"
				>
					<Eye className="h-5 w-5" />
				</button>
			</td>
		</tr>
	);
}
