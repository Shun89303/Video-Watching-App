import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	build: {
		target: "node16",
		outDir: path.resolve(__dirname, ".vite/build/main"),
		emptyOutDir: false,
		rollupOptions: {
			input: path.resolve(__dirname, "src/main/main.ts"),
			external: ["electron", "path", "node:url", "fs"],
			output: {
				format: "cjs",
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
