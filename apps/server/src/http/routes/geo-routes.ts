import type { FastifyInstance } from "fastify";
import { getCity } from "../controllers/geo/get-city";
import { getNeighborhood } from "../controllers/geo/get-neighborhood";
import { listCities } from "../controllers/geo/list-cities";
import { listNeighborhoods } from "../controllers/geo/list-neighborhoods";

export async function geoRoutes(app: FastifyInstance) {
	await app.register(listCities);
	await app.register(getCity);
	await app.register(listNeighborhoods);
	await app.register(getNeighborhood);
}
