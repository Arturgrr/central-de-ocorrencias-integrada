import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

export const userRole = pgEnum("user_role", ["admin", "attendant", "agent"]);

export const userStatus = pgEnum("user_status", ["active", "inactive"]);

export const userProfile = pgTable(
	"user_profile",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: text("user_id")
			.notNull()
			.unique()
			.references(() => user.id, { onDelete: "cascade" }),
		role: userRole("role").notNull(),
		status: userStatus("status").default("active").notNull(),
		document: text("document").unique(),
		phone: text("phone"),
		registrationNumber: text("registration_number").unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("user_profile_role_idx").on(table.role)],
);

export const citizen = pgTable(
	"citizen",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: text("name").notNull(),
		phone: text("phone").notNull(),
		document: text("document"),
		addressLine: text("address_line"),
		neighborhood: text("neighborhood"),
		city: text("city"),
		state: text("state"),
		postalCode: text("postal_code"),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("citizen_phone_idx").on(table.phone)],
);

export const userProfileRelations = relations(userProfile, ({ one }) => ({
	user: one(user, {
		fields: [userProfile.userId],
		references: [user.id],
	}),
}));
