import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { NeighborhoodRepository } from "../../../database/repositories/neighborhood-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { neighborhoodSchema, serializeNeighborhood } from "./schema";

export async function getNeighborhood(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/neighborhoods/:id",
		{
			schema: {
				tags: ["Geo"],
				summary: "Get a neighborhood by id",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: neighborhoodSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new NeighborhoodRepository();
			const row = await repo.findById(request.params.id);
			if (!row) throw NotFound("Neighborhood not found");
			return serializeNeighborhood(row);
		},
	);
}
