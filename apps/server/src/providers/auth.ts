import { auth } from "@eng-soft1/auth";
import { env } from "@eng-soft1/env/server";
import { fromNodeHeaders } from "better-auth/node";
import type {
	FastifyInstance,
	FastifyRequest,
	preHandlerHookHandler,
} from "fastify";
import { Forbidden, Unauthorized } from "../http/error-handler";

type CurrentSession = typeof auth.$Infer.Session;
export type SessionUser = CurrentSession["user"];
export type SessionData = CurrentSession["session"];
export type Role = "admin" | "attendant" | "agent" | "citizen";

declare module "fastify" {
	interface FastifyRequest {
		user: SessionUser | null;
		session: SessionData | null;
	}
}

export async function authRoutes(app: FastifyInstance) {
	app.route({
		method: ["GET", "POST"],
		url: "/api/auth/*",

		schema: { hide: true },
		handler: async (request, reply) => {
			const url = new URL(request.url, env.BETTER_AUTH_URL);
			const hasBody =
				request.method !== "GET" &&
				request.method !== "HEAD" &&
				request.body != null;

			const req = new Request(url, {
				method: request.method,
				headers: fromNodeHeaders(request.headers),
				body: hasBody ? JSON.stringify(request.body) : undefined,
			});

			const response = await auth.handler(req);

			reply.status(response.status);
			response.headers.forEach((value, key) => {
				const lower = key.toLowerCase();
				if (
					lower === "set-cookie" ||
					lower === "content-length" ||
					lower === "transfer-encoding"
				) {
					return;
				}
				reply.header(key, value);
			});
			for (const cookie of response.headers.getSetCookie()) {
				reply.header("set-cookie", cookie);
			}

			return reply.send(response.body ? await response.text() : null);
		},
	});
}

export function getSession(request: FastifyRequest) {
	return auth.api.getSession({ headers: fromNodeHeaders(request.headers) });
}

export const authenticate: preHandlerHookHandler = async (request) => {
	const result = await getSession(request);
	if (!result) throw Unauthorized();
	request.user = result.user;
	request.session = result.session;
};

export function requireRole(...roles: Role[]): preHandlerHookHandler {
	return async (request) => {
		const result = await getSession(request);
		if (!result) throw Unauthorized();
		request.user = result.user;
		request.session = result.session;
		const role = (result.user as { role?: string }).role as Role | undefined;
		if (!role || !roles.includes(role)) throw Forbidden();
	};
}
