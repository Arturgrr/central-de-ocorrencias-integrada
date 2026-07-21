import type { FastifyInstance } from "fastify";
import { createVehicle } from "../controllers/vehicle/create-vehicle";
import { getLatestVehicleLocation } from "../controllers/vehicle/get-latest-vehicle-location";
import { getVehicle } from "../controllers/vehicle/get-vehicle";
import { listVehicles } from "../controllers/vehicle/list-vehicles";
import { reportVehicleLocation } from "../controllers/vehicle/report-vehicle-location";
import { setVehicleStatus } from "../controllers/vehicle/set-vehicle-status";
import { updateVehicle } from "../controllers/vehicle/update-vehicle";

export async function vehicleRoutes(app: FastifyInstance) {
	await app.register(createVehicle);
	await app.register(listVehicles);
	await app.register(getVehicle);
	await app.register(updateVehicle);
	await app.register(setVehicleStatus);
	await app.register(reportVehicleLocation);
	await app.register(getLatestVehicleLocation);
}
