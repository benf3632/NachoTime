const webTorrent = (state = [], action) => {
  switch (action.type) {
    case "ADD_TORRENT":
      return [...state, action.torrent];
    case "UPDATE_TORRENT":
      return state.map((torrent) =>
        torrent.infoHash === action.torrent.infoHash
          ? { ...torrent, ...action.torrent }
          : torrent
      );
    case "STOP_TORRENT":
      return state.map((torrent) =>
        torrent.magnetUri === action.magnetURI
          ? {
              ...torrent,
              downloadSpeed: 0.0,
              uploadSpeed: 0.0,
              stopped: true,
            }
          : torrent
      );
    case "DELETE_TORRENT":
      return state.filter((torrent) => torrent.magnetUri !== action.magnetURI);
    default:
      return state;
  }
};

export default webTorrent;
