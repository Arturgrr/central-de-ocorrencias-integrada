import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { VehicleRepository } from "../../../database/repositories/vehicle-repository";
import { authenticate } from "../../../providers/auth";
import { vehicleStatusSchema } from "../../schemas/common";
import { serializeVehicle, vehicleSchema } from "./schema";

export async function listVehicles(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/vehicles",
		{
			schema: {
				tags: ["Vehicles"],
				summary: "List vehicles",
				security: [{ cookieAuth: [] }],
				querystring: z.object({
					status: vehicleStatusSchema.optional(),
				}),
				response: {
					200: z.array(vehicleSchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new VehicleRepository();
			const rows = await repo.findAll({ status: request.query.status });
			return rows.map(serializeVehicle);
		},
	);
}
