import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

process.env.DATABASE_URL ??=
	"postgresql://postgres:postgres@localhost:5432/coi";
process.env.BETTER_AUTH_SECRET ??= "openapi-generation-placeholder-secret-key";
process.env.BETTER_AUTH_URL ??= "http://localhost:3000";
process.env.CORS_ORIGIN ??= "http://localhost:3001";

async function main() {
	const { createApp } = await import("./http/app");

	const app = await createApp();
	const document = app.swagger();
	const outFile = resolve(process.cwd(), "openapi.json");

	await writeFile(outFile, `${JSON.stringify(document, null, 2)}\n`);
	await app.close();

	console.log(`OpenAPI document written to ${outFile}`);
	process.exit(0);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
