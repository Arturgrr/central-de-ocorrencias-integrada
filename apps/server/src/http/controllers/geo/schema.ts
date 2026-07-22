import { z } from "zod";

export const citySchema = z
	.object({
		id: z.string().uuid(),
		name: z.string(),
		state: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	})
	.meta({ id: "City" });

export const neighborhoodSchema = z
	.object({
		id: z.string().uuid(),
		cityId: z.string().uuid(),
		name: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	})
	.meta({ id: "Neighborhood" });

type CityRow = {
	id: string;
	name: string;
	state: string;
	createdAt: Date;
	updatedAt: Date;
};

type NeighborhoodRow = {
	id: string;
	cityId: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};

export function serializeCity(row: CityRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

export function serializeNeighborhood(row: NeighborhoodRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}
