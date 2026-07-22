import { existsSync } from "node:fs";
import { join } from "node:path";
import { env } from "@eng-soft1/env/server";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "./index";

const DEFAULT_FOLDER = join(process.cwd(), "migrations");

const ALREADY_EXISTS = new Set(["42710", "42P07", "42P06", "42701"]);

function isAlreadyExists(error: unknown): boolean {
	const code = (error as { cause?: { code?: string }; code?: string })?.cause
		?.code;
	return typeof code === "string" && ALREADY_EXISTS.has(code);
}

export async function runMigrations() {
	if (env.RUN_MIGRATIONS === false) return;

	const migrationsFolder = env.MIGRATIONS_PATH ?? DEFAULT_FOLDER;

	if (!existsSync(join(migrationsFolder, "meta", "_journal.json"))) {
		console.warn(
			`[db] nenhuma migration encontrada em ${migrationsFolder}, etapa ignorada`,
		);
		return;
	}

	try {
		await migrate(db, { migrationsFolder });
	} catch (error) {
		if (isAlreadyExists(error)) {
			throw new Error(
				[
					"O banco já contém objetos do schema, mas não tem o registro de migrations do Drizzle.",
					"Isso acontece quando o schema foi criado antes por `drizzle-kit push`.",
					"",
					"Resolva de uma destas formas:",
					"  1. Banco sem dados: apague e recrie o database — o container cria tudo no próximo start.",
					"  2. Banco com dados: marque a migration como aplicada (baseline). Veja o README, seção Deploy.",
				].join("\n"),
				{ cause: error },
			);
		}

		throw error;
	}
}
