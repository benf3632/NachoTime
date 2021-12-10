const { ipcRenderer } = window.require("electron");

export const startNewTorrent = (torrentName, magnetURI, infoHash, path) => {
	return (dispatch, getState) => {
		const state = getState().torrents;
		const existingTorrent = state.find(
			(torrent) => torrent.infoHash === infoHash
		);
		if (!existingTorrent)
			dispatch(
				addTorrent({
					infoHash,
					magnetURI,
					name: torrentName,
					progress: 0.0,
					downloaded: 0,
					downloadSpeed: 0.0,
					uploadSpeed: 0.0,
					numPeers: 0,
					length: 0,
					ready: false,
					stopped: false,
				})
			);
		else {
			if (!existingTorrent.stopped) return;
		}
		dispatch(startTorrent(magnetURI));
	};
};

export const startTorrent = (magnetURI) => {
	return (dispatch, getState) => {
		ipcRenderer.send("wt-start-torrenting", magnetURI);
		ipcRenderer.once("wt-torrenting-started", (event, torrent) => {
			dispatch(updateTorrent(torrent));
		});
	};
};

export const addTorrent = (torrent) => ({
	type: "ADD_TORRENT",
	torrent,
});

export const updateTorrent = (torrent) => ({
	type: "UPDATE_TORRENT",
	torrent,
});

export const updateTorrents = (torrents) => {
	return (dispatch, getState) => {
		torrents.map((torrent) => dispatch(updateTorrent(torrent)));
	};
};

export const stopTorrent = (magnetURI) => {
	ipcRenderer.send("wt-stop-torrenting", decodeURI(magnetURI));
	return {
		type: "STOP_TORRENT",
		magnetURI,
	};
};

export const deleteTorrent = (magnetURI) => {
	ipcRenderer.send("wt-destroy-torrent", decodeURI(magnetURI));
	return {
		type: "DELETE_TORRENT",
		magnetURI,
	};
};
