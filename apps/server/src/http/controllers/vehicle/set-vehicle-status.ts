import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { VehicleRepository } from "../../../database/repositories/vehicle-repository";
import { requireRole } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import {
	serializeVehicle,
	setVehicleStatusBody,
	vehicleSchema,
} from "./schema";

export async function setVehicleStatus(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().patch(
		"/vehicles/:id/status",
		{
			schema: {
				tags: ["Vehicles"],
				operationId: "setVehicleStatus",
				summary: "Update a vehicle's status",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: setVehicleStatusBody,
				response: {
					200: vehicleSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: requireRole("admin"),
		},
		async (request) => {
			const repo = new VehicleRepository();
			const row = await repo.setStatus(request.params.id, request.body.status);
			if (!row) throw NotFound("Vehicle not found");
			return serializeVehicle(row);
		},
	);
}
