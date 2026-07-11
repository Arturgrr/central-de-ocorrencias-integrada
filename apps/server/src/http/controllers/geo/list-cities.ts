import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { CityRepository } from "../../../database/repositories/city-repository";
import { authenticate } from "../../../providers/auth";
import { citySchema, serializeCity } from "./schema";

export async function listCities(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/cities",
		{
			schema: {
				tags: ["Geo"],
				summary: "List cities",
				security: [{ cookieAuth: [] }],
				response: {
					200: z.array(citySchema),
				},
			},
			preHandler: authenticate,
		},
		async () => {
			const repo = new CityRepository();
			const rows = await repo.findAll();
			return rows.map(serializeCity);
		},
	);
}
