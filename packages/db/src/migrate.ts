import { existsSync } from "node:fs";
import { join } from "node:path";
import { env } from "@eng-soft1/env/server";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "./index";

const DEFAULT_FOLDER = join(process.cwd(), "migrations");

export async function runMigrations() {
	if (env.RUN_MIGRATIONS === false) return;

	const migrationsFolder = env.MIGRATIONS_PATH ?? DEFAULT_FOLDER;

	if (!existsSync(join(migrationsFolder, "meta", "_journal.json"))) {
		console.warn(
			`[db] nenhuma migration encontrada em ${migrationsFolder}, etapa ignorada`,
		);
		return;
	}

	await migrate(db, { migrationsFolder });
}
