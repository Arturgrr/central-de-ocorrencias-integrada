import { asc, eq } from "@eng-soft1/db";
import { occurrenceTimelineEvent } from "@eng-soft1/db/schema";
import db from "../database-service";

export type NewOccurrenceTimelineEvent = {
	occurrenceId: string;
	createdByUserId?: string | null;
	type:
		| "created"
		| "status_changed"
		| "vehicle_dispatched"
		| "agent_update"
		| "photo_uploaded"
		| "closed";
	description: string;
	metadata?: string | null;
};

export class OccurrenceTimelineRepository {
	async create(data: NewOccurrenceTimelineEvent) {
		const [row] = await db
			.insert(occurrenceTimelineEvent)
			.values(data)
			.returning();
		if (!row) throw new Error("Failed to create timeline event");
		return row;
	}

	async findByOccurrenceId(occurrenceId: string) {
		return db
			.select()
			.from(occurrenceTimelineEvent)
			.where(eq(occurrenceTimelineEvent.occurrenceId, occurrenceId))
			.orderBy(asc(occurrenceTimelineEvent.createdAt));
	}
}
