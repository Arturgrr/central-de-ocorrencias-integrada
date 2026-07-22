import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	Activity,
	AlertTriangle,
	Car,
	Clock,
	MapPin,
	Plus,
	Users,
} from "lucide-react";

import AppShell from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { useGetDashboardMetrics } from "@/gen/hooks/dashboard/useGetDashboardMetrics";
import { useListOccurrences } from "@/gen/hooks/occurrences/useListOccurrences";
import { useListVehicles } from "@/gen/hooks/vehicles/useListVehicles";
import { requireRole } from "@/lib/auth-client";
import {
	formatDuration,
	formatRelative,
	OCCURRENCE_PRIORITY,
	VEHICLE_STATUS,
} from "@/lib/coi";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: () => requireRole("admin", "attendant", "agent"),
	component: DashboardScreen,
});

function DashboardScreen() {
	const navigate = useNavigate();

	const metrics = useGetDashboardMetrics();
	const recent = useListOccurrences({ params: { page: 1, pageSize: 8 } });
	const vehicles = useListVehicles({ params: {} });

	const dispatched =
		vehicles.data?.filter((v) => v.status === "dispatched") ?? [];
	const located =
		recent.data?.items.filter((o) => o.latitude && o.longitude) ?? [];

	return (
		<AppShell
			title="Visão Geral da Operação"
			actions={
				<Link
					to="/novo-bo"
					className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-bold text-sm text-white shadow-blue-900/20 shadow-lg transition-colors hover:bg-blue-500"
				>
					<Plus className="h-4 w-4" /> Novo B.O.
				</Link>
			}
		>
			<div className="p-4 sm:p-8">
				<div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
					<MetricCard
						icon={<AlertTriangle className="h-5 w-5 text-blue-500" />}
						tone="blue"
						label="Ocorrências Ativas"
						value={metrics.data ? String(metrics.data.activeCount) : "—"}
					/>
					<MetricCard
						icon={<Users className="h-5 w-5 text-emerald-500" />}
						tone="emerald"
						label="Viaturas em Campo"
						value={metrics.data ? String(metrics.data.vehiclesInField) : "—"}
					/>
					<MetricCard
						icon={<Activity className="h-5 w-5 text-red-500" />}
						tone="red"
						label="Prioridade Alta"
						value={metrics.data ? String(metrics.data.highPriorityCount) : "—"}
					/>
					<MetricCard
						icon={<Clock className="h-5 w-5 text-amber-500" />}
						tone="amber"
						label="Tempo Médio"
						value={
							metrics.data
								? formatDuration(metrics.data.avgResolutionTimeMinutes)
								: "—"
						}
					/>
				</div>

				<div className="grid h-[500px] grid-cols-1 gap-6 xl:grid-cols-3">
					<div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 xl:col-span-2">
						<div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-1.5 backdrop-blur">
							<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
							<span className="font-bold text-white text-xs tracking-wider">
								MONITORAMENTO EM TEMPO REAL
							</span>
						</div>

						<div className="absolute top-4 right-4 z-10 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-[10px] text-slate-400 backdrop-blur">
							{located.length} ocorrência(s) georreferenciada(s) ·{" "}
							{dispatched.length} viatura(s) em campo
						</div>

						<div
							className="relative flex-1 bg-slate-800"
							style={{
								backgroundImage:
									"radial-gradient(#334155 1px, transparent 1px)",
								backgroundSize: "24px 24px",
							}}
						>
							{located.map((occurrence, index) => (
								<button
									type="button"
									key={occurrence.id}
									onClick={() =>
										navigate({
											to: "/detalhes-bo/$occurrenceId",
											params: { occurrenceId: occurrence.id },
										})
									}
									className="absolute flex flex-col items-center"
									style={{
										left: `${12 + ((index * 23) % 74)}%`,
										top: `${18 + ((index * 31) % 62)}%`,
									}}
									title={`${occurrence.protocol} — ${occurrence.title}`}
								>
									{occurrence.priority === "critical" && (
										<div className="absolute flex h-8 w-8 animate-ping items-center justify-center rounded-full bg-red-500/20" />
									)}
									<MapPin
										className={`relative z-10 h-6 w-6 ${
											occurrence.priority === "critical"
												? "text-red-500"
												: "text-blue-500"
										}`}
									/>
									<span className="mt-1 rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 font-bold text-[10px]">
										{occurrence.protocol.split("-").at(-1)}
									</span>
								</button>
							))}

							{dispatched.map((vehicle, index) => (
								<div
									key={vehicle.id}
									className="absolute flex flex-col items-center"
									style={{
										right: `${14 + ((index * 27) % 60)}%`,
										bottom: `${16 + ((index * 19) % 55)}%`,
									}}
								>
									<Car className="relative z-10 h-5 w-5 text-emerald-500" />
									<span className="mt-1 rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 font-bold text-[10px]">
										{vehicle.code}
									</span>
								</div>
							))}

							{!recent.isLoading && located.length === 0 && (
								<div className="flex h-full items-center justify-center text-slate-500 text-sm">
									Nenhuma ocorrência com coordenadas registradas.
								</div>
							)}
						</div>
					</div>

					<div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
						<div className="flex items-center justify-between border-slate-800 border-b bg-slate-900/50 p-4">
							<h3 className="font-semibold text-sm text-white">
								Ocorrências Recentes
							</h3>
							<Link
								to="/historico-bos"
								className="font-medium text-blue-500 text-xs hover:text-blue-400"
							>
								Ver Todas
							</Link>
						</div>

						<div className="flex-1 space-y-2 overflow-y-auto p-2">
							{recent.isLoading && (
								<p className="p-4 text-center text-slate-500 text-sm">
									Carregando ocorrências...
								</p>
							)}

							{recent.data?.items.length === 0 && (
								<p className="p-4 text-center text-slate-500 text-sm">
									Nenhuma ocorrência registrada.
								</p>
							)}

							{recent.data?.items.map((occurrence) => {
								const priority = OCCURRENCE_PRIORITY[occurrence.priority];
								return (
									<button
										type="button"
										key={occurrence.id}
										onClick={() =>
											navigate({
												to: "/detalhes-bo/$occurrenceId",
												params: { occurrenceId: occurrence.id },
											})
										}
										className={`group w-full cursor-pointer rounded-lg border bg-slate-950 p-3 text-left transition-colors ${
											occurrence.priority === "critical"
												? "border-red-500/30 hover:border-red-500/60"
												: "border-slate-800 hover:border-slate-700"
										}`}
									>
										<div className="mb-2 flex items-start justify-between">
											<StatusBadge
												label={priority.label}
												className={priority.className}
											/>
											<span className="flex items-center gap-1 text-[10px] text-slate-500">
												<Clock className="h-3 w-3" />
												{formatRelative(occurrence.openedAt)}
											</span>
										</div>
										<h4 className="mb-1 font-bold text-sm text-white transition-colors group-hover:text-blue-400">
											{occurrence.title}
										</h4>
										<p className="flex items-center gap-1 text-slate-400 text-xs">
											<MapPin className="h-3 w-3" /> {occurrence.addressLine}
										</p>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				<div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
					<h3 className="mb-4 font-bold text-sm text-white">
						Situação da Frota
					</h3>
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
						{vehicles.data?.map((vehicle) => {
							const status = VEHICLE_STATUS[vehicle.status];
							return (
								<div
									key={vehicle.id}
									className="rounded-lg border border-slate-800 bg-slate-950 p-3"
								>
									<div className="mb-2 flex items-center gap-2">
										<Car className="h-4 w-4 text-slate-400" />
										<span className="font-bold text-white tracking-wider">
											{vehicle.code}
										</span>
									</div>
									<StatusBadge
										label={status.label}
										className={status.className}
									/>
								</div>
							);
						})}
						{vehicles.data?.length === 0 && (
							<p className="text-slate-500 text-sm">
								Nenhuma viatura cadastrada.
							</p>
						)}
					</div>
				</div>
			</div>
		</AppShell>
	);
}

const TONES = {
	blue: "bg-blue-500/10 border-blue-500/20",
	emerald: "bg-emerald-500/10 border-emerald-500/20",
	red: "bg-red-500/10 border-red-500/20",
	amber: "bg-amber-500/10 border-amber-500/20",
} as const;

function MetricCard({
	icon,
	tone,
	label,
	value,
}: {
	icon: React.ReactNode;
	tone: keyof typeof TONES;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
			<div
				className={`flex h-10 w-10 items-center justify-center rounded-lg border ${TONES[tone]}`}
			>
				{icon}
			</div>
			<div>
				<p className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
					{label}
				</p>
				<p className="font-bold text-2xl text-white">{value}</p>
			</div>
		</div>
	);
}
