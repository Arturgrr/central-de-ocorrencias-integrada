import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceTypeRepository } from "../../../database/repositories/occurrence-type-repository";
import { requireRole } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import {
	occurrenceTypeSchema,
	serializeOccurrenceType,
	updateOccurrenceTypeBody,
} from "./schema";

export async function updateOccurrenceType(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/occurrence-types/:id",
		{
			schema: {
				tags: ["Occurrence Types"],
				operationId: "updateOccurrenceType",
				summary: "Update an occurrence type",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: updateOccurrenceTypeBody,
				response: {
					200: occurrenceTypeSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: requireRole("admin"),
		},
		async (request) => {
			const repo = new OccurrenceTypeRepository();
			const row = await repo.update(request.params.id, request.body);
			if (!row) throw NotFound("Occurrence type not found");
			return serializeOccurrenceType(row);
		},
	);
}
