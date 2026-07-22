import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CitizenRepository } from "../../../database/repositories/citizen-repository";
import { authenticate } from "../../../providers/auth";
import {
	booleanQueryParam,
	paginatedResponse,
	paginationQuerySchema,
} from "../../schemas/common";
import { citizenSchema, serializeCitizen } from "./schema";

export async function listCitizens(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/citizens",
		{
			schema: {
				tags: ["Citizens"],
				operationId: "listCitizens",
				summary: "List citizens",
				security: [{ cookieAuth: [] }],
				querystring: paginationQuerySchema.merge(
					z.object({
						q: z.string().optional(),
						city: z.string().optional(),
						isActive: booleanQueryParam.optional(),
					}),
				),
				response: {
					200: paginatedResponse(citizenSchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new CitizenRepository();
			const { q, city, isActive, page, pageSize } = request.query;
			const { items, total } = await repo.list({
				q,
				city,
				isActive,
				page,
				pageSize,
			});
			return {
				items: items.map(serializeCitizen),
				total,
				page,
				pageSize,
			};
		},
	);
}
