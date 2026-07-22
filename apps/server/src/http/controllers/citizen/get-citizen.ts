import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { CitizenRepository } from "../../../database/repositories/citizen-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { citizenSchema, serializeCitizen } from "./schema";

export async function getCitizen(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/citizens/:id",
		{
			schema: {
				tags: ["Citizens"],
				operationId: "getCitizen",
				summary: "Get a citizen by id",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: citizenSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new CitizenRepository();
			const row = await repo.findById(request.params.id);
			if (!row) throw NotFound("Citizen not found");
			return serializeCitizen(row);
		},
	);
}
