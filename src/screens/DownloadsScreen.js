import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { IoMdCloudDownload, IoMdCloudUpload } from "react-icons/io/";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

// css
import "./DownloadsScreen.css";

// eletcron
const { ipcRenderer } = window.require("electron");

const parseSpeed = (speed) => {
	let speedNumber = parseInt(speed);
	if (speedNumber >= 1000 * 1000) {
		speedNumber = speedNumber / (1000 * 1000);
		return `${speedNumber} MB/s`;
	} else if (speedNumber >= 1000) {
		speedNumber = speedNumber / 1000;
		return `${speedNumber} KB/s`;
	}
	return `${speed} B/s`;
};

const DownloadsScreen = () => {
	const [progress, setProgress] = useState(null);

	const handleTorrentPauseing = (magnetUri) => {
		ipcRenderer.send("wt-pause-torrenting", magnetUri);
	};

	const handleTorrentResuming = (magnetUri) => {
		ipcRenderer.send("wt-resume-torrenting", magnetUri);
	};

	useEffect(() => {
		ipcRenderer.on("wt-progress", (event, progress) => {
			console.log(progress);
			setProgress(progress);
		});
		return () => ipcRenderer.removeAllListeners("wt-progress");
	}, []);

	return (
		<div className="TorrentsProgressContainer">
			{progress &&
				progress.torrents.map((torrent) => {
					return (
						<div className="TorrentProgress" key={torrent.infoHash}>
							<div style={{ width: "100%" }}>
								<p>{torrent.torrentName}</p>
								<ProgressBar
									bgColor="#66bb6a"
									labelAlignment="center"
									completed={Math.floor(
										parseFloat(torrent.progress) * 100
									)}
								/>
								<div className="TorrentProgressInfoContainer">
									<div>
										{<IoMdCloudDownload />}
										{"    "}
										{parseSpeed(torrent.downloadSpeed)}{" "}
										{<IoMdCloudUpload />}
										{"    "}
										{parseSpeed(torrent.uploadSpeed)}
									</div>
									<div>
										{torrent.paused ? (
											<AiOutlinePlayCircle
												onClick={() =>
													handleTorrentResuming(
														torrent.torrentMagnetUri
													)
												}
												className="ClickableIcon"
											/>
										) : (
											<AiOutlinePauseCircle
												onClick={() =>
													handleTorrentPauseing(
														torrent.torrentMagnetUri
													)
												}
												className="ClickableIcon"
											/>
										)}{" "}
										{
											<FaTrashAlt
												className="ClickableIcon"
												onClick={() =>
													console.log(
														"Deleted Torrent"
													)
												}
											/>
										}
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default DownloadsScreen;
