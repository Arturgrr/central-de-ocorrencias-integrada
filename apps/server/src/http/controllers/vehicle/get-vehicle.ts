import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { VehicleRepository } from "../../../database/repositories/vehicle-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { serializeVehicle, vehicleSchema } from "./schema";

export async function getVehicle(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/vehicles/:id",
		{
			schema: {
				tags: ["Vehicles"],
				summary: "Get a vehicle by id",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: vehicleSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new VehicleRepository();
			const row = await repo.findById(request.params.id);
			if (!row) throw NotFound("Vehicle not found");
			return serializeVehicle(row);
		},
	);
}
