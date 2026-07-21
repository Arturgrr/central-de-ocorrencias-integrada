import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { VehicleLocationRepository } from "../../../database/repositories/vehicle-location-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { serializeVehicleLocation, vehicleLocationSchema } from "./schema";

export async function getLatestVehicleLocation(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/vehicles/:id/location",
		{
			schema: {
				tags: ["Vehicles"],
				summary: "Get a vehicle's latest location",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: vehicleLocationSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new VehicleLocationRepository();
			const row = await repo.latestForVehicle(request.params.id);
			if (!row) throw NotFound("Vehicle location not found");
			return serializeVehicleLocation(row);
		},
	);
}
