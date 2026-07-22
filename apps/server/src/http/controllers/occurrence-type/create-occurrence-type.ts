import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceTypeRepository } from "../../../database/repositories/occurrence-type-repository";
import { requireRole } from "../../../providers/auth";
import { errorResponseSchema } from "../../schemas/common";
import {
	createOccurrenceTypeBody,
	occurrenceTypeSchema,
	serializeOccurrenceType,
} from "./schema";

export async function createOccurrenceType(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/occurrence-types",
		{
			schema: {
				tags: ["Occurrence Types"],
				operationId: "createOccurrenceType",
				summary: "Create an occurrence type",
				security: [{ cookieAuth: [] }],
				body: createOccurrenceTypeBody,
				response: {
					201: occurrenceTypeSchema,
					409: errorResponseSchema,
				},
			},
			preHandler: requireRole("admin"),
		},
		async (request, reply) => {
			const repo = new OccurrenceTypeRepository();
			const row = await repo.create(request.body);
			return reply.status(201).send(serializeOccurrenceType(row));
		},
	);
}
