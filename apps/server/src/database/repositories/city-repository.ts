import { asc, eq } from "@eng-soft1/db";
import { city } from "@eng-soft1/db/schema";
import db from "../database-service";

export class CityRepository {
	async findAll() {
		return db.select().from(city).orderBy(asc(city.name));
	}

	async findById(id: string) {
		return db.query.city.findFirst({
			where: eq(city.id, id),
		});
	}
}
