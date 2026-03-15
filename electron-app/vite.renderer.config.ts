import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

const pagesDir = path.resolve(__dirname, "src/renderer/pages");

const htmlFiles = fs
	.readdirSync(pagesDir)
	.filter((file) => file.endsWith(".html"));

const input = htmlFiles.reduce(
	(acc, file) => {
		const name = file.replace(".html", "");
		acc[name] = path.join(pagesDir, file);
		return acc;
	},
	{} as Record<string, string>,
);

export default defineConfig({
	root: pagesDir,
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
