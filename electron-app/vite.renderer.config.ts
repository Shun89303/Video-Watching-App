import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
	root: "renderer",
	build: {
		outDir: "../.vite/build/renderer",
	},
});
