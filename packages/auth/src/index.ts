import { db } from "@eng-soft1/db";
import * as schema from "@eng-soft1/db/schema/auth";
import { env } from "@eng-soft1/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const useSecureCookies = env.BETTER_AUTH_URL.startsWith("https://");

export function createAuth() {
	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg",
			schema: schema,
		}),
		trustedOrigins: [env.CORS_ORIGIN],
		emailAndPassword: {
			enabled: true,
		},
		user: {
			additionalFields: {
				role: {
					type: "string",
					required: false,
					input: false,
					defaultValue: "citizen",
				},
				phone: { type: "string", required: false, input: true },
				registrationNumber: { type: "string", required: false, input: true },
				address: { type: "string", required: false, input: true },
			},
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		advanced: {
			defaultCookieAttributes: useSecureCookies
				? { sameSite: "none", secure: true, httpOnly: true }
				: { sameSite: "lax", secure: false, httpOnly: true },
		},
		plugins: [],
	});
}

export const auth = createAuth();
