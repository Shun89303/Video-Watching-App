import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	build: {
		// Preload scripts are plain Node (Electron main context), not a browser
		target: "esnext",
		outDir: resolve(__dirname, ".vite/build"),
		emptyOutDir: false,
		rollupOptions: {
			input: resolve(__dirname, "src/preload.ts"),
			output: {
				entryFileNames: "preload.js", // <-- force output file name
				format: "cjs",
			},
			external: ["electron"], // don't bundle electron module
		},
	},
});
