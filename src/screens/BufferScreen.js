import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { connect } from "react-redux";

// components
import AnimatedCirucularProgressbar from "../components/AnimatedCircularProgressBar";

// actions
import { updateTorrents } from "../actions/webTorrent";

// css
import "./BufferScreen.css";

// electron
const { ipcRenderer } = window.require("electron");

const BufferScreen = ({ torrents, updateTorrents }) => {
	const [torrentProgress, setTorrentProgess] = useState(0.0);
	const [prevTorrentProgess, setPrevTorrentProgress] = useState(0.0);
	let location = useLocation();
	const { torrentInfoHash } = useParams();

	// listen for torrents progress
	useEffect(() => {
		ipcRenderer.on("wt-progress", (event, progress) => {
			updateTorrents(progress.torrents);
		});
		return () => ipcRenderer.removeAllListeners("wt-progress");
	}, [torrentInfoHash]);

	// check for current torrent's progress
	useEffect(() => {
		const currentTorrent = torrents.find(
			(torrent) => torrent.infoHash === torrentInfoHash
		);

		if (!currentTorrent) return;

		setPrevTorrentProgress(torrentProgress);
		setTorrentProgess(currentTorrent.progress);

		if (currentTorrent.progress >= 0.05) {
			// location.state.bufferLoadedCallback(torrentInfoHash);
			// TODO: Fix location
			console.log(location);

		}
	}, [torrents]);

	return (
		<div className="BufferScreenContainer">
			<div className="BufferProgressBar">
			<AnimatedCirucularProgressbar
				valueStart={prevTorrentProgess / 0.05 * 10}
				valueEnd={torrentProgress / 0.05 * 10}
			/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	torrents: state.torrents,
});

const mapDispatchToProps = (dispatch) => ({
	updateTorrents: (torrents) => dispatch(updateTorrents(torrents)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BufferScreen);
