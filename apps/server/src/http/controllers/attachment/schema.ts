import { z } from "zod";

export const attachmentSchema = z
	.object({
		id: z.string().uuid(),
		occurrenceId: z.string().uuid(),
		uploadedByUserId: z.string().nullable(),
		fileName: z.string(),
		fileUrl: z.string(),
		mimeType: z.string(),
		description: z.string().nullable(),
		createdAt: z.string(),
	})
	.meta({ id: "Attachment" });

export const mediaAttachmentSchema = attachmentSchema
	.extend({
		occurrenceProtocol: z.string(),
		occurrenceTitle: z.string(),
	})
	.meta({ id: "MediaAttachment" });

export const attachmentKindSchema = z
	.enum(["image", "video", "document"])
	.meta({ id: "AttachmentKind" });

export const mediaSummarySchema = z
	.object({
		total: z.number().int(),
		images: z.number().int(),
		videos: z.number().int(),
		documents: z.number().int(),
	})
	.meta({ id: "MediaSummary" });

export const createAttachmentBody = z
	.object({
		fileName: z.string().min(1),
		fileUrl: z.string().url(),
		mimeType: z.string().min(1),
		description: z.string().optional(),
	})
	.meta({ id: "CreateAttachment" });

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

type MediaAttachmentRow = AttachmentRow & {
	occurrenceProtocol: string;
	occurrenceTitle: string;
};

export function serializeMediaAttachment(row: MediaAttachmentRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
	};
}
