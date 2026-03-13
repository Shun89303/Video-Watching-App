import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	build: {
		outDir: path.resolve(__dirname, ".vite/build"),
		emptyOutDir: true,
		rollupOptions: {
			input: path.resolve(__dirname, "src/main.ts"), // entry point for main process
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
