import { and, count, eq, inArray, sql } from "@eng-soft1/db";
import { occurrence, vehicle } from "@eng-soft1/db/schema";
import db from "../database-service";

const ACTIVE_STATUSES = ["open", "dispatched", "in_progress"] as const;
const HIGH_PRIORITIES = ["high", "critical"] as const;

export class DashboardRepository {
	async activeCount() {
		const result = await db
			.select({ value: count() })
			.from(occurrence)
			.where(inArray(occurrence.status, [...ACTIVE_STATUSES]));
		return result[0]?.value ?? 0;
	}

	async vehiclesInField() {
		const result = await db
			.select({ value: count() })
			.from(vehicle)
			.where(eq(vehicle.status, "dispatched"));
		return result[0]?.value ?? 0;
	}

	async highPriorityCount() {
		const result = await db
			.select({ value: count() })
			.from(occurrence)
			.where(
				and(
					inArray(occurrence.priority, [...HIGH_PRIORITIES]),
					inArray(occurrence.status, [...ACTIVE_STATUSES]),
				),
			);
		return result[0]?.value ?? 0;
	}

	async avgResolutionTimeMinutes() {
		const result = await db
			.select({
				value: sql<number>`coalesce(avg(extract(epoch from (${occurrence.closedAt} - ${occurrence.openedAt})) / 60), 0)`,
			})
			.from(occurrence)
			.where(
				and(
					eq(occurrence.status, "resolved"),
					sql`${occurrence.closedAt} is not null`,
				),
			);
		return Math.round(Number(result[0]?.value ?? 0));
	}
}
