import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { OccurrenceTimelineRepository } from "../../../database/repositories/occurrence-timeline-repository";
import { authenticate } from "../../../providers/auth";
import { Unauthorized } from "../../error-handler";
import { idParamSchema } from "../../schemas/common";
import {
	createTimelineEventBody,
	serializeTimelineEvent,
	timelineEventSchema,
} from "./schema";

export async function createTimelineEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/occurrences/:id/timeline",
		{
			schema: {
				tags: ["Timeline"],
				summary: "Create a timeline event for an occurrence",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				body: createTimelineEventBody,
				response: {
					201: timelineEventSchema,
				},
			},
			preHandler: authenticate,
		},
		async (request, reply) => {
			if (!request.user) throw Unauthorized();
			const repo = new OccurrenceTimelineRepository();
			const row = await repo.create({
				occurrenceId: request.params.id,
				createdByUserId: request.user.id,
				type: request.body.type,
				description: request.body.description,
				metadata: request.body.metadata,
			});
			return reply.status(201).send(serializeTimelineEvent(row));
		},
	);
}
