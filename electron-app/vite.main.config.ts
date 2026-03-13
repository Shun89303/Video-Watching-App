import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	build: {
		target: "node16",
		outDir: path.resolve(__dirname, ".vite/build"),
		emptyOutDir: false,
		lib: {
			entry: path.resolve(__dirname, "src/main.ts"),
			formats: ["cjs"],
		},
		rollupOptions: {
			external: ["electron", "path", "url"], // Node built-ins
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
