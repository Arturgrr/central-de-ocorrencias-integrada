import type { FastifyInstance } from "fastify";
import { closeOccurrence } from "../controllers/occurrence/close-occurrence";
import { createOccurrence } from "../controllers/occurrence/create-occurrence";
import { deleteOccurrence } from "../controllers/occurrence/delete-occurrence";
import { getOccurrence } from "../controllers/occurrence/get-occurrence";
import { listOccurrences } from "../controllers/occurrence/list-occurrences";
import { updateOccurrence } from "../controllers/occurrence/update-occurrence";

export async function occurrenceRoutes(app: FastifyInstance) {
	await app.register(createOccurrence);
	await app.register(listOccurrences);
	await app.register(getOccurrence);
	await app.register(updateOccurrence);
	await app.register(closeOccurrence);
	await app.register(deleteOccurrence);
}
