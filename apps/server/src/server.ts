import { runMigrations } from "@eng-soft1/db/migrate";
import { env } from "@eng-soft1/env/server";
import { createApp } from "./http/app";

async function main() {
	try {
		await runMigrations();
	} catch (err) {
		console.error(
			`[db] falha ao aplicar as migrations\n\n${err instanceof Error ? err.message : String(err)}\n`,
		);
		process.exit(1);
	}

	const app = await createApp();

	try {
		await app.listen({ port: env.PORT, host: "0.0.0.0" });
		app.log.info(`Server running on http://localhost:${env.PORT}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

main();
