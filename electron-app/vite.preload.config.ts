import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	build: {
		// Preload scripts are plain Node (Electron main context), not a browser
		target: "esnext",
		outDir: ".vite/build", // temporary build folder for preload
		emptyOutDir: true,
		lib: {
			entry: resolve(__dirname, "src/preload.ts"),
			formats: ["cjs"], // preload must be commonjs
		},
		rollupOptions: {
			external: ["electron"], // don't bundle electron module
		},
	},
});
