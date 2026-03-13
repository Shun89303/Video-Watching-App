import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

// folder containing your HTML pages
const pagesDir = path.resolve(__dirname, "src/renderer/pages");

// automatically find all HTML files in pagesDir
const htmlFiles = fs
	.readdirSync(pagesDir)
	.filter((file) => file.endsWith(".html"));

// generate input object dynamically
const input = htmlFiles.reduce(
	(acc, file) => {
		const name = file.replace(".html", "");
		acc[name] = path.join(pagesDir, file); // cross-platform safe
		return acc;
	},
	{} as Record<string, string>,
);

export default defineConfig({
	root: pagesDir, // so relative paths inside HTML still work
	base: "./",
	build: {
		outDir: path.resolve(__dirname, ".vite/build/renderer"),
		emptyOutDir: true,
		rollupOptions: {
			input,
			output: {
				assetFileNames: "assets/[name][extname]",
			},
		},
	},
});
