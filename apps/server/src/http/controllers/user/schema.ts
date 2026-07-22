import { z } from "zod";
import { roleSchema } from "../../schemas/common";

export const publicUserSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		email: z.string(),
		role: roleSchema,
		phone: z.string().nullable(),
		registrationNumber: z.string().nullable(),
		image: z.string().nullable(),
		createdAt: z.string(),
	})
	.meta({ id: "PublicUser" });

export const userRefSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		email: z.string(),
		role: roleSchema,
	})
	.meta({ id: "UserRef" });

type PublicUserRow = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "attendant" | "agent" | "citizen";
	phone: string | null;
	registrationNumber: string | null;
	image: string | null;
	createdAt: Date;
};

export function serializePublicUser(row: PublicUserRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
	};
}
