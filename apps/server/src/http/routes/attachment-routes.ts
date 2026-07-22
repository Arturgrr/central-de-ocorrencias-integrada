import type { FastifyInstance } from "fastify";
import { createAttachment } from "../controllers/attachment/create-attachment";
import { getMediaSummary } from "../controllers/attachment/get-media-summary";
import { listAttachments } from "../controllers/attachment/list-attachments";
import { listMedia } from "../controllers/attachment/list-media";

export async function attachmentRoutes(app: FastifyInstance) {
	await app.register(listAttachments);
	await app.register(createAttachment);
	await app.register(listMedia);
	await app.register(getMediaSummary);
}
