import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { VehicleRepository } from "../../../database/repositories/vehicle-repository";
import { requireRole } from "../../../providers/auth";
import { errorResponseSchema } from "../../schemas/common";
import { createVehicleBody, serializeVehicle, vehicleSchema } from "./schema";

export async function createVehicle(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/vehicles",
		{
			schema: {
				tags: ["Vehicles"],
				operationId: "createVehicle",
				summary: "Create a vehicle",
				security: [{ cookieAuth: [] }],
				body: createVehicleBody,
				response: {
					201: vehicleSchema,
					409: errorResponseSchema,
				},
			},
			preHandler: requireRole("admin"),
		},
		async (request, reply) => {
			const repo = new VehicleRepository();
			const row = await repo.create(request.body);
			return reply.status(201).send(serializeVehicle(row));
		},
	);
}
