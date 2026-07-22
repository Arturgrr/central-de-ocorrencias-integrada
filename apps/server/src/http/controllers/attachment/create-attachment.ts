import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceAttachmentRepository } from "../../../database/repositories/occurrence-attachment-repository";
import { authenticate } from "../../../providers/auth";
import { Unauthorized } from "../../error-handler";
import { idParamSchema } from "../../schemas/common";
import {
	attachmentSchema,
	createAttachmentBody,
	serializeAttachment,
} from "./schema";

export async function createAttachment(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/occurrences/:id/attachments",
		{
			schema: {
				tags: ["Attachments"],
				operationId: "createAttachment",
				summary: "Create an attachment for an occurrence",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: createAttachmentBody,
				response: {
					201: attachmentSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request, reply) => {
			if (!request.user) throw Unauthorized();
			const repo = new OccurrenceAttachmentRepository();
			const row = await repo.create({
				occurrenceId: request.params.id,
				uploadedByUserId: request.user.id,
				fileName: request.body.fileName,
				fileUrl: request.body.fileUrl,
				mimeType: request.body.mimeType,
				description: request.body.description,
			});
			return reply.status(201).send(serializeAttachment(row));
		},
	);
}
