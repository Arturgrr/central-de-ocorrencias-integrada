import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceAssignmentRepository } from "../../../database/repositories/occurrence-assignment-repository";
import { authenticate } from "../../../providers/auth";
import { idParamSchema } from "../../schemas/common";
import { assignmentSchema, serializeAssignment } from "./schema";

export async function listAssignments(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/occurrences/:id/assignments",
		{
			schema: {
				tags: ["Assignments"],
				operationId: "listAssignments",
				summary: "List assignments for an occurrence",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: z.array(assignmentSchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceAssignmentRepository();
			const rows = await repo.findByOccurrenceId(request.params.id);
			return rows.map(serializeAssignment);
		},
	);
}
