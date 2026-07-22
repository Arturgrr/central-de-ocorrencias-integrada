import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceRepository } from "../../../database/repositories/occurrence-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import {
	occurrenceSummarySchema,
	serializeOccurrenceSummary,
	updateOccurrenceBody,
} from "./schema";

export async function updateOccurrence(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/occurrences/:id",
		{
			schema: {
				tags: ["Occurrences"],
				operationId: "updateOccurrence",
				summary: "Update an occurrence",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: updateOccurrenceBody,
				response: {
					200: occurrenceSummarySchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceRepository();
			const { latitude, longitude, ...rest } = request.body;
			const row = await repo.update(request.params.id, {
				...rest,
				...(latitude !== undefined
					? { latitude: latitude === null ? null : String(latitude) }
					: {}),
				...(longitude !== undefined
					? { longitude: longitude === null ? null : String(longitude) }
					: {}),
			});
			if (!row) throw NotFound("Occurrence not found");
			return serializeOccurrenceSummary(row);
		},
	);
}
