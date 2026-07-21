import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceTypeRepository } from "../../../database/repositories/occurrence-type-repository";
import { requireRole } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";

export async function deleteOccurrenceType(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		"/occurrence-types/:id",
		{
			schema: {
				tags: ["Occurrence Types"],
				summary: "Delete an occurrence type",
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
			const repo = new OccurrenceTypeRepository();
			const row = await repo.delete(request.params.id);
			if (!row) throw NotFound("Occurrence type not found");
			return reply.status(204).send(null);
		},
	);
}
