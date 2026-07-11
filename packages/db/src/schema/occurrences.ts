import { relations } from "drizzle-orm";
import {
	index,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth";
import { citizen } from "./people";
import { occurrenceType, vehicle, municipio, bairro } from "./resources";

export const occurrenceStatus = pgEnum("occurrence_status", [
	"open",
	"dispatched",
	"in_progress",
	"resolved",
	"cancelled",
]);

export const occurrencePriority = pgEnum("occurrence_priority", [
	"low",
	"medium",
	"high",
	"critical",
]);

export const assignmentStatus = pgEnum("assignment_status", [
	"assigned",
	"accepted",
	"arrived",
	"completed",
	"cancelled",
]);

export const timelineEventType = pgEnum("timeline_event_type", [
	"created",
	"status_changed",
	"vehicle_dispatched",
	"agent_update",
	"photo_uploaded",
	"closed",
]);

export const occurrence = pgTable(
	"occurrence",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		protocol: text("protocol").notNull().unique(),
		citizenId: uuid("citizen_id").references(() => citizen.id, {
			onDelete: "set null",
		}),
		typeId: uuid("type_id")
			.notNull()
			.references(() => occurrenceType.id, { onDelete: "restrict" }),
		openedByUserId: text("opened_by_user_id")
			.notNull()
			.references(() => user.id, { onDelete: "restrict" }),
		closedByUserId: text("closed_by_user_id").references(() => user.id, {
			onDelete: "set null",
		}),
		status: occurrenceStatus("status").default("open").notNull(),
		priority: occurrencePriority("priority").default("medium").notNull(),
		title: text("title").notNull(),
		description: text("description"),
		addressLine: text("address_line").notNull(),
		municipioId: uuid("municipio_id").references(() => municipio.id),
        bairroId: uuid("bairro_id").references(() => bairro.id),
		latitude: numeric("latitude", { precision: 10, scale: 7 }),
		longitude: numeric("longitude", { precision: 10, scale: 7 }),
		openedAt: timestamp("opened_at").defaultNow().notNull(),
		closedAt: timestamp("closed_at"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [
		index("occurrence_status_idx").on(table.status),
		index("occurrence_type_idx").on(table.typeId),
		index("occurrence_citizen_idx").on(table.citizenId),
	],
);

export const occurrenceAssignment = pgTable(
	"occurrence_assignment",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		occurrenceId: uuid("occurrence_id")
			.notNull()
			.references(() => occurrence.id, { onDelete: "cascade" }),
		vehicleId: uuid("vehicle_id").references(() => vehicle.id, {
			onDelete: "set null",
		}),
		agentUserId: text("agent_user_id").references(() => user.id, {
			onDelete: "set null",
		}),
		assignedByUserId: text("assigned_by_user_id")
			.notNull()
			.references(() => user.id, { onDelete: "restrict" }),
		status: assignmentStatus("status").default("assigned").notNull(),
		assignedAt: timestamp("assigned_at").defaultNow().notNull(),
		acceptedAt: timestamp("accepted_at"),
		arrivedAt: timestamp("arrived_at"),
		completedAt: timestamp("completed_at"),
	},
	(table) => [index("assignment_occurrence_idx").on(table.occurrenceId)],
);

export const occurrenceTimelineEvent = pgTable(
	"occurrence_timeline_event",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		occurrenceId: uuid("occurrence_id")
			.notNull()
			.references(() => occurrence.id, { onDelete: "cascade" }),
		createdByUserId: text("created_by_user_id").references(() => user.id, {
			onDelete: "set null",
		}),
		type: timelineEventType("type").notNull(),
		description: text("description").notNull(),
		metadata: text("metadata"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [index("timeline_occurrence_idx").on(table.occurrenceId)],
);

export const occurrenceAttachment = pgTable(
	"occurrence_attachment",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		occurrenceId: uuid("occurrence_id")
			.notNull()
			.references(() => occurrence.id, { onDelete: "cascade" }),
		uploadedByUserId: text("uploaded_by_user_id").references(() => user.id, {
			onDelete: "set null",
		}),
		fileName: text("file_name").notNull(),
		fileUrl: text("file_url").notNull(),
		mimeType: text("mime_type").notNull(),
		description: text("description"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [index("attachment_occurrence_idx").on(table.occurrenceId)],
);

export const occurrenceRelations = relations(occurrence, ({ one, many }) => ({
	citizen: one(citizen, {
		fields: [occurrence.citizenId],
		references: [citizen.id],
	}),
	type: one(occurrenceType, {
		fields: [occurrence.typeId],
		references: [occurrenceType.id],
	}),
	municipio: one(municipio, {
        fields: [occurrence.municipioId],
        references: [municipio.id],
    }),
    bairro: one(bairro, {
        fields: [occurrence.bairroId],
        references: [bairro.id],
    }),
	openedBy: one(user, {
		fields: [occurrence.openedByUserId],
		references: [user.id],
		relationName: "occurrence_opened_by",
	}),
	closedBy: one(user, {
		fields: [occurrence.closedByUserId],
		references: [user.id],
		relationName: "occurrence_closed_by",
	}),
	assignments: many(occurrenceAssignment),
	timelineEvents: many(occurrenceTimelineEvent),
	attachments: many(occurrenceAttachment),
}));

export const occurrenceAssignmentRelations = relations(
	occurrenceAssignment,
	({ one }) => ({
		occurrence: one(occurrence, {
			fields: [occurrenceAssignment.occurrenceId],
			references: [occurrence.id],
		}),
		vehicle: one(vehicle, {
			fields: [occurrenceAssignment.vehicleId],
			references: [vehicle.id],
		}),
		agent: one(user, {
			fields: [occurrenceAssignment.agentUserId],
			references: [user.id],
			relationName: "assignment_agent",
		}),
		assignedBy: one(user, {
			fields: [occurrenceAssignment.assignedByUserId],
			references: [user.id],
			relationName: "assignment_assigned_by",
		}),
	}),
);

export const occurrenceTimelineEventRelations = relations(
	occurrenceTimelineEvent,
	({ one }) => ({
		occurrence: one(occurrence, {
			fields: [occurrenceTimelineEvent.occurrenceId],
			references: [occurrence.id],
		}),
		createdBy: one(user, {
			fields: [occurrenceTimelineEvent.createdByUserId],
			references: [user.id],
		}),
	}),
);

export const occurrenceAttachmentRelations = relations(
	occurrenceAttachment,
	({ one }) => ({
		occurrence: one(occurrence, {
			fields: [occurrenceAttachment.occurrenceId],
			references: [occurrence.id],
		}),
		uploadedBy: one(user, {
			fields: [occurrenceAttachment.uploadedByUserId],
			references: [user.id],
		}),
	}),
);
