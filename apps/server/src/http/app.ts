import { env } from "@eng-soft1/env/server";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import Fastify from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { authRoutes } from "../providers/auth";
import { errorHandler } from "./error-handler";
import { appRoutes } from "./routes";

export async function createApp() {
	const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.decorateRequest("user", null);
	app.decorateRequest("session", null);

	app.setErrorHandler(errorHandler);

	await app.register(fastifyCors, {
		origin: env.CORS_ORIGIN,
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
		transform: jsonSchemaTransform,
	});

	await app.register(scalarApiReference, { routePrefix: "/docs" });

	app.get("/", async () => "OK");

	await app.register(authRoutes);
	await app.register(appRoutes);

	await app.ready();
	return app;
}
