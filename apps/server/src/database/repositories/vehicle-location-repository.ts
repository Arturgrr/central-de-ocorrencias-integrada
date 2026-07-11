import { desc, eq } from "@eng-soft1/db";
import { vehicleLocation } from "@eng-soft1/db/schema";
import db from "../database-service";

export type NewVehicleLocation = {
	vehicleId: string;
	latitude: number;
	longitude: number;
	reportedByUserId?: string | null;
};

export class VehicleLocationRepository {
	async record(data: NewVehicleLocation) {
		const [row] = await db
			.insert(vehicleLocation)
			.values({
				vehicleId: data.vehicleId,
				latitude: String(data.latitude),
				longitude: String(data.longitude),
				reportedByUserId: data.reportedByUserId ?? null,
			})
			.returning();
		if (!row) throw new Error("Failed to record vehicle location");
		return row;
	}

	async latestForVehicle(vehicleId: string) {
		return db.query.vehicleLocation.findFirst({
			where: eq(vehicleLocation.vehicleId, vehicleId),
			orderBy: desc(vehicleLocation.recordedAt),
		});
	}
}
