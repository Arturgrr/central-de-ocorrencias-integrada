import type { FastifyInstance } from "fastify";
import { createAttachment } from "../controllers/attachment/create-attachment";
import { listAttachments } from "../controllers/attachment/list-attachments";

export async function attachmentRoutes(app: FastifyInstance) {
	await app.register(listAttachments);
	await app.register(createAttachment);
}
