import { env } from "@eng-soft1/env/web";
import { redirect } from "@tanstack/react-router";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { UserRole } from "./coi";

export const authClient = createAuthClient({
	baseURL:
		env.VITE_SERVER_URL ||
		(typeof window !== "undefined" ? window.location.origin : ""),
	plugins: [
		inferAdditionalFields({
			user: {
				role: { type: "string", input: false },
				phone: { type: "string", required: false },
				registrationNumber: { type: "string", required: false },
				address: { type: "string", required: false },
			},
		}),
	],
});

export type SessionUser = {
	id: string;
	name: string;
	email: string;
	role: UserRole;
};

function toSessionUser(user: {
	id: string;
	name: string;
	email: string;
	role: string;
}) {
	return {
		id: user.id,
		name: user.name,
		email: user.email,

		role: user.role as UserRole,
	} satisfies SessionUser;
}

export async function requireSession() {
	const { data } = await authClient.getSession();

	if (!data) {
		throw redirect({ to: "/" });
	}

	return { session: toSessionUser(data.user) };
}

export async function requireRole(...roles: UserRole[]) {
	const { session } = await requireSession();

	if (!roles.includes(session.role)) {
		throw redirect({ to: "/portal-cidadao" });
	}

	return { session };
}
