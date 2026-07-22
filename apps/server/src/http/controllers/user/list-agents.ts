import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UserRepository } from "../../../database/repositories/user-repository";
import { authenticate } from "../../../providers/auth";
import { publicUserSchema, serializePublicUser } from "./schema";

export async function listAgents(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/agents",
		{
			schema: {
				tags: ["Users"],
				operationId: "listAgents",
				summary: "List agents",
				security: [{ cookieAuth: [] }],
				response: {
					200: z.array(publicUserSchema),
				},
			},
			preHandler: authenticate,
		},
		async () => {
			const repo = new UserRepository();
			const rows = await repo.listAgents();
			return rows.map(serializePublicUser);
		},
	);
}
