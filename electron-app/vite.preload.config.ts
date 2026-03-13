import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	build: {
		// Preload scripts are plain Node (Electron main context), not a browser
		target: "node16",
		outDir: path.resolve(__dirname, ".vite/build/preload"),
		emptyOutDir: false,
		lib: {
			entry: path.resolve(__dirname, "src/preload/preload.ts"),
			formats: ["cjs"], // preload must be CommonJS
		},
		rollupOptions: {
			external: ["electron", "path", "url", "fs", "os", "process"], // don't bundle electron module
		},
	},
});
