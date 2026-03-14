import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { pathToFileURL } from "node:url";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const preloadPath = path.join(__dirname, "..", "preload", "preload.js");

	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: preloadPath,
			webSecurity: false,
			allowRunningInsecureContent: true,
		},
	});

	if (process.env.NODE_ENV !== "production") {
		mainWindow.webContents.openDevTools();
	}

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, "..", "renderer", `index.html`));
	}
};

ipcMain.handle("get-video-path", (event, relativePath: string) => {
	const fileName = path.basename(relativePath);
	// console.log(fileName); = sintel_trailer-480path.mp4

	let videoPath: string;

	if (app.isPackaged) {
		// packaged desktop app
		videoPath = path.join(process.resourcesPath, "assets", "videos", fileName);
	} else {
		// development mode
		videoPath = path.join(app.getAppPath(), "assets", "videos", fileName);
		// console.log(videoPath);
		// /Users/shun/myStuff/IT practice/Video-Watching-App/electron-app/assets/sintel_trailer-480p.mp4
	}

	return pathToFileURL(videoPath).href;
});

app.whenReady().then(async () => {
	try {
		const { startDatabase } = await import("../../../backend/src/config/db.js");
		await startDatabase();
		createWindow();
	} catch (err) {
		// Log to both console and Pino (if available)
		console.error("Database connection failed:", err);

		try {
			const { logger } = await import("../../../backend/src/config/db.js");
			logger.error({ err }, "Database connection failed");
		} catch (loggerErr) {
			console.error("Failed to log to Pino:", loggerErr);
		}

		// Show a dialog to the user
		dialog.showErrorBox(
			"Database Connection Failed",
			"The application cannot connect to the database.\nPlease try again later.",
		);

		// Give Node a moment to flush logs before quitting
		setTimeout(() => app.quit(), 100);
	}
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
