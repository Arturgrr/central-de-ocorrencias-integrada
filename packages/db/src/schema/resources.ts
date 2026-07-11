import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

export const vehicleStatus = pgEnum("vehicle_status", [
	"available",
	"dispatched",
	"maintenance",
	"inactive",
]);

export const occurrenceType = pgTable(
	"occurrence_type",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: text("name").notNull().unique(),
		description: text("description"),
		priority: integer("priority").default(3).notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("occurrence_type_active_idx").on(table.isActive)],
);

export const vehicle = pgTable(
	"vehicle",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		code: text("code").notNull().unique(),
		plate: text("plate").notNull().unique(),
		model: text("model"),
		status: vehicleStatus("status").default("available").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("vehicle_status_idx").on(table.status)],
);

export const vehicleLocation = pgTable(
	"vehicle_location",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		vehicleId: uuid("vehicle_id")
			.notNull()
			.references(() => vehicle.id, { onDelete: "cascade" }),
		latitude: numeric("latitude", { precision: 10, scale: 7 }).notNull(),
		longitude: numeric("longitude", { precision: 10, scale: 7 }).notNull(),
		reportedByUserId: text("reported_by_user_id").references(() => user.id, {
			onDelete: "set null",
		}),
		recordedAt: timestamp("recorded_at").defaultNow().notNull(),
	},
	(table) => [index("vehicle_location_vehicle_idx").on(table.vehicleId)],
);

export const vehicleRelations = relations(vehicle, ({ many }) => ({
	locations: many(vehicleLocation),
}));

export const vehicleLocationRelations = relations(
	vehicleLocation,
	({ one }) => ({
		vehicle: one(vehicle, {
			fields: [vehicleLocation.vehicleId],
			references: [vehicle.id],
		}),
		reportedBy: one(user, {
			fields: [vehicleLocation.reportedByUserId],
			references: [user.id],
		}),
	}),
);

export const city = pgTable("city", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	state: text("state").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const neighborhood = pgTable("neighborhood", {
	id: uuid("id").defaultRandom().primaryKey(),
	cityId: uuid("city_id")
		.notNull()
		.references(() => city.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const cityRelations = relations(city, ({ many }) => ({
	neighborhoods: many(neighborhood),
}));

export const neighborhoodRelations = relations(neighborhood, ({ one }) => ({
	city: one(city, {
		fields: [neighborhood.cityId],
		references: [city.id],
	}),
}));
