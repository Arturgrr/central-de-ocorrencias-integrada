import { z } from "zod";

export const citizenSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	phone: z.string(),
	document: z.string().nullable(),
	addressLine: z.string().nullable(),
	neighborhood: z.string().nullable(),
	city: z.string().nullable(),
	state: z.string().nullable(),
	postalCode: z.string().nullable(),
	isActive: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const createCitizenBody = z.object({
	name: z.string().min(1),
	phone: z.string().min(1),
	document: z.string().optional(),
	addressLine: z.string().optional(),
	neighborhood: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	postalCode: z.string().optional(),
	isActive: z.boolean().optional(),
});

export const updateCitizenBody = createCitizenBody.partial();

type CitizenRow = {
	id: string;
	name: string;
	phone: string;
	document: string | null;
	addressLine: string | null;
	neighborhood: string | null;
	city: string | null;
	state: string | null;
	postalCode: string | null;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export function serializeCitizen(row: CitizenRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}
