import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceRepository } from "../../../database/repositories/occurrence-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound, Unauthorized } from "../../error-handler";
import { errorResponseSchema, idParamSchema } from "../../schemas/common";
import { occurrenceSummarySchema, serializeOccurrenceSummary } from "./schema";

export async function closeOccurrence(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().patch(
		"/occurrences/:id/close",
		{
			schema: {
				tags: ["Occurrences"],
				summary: "Close an occurrence",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: occurrenceSummarySchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const user = request.user;
			if (!user) throw Unauthorized();

			const repo = new OccurrenceRepository();
			const row = await repo.close(request.params.id, user.id);
			if (!row) throw NotFound("Occurrence not found");
			return serializeOccurrenceSummary(row);
		},
	);
}
