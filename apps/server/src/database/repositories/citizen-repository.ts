import { and, count, desc, eq, ilike, or } from "@eng-soft1/db";
import { citizen } from "@eng-soft1/db/schema";
import db from "../database-service";

export type NewCitizen = {
	name: string;
	phone: string;
	document?: string | null;
	addressLine?: string | null;
	neighborhood?: string | null;
	city?: string | null;
	state?: string | null;
	postalCode?: string | null;
	isActive?: boolean;
};

export type ListCitizensOptions = {
	q?: string;
	city?: string;
	isActive?: boolean;
	page: number;
	pageSize: number;
};

export class CitizenRepository {
	async create(data: NewCitizen) {
		const [row] = await db.insert(citizen).values(data).returning();
		if (!row) throw new Error("Failed to create citizen");
		return row;
	}

	async findById(id: string) {
		return db.query.citizen.findFirst({
			where: eq(citizen.id, id),
		});
	}

	async list(opts: ListCitizensOptions) {
		const filters = [];
		if (opts.q) {
			filters.push(
				or(
					ilike(citizen.name, `%${opts.q}%`),
					ilike(citizen.phone, `%${opts.q}%`),
					ilike(citizen.document, `%${opts.q}%`),
				),
			);
		}
		if (opts.city) {
			filters.push(ilike(citizen.city, `%${opts.city}%`));
		}
		if (opts.isActive !== undefined) {
			filters.push(eq(citizen.isActive, opts.isActive));
		}
		const where = filters.length > 0 ? and(...filters) : undefined;

		const [rows, [totalRow]] = await Promise.all([
			db
				.select()
				.from(citizen)
				.where(where)
				.limit(opts.pageSize)
				.offset((opts.page - 1) * opts.pageSize)
				.orderBy(desc(citizen.createdAt)),
			db.select({ value: count() }).from(citizen).where(where),
		]);
		return { items: rows, total: totalRow?.value ?? 0 };
	}

	async update(id: string, data: Partial<NewCitizen>) {
		const [row] = await db
			.update(citizen)
			.set(data)
			.where(eq(citizen.id, id))
			.returning();
		return row;
	}

	async delete(id: string) {
		const [row] = await db
			.delete(citizen)
			.where(eq(citizen.id, id))
			.returning();
		return row;
	}
}
