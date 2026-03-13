import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	build: {
		target: "node16",
		outDir: path.resolve(__dirname, ".vite/build"),
		emptyOutDir: false,
		rollupOptions: {
			input: path.resolve(__dirname, "src/main.ts"),
			external: ["electron", "path", "node:url", "fs"], // Node built-ins + electron
			output: {
				format: "cjs", // CommonJS for Node
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
