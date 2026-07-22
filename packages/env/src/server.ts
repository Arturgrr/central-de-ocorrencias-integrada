import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		BETTER_AUTH_SECRET: z.string().min(32),
		BETTER_AUTH_URL: z.url(),
		CORS_ORIGIN: z.url().optional(),
		PORT: z.coerce.number().default(3000),
		WEB_ROOT: z.string().optional(),
		MIGRATIONS_PATH: z.string().optional(),
		RUN_MIGRATIONS: z
			.enum(["true", "false"])
			.transform((value) => value === "true")
			.optional(),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
