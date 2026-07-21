import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { CitizenRepository } from "../../../database/repositories/citizen-repository";
import { authenticate } from "../../../providers/auth";
import { errorResponseSchema } from "../../schemas/common";
import { citizenSchema, createCitizenBody, serializeCitizen } from "./schema";

export async function createCitizen(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/citizens",
		{
			schema: {
				tags: ["Citizens"],
				summary: "Create a citizen",
				security: [{ cookieAuth: [] }],
				body: createCitizenBody,
				response: {
					201: citizenSchema,
					409: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request, reply) => {
			const repo = new CitizenRepository();
			const row = await repo.create(request.body);
			return reply.status(201).send(serializeCitizen(row));
		},
	);
}
