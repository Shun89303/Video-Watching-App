import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	build: {
		target: "node16",
		outDir: path.resolve(__dirname, ".vite/build/preload"),
		emptyOutDir: false,
		lib: {
			entry: path.resolve(__dirname, "src/preload/preload.ts"),
			formats: ["cjs"],
		},
		rollupOptions: {
			external: ["electron", "path", "url", "fs", "os", "process"],
		},
	},
});
