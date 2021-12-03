const webTorrent = (state = [], action) => {
	switch (action.type) {
		case "ADD_TORRENT":
			return [...state, action.torrent];
		case "UPDATE_TORRENT":
			return state.map((torrent) =>
				torrent.infoHash === action.torrent.infoHash
					? action.torrent
					: torrent
			);
		default:
			return state;
	}
};

export default webTorrent;
