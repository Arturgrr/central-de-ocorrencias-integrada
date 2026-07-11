import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceAssignmentRepository } from "../../../database/repositories/occurrence-assignment-repository";
import { authenticate } from "../../../providers/auth";
import { Unauthorized } from "../../error-handler";
import { idParamSchema } from "../../schemas/common";
import {
	assignmentSchema,
	createAssignmentBody,
	serializeAssignment,
} from "./schema";

export async function createAssignment(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/occurrences/:id/assignments",
		{
			schema: {
				tags: ["Assignments"],
				summary: "Create an assignment for an occurrence",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: createAssignmentBody,
				response: {
					201: assignmentSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request, reply) => {
			if (!request.user) throw Unauthorized();
			const repo = new OccurrenceAssignmentRepository();
			const row = await repo.create({
				occurrenceId: request.params.id,
				vehicleId: request.body.vehicleId,
				agentUserId: request.body.agentUserId,
				assignedByUserId: request.user.id,
			});
			return reply.status(201).send(serializeAssignment(row));
		},
	);
}
