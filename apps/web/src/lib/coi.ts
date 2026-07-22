export type { AssignmentStatus } from "@/gen/types/AssignmentStatus";
export type { OccurrencePriority } from "@/gen/types/OccurrencePriority";
export type { OccurrenceStatus } from "@/gen/types/OccurrenceStatus";
export type { TimelineEventType } from "@/gen/types/TimelineEventType";
export type { VehicleStatus } from "@/gen/types/VehicleStatus";

import type { AssignmentStatus } from "@/gen/types/AssignmentStatus";
import type { OccurrencePriority } from "@/gen/types/OccurrencePriority";
import type { OccurrenceStatus } from "@/gen/types/OccurrenceStatus";
import type { Role } from "@/gen/types/Role";
import type { TimelineEventType } from "@/gen/types/TimelineEventType";
import type { VehicleStatus } from "@/gen/types/VehicleStatus";

export type UserRole = Role;

type Badge = { label: string; className: string };

export const OCCURRENCE_STATUS: Record<OccurrenceStatus, Badge> = {
	open: {
		label: "Pendente",
		className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	},
	dispatched: {
		label: "Despachado",
		className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
	},
	in_progress: {
		label: "Em Andamento",
		className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
	},
	resolved: {
		label: "Finalizado",
		className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
	},
	cancelled: {
		label: "Cancelado",
		className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
	},
};

export const OCCURRENCE_PRIORITY: Record<OccurrencePriority, Badge> = {
	low: {
		label: "Baixa",
		className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
	},
	medium: {
		label: "Média",
		className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	},
	high: {
		label: "Atenção",
		className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
	},
	critical: {
		label: "Crítico",
		className: "bg-red-500/10 text-red-500 border-red-500/20",
	},
};

export const VEHICLE_STATUS: Record<VehicleStatus, Badge> = {
	available: {
		label: "Na Base",
		className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
	},
	dispatched: {
		label: "Em Patrulha",
		className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	},
	maintenance: {
		label: "Manutenção",
		className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
	},
	inactive: {
		label: "Inativa",
		className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
	},
};

export const ASSIGNMENT_STATUS: Record<AssignmentStatus, Badge> = {
	assigned: {
		label: "Designado",
		className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	},
	accepted: {
		label: "A Caminho",
		className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
	},
	arrived: {
		label: "No Local",
		className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
	},
	completed: {
		label: "Concluído",
		className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
	},
	cancelled: {
		label: "Cancelado",
		className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
	},
};

export const TIMELINE_EVENT: Record<TimelineEventType, string> = {
	created: "Chamado Recebido",
	status_changed: "Status Atualizado",
	vehicle_dispatched: "Viatura Acionada",
	agent_update: "Atualização do Agente",
	photo_uploaded: "Evidência Anexada",
	closed: "Ocorrência Encerrada",
};

export const USER_ROLE: Record<UserRole, string> = {
	admin: "Administrador",
	attendant: "Atendente",
	agent: "Agente",
	citizen: "Cidadão",
};

export function homeRouteForRole(role: UserRole) {
	return role === "citizen" ? "/portal-cidadao" : "/dashboard";
}

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
	day: "2-digit",
	month: "short",
	hour: "2-digit",
	minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
	day: "2-digit",
	month: "long",
	year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
	hour: "2-digit",
	minute: "2-digit",
});

export function formatDateTime(iso: string) {
	return dateTimeFormatter.format(new Date(iso));
}

export function formatDate(iso: string) {
	return dateFormatter.format(new Date(iso));
}

export function formatTime(iso: string) {
	return timeFormatter.format(new Date(iso));
}

export function formatRelative(iso: string) {
	const diffMs = Date.now() - new Date(iso).getTime();
	const minutes = Math.round(diffMs / 60_000);

	if (minutes < 1) return "agora";
	if (minutes < 60) return `${minutes} min atrás`;

	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours} h atrás`;

	const days = Math.round(hours / 24);
	return `${days} d atrás`;
}

export function formatDuration(minutes: number) {
	if (!minutes || minutes <= 0) return "—";
	const totalSeconds = Math.round(minutes * 60);
	const h = Math.floor(totalSeconds / 3600);
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = totalSeconds % 60;
	return h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
}

export function formatFileSize(bytes: number) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
	if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
	return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
}

export function attachmentKind(mimeType: string) {
	if (mimeType.startsWith("image/")) return "image" as const;
	if (mimeType.startsWith("video/")) return "video" as const;
	return "document" as const;
}

export function fileExtension(fileName: string) {
	const parts = fileName.split(".");
	return parts.length > 1 ? `.${parts[parts.length - 1]?.toUpperCase()}` : "";
}
