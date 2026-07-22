import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const buildTimeEnv = (import.meta as unknown as { env: Record<string, string> })
	.env;

export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_SERVER_URL: z.union([z.url(), z.literal("")]).default(""),
	},
	runtimeEnv: buildTimeEnv,
	emptyStringAsUndefined: false,
});
