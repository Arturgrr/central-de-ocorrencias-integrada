import { asc, eq } from "@eng-soft1/db";
import { occurrenceType } from "@eng-soft1/db/schema";
import db from "../database-service";

export type NewOccurrenceType = {
	name: string;
	description?: string | null;
	priority?: number;
	isActive?: boolean;
};

export class OccurrenceTypeRepository {
	async create(data: NewOccurrenceType) {
		const [row] = await db.insert(occurrenceType).values(data).returning();
		if (!row) throw new Error("Failed to create occurrence type");
		return row;
	}

	async findById(id: string) {
		return db.query.occurrenceType.findFirst({
			where: eq(occurrenceType.id, id),
		});
	}

	async findAll(opts?: { activeOnly?: boolean }) {
		const query = db.select().from(occurrenceType);
		if (opts?.activeOnly) {
			return query
				.where(eq(occurrenceType.isActive, true))
				.orderBy(asc(occurrenceType.name));
		}
		return query.orderBy(asc(occurrenceType.name));
	}

	async update(id: string, data: Partial<NewOccurrenceType>) {
		const [row] = await db
			.update(occurrenceType)
			.set(data)
			.where(eq(occurrenceType.id, id))
			.returning();
		return row;
	}

	async delete(id: string) {
		const [row] = await db
			.delete(occurrenceType)
			.where(eq(occurrenceType.id, id))
			.returning();
		return row;
	}
}
