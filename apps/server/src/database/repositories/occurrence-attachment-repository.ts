import { asc, eq } from "@eng-soft1/db";
import { occurrenceAttachment } from "@eng-soft1/db/schema";
import db from "../database-service";

export type NewOccurrenceAttachment = {
	occurrenceId: string;
	uploadedByUserId?: string | null;
	fileName: string;
	fileUrl: string;
	mimeType: string;
	description?: string | null;
};

export class OccurrenceAttachmentRepository {
	async create(data: NewOccurrenceAttachment) {
		const [row] = await db
			.insert(occurrenceAttachment)
			.values(data)
			.returning();
		if (!row) throw new Error("Failed to create attachment");
		return row;
	}

	async findByOccurrenceId(occurrenceId: string) {
		return db
			.select()
			.from(occurrenceAttachment)
			.where(eq(occurrenceAttachment.occurrenceId, occurrenceId))
			.orderBy(asc(occurrenceAttachment.createdAt));
	}
}
