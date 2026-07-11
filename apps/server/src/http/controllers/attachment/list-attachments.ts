import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceAttachmentRepository } from "../../../database/repositories/occurrence-attachment-repository";
import { authenticate } from "../../../providers/auth";
import { idParamSchema } from "../../schemas/common";
import { attachmentSchema, serializeAttachment } from "./schema";

export async function listAttachments(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/occurrences/:id/attachments",
		{
			schema: {
				tags: ["Attachments"],
				summary: "List attachments for an occurrence",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: z.array(attachmentSchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceAttachmentRepository();
			const rows = await repo.findByOccurrenceId(request.params.id);
			return rows.map(serializeAttachment);
		},
	);
}
