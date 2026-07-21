import { z } from "zod";

export const attachmentSchema = z.object({
	id: z.string().uuid(),
	occurrenceId: z.string().uuid(),
	uploadedByUserId: z.string().nullable(),
	fileName: z.string(),
	fileUrl: z.string(),
	mimeType: z.string(),
	description: z.string().nullable(),
	createdAt: z.string(),
});

export const createAttachmentBody = z.object({
	fileName: z.string().min(1),
	fileUrl: z.string().url(),
	mimeType: z.string().min(1),
	description: z.string().optional(),
});

type AttachmentRow = {
	id: string;
	occurrenceId: string;
	uploadedByUserId: string | null;
	fileName: string;
	fileUrl: string;
	mimeType: string;
	description: string | null;
	createdAt: Date;
};

export function serializeAttachment(row: AttachmentRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
	};
}
