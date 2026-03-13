import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { pathToFileURL } from "node:url";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const preloadPath = app.isPackaged
		? path.join(__dirname, "..", "preload", "preload.js") // packaged
		: path.join(__dirname, "preload.js"); // dev

	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: preloadPath,
			webSecurity: false,
			allowRunningInsecureContent: true,
		},
	});

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, "..", "renderer", `index.html`));
	}

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
};

ipcMain.handle("get-video-path", (event, relativePath: string) => {
	const fileName = path.basename(relativePath);
	// console.log(fileName); = sintel_trailer-480path.mp4

	let videoPath: string;

	if (app.isPackaged) {
		// packaged desktop app
		videoPath = path.join(process.resourcesPath, "assets", fileName);
	} else {
		// development mode
		videoPath = path.join(app.getAppPath(), "assets", fileName);
		// console.log(videoPath);
		// /Users/shun/myStuff/IT practice/Video-Watching-App/electron-app/assets/sintel_trailer-480p.mp4
	}

	return pathToFileURL(videoPath).href;
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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
