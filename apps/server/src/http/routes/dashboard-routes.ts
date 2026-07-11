import type { FastifyInstance } from "fastify";
import { getDashboardMetrics } from "../controllers/dashboard/get-dashboard-metrics";

export async function dashboardRoutes(app: FastifyInstance) {
	await app.register(getDashboardMetrics);
}
