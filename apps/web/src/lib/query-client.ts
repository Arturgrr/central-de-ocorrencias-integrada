import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiError } from "./api-client";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30_000,
			refetchOnWindowFocus: false,
			retry: (failureCount, error) => {
				if (error instanceof ApiError && error.status < 500) return false;
				return failureCount < 2;
			},
		},
		mutations: {
			onError: (error) => {
				toast.error(
					error instanceof Error
						? error.message
						: "Falha ao concluir a operação",
				);
			},
		},
	},
});
