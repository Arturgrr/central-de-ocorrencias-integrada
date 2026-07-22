import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

declare global {
	interface Window {
		__COI_CONFIG__?: Record<string, string | undefined>;
	}
}

const buildTimeEnv = (import.meta as unknown as { env: Record<string, string> })
	.env;

const runtimeEnv: Record<string, string | undefined> = {
	...buildTimeEnv,
	...(typeof window !== "undefined" ? window.__COI_CONFIG__ : undefined),
};

export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_SERVER_URL: z.url(),
	},
	runtimeEnv,
	emptyStringAsUndefined: true,
});
