import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { DashboardRepository } from "../../../database/repositories/dashboard-repository";
import { authenticate } from "../../../providers/auth";

export async function getDashboardMetrics(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/dashboard/metrics",
		{
			schema: {
				tags: ["Dashboard"],
				summary: "Get aggregate metrics for the operations panel",
				security: [{ cookieAuth: [] }],
				response: {
					200: z.object({
						activeCount: z.number().int(),
						vehiclesInField: z.number().int(),
						highPriorityCount: z.number().int(),
						avgResolutionTimeMinutes: z.number(),
					}),
				},
			},
			preHandler: authenticate,
		},
		async () => {
			const repo = new DashboardRepository();
			const [
				activeCount,
				vehiclesInField,
				highPriorityCount,
				avgResolutionTimeMinutes,
			] = await Promise.all([
				repo.activeCount(),
				repo.vehiclesInField(),
				repo.highPriorityCount(),
				repo.avgResolutionTimeMinutes(),
			]);
			return {
				activeCount,
				vehiclesInField,
				highPriorityCount,
				avgResolutionTimeMinutes,
			};
		},
	);
}
