interface Window {
	electronAPI: {
		getVideoPath: (videoName: string) => Promise<string>;
	};
}
