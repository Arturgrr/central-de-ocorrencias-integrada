import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { NeighborhoodRepository } from "../../../database/repositories/neighborhood-repository";
import { authenticate } from "../../../providers/auth";
import { neighborhoodSchema, serializeNeighborhood } from "./schema";

export async function listNeighborhoods(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/neighborhoods",
		{
			schema: {
				tags: ["Geo"],
				summary: "List neighborhoods",
				security: [{ cookieAuth: [] }],
				querystring: z.object({
					cityId: z.string().uuid().optional(),
				}),
				response: {
					200: z.array(neighborhoodSchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new NeighborhoodRepository();
			const rows = await repo.findAll({ cityId: request.query.cityId });
			return rows.map(serializeNeighborhood);
		},
	);
}
