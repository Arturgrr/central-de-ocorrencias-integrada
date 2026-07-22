import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { env } from "@eng-soft1/env/server";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifySwagger from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import Fastify from "fastify";
import {
	createJsonSchemaTransform,
	createJsonSchemaTransformObject,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { authRoutes } from "../providers/auth";
import { errorHandler } from "./error-handler";
import { appRoutes } from "./routes";

export const API_PREFIX = "/api";

const WEB_ROOT = resolve(env.WEB_ROOT ?? join(process.cwd(), "public"));

export async function createApp() {
	const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.decorateRequest("user", null);
	app.decorateRequest("session", null);

	app.setErrorHandler(errorHandler);

	await app.register(fastifyCors, {
		origin: env.CORS_ORIGIN ?? env.BETTER_AUTH_URL,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
		credentials: true,
		maxAge: 86400,
	});

	await app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "COI API",
				description: "Central de Ocorrência Integrada — API",
				version: "1.0.0",
			},
			components: {
				securitySchemes: {
					cookieAuth: {
						type: "apiKey",
						in: "cookie",
						name: "better-auth.session_token",
					},
					bearerAuth: { type: "http", scheme: "bearer" },
				},
			},
		},

		transform: createJsonSchemaTransform({ schemaRegistry: z.globalRegistry }),
		transformObject: createJsonSchemaTransformObject({
			schemaRegistry: z.globalRegistry,
		}),
	});

	await app.register(scalarApiReference, { routePrefix: "/docs" });

	app.get("/health", { schema: { hide: true } }, async () => ({
		status: "ok",
	}));

	await app.register(authRoutes);
	await app.register(appRoutes, { prefix: API_PREFIX });

	const hasWebBuild = existsSync(join(WEB_ROOT, "index.html"));

	if (hasWebBuild) {
		await app.register(fastifyStatic, { root: WEB_ROOT, wildcard: false });
	}

	app.setNotFoundHandler((request, reply) => {
		const isApiRequest =
			request.url.startsWith(`${API_PREFIX}/`) ||
			request.url.startsWith("/docs");

		if (isApiRequest || !hasWebBuild || request.method !== "GET") {
			return reply
				.status(404)
				.send({ message: "Resource not found", code: "NOT_FOUND" });
		}

		return reply.sendFile("index.html");
	});

	await app.ready();
	return app;
}
