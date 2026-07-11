import { z } from "zod";

export const roleSchema = z.enum(["admin", "attendant", "agent", "citizen"]);
export const occurrenceStatusSchema = z.enum([
	"open",
	"dispatched",
	"in_progress",
	"resolved",
	"cancelled",
]);
export const occurrencePrioritySchema = z.enum([
	"low",
	"medium",
	"high",
	"critical",
]);
export const assignmentStatusSchema = z.enum([
	"assigned",
	"accepted",
	"arrived",
	"completed",
	"cancelled",
]);
export const timelineEventTypeSchema = z.enum([
	"created",
	"status_changed",
	"vehicle_dispatched",
	"agent_update",
	"photo_uploaded",
	"closed",
]);
export const vehicleStatusSchema = z.enum([
	"available",
	"dispatched",
	"maintenance",
	"inactive",
]);

export const idParamSchema = z.object({ id: z.string().uuid() });

export const paginationQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export function paginatedResponse<T extends z.ZodTypeAny>(item: T) {
	return z.object({
		items: z.array(item),
		total: z.number().int(),
		page: z.number().int(),
		pageSize: z.number().int(),
	});
}

export const errorResponseSchema = z.object({
	message: z.string(),
	code: z.string().optional(),
});
