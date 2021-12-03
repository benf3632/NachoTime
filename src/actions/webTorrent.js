const { ipcRenderer } = window.require("electron");

export const startTorrent = (torrentName, magnetURI, infoHash, path) => {
	return (dispatch, getState) => {
		const state = getState();
		if (!state.find((torrent) => torrent.magnetURI === magnetURI))
			dispatch(addTorrent({infoHash, magnetURI, name: torrentName, ready: false, stopped: false}));
		ipcRenderer.send("wt-start-torrenting", magnetURI);
		ipcRenderer.once("wt-torrenting-started", (event, torrent) => {
			console.log("READY EVENT: ", torrent);
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
		torrents.map(torrent => dispatch(updateTorrent(torrent)));
	}
};
