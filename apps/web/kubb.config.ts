import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";

function folderFromTag(tag: string) {
	return tag
		.replace(/[^a-zA-Z0-9]+(.)?/g, (_, chr: string | undefined) =>
			chr ? chr.toUpperCase() : "",
		)
		.replace(/^(.)/, (chr) => chr.toLowerCase());
}

export default defineConfig({
	root: ".",
	input: {
		path: "../server/openapi.json",
	},
	output: {
		path: "./src/gen",
		clean: true,
		format: "biome",
		lint: false,

		extension: { ".ts": "" },
	},
	plugins: [
		pluginOas({ validate: true }),
		pluginTs({
			output: { path: "types" },
			group: { type: "tag", name: ({ group }) => folderFromTag(group) },
			enumType: "asConst",
			dateType: "string",
			unknownType: "unknown",
		}),
		pluginZod({
			output: { path: "schemas" },
			group: { type: "tag", name: ({ group }) => folderFromTag(group) },

			typed: false,
			dateType: "string",
			unknownType: "unknown",
		}),
		pluginClient({
			output: { path: "clients" },
			group: { type: "tag", name: ({ group }) => folderFromTag(group) },
			importPath: "@/lib/api-client",
			paramsType: "object",
			pathParamsType: "object",
			dataReturnType: "data",
			parser: "zod",
		}),
		pluginReactQuery({
			output: { path: "hooks" },
			group: { type: "tag", name: ({ group }) => folderFromTag(group) },
			client: { importPath: "@/lib/api-client" },
			paramsType: "object",
			pathParamsType: "object",
			parser: "zod",
			suspense: false,
			query: {
				methods: ["get"],
				importPath: "@tanstack/react-query",
			},
			mutation: {
				methods: ["post", "put", "patch", "delete"],
				importPath: "@tanstack/react-query",
			},
		}),
	],
});
