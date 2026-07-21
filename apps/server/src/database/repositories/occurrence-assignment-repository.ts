import { asc, eq } from "@eng-soft1/db";
import { occurrenceAssignment } from "@eng-soft1/db/schema";
import db from "../database-service";

export type NewOccurrenceAssignment = {
	occurrenceId: string;
	vehicleId?: string | null;
	agentUserId?: string | null;
	assignedByUserId: string;
};

export type UpdateOccurrenceAssignmentStatus = {
	status: "assigned" | "accepted" | "arrived" | "completed" | "cancelled";
	acceptedAt?: Date;
	arrivedAt?: Date;
	completedAt?: Date;
};

export class OccurrenceAssignmentRepository {
	async create(data: NewOccurrenceAssignment) {
		const [row] = await db
			.insert(occurrenceAssignment)
			.values(data)
			.returning();
		if (!row) throw new Error("Failed to create assignment");
		return row;
	}

	async findByOccurrenceId(occurrenceId: string) {
		return db
			.select()
			.from(occurrenceAssignment)
			.where(eq(occurrenceAssignment.occurrenceId, occurrenceId))
			.orderBy(asc(occurrenceAssignment.assignedAt));
	}

	async findById(id: string) {
		return db.query.occurrenceAssignment.findFirst({
			where: eq(occurrenceAssignment.id, id),
		});
	}

	async updateStatus(id: string, data: UpdateOccurrenceAssignmentStatus) {
		const [row] = await db
			.update(occurrenceAssignment)
			.set(data)
			.where(eq(occurrenceAssignment.id, id))
			.returning();
		return row;
	}
}
