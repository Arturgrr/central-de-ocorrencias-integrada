import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Car, Plus, Search, Shield, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import AppShell from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { useListAgents } from "@/gen/hooks/users/useListAgents";
import { useCreateVehicle } from "@/gen/hooks/vehicles/useCreateVehicle";
import {
	listVehiclesQueryKey,
	useListVehicles,
} from "@/gen/hooks/vehicles/useListVehicles";
import { useSetVehicleStatus } from "@/gen/hooks/vehicles/useSetVehicleStatus";
import { requireRole } from "@/lib/auth-client";
import { VEHICLE_STATUS, type VehicleStatus } from "@/lib/coi";

export const Route = createFileRoute("/equipes")({
	beforeLoad: () => requireRole("admin", "attendant"),
	component: EquipesScreen,
});

function EquipesScreen() {
	const queryClient = useQueryClient();
	const [plateFilter, setPlateFilter] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const [newVehicle, setNewVehicle] = useState({
		code: "",
		plate: "",
		model: "",
	});

	const vehicles = useListVehicles({ params: {} });
	const agents = useListAgents();

	function invalidateVehicles() {
		queryClient.invalidateQueries({ queryKey: listVehiclesQueryKey() });
	}

	const createVehicle = useCreateVehicle({
		mutation: {
			onSuccess: () => {
				setNewVehicle({ code: "", plate: "", model: "" });
				setIsCreating(false);
				toast.success("Viatura cadastrada");
				invalidateVehicles();
			},
		},
	});

	const setVehicleStatus = useSetVehicleStatus({
		mutation: {
			onSuccess: () => {
				toast.success("Status da viatura atualizado");
				invalidateVehicles();
			},
		},
	});

	const filtered = (vehicles.data ?? []).filter((vehicle) => {
		const term = plateFilter.trim().toLowerCase();
		if (!term) return true;
		return (
			vehicle.plate.toLowerCase().includes(term) ||
			vehicle.code.toLowerCase().includes(term)
		);
	});

	return (
		<AppShell
			title="Viaturas & Agentes"
			actions={
				<button
					type="button"
					onClick={() => setIsCreating((value) => !value)}
					className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-bold text-sm text-white shadow-emerald-900/20 shadow-lg transition-colors hover:bg-emerald-500"
				>
					<Plus className="h-4 w-4" /> Nova Viatura
				</button>
			}
		>
			<div className="p-4 sm:p-8">
				{isCreating && (
					<form
						className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-emerald-500/20 bg-slate-900 p-5 sm:grid-cols-4"
						onSubmit={(event) => {
							event.preventDefault();
							createVehicle.mutate({
								data: {
									code: newVehicle.code.trim(),
									plate: newVehicle.plate.trim().toUpperCase(),
									model: newVehicle.model.trim() || undefined,
								},
							});
						}}
					>
						<input
							required
							value={newVehicle.code}
							onChange={(event) =>
								setNewVehicle((v) => ({ ...v, code: event.target.value }))
							}
							placeholder="Prefixo (ex: VTR-42)"
							className={inputClass}
						/>
						<input
							required
							value={newVehicle.plate}
							onChange={(event) =>
								setNewVehicle((v) => ({ ...v, plate: event.target.value }))
							}
							placeholder="Placa"
							className={inputClass}
						/>
						<input
							value={newVehicle.model}
							onChange={(event) =>
								setNewVehicle((v) => ({ ...v, model: event.target.value }))
							}
							placeholder="Modelo / cor"
							className={inputClass}
						/>
						<button
							type="submit"
							disabled={createVehicle.isPending}
							className="rounded-lg bg-emerald-600 px-4 py-2.5 font-bold text-sm text-white transition-colors hover:bg-emerald-500 disabled:opacity-60"
						>
							{createVehicle.isPending ? "Salvando..." : "Cadastrar"}
						</button>
					</form>
				)}

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-2">
						<div className="flex items-center justify-between">
							<h3 className="font-bold text-lg text-white">
								Frota ({filtered.length})
							</h3>
							<div className="relative">
								<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
								<input
									type="text"
									value={plateFilter}
									onChange={(event) => setPlateFilter(event.target.value)}
									placeholder="Buscar por placa ou prefixo..."
									className="w-56 rounded-lg border border-slate-800 bg-slate-900 py-1.5 pr-4 pl-9 text-slate-200 text-sm placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{vehicles.isLoading && (
								<p className="text-slate-500 text-sm">Carregando frota...</p>
							)}
							{!vehicles.isLoading && filtered.length === 0 && (
								<p className="text-slate-500 text-sm">
									Nenhuma viatura encontrada.
								</p>
							)}

							{filtered.map((vehicle) => {
								const status = VEHICLE_STATUS[vehicle.status];
								return (
									<div
										key={vehicle.id}
										className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-emerald-500/50"
									>
										<div className="mb-4 flex items-start justify-between">
											<div className="flex items-center gap-3">
												<div
													className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
														vehicle.status === "dispatched"
															? "border-blue-500/20 bg-blue-500/10"
															: "border-slate-700 bg-slate-800"
													}`}
												>
													<Car
														className={`h-5 w-5 ${
															vehicle.status === "dispatched"
																? "text-blue-400"
																: "text-slate-500"
														}`}
													/>
												</div>
												<div>
													<p className="font-bold text-white tracking-wider">
														{vehicle.code}
													</p>
													<StatusBadge
														label={status.label}
														className={status.className}
													/>
												</div>
											</div>
										</div>

										<div className="mb-4 space-y-2">
											<div className="flex justify-between text-sm">
												<span className="font-semibold text-[11px] text-slate-500 uppercase">
													Placa
												</span>
												<span className="font-bold font-mono text-slate-300">
													{vehicle.plate}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="font-semibold text-[11px] text-slate-500 uppercase">
													Veículo
												</span>
												<span className="text-slate-300">
													{vehicle.model ?? "—"}
												</span>
											</div>
										</div>

										<div className="border-slate-800 border-t pt-4">
											<span className="mb-2 block font-bold text-[10px] text-slate-500 uppercase tracking-wider">
												Alterar Status
											</span>
											<select
												value={vehicle.status}
												disabled={setVehicleStatus.isPending}
												onChange={(event) =>
													setVehicleStatus.mutate({
														id: vehicle.id,
														data: {
															status: event.target.value as VehicleStatus,
														},
													})
												}
												className={inputClass}
											>
												{Object.entries(VEHICLE_STATUS).map(
													([value, badge]) => (
														<option key={value} value={value}>
															{badge.label}
														</option>
													),
												)}
											</select>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<div className="space-y-6">
						<h3 className="font-bold text-lg text-white">
							Efetivo ({agents.data?.length ?? 0})
						</h3>

						<div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
							<div className="flex items-center justify-between border-slate-800 border-b bg-slate-900/50 p-3">
								<span className="font-bold text-slate-500 text-xs uppercase tracking-wider">
									Agente
								</span>
								<span className="font-bold text-slate-500 text-xs uppercase tracking-wider">
									Matrícula
								</span>
							</div>

							<div className="flex-1 space-y-2 overflow-y-auto p-2">
								{agents.data?.length === 0 && (
									<p className="p-4 text-center text-slate-500 text-sm">
										Nenhum agente cadastrado.
									</p>
								)}
								{agents.data?.map((agent) => (
									<div
										key={agent.id}
										className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3 transition-colors hover:border-slate-700"
									>
										<div className="flex items-center gap-3">
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400">
												<Shield className="h-4 w-4" />
											</div>
											<div>
												<p className="font-bold text-sm text-white">
													{agent.name}
												</p>
												<p className="text-[11px] text-slate-500">
													{agent.email}
												</p>
											</div>
										</div>
										<span className="font-mono text-slate-400 text-xs">
											{agent.registrationNumber ?? "—"}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
							<div className="mb-2 flex items-center gap-2">
								<User className="h-4 w-4 text-slate-500" />
								<p className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">
									Novos agentes
								</p>
							</div>
							<p className="text-slate-500 text-xs leading-relaxed">
								Agentes se cadastram pelo portal público e são promovidos por um
								administrador após a validação da matrícula funcional.
							</p>
						</div>
					</div>
				</div>
			</div>
		</AppShell>
	);
}

const inputClass =
	"w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 text-sm outline-none transition-colors focus:border-emerald-500";
