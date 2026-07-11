import type { FastifyInstance } from "fastify";
import { createOccurrenceType } from "../controllers/occurrence-type/create-occurrence-type";
import { deleteOccurrenceType } from "../controllers/occurrence-type/delete-occurrence-type";
import { getOccurrenceType } from "../controllers/occurrence-type/get-occurrence-type";
import { listOccurrenceTypes } from "../controllers/occurrence-type/list-occurrence-types";
import { updateOccurrenceType } from "../controllers/occurrence-type/update-occurrence-type";

export async function occurrenceTypeRoutes(app: FastifyInstance) {
	await app.register(createOccurrenceType);
	await app.register(listOccurrenceTypes);
	await app.register(getOccurrenceType);
	await app.register(updateOccurrenceType);
	await app.register(deleteOccurrenceType);
}
