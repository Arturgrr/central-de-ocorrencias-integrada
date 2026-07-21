import { and, count, desc, eq, sql } from "@eng-soft1/db";
import { occurrence } from "@eng-soft1/db/schema";
import db from "../database-service";

type OccurrenceStatus =
	| "open"
	| "dispatched"
	| "in_progress"
	| "resolved"
	| "cancelled";
type OccurrencePriority = "low" | "medium" | "high" | "critical";

export type NewOccurrence = {
	protocol: string;
	typeId: string;
	openedByUserId: string;
	title: string;
	addressLine: string;
	citizenId?: string | null;
	description?: string | null;
	priority?: OccurrencePriority;
	cityId?: string | null;
	neighborhoodId?: string | null;
	latitude?: string | null;
	longitude?: string | null;
};

export type UpdateOccurrence = {
	title?: string;
	description?: string | null;
	priority?: OccurrencePriority;
	status?: OccurrenceStatus;
	addressLine?: string;
	cityId?: string | null;
	neighborhoodId?: string | null;
	latitude?: string | null;
	longitude?: string | null;
	citizenId?: string | null;
	typeId?: string;
};

export type ListOccurrencesOptions = {
	status?: OccurrenceStatus;
	typeId?: string;
	priority?: OccurrencePriority;
	page: number;
	pageSize: number;
};

export class OccurrenceRepository {
	async create(data: NewOccurrence) {
		const [row] = await db.insert(occurrence).values(data).returning();
		if (!row) throw new Error("Failed to create occurrence");
		return row;
	}

	async nextProtocolNumber() {
		const result = await db.execute<{ nextval: string }>(
			sql`select nextval('occurrence_protocol_seq') as nextval`,
		);
		return Number(result.rows[0]?.nextval ?? 0);
	}

	async findSummaryById(id: string) {
		return db.query.occurrence.findFirst({
			where: eq(occurrence.id, id),
		});
	}

	async findDetail(id: string) {
		return db.query.occurrence.findFirst({
			where: eq(occurrence.id, id),
			with: {
				citizen: true,
				type: true,
				city: true,
				neighborhood: true,
				openedBy: true,
				closedBy: true,
				assignments: {
					with: {
						vehicle: true,
						agent: true,
					},
				},
				timelineEvents: true,
				attachments: true,
			},
		});
	}

	async list(opts: ListOccurrencesOptions) {
		const filters = [];
		if (opts.status) {
			filters.push(eq(occurrence.status, opts.status));
		}
		if (opts.typeId) {
			filters.push(eq(occurrence.typeId, opts.typeId));
		}
		if (opts.priority) {
			filters.push(eq(occurrence.priority, opts.priority));
		}
		const where = filters.length > 0 ? and(...filters) : undefined;

		const [rows, [totalRow]] = await Promise.all([
			db
				.select()
				.from(occurrence)
				.where(where)
				.limit(opts.pageSize)
				.offset((opts.page - 1) * opts.pageSize)
				.orderBy(desc(occurrence.openedAt)),
			db.select({ value: count() }).from(occurrence).where(where),
		]);
		return { items: rows, total: totalRow?.value ?? 0 };
	}

	async update(id: string, data: UpdateOccurrence) {
		const [row] = await db
			.update(occurrence)
			.set(data)
			.where(eq(occurrence.id, id))
			.returning();
		return row;
	}

	async close(id: string, userId: string) {
		const [row] = await db
			.update(occurrence)
			.set({
				status: "resolved",
				closedAt: new Date(),
				closedByUserId: userId,
			})
			.where(eq(occurrence.id, id))
			.returning();
		return row;
	}

	async delete(id: string) {
		const [row] = await db
			.delete(occurrence)
			.where(eq(occurrence.id, id))
			.returning();
		return row;
	}
}
