import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { CitizenRepository } from "../../../database/repositories/citizen-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { citizenSchema, serializeCitizen, updateCitizenBody } from "./schema";

export async function updateCitizen(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/citizens/:id",
		{
			schema: {
				tags: ["Citizens"],
				operationId: "updateCitizen",
				summary: "Update a citizen",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: updateCitizenBody,
				response: {
					200: citizenSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new CitizenRepository();
			const row = await repo.update(request.params.id, request.body);
			if (!row) throw NotFound("Citizen not found");
			return serializeCitizen(row);
		},
	);
}
