import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { VehicleLocationRepository } from "../../../database/repositories/vehicle-location-repository";
import { VehicleRepository } from "../../../database/repositories/vehicle-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound, Unauthorized } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import {
	reportVehicleLocationBody,
	serializeVehicleLocation,
	vehicleLocationSchema,
} from "./schema";

export async function reportVehicleLocation(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/vehicles/:id/locations",
		{
			schema: {
				tags: ["Vehicles"],
				operationId: "reportVehicleLocation",
				summary: "Report a vehicle's location",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: reportVehicleLocationBody,
				response: {
					201: vehicleLocationSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request, reply) => {
			const userId = request.user?.id;
			if (!userId) throw Unauthorized();

			const vehicleRepo = new VehicleRepository();
			const vehicle = await vehicleRepo.findById(request.params.id);
			if (!vehicle) throw NotFound("Vehicle not found");

			const repo = new VehicleLocationRepository();
			const row = await repo.record({
				vehicleId: request.params.id,
				latitude: request.body.latitude,
				longitude: request.body.longitude,
				reportedByUserId: userId,
			});
			return reply.status(201).send(serializeVehicleLocation(row));
		},
	);
}
