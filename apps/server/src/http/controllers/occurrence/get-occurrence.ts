import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceRepository } from "../../../database/repositories/occurrence-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { occurrenceDetailSchema, serializeOccurrenceDetail } from "./schema";

export async function getOccurrence(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/occurrences/:id",
		{
			schema: {
				tags: ["Occurrences"],
				summary: "Get an occurrence by id",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: occurrenceDetailSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceRepository();
			const row = await repo.findDetail(request.params.id);
			if (!row) throw NotFound("Occurrence not found");
			return serializeOccurrenceDetail(row);
		},
	);
}
