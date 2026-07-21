import { asc, eq } from "@eng-soft1/db";
import { user } from "@eng-soft1/db/schema";
import db from "../database-service";

const publicColumns = {
	id: user.id,
	name: user.name,
	email: user.email,
	role: user.role,
	phone: user.phone,
	registrationNumber: user.registrationNumber,
	image: user.image,
	createdAt: user.createdAt,
};

export type UserRole = "admin" | "attendant" | "agent" | "citizen";

export class UserRepository {
	async listByRole(role?: UserRole) {
		const query = db.select(publicColumns).from(user);
		if (role) {
			return query.where(eq(user.role, role)).orderBy(asc(user.name));
		}
		return query.orderBy(asc(user.name));
	}

	async listAgents() {
		return db
			.select(publicColumns)
			.from(user)
			.where(eq(user.role, "agent"))
			.orderBy(asc(user.name));
	}

	async findById(id: string) {
		const [row] = await db
			.select(publicColumns)
			.from(user)
			.where(eq(user.id, id));
		return row;
	}
}
