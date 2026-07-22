import { env } from "@eng-soft1/env/web";

export type RequestConfig<TData = unknown> = {
	baseURL?: string;
	url?: string;
	method?: "GET" | "PUT" | "PATCH" | "POST" | "DELETE" | "OPTIONS" | "HEAD";
	params?: unknown;
	data?: TData | FormData;
	responseType?:
		| "arraybuffer"
		| "blob"
		| "document"
		| "json"
		| "text"
		| "stream";
	signal?: AbortSignal;
	headers?: [string, string][] | Record<string, string>;
	credentials?: RequestCredentials;
};

export type ResponseConfig<TData = unknown> = {
	data: TData;
	status: number;
	statusText: string;
	headers: Headers;
};

export type ApiErrorBody = {
	message: string;
	code?: string;
};

export type ResponseErrorConfig<TError = ApiErrorBody> = TError;

export type Client = <TResponseData, _TError = unknown, TRequestData = unknown>(
	config: RequestConfig<TRequestData>,
) => Promise<ResponseConfig<TResponseData>>;

export class ApiError extends Error {
	readonly status: number;
	readonly code?: string;

	constructor(status: number, body: ApiErrorBody) {
		super(body.message);
		this.name = "ApiError";
		this.status = status;
		this.code = body.code;
	}
}

const EMPTY_BODY_STATUSES = [204, 205, 304];

function buildSearchParams(params: unknown): string {
	const search = new URLSearchParams();

	for (const [key, value] of Object.entries(
		(params ?? {}) as Record<string, unknown>,
	)) {
		if (value === undefined || value === null || value === "") continue;
		search.append(key, String(value));
	}

	const query = search.toString();
	return query ? `?${query}` : "";
}

async function readBody(response: Response): Promise<unknown> {
	if (EMPTY_BODY_STATUSES.includes(response.status) || !response.body) {
		return {};
	}

	const text = await response.text();
	if (!text) return {};

	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
}

async function client<TResponseData, _TError = unknown, TRequestData = unknown>(
	config: RequestConfig<TRequestData>,
): Promise<ResponseConfig<TResponseData>> {
	const baseURL = config.baseURL ?? env.VITE_SERVER_URL;
	const url = `${baseURL}${config.url ?? ""}${buildSearchParams(config.params)}`;
	const isFormData = config.data instanceof FormData;

	const response = await fetch(url, {
		method: config.method?.toUpperCase() ?? "GET",

		credentials: config.credentials ?? "include",
		signal: config.signal,
		headers: {
			...(isFormData ? {} : { "Content-Type": "application/json" }),
			...(Array.isArray(config.headers)
				? Object.fromEntries(config.headers)
				: config.headers),
		},
		body:
			config.data === undefined
				? undefined
				: isFormData
					? (config.data as FormData)
					: JSON.stringify(config.data),
	});

	const data = await readBody(response);

	if (!response.ok) {
		const body = (data ?? {}) as Partial<ApiErrorBody>;
		throw new ApiError(response.status, {
			message: body.message ?? response.statusText ?? "Erro inesperado na API",
			code: body.code,
		});
	}

	return {
		data: data as TResponseData,
		status: response.status,
		statusText: response.statusText,
		headers: response.headers,
	};
}

export default client;
