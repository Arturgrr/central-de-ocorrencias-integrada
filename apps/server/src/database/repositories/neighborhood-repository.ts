import { asc, eq } from "@eng-soft1/db";
import { neighborhood } from "@eng-soft1/db/schema";
import db from "../database-service";

export type ListNeighborhoodsOptions = {
	cityId?: string;
};

export class NeighborhoodRepository {
	async findAll(opts?: ListNeighborhoodsOptions) {
		const where = opts?.cityId
			? eq(neighborhood.cityId, opts.cityId)
			: undefined;
		return db
			.select()
			.from(neighborhood)
			.where(where)
			.orderBy(asc(neighborhood.name));
	}

	async findById(id: string) {
		return db.query.neighborhood.findFirst({
			where: eq(neighborhood.id, id),
		});
	}
}
