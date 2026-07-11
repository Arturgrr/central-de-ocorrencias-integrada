import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { VehicleRepository } from "../../../database/repositories/vehicle-repository";
import { requireRole } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { serializeVehicle, updateVehicleBody, vehicleSchema } from "./schema";

export async function updateVehicle(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/vehicles/:id",
		{
			schema: {
				tags: ["Vehicles"],
				summary: "Update a vehicle",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: updateVehicleBody,
				response: {
					200: vehicleSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: requireRole("admin"),
		},
		async (request) => {
			const repo = new VehicleRepository();
			const row = await repo.update(request.params.id, request.body);
			if (!row) throw NotFound("Vehicle not found");
			return serializeVehicle(row);
		},
	);
}
