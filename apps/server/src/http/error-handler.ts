import { env } from "@eng-soft1/env/server";
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
} from "fastify-type-provider-zod";

export class AppError extends Error {
	constructor(
		public statusCode: number,
		message: string,
		public code?: string,
	) {
		super(message);
		this.name = "AppError";
	}
}

export const Unauthorized = (message = "Unauthorized") =>
	new AppError(401, message, "UNAUTHORIZED");
export const Forbidden = (message = "Forbidden") =>
	new AppError(403, message, "FORBIDDEN");
export const NotFound = (message = "Resource not found") =>
	new AppError(404, message, "NOT_FOUND");
export const Conflict = (message = "Conflict") =>
	new AppError(409, message, "CONFLICT");
export const BadRequest = (message = "Bad request") =>
	new AppError(400, message, "BAD_REQUEST");

export function errorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			code: "VALIDATION_ERROR",
			issues: error.validation,
		});
	}

	if (isResponseSerializationError(error)) {
		request.log.error({ err: error }, "Response serialization error");
		return reply
			.status(500)
			.send({ message: "Response validation error", code: "RESPONSE_ERROR" });
	}

	if (error instanceof AppError) {
		return reply
			.status(error.statusCode)
			.send({ message: error.message, code: error.code });
	}

	const pgCode = (error as { code?: string }).code;
	if (pgCode === "23505") {
		return reply.status(409).send({
			message: "Resource already exists",
			code: "UNIQUE_VIOLATION",
		});
	}
	if (pgCode === "23503") {
		return reply.status(409).send({
			message: "Related resource constraint violation",
			code: "FK_VIOLATION",
		});
	}

	request.log.error({ err: error });
	return reply.status(error.statusCode ?? 500).send({
		message:
			env.NODE_ENV === "production"
				? "Internal server error"
				: (error.message ?? "Internal server error"),
		code: "INTERNAL_ERROR",
	});
}
