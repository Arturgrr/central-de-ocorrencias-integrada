import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceRepository } from "../../../database/repositories/occurrence-repository";
import { authenticate } from "../../../providers/auth";
import {
	booleanQueryParam,
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
				operationId: "listOccurrences",
				summary: "List occurrences",
				security: [{ cookieAuth: [] }],
				querystring: paginationQuerySchema.merge(
					z.object({
						status: occurrenceStatusSchema.optional(),
						typeId: z.string().uuid().optional(),
						priority: occurrencePrioritySchema.optional(),
						citizenId: z.string().uuid().optional(),
						search: z.string().min(1).optional(),
						mine: booleanQueryParam.optional(),
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
			const {
				status,
				typeId,
				priority,
				citizenId,
				search,
				mine,
				page,
				pageSize,
			} = request.query;
			const { items, total } = await repo.list({
				status,
				typeId,
				priority,
				citizenId,
				search,
				openedByUserId: mine ? request.user?.id : undefined,
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
