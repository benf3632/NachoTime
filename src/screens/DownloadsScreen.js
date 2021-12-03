import { useState, useEffect } from "react";

// eletcron
const { ipcRenderer } = window.require("electron");

const parseSpeed = (speed) => {
	let speedNumber = parseInt(speed);
	if (speedNumber >= 1000 * 1000) {
		speedNumber = speedNumber / (1000 * 1000);
		return `${speedNumber} Mb/S`
	} else if (speedNumber >= 1000) {
		speedNumber = speedNumber / (1000);
		return `${speedNumber} Kb/S`
	}
	return `${speed} b/s`
}

const DownloadsScreen = () => {
	const [progress, setProgress] = useState(null);

	useEffect(() => {
		ipcRenderer.on("wt-progress", (event, progress) => {
			console.log(progress);
			setProgress(progress);
		});
		return () => ipcRenderer.removeAllListeners("wt-progress");
	}, []);

	return (
		<div style={{ color: "white", display: 'grid', justifyContent: 'center', marginRight: '10%' }}>
			{progress && progress.torrents.map(torrent => {
				return (
					<div>
						<p>{torrent.torrentName}</p>
						<p>Downloaded: {Math.floor(parseFloat(torrent.progress) * 100)}% {parseSpeed(torrent.downloadSpeed)}</p>
					</div>
				)
			})}
		</div>
	);
};

export default DownloadsScreen;
