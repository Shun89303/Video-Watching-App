import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	root: "../src/renderer/pages", // folder containing your renderer HTML/JS/CSS
	base: "./", // ensures relative paths work in packaged app
	build: {
		outDir: path.resolve(__dirname, "../.vite/build/renderer"),
		emptyOutDir: true, // clear old builds
		rollupOptions: {
			input: {
				main: "index.html",
				videoList: "videoList.html",
			},
			output: {
				assetFileNames: "assets/[name][extname]", // put images/videos in assets folder
			},
		},
	},
});
