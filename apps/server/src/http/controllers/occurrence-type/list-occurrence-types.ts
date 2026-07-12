import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceTypeRepository } from "../../../database/repositories/occurrence-type-repository";
import { authenticate } from "../../../providers/auth";
import { booleanQueryParam } from "../../schemas/common";
import { occurrenceTypeSchema, serializeOccurrenceType } from "./schema";

export async function listOccurrenceTypes(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/occurrence-types",
		{
			schema: {
				tags: ["Occurrence Types"],
				summary: "List occurrence types",
				security: [{ cookieAuth: [] }],
				querystring: z.object({
					activeOnly: booleanQueryParam.optional(),
				}),
				response: {
					200: z.array(occurrenceTypeSchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceTypeRepository();
			const rows = await repo.findAll({ activeOnly: request.query.activeOnly });
			return rows.map(serializeOccurrenceType);
		},
	);
}
