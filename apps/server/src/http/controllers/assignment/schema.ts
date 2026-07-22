import { z } from "zod";
import { assignmentStatusSchema } from "../../schemas/common";

export const assignmentSchema = z
	.object({
		id: z.string().uuid(),
		occurrenceId: z.string().uuid(),
		vehicleId: z.string().uuid().nullable(),
		agentUserId: z.string().nullable(),
		assignedByUserId: z.string(),
		status: assignmentStatusSchema,
		assignedAt: z.string(),
		acceptedAt: z.string().nullable(),
		arrivedAt: z.string().nullable(),
		completedAt: z.string().nullable(),
	})
	.meta({ id: "Assignment" });

export const createAssignmentBody = z
	.object({
		vehicleId: z.string().uuid().optional(),
		agentUserId: z.string().optional(),
	})
	.meta({ id: "CreateAssignment" });

export const updateAssignmentStatusBody = z
	.object({
		status: assignmentStatusSchema,
	})
	.meta({ id: "UpdateAssignmentStatus" });

export const assignmentIdParamSchema = z.object({
	assignmentId: z.string().uuid(),
});

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
};

export function serializeAssignment(row: AssignmentRow) {
	return {
		...row,
		assignedAt: row.assignedAt.toISOString(),
		acceptedAt: row.acceptedAt ? row.acceptedAt.toISOString() : null,
		arrivedAt: row.arrivedAt ? row.arrivedAt.toISOString() : null,
		completedAt: row.completedAt ? row.completedAt.toISOString() : null,
	};
}
