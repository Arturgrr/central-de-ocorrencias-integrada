import { z } from "zod";

export const occurrenceTypeSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string().nullable(),
	priority: z.number().int(),
	isActive: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const createOccurrenceTypeBody = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	priority: z.number().int().min(1).max(5).optional(),
	isActive: z.boolean().optional(),
});

export const updateOccurrenceTypeBody = createOccurrenceTypeBody.partial();

type OccurrenceTypeRow = {
	id: string;
	name: string;
	description: string | null;
	priority: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export function serializeOccurrenceType(row: OccurrenceTypeRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}
