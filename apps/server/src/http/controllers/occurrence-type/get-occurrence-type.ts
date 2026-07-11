import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceTypeRepository } from "../../../database/repositories/occurrence-type-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { occurrenceTypeSchema, serializeOccurrenceType } from "./schema";

export async function getOccurrenceType(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/occurrence-types/:id",
		{
			schema: {
				tags: ["Occurrence Types"],
				summary: "Get an occurrence type by id",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: occurrenceTypeSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceTypeRepository();
			const row = await repo.findById(request.params.id);
			if (!row) throw NotFound("Occurrence type not found");
			return serializeOccurrenceType(row);
		},
	);
}
