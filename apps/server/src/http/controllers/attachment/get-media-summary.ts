import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceAttachmentRepository } from "../../../database/repositories/occurrence-attachment-repository";
import { authenticate } from "../../../providers/auth";
import { mediaSummarySchema } from "./schema";

export async function getMediaSummary(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/attachments/summary",
		{
			schema: {
				tags: ["Attachments"],
				operationId: "getMediaSummary",
				summary: "Count attachments grouped by kind",
				security: [{ cookieAuth: [] }],
				response: {
					200: mediaSummarySchema,
				},
			},
			preHandler: authenticate,
		},
		async () => {
			const repo = new OccurrenceAttachmentRepository();
			return repo.countByKind();
		},
	);
}
