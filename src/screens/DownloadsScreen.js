import { useState, useEffect } from "react";

// eletcron
const { ipcRenderer } = window.require("electron");

const DownloadsScreen = () => {
	const [progress, setProgress] = useState(null);

	useEffect(() => {
		ipcRenderer.on("wt-progress", (event, progress) => {
			console.log(progress);
			setProgress(progress);
		});
		return () => ipcRenderer.removeAllListeners("wt-progress");
	}, []);

	return <div style={{color: 'white'}}>{progress && progress.progress}</div>;
};

export default DownloadsScreen;
