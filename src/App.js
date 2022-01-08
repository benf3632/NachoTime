import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import path from "path";
import os from "os";

// componenets
import SideNav from "./components/SideNav";
import AlertMessages from "./components/AlertMessages";

// screens
import MoviesScreen from "./screens/MoviesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import MovieScreen from "./screens/MovieScreen";
import DownloadsScreen from "./screens/DownloadsScreen";
import BufferScreen from "./screens/BufferScreen";
import PlayerScreen from "./screens/PlayerScreen";
import SettingsScreen from "./screens/SettingsScreen";

// actions
import { startTorrent } from "./actions/webTorrent";
import { setSetting } from "./actions/settings";

// css
import "./App.css";

const { ipcRenderer } = window.require("electron");

function App({ torrents, settings, setSetting, startTorrent }) {
  const [selectedScreen, setSelectedScreen] = useState(<MoviesScreen />);

  const changeScreenHandler = (screen) => {
    setSelectedScreen(screen);
  };

  useEffect(() => {
    if (settings.torrentsDownloadPath === undefined) {
      const userDataPath = ipcRenderer.sendSync("get-userdata-path");
      setSetting("torrentsDownloadPath", path.join(userDataPath, "/Downloads"));
    }
    if (settings.vlcPath === undefined) {
      switch (os.platform()) {
        case "linux":
          setSetting("vlcPath", "/usr/bin/vlc");
          break;
        case "win32":
          setSetting("vlcPath", "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe");
          break;
        // TODO: Add darwin default vlc path
        default:
          setSetting("vlcPath", "");
          break;
      }
    }
    torrents
      .filter((torrent) => !torrent.stopped)
      .forEach((torrent) => {
        startTorrent(torrent.magnetUri, settings.torrentsDownloadPath);
      });
  }, []);

  return (
    <div className="App">
      <AlertMessages />
      <Router>
        <SideNav
          moviesScreen={<MoviesScreen />}
          favoritesScreen={<FavoritesScreen />}
          downloadsScreen={<DownloadsScreen />}
          settingsScreen={<SettingsScreen />}
          changeScreenHandler={changeScreenHandler}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            zIndex: 0,
          }}
        >
          <Switch>
            <Route replace path="/movie/:movieID">
              <MovieScreen />
            </Route>
            <Route replace path="/buffer/:torrentInfoHash/:imdbid?/:langcode?">
              <BufferScreen />
            </Route>
            <Route path="/player/:filePath/:imdbid?/:langcode?">
              <PlayerScreen />
            </Route>
            <Route replace path="/">
              <div className="MainScreen">{selectedScreen}</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  torrents: state.torrents,
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  startTorrent: (magnetURI, torrentPath) =>
    dispatch(startTorrent(magnetURI, torrentPath)),
  setSetting: (settingName, settingValue) =>
    dispatch(setSetting(settingName, settingValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
