import type { FastifyInstance } from "fastify";
import { createTimelineEvent } from "../controllers/timeline/create-timeline-event";
import { listTimeline } from "../controllers/timeline/list-timeline";

export async function timelineRoutes(app: FastifyInstance) {
	await app.register(listTimeline);
	await app.register(createTimelineEvent);
}
