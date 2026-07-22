import { and, asc, count, desc, eq, ilike, sql } from "@eng-soft1/db";
import { occurrence, occurrenceAttachment } from "@eng-soft1/db/schema";
import db from "../database-service";

export type AttachmentKind = "image" | "video" | "document";

export type ListAllAttachmentsOptions = {
	kind?: AttachmentKind;
	search?: string;
	page: number;
	pageSize: number;
};

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

	async listAll(opts: ListAllAttachmentsOptions) {
		const filters = [];
		if (opts.kind === "image") {
			filters.push(ilike(occurrenceAttachment.mimeType, "image/%"));
		}
		if (opts.kind === "video") {
			filters.push(ilike(occurrenceAttachment.mimeType, "video/%"));
		}
		if (opts.kind === "document") {
			filters.push(
				sql`${occurrenceAttachment.mimeType} not ilike 'image/%' and ${occurrenceAttachment.mimeType} not ilike 'video/%'`,
			);
		}
		if (opts.search) {
			filters.push(ilike(occurrenceAttachment.fileName, `%${opts.search}%`));
		}
		const where = filters.length > 0 ? and(...filters) : undefined;

		const [rows, [totalRow]] = await Promise.all([
			db
				.select({
					id: occurrenceAttachment.id,
					occurrenceId: occurrenceAttachment.occurrenceId,
					uploadedByUserId: occurrenceAttachment.uploadedByUserId,
					fileName: occurrenceAttachment.fileName,
					fileUrl: occurrenceAttachment.fileUrl,
					mimeType: occurrenceAttachment.mimeType,
					description: occurrenceAttachment.description,
					createdAt: occurrenceAttachment.createdAt,
					occurrenceProtocol: occurrence.protocol,
					occurrenceTitle: occurrence.title,
				})
				.from(occurrenceAttachment)
				.innerJoin(
					occurrence,
					eq(occurrence.id, occurrenceAttachment.occurrenceId),
				)
				.where(where)
				.limit(opts.pageSize)
				.offset((opts.page - 1) * opts.pageSize)
				.orderBy(desc(occurrenceAttachment.createdAt)),
			db.select({ value: count() }).from(occurrenceAttachment).where(where),
		]);

		return { items: rows, total: totalRow?.value ?? 0 };
	}

	async countByKind() {
		const [row] = await db
			.select({
				total: count(),
				images: sql<number>`count(*) filter (where ${occurrenceAttachment.mimeType} ilike 'image/%')::int`,
				videos: sql<number>`count(*) filter (where ${occurrenceAttachment.mimeType} ilike 'video/%')::int`,
				documents: sql<number>`count(*) filter (where ${occurrenceAttachment.mimeType} not ilike 'image/%' and ${occurrenceAttachment.mimeType} not ilike 'video/%')::int`,
			})
			.from(occurrenceAttachment);

		return {
			total: row?.total ?? 0,
			images: Number(row?.images ?? 0),
			videos: Number(row?.videos ?? 0),
			documents: Number(row?.documents ?? 0),
		};
	}
}
