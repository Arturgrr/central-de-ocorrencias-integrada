import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceAttachmentRepository } from "../../../database/repositories/occurrence-attachment-repository";
import { authenticate } from "../../../providers/auth";
import { paginatedResponse, paginationQuerySchema } from "../../schemas/common";
import {
	attachmentKindSchema,
	mediaAttachmentSchema,
	serializeMediaAttachment,
} from "./schema";

export async function listMedia(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/attachments",
		{
			schema: {
				tags: ["Attachments"],
				operationId: "listMedia",
				summary: "List every attachment of the media library",
				security: [{ cookieAuth: [] }],
				querystring: paginationQuerySchema.merge(
					z.object({
						kind: attachmentKindSchema.optional(),
						search: z.string().min(1).optional(),
					}),
				),
				response: {
					200: paginatedResponse(mediaAttachmentSchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceAttachmentRepository();
			const { kind, search, page, pageSize } = request.query;
			const { items, total } = await repo.listAll({
				kind,
				search,
				page,
				pageSize,
			});
			return {
				items: items.map(serializeMediaAttachment),
				total,
				page,
				pageSize,
			};
		},
	);
}
