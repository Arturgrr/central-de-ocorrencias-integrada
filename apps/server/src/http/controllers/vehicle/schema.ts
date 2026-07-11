import { z } from "zod";
import { vehicleStatusSchema } from "../../schemas/common";

export const vehicleSchema = z.object({
	id: z.string().uuid(),
	code: z.string(),
	plate: z.string(),
	model: z.string().nullable(),
	status: vehicleStatusSchema,
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const vehicleLocationSchema = z.object({
	id: z.string().uuid(),
	vehicleId: z.string().uuid(),
	latitude: z.string(),
	longitude: z.string(),
	reportedByUserId: z.string().nullable(),
	recordedAt: z.string(),
});

export const createVehicleBody = z.object({
	code: z.string().min(1),
	plate: z.string().min(1),
	model: z.string().optional(),
	status: vehicleStatusSchema.optional(),
});

export const updateVehicleBody = createVehicleBody.partial();

export const setVehicleStatusBody = z.object({
	status: vehicleStatusSchema,
});

export const reportVehicleLocationBody = z.object({
	latitude: z.number(),
	longitude: z.number(),
});

type VehicleRow = {
	id: string;
	code: string;
	plate: string;
	model: string | null;
	status: "available" | "dispatched" | "maintenance" | "inactive";
	createdAt: Date;
	updatedAt: Date;
};

export function serializeVehicle(row: VehicleRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

type VehicleLocationRow = {
	id: string;
	vehicleId: string;
	latitude: string;
	longitude: string;
	reportedByUserId: string | null;
	recordedAt: Date;
};

export function serializeVehicleLocation(row: VehicleLocationRow) {
	return {
		...row,
		recordedAt: row.recordedAt.toISOString(),
	};
}
