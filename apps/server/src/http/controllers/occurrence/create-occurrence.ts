import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceRepository } from "../../../database/repositories/occurrence-repository";
import { authenticate } from "../../../providers/auth";
import { Unauthorized } from "../../error-handler";
import { errorResponseSchema } from "../../schemas/common";
import {
	createOccurrenceBody,
	occurrenceSummarySchema,
	serializeOccurrenceSummary,
} from "./schema";

export async function createOccurrence(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/occurrences",
		{
			schema: {
				tags: ["Occurrences"],
				operationId: "createOccurrence",
				summary: "Create an occurrence",
				security: [{ cookieAuth: [] }],
				body: createOccurrenceBody,
				response: {
					201: occurrenceSummarySchema,
					409: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request, reply) => {
			const user = request.user;
			if (!user) throw Unauthorized();

			const repo = new OccurrenceRepository();
			const seq = await repo.nextProtocolNumber();
			const protocol = `COI-${new Date().getFullYear()}-${String(seq).padStart(
				5,
				"0",
			)}`;

			const { latitude, longitude, ...rest } = request.body;
			const row = await repo.create({
				...rest,
				protocol,
				openedByUserId: user.id,
				latitude: latitude !== undefined ? String(latitude) : undefined,
				longitude: longitude !== undefined ? String(longitude) : undefined,
			});

			return reply.status(201).send(serializeOccurrenceSummary(row));
		},
	);
}
