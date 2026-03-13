import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	build: {
		target: "node14",
		outDir: path.resolve(__dirname, ".vite/build"),
		emptyOutDir: false,
		rollupOptions: {
			input: path.resolve(__dirname, "src/main.ts"), // entry point for main process
			external: ["electron", "url", "path"], // Node built-ins
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
