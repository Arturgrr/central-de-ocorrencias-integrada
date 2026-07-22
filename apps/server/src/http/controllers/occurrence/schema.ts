import { z } from "zod";
import {
	occurrencePrioritySchema,
	occurrenceStatusSchema,
} from "../../schemas/common";
import { assignmentSchema } from "../assignment/schema";
import { attachmentSchema } from "../attachment/schema";
import { citizenSchema } from "../citizen/schema";
import { citySchema, neighborhoodSchema } from "../geo/schema";
import { occurrenceTypeSchema } from "../occurrence-type/schema";
import { timelineEventSchema } from "../timeline/schema";
import { userRefSchema } from "../user/schema";
import { vehicleSchema } from "../vehicle/schema";

export const occurrenceSummarySchema = z
	.object({
		id: z.string().uuid(),
		protocol: z.string(),
		citizenId: z.string().uuid().nullable(),
		typeId: z.string().uuid(),
		openedByUserId: z.string(),
		closedByUserId: z.string().nullable(),
		status: occurrenceStatusSchema,
		priority: occurrencePrioritySchema,
		title: z.string(),
		description: z.string().nullable(),
		addressLine: z.string(),
		cityId: z.string().uuid().nullable(),
		neighborhoodId: z.string().uuid().nullable(),
		latitude: z.string().nullable(),
		longitude: z.string().nullable(),
		openedAt: z.string(),
		closedAt: z.string().nullable(),
		createdAt: z.string(),
		updatedAt: z.string(),
	})
	.meta({ id: "OccurrenceSummary" });

const assignmentWithResourcesSchema = assignmentSchema
	.extend({
		vehicle: vehicleSchema.nullable(),
		agent: userRefSchema.nullable(),
	})
	.meta({ id: "AssignmentWithResources" });

export const occurrenceDetailSchema = occurrenceSummarySchema
	.extend({
		citizen: citizenSchema.nullable(),
		type: occurrenceTypeSchema,
		city: citySchema.nullable(),
		neighborhood: neighborhoodSchema.nullable(),
		openedBy: userRefSchema,
		closedBy: userRefSchema.nullable(),
		assignments: z.array(assignmentWithResourcesSchema),
		timelineEvents: z.array(timelineEventSchema),
		attachments: z.array(attachmentSchema),
	})
	.meta({ id: "OccurrenceDetail" });

export const createOccurrenceBody = z
	.object({
		typeId: z.string().uuid(),
		title: z.string().min(1),
		addressLine: z.string().min(1),
		citizenId: z.string().uuid().optional(),
		description: z.string().optional(),
		priority: occurrencePrioritySchema.optional(),
		cityId: z.string().uuid().optional(),
		neighborhoodId: z.string().uuid().optional(),
		latitude: z.number().optional(),
		longitude: z.number().optional(),
	})
	.meta({ id: "CreateOccurrence" });

export const updateOccurrenceBody = z
	.object({
		title: z.string().min(1),
		description: z.string().nullable(),
		priority: occurrencePrioritySchema,
		status: occurrenceStatusSchema,
		addressLine: z.string().min(1),
		cityId: z.string().uuid().nullable(),
		neighborhoodId: z.string().uuid().nullable(),
		latitude: z.number().nullable(),
		longitude: z.number().nullable(),
		citizenId: z.string().uuid().nullable(),
		typeId: z.string().uuid(),
	})
	.partial()
	.meta({ id: "UpdateOccurrence" });

type OccurrenceRow = {
	id: string;
	protocol: string;
	citizenId: string | null;
	typeId: string;
	openedByUserId: string;
	closedByUserId: string | null;
	status: "open" | "dispatched" | "in_progress" | "resolved" | "cancelled";
	priority: "low" | "medium" | "high" | "critical";
	title: string;
	description: string | null;
	addressLine: string;
	cityId: string | null;
	neighborhoodId: string | null;
	latitude: string | null;
	longitude: string | null;
	openedAt: Date;
	closedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};

type UserRow = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "attendant" | "agent" | "citizen";
};

type CitizenRow = {
	id: string;
	name: string;
	phone: string;
	document: string | null;
	addressLine: string | null;
	neighborhood: string | null;
	city: string | null;
	state: string | null;
	postalCode: string | null;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

type TypeRow = {
	id: string;
	name: string;
	description: string | null;
	priority: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

type CityRow = {
	id: string;
	name: string;
	state: string;
	createdAt: Date;
	updatedAt: Date;
};

type NeighborhoodRow = {
	id: string;
	cityId: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};

type VehicleRow = {
	id: string;
	code: string;
	plate: string;
	model: string | null;
	status: "available" | "dispatched" | "maintenance" | "inactive";
	createdAt: Date;
	updatedAt: Date;
};

type AssignmentRow = {
	id: string;
	occurrenceId: string;
	vehicleId: string | null;
	agentUserId: string | null;
	assignedByUserId: string;
	status: "assigned" | "accepted" | "arrived" | "completed" | "cancelled";
	assignedAt: Date;
	acceptedAt: Date | null;
	arrivedAt: Date | null;
	completedAt: Date | null;
	vehicle: VehicleRow | null;
	agent: UserRow | null;
};

type TimelineEventRow = {
	id: string;
	occurrenceId: string;
	createdByUserId: string | null;
	type:
		| "created"
		| "status_changed"
		| "vehicle_dispatched"
		| "agent_update"
		| "photo_uploaded"
		| "closed";
	description: string;
	metadata: string | null;
	createdAt: Date;
};

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

type OccurrenceDetailRow = OccurrenceRow & {
	citizen: CitizenRow | null;
	type: TypeRow;
	city: CityRow | null;
	neighborhood: NeighborhoodRow | null;
	openedBy: UserRow;
	closedBy: UserRow | null;
	assignments: AssignmentRow[];
	timelineEvents: TimelineEventRow[];
	attachments: AttachmentRow[];
};

export function serializeOccurrenceSummary(row: OccurrenceRow) {
	return {
		id: row.id,
		protocol: row.protocol,
		citizenId: row.citizenId,
		typeId: row.typeId,
		openedByUserId: row.openedByUserId,
		closedByUserId: row.closedByUserId,
		status: row.status,
		priority: row.priority,
		title: row.title,
		description: row.description,
		addressLine: row.addressLine,
		cityId: row.cityId,
		neighborhoodId: row.neighborhoodId,
		latitude: row.latitude,
		longitude: row.longitude,
		openedAt: row.openedAt.toISOString(),
		closedAt: row.closedAt ? row.closedAt.toISOString() : null,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

function serializeUser(row: UserRow) {
	return {
		id: row.id,
		name: row.name,
		email: row.email,
		role: row.role,
	};
}

function serializeCitizen(row: CitizenRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

function serializeType(row: TypeRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

function serializeCity(row: CityRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

function serializeNeighborhood(row: NeighborhoodRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

function serializeVehicle(row: VehicleRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}

function serializeAssignment(row: AssignmentRow) {
	return {
		id: row.id,
		occurrenceId: row.occurrenceId,
		vehicleId: row.vehicleId,
		agentUserId: row.agentUserId,
		assignedByUserId: row.assignedByUserId,
		status: row.status,
		assignedAt: row.assignedAt.toISOString(),
		acceptedAt: row.acceptedAt ? row.acceptedAt.toISOString() : null,
		arrivedAt: row.arrivedAt ? row.arrivedAt.toISOString() : null,
		completedAt: row.completedAt ? row.completedAt.toISOString() : null,
		vehicle: row.vehicle ? serializeVehicle(row.vehicle) : null,
		agent: row.agent ? serializeUser(row.agent) : null,
	};
}

function serializeTimelineEvent(row: TimelineEventRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
	};
}

function serializeAttachment(row: AttachmentRow) {
	return {
		...row,
		createdAt: row.createdAt.toISOString(),
	};
}

export function serializeOccurrenceDetail(row: OccurrenceDetailRow) {
	return {
		...serializeOccurrenceSummary(row),
		citizen: row.citizen ? serializeCitizen(row.citizen) : null,
		type: serializeType(row.type),
		city: row.city ? serializeCity(row.city) : null,
		neighborhood: row.neighborhood
			? serializeNeighborhood(row.neighborhood)
			: null,
		openedBy: serializeUser(row.openedBy),
		closedBy: row.closedBy ? serializeUser(row.closedBy) : null,
		assignments: row.assignments.map(serializeAssignment),
		timelineEvents: row.timelineEvents.map(serializeTimelineEvent),
		attachments: row.attachments.map(serializeAttachment),
	};
}
