import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { CityRepository } from "../../../database/repositories/city-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { citySchema, serializeCity } from "./schema";

export async function getCity(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/cities/:id",
		{
			schema: {
				tags: ["Geo"],
				summary: "Get a city by id",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: citySchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new CityRepository();
			const row = await repo.findById(request.params.id);
			if (!row) throw NotFound("City not found");
			return serializeCity(row);
		},
	);
}
