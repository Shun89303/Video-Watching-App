import { defineConfig } from "vite";
import path, { resolve } from "path";

export default defineConfig({
	root: "renderer", // folder containing your renderer HTML/JS/CSS
	base: "./", // ensures relative paths work in packaged app
	build: {
		outDir: path.resolve(__dirname, ".vite/build/renderer"),
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
