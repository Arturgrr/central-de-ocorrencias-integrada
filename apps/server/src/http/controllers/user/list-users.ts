import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UserRepository } from "../../../database/repositories/user-repository";
import { requireRole } from "../../../providers/auth";
import { roleSchema } from "../../schemas/common";
import { publicUserSchema, serializePublicUser } from "./schema";

export async function listUsers(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/users",
		{
			schema: {
				tags: ["Users"],
				operationId: "listUsers",
				summary: "List users",
				security: [{ cookieAuth: [] }],
				querystring: z.object({
					role: roleSchema.optional(),
				}),
				response: {
					200: z.array(publicUserSchema),
				},
			},
			preHandler: requireRole("admin"),
		},
		async (request) => {
			const repo = new UserRepository();
			const rows = await repo.listByRole(request.query.role);
			return rows.map(serializePublicUser);
		},
	);
}
