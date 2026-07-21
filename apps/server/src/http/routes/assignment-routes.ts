import type { FastifyInstance } from "fastify";
import { createAssignment } from "../controllers/assignment/create-assignment";
import { listAssignments } from "../controllers/assignment/list-assignments";
import { updateAssignmentStatus } from "../controllers/assignment/update-assignment-status";

export async function assignmentRoutes(app: FastifyInstance) {
	await app.register(createAssignment);
	await app.register(listAssignments);
	await app.register(updateAssignmentStatus);
}
