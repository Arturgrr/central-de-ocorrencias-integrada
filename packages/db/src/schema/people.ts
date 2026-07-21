import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

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
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("citizen_phone_idx").on(table.phone)],
);
