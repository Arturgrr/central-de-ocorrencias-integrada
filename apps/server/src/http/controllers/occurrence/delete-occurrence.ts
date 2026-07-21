import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceRepository } from "../../../database/repositories/occurrence-repository";
import { requireRole } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";

export async function deleteOccurrence(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		"/occurrences/:id",
		{
			schema: {
				tags: ["Occurrences"],
				summary: "Delete an occurrence",
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
			const repo = new OccurrenceRepository();
			const row = await repo.delete(request.params.id);
			if (!row) throw NotFound("Occurrence not found");
			return reply.status(204).send(null);
		},
	);
}
