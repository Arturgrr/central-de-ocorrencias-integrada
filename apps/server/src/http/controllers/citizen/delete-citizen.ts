import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CitizenRepository } from "../../../database/repositories/citizen-repository";
import { requireRole } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";

export async function deleteCitizen(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		"/citizens/:id",
		{
			schema: {
				tags: ["Citizens"],
				summary: "Delete a citizen",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					204: z.null(),
					404: errorResponseSchema,
				},
			},
			preHandler: requireRole("admin"),
		},
		async (request, reply) => {
			const repo = new CitizenRepository();
			const row = await repo.delete(request.params.id);
			if (!row) throw NotFound("Citizen not found");
			return reply.status(204).send(null);
		},
	);
}
