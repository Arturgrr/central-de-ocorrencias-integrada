import { z } from "zod";
import { timelineEventTypeSchema } from "../../schemas/common";

export const timelineEventSchema = z
	.object({
		id: z.string().uuid(),
		occurrenceId: z.string().uuid(),
		createdByUserId: z.string().nullable(),
		type: timelineEventTypeSchema,
		description: z.string(),
		metadata: z.string().nullable(),
		createdAt: z.string(),
	})
	.meta({ id: "TimelineEvent" });

export const createTimelineEventBody = z
	.object({
		type: timelineEventTypeSchema,
		description: z.string().min(1),
		metadata: z.string().optional(),
	})
	.meta({ id: "CreateTimelineEvent" });

type TimelineEventRow = {
	id: string;
	occurrenceId: string;
	createdByUserId: string | null;
	type:
		| "created"
		| "status_changed"
		| "vehicle_dispatched"
		| "agent_update"
		| "photo_uploaded"
		| "closed";
	description: string;
	metadata: string | null;
	createdAt: Date;
};

export function serializeTimelineEvent(row: TimelineEventRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
	};
}
