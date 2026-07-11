import type { FastifyInstance } from "fastify";
import { listAgents } from "../controllers/user/list-agents";
import { listUsers } from "../controllers/user/list-users";

export async function userRoutes(app: FastifyInstance) {
	await app.register(listUsers);
	await app.register(listAgents);
}
