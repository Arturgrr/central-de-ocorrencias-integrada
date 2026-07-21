import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceRepository } from "../../../database/repositories/occurrence-repository";
import { authenticate } from "../../../providers/auth";
import {
	occurrencePrioritySchema,
	occurrenceStatusSchema,
	paginatedResponse,
	paginationQuerySchema,
} from "../../schemas/common";
import { occurrenceSummarySchema, serializeOccurrenceSummary } from "./schema";

export async function listOccurrences(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/occurrences",
		{
			schema: {
				tags: ["Occurrences"],
				summary: "List occurrences",
				security: [{ cookieAuth: [] }],
				querystring: paginationQuerySchema.merge(
					z.object({
						status: occurrenceStatusSchema.optional(),
						typeId: z.string().uuid().optional(),
						priority: occurrencePrioritySchema.optional(),
					}),
				),
				response: {
					200: paginatedResponse(occurrenceSummarySchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceRepository();
			const { status, typeId, priority, page, pageSize } = request.query;
			const { items, total } = await repo.list({
				status,
				typeId,
				priority,
				page,
				pageSize,
			});
			return {
				items: items.map(serializeOccurrenceSummary),
				total,
				page,
				pageSize,
			};
		},
	);
}
