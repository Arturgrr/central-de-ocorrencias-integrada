import { asc, eq } from "@eng-soft1/db";
import { vehicle } from "@eng-soft1/db/schema";
import db from "../database-service";

export type VehicleStatus =
	| "available"
	| "dispatched"
	| "maintenance"
	| "inactive";

export type NewVehicle = {
	code: string;
	plate: string;
	model?: string | null;
	status?: VehicleStatus;
};

export class VehicleRepository {
	async create(data: NewVehicle) {
		const [row] = await db.insert(vehicle).values(data).returning();
		if (!row) throw new Error("Failed to create vehicle");
		return row;
	}

	async findById(id: string) {
		return db.query.vehicle.findFirst({
			where: eq(vehicle.id, id),
		});
	}

	async findByCode(code: string) {
		return db.query.vehicle.findFirst({
			where: eq(vehicle.code, code),
		});
	}

	async findAll(opts?: { status?: VehicleStatus }) {
		const query = db.select().from(vehicle);
		if (opts?.status) {
			return query
				.where(eq(vehicle.status, opts.status))
				.orderBy(asc(vehicle.code));
		}
		return query.orderBy(asc(vehicle.code));
	}

	async update(id: string, data: Partial<NewVehicle>) {
		const [row] = await db
			.update(vehicle)
			.set(data)
			.where(eq(vehicle.id, id))
			.returning();
		return row;
	}

	async setStatus(id: string, status: VehicleStatus) {
		const [row] = await db
			.update(vehicle)
			.set({ status })
			.where(eq(vehicle.id, id))
			.returning();
		return row;
	}

	async delete(id: string) {
		const [row] = await db
			.delete(vehicle)
			.where(eq(vehicle.id, id))
			.returning();
		return row;
	}
}
