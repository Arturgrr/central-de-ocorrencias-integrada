import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import type { UpdateOccurrenceAssignmentStatus } from "../../../database/repositories/occurrence-assignment-repository";
import { OccurrenceAssignmentRepository } from "../../../database/repositories/occurrence-assignment-repository";
import { authenticate } from "../../../providers/auth";
import { NotFound } from "../../error-handler";
import { errorResponseSchema } from "../../schemas/common";
import {
	assignmentIdParamSchema,
	assignmentSchema,
	serializeAssignment,
	updateAssignmentStatusBody,
} from "./schema";

export async function updateAssignmentStatus(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().patch(
		"/assignments/:assignmentId/status",
		{
			schema: {
				tags: ["Assignments"],
				summary: "Update the status of an assignment",
				security: [{ cookieAuth: [] }],
				params: assignmentIdParamSchema,
				body: updateAssignmentStatusBody,
				response: {
					200: assignmentSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceAssignmentRepository();
			const { status } = request.body;
			const data: UpdateOccurrenceAssignmentStatus = { status };
			const now = new Date();
			if (status === "accepted") data.acceptedAt = now;
			else if (status === "arrived") data.arrivedAt = now;
			else if (status === "completed") data.completedAt = now;
			const row = await repo.updateStatus(request.params.assignmentId, data);
			if (!row) throw NotFound("Assignment not found");
			return serializeAssignment(row);
		},
	);
}
