import type { FastifyInstance } from "fastify";
import { createCitizen } from "../controllers/citizen/create-citizen";
import { deleteCitizen } from "../controllers/citizen/delete-citizen";
import { getCitizen } from "../controllers/citizen/get-citizen";
import { listCitizens } from "../controllers/citizen/list-citizens";
import { updateCitizen } from "../controllers/citizen/update-citizen";

export async function citizenRoutes(app: FastifyInstance) {
	await app.register(createCitizen);
	await app.register(listCitizens);
	await app.register(getCitizen);
	await app.register(updateCitizen);
	await app.register(deleteCitizen);
}
