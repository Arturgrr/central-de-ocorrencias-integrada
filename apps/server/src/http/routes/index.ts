import type { FastifyInstance } from "fastify";
import { assignmentRoutes } from "./assignment-routes";
import { attachmentRoutes } from "./attachment-routes";
import { citizenRoutes } from "./citizen-routes";
import { dashboardRoutes } from "./dashboard-routes";
import { geoRoutes } from "./geo-routes";
import { occurrenceRoutes } from "./occurrence-routes";
import { occurrenceTypeRoutes } from "./occurrence-type-routes";
import { timelineRoutes } from "./timeline-routes";
import { userRoutes } from "./user-routes";
import { vehicleRoutes } from "./vehicle-routes";

export async function appRoutes(app: FastifyInstance) {
	await app.register(occurrenceTypeRoutes);
	await app.register(citizenRoutes);
	await app.register(vehicleRoutes);
	await app.register(occurrenceRoutes);
	await app.register(assignmentRoutes);
	await app.register(timelineRoutes);
	await app.register(attachmentRoutes);
	await app.register(geoRoutes);
	await app.register(userRoutes);
	await app.register(dashboardRoutes);
}
