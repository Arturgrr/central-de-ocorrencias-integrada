import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { OccurrenceTimelineRepository } from "../../../database/repositories/occurrence-timeline-repository";
import { authenticate } from "../../../providers/auth";
import { idParamSchema } from "../../schemas/common";
import { serializeTimelineEvent, timelineEventSchema } from "./schema";

export async function listTimeline(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/occurrences/:id/timeline",
		{
			schema: {
				tags: ["Timeline"],
				operationId: "listTimeline",
				summary: "List timeline events for an occurrence",
				security: [{ cookieAuth: [] }],
				params: idParamSchema,
				response: {
					200: z.array(timelineEventSchema),
				},
			},
			preHandler: authenticate,
		},
		async (request) => {
			const repo = new OccurrenceTimelineRepository();
			const rows = await repo.findByOccurrenceId(request.params.id);
			return rows.map(serializeTimelineEvent);
		},
	);
}
