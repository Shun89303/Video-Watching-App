import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
	getVideoPath: (fileName: string) =>
		ipcRenderer.invoke("get-video-path", fileName),
});
