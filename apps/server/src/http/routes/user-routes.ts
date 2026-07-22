import type { FastifyInstance } from "fastify";
import { getMe } from "../controllers/user/get-me";
import { listAgents } from "../controllers/user/list-agents";
import { listUsers } from "../controllers/user/list-users";

export async function userRoutes(app: FastifyInstance) {
	await app.register(getMe);
	await app.register(listUsers);
	await app.register(listAgents);
}
