import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { UserRepository } from "../../../database/repositories/user-repository";
import { authenticate } from "../../../providers/auth";
import { Unauthorized } from "../../error-handler";
import { errorResponseSchema } from "../../schemas/common";
import { publicUserSchema, serializePublicUser } from "./schema";

export async function getMe(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/me",
		{
			schema: {
				tags: ["Users"],
				operationId: "getMe",
				summary: "Get the authenticated user profile",
				security: [{ cookieAuth: [] }],
				response: {
					200: publicUserSchema,
					401: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			if (!request.user) throw Unauthorized();
			const repo = new UserRepository();
			const row = await repo.findById(request.user.id);
			if (!row) throw Unauthorized();
			return serializePublicUser(row);
		},
	);
}
