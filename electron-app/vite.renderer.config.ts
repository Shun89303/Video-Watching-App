import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	root: "renderer", // folder containing your renderer HTML/JS/CSS
	base: "./", // ensures relative paths work in packaged app
	build: {
		outDir: ".vite/build/renderer", // compiled renderer goes here
		emptyOutDir: true, // clear old builds
		rollupOptions: {
			input: {
				main: resolve(__dirname, "renderer/index.html"),
				videoList: resolve(__dirname, "renderer/videoList.html"),
			},
			output: {
				assetFileNames: "assets/[name][extname]", // put images/videos in assets folder
			},
		},
	},
});
