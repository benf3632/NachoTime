import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { connect } from "react-redux";

// components
import AnimatedCirucularProgressbar from "../components/AnimatedCircularProgressBar";

// actions
import { updateTorrents } from "../actions/webTorrent";

// css
import "./BufferScreen.css";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

// electron
const { ipcRenderer } = window.require("electron");

const BufferScreen = ({ torrents, updateTorrents }) => {
  let location = useLocation();
  let history = useHistory();
  const [torrentProgress, setTorrentProgess] = useState(0.0);
  const [prevTorrentProgess, setPrevTorrentProgress] = useState(0.0);
  const [finishedBuffering, setFinishedBuffering] = useState(false);
  const { torrentInfoHash, imdbid, langcode } = useParams();

  const handleBackButtonClick = () => {
    history.goBack();
  };

  // listen for torrents progress
  useEffect(() => {
    ipcRenderer.on("wt-progress", (event, progress) => {
      updateTorrents(progress.torrents);
    });
    return () => ipcRenderer.removeAllListeners("wt-progress");
  }, [torrentInfoHash, updateTorrents]);

  // check for current torrent's progress
  useEffect(() => {
    const currentTorrent = torrents.find(
      (torrent) => torrent.infoHash === torrentInfoHash
    );

    if (!currentTorrent) return;

    if (currentTorrent.progress >= 0.05) {
      if (!finishedBuffering) {
        location.state.bufferLoadedCallback(currentTorrent, imdbid, langcode);
        setTorrentProgess(0.05);
        setFinishedBuffering(true);
      }
    } else {
      setPrevTorrentProgress(torrentProgress);
      setTorrentProgess(currentTorrent.progress);
    }
  }, [
    torrents,
    torrentProgress,
    prevTorrentProgess,
    location,
    torrentInfoHash,
    finishedBuffering,
    imdbid,
    langcode,
  ]);

  return (
    <div className="BufferScreenContainer">
      <button
        className="BufferScreenBackIconContainer"
        onClick={handleBackButtonClick}
      >
        <MdOutlineArrowBackIos className="BufferScreenBackIcon" />
      </button>
      <div className="BufferProgressBar">
        <AnimatedCirucularProgressbar
          valueStart={Math.floor((prevTorrentProgess / 0.05) * 100)}
          valueEnd={Math.floor((torrentProgress / 0.05) * 100)}
        />
        {finishedBuffering ? <p>Opening VLC</p> : <p>Buffering ...</p>}
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
