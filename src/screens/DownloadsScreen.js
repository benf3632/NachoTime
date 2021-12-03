import { useEffect } from "react";
import { connect } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";

// icons
import { IoMdCloudDownload, IoMdCloudUpload } from "react-icons/io/";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

// actions
import { updateTorrents } from "../actions/webTorrent";

// css
import "./DownloadsScreen.css";

// eletcron
const { ipcRenderer } = window.require("electron");

const parseSpeed = (speed) => {
	let speedNumber = parseInt(speed);
	if (speedNumber >= 1000 * 1000) {
		speedNumber = speedNumber / (1000 * 1000);
		return `${speedNumber.toFixed(2)} MB/s`;
	} else if (speedNumber >= 1000) {
		speedNumber = speedNumber / 1000;
		return `${speedNumber.toFixed(2)} KB/s`;
	}
	return `${speed.toFixed(2)} B/s`;
};

const DownloadsScreen = ({ torrents, updateTorrents }) => {
	const handleTorrentPauseing = (magnetUri) => {
		ipcRenderer.send("wt-pause-torrenting", magnetUri);
	};

	const handleTorrentResuming = (magnetUri) => {
		ipcRenderer.send("wt-resume-torrenting", magnetUri);
	};

	useEffect(() => {
		ipcRenderer.on("wt-progress", (event, progress) => {
			updateTorrents(progress.torrents);
		});
		return () => ipcRenderer.removeAllListeners("wt-progress");
	}, []);

	return (
		<div className="TorrentsProgressContainer">
			{torrents &&
				torrents.map((torrent) => {
					return (
						<div className="TorrentProgress" key={torrent.infoHash}>
							<div style={{ width: "100%" }}>
								<p>{torrent.name}</p>
								<ProgressBar
									bgColor="#66bb6a"
									labelAlignment="outside"
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
														torrent.magnetUri
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

const mapStateToProps = (state) => ({
	torrents: state,
});

const mapDispatchToProps = (dispatch) => ({
	updateTorrents: (torrents) => dispatch(updateTorrents(torrents)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadsScreen);
