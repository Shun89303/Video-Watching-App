import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { pathToFileURL } from "node:url";

if (started) {
	app.quit();
}

const createWindow = () => {
	const preloadPath = path.join(__dirname, "..", "preload", "preload.js");

	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: preloadPath,
			contextIsolation: true,
			nodeIntegration: false,
			// webSecurity: true,
			// allowRunningInsecureContent: false,
			webSecurity: false,
			allowRunningInsecureContent: true,
		},
	});

	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.webContents.closeDevTools();
		Menu.setApplicationMenu(null);
	}

	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, "..", "renderer", `index.html`));
	}
};

ipcMain.handle("get-video-path", (event, fileName: string) => {
	let videoPath: string;

	if (app.isPackaged) {
		videoPath = path.join(process.resourcesPath, "assets", "videos", fileName);
	} else {
		videoPath = path.join(app.getAppPath(), "assets", "videos", fileName);
	}

	return pathToFileURL(videoPath).href;
});

async function checkBackendHealth() {
	const res = await fetch(
		"https://video-watching-app.onrender.com/api/health/checkDB",
	);

	const data = await res.json();

	if (data.status !== "ok") {
		throw new Error(data.message);
	}
}

app.whenReady().then(async () => {
	try {
		await checkBackendHealth();
		createWindow();
	} catch (err) {
		dialog.showErrorBox(
			"Database Connection Failed",
			"The application cannot connect to the database.\nPlease try again later.",
		);

		setTimeout(() => app.quit(), 100);
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
