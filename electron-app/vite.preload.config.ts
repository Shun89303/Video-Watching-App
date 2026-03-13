import { defineConfig } from "vite";
import path, { resolve } from "path";

export default defineConfig({
	build: {
		// Preload scripts are plain Node (Electron main context), not a browser
		target: "esnext",
		outDir: path.resolve(__dirname, "src"),
		emptyOutDir: false,
		lib: {
			entry: resolve(__dirname, "src/preload.ts"),
			formats: ["cjs"], // preload must be commonjs
		},
		rollupOptions: {
			external: ["electron"], // don't bundle electron module
		},
	},
});
