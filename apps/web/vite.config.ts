import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const API_TARGET = process.env.VITE_SERVER_URL ?? "http://localhost:3000";

export default defineConfig({
	server: {
		port: 3001,
		proxy: {
			"/api": { target: API_TARGET, changeOrigin: false },
			"/docs": { target: API_TARGET, changeOrigin: false },
		},
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tailwindcss(),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
	],
});
