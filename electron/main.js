const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const url = require("url");
const WebTorrent = require("webtorrent");
const util = require("util");
const { spawn } = require("child_process");

const client = new WebTorrent();
let prevProgress = null;

let mainWindow;

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 720,
    minWidth: 1300,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    icon: path.join(__dirname, "./icon.png"),
  });
  mainWindow.loadURL(startUrl);
  mainWindow.removeMenu();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  setInterval(updateTorrentProgress, 1000);
}

app.on("ready", () => {
  createWindow();
});

const openVLC = (vlcPath, filePath) => {
  spawn(vlcPath, [filePath], { detached: true });
};

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// getpath
ipcMain.on("get-userdata-path", (event) => {
  const userDataPath = app.getPath("userData");
  event.returnValue = userDataPath;
});

// dialog event
ipcMain.handle("select-folder", async (event, defaultPath) => {
  const selectedFolder = await dialog.showOpenDialog({
    options: { title: "Select Folder", defaultPath, buttonLabel: "Select" },
    properties: ["openDirectory"],
  });
  return selectedFolder;
});

ipcMain.handle("select-file", async (event, defaultPath) => {
  const selectedFile = await dialog.showOpenDialog({
    options: { title: "Select File", defaultPath, buttonLabel: "Select" },
    properties: ["openFile"],
  });
  return selectedFile;
});

ipcMain.on("open-vlc", (event, vlcPath, filePath) => {
  openVLC(vlcPath, filePath);
});

// Web Torrents events

// start torrenting event
ipcMain.on("wt-start-torrenting", (event, torrentId, torrentPath) => {
  if (!torrentId) return;
  const torrent = client.add(torrentId, {
    path: torrentPath,
  });
  torrent.on("ready", () => {
    event.reply("wt-torrenting-started", {
      magnetUri: torrent.magnetURI,
      infoHash: torrent.infoHash,
      name: torrent.name,
      ready: torrent.ready,
      progress: torrent.progress,
      downloaded: torrent.downloaded,
      downloadSpeed: torrent.downloadSpeed,
      uploadSpeed: torrent.uploadSpeed,
      numPeers: torrent.numPeers,
      length: torrent.length,
      paused: false,
      stopped: false,
    });
  });
});

ipcMain.on("wt-stop-torrenting", (event, magnetURI) => {
  if (!magnetURI) return;
  const torrent = client.get(magnetURI);
  torrent.destroy({ destroyStore: false });
});

ipcMain.on("wt-destroy-torrent", (event, magnetURI) => {
  if (!magnetURI) return;
  const torrent = client.get(magnetURI);
  torrent.destroy({ destroyStore: true });
});

// get torrents event
ipcMain.on("wt-get-torrents", (event) => {
  event.returnValue = getTorrentProgress();
});

ipcMain.on("wt-pause-torrenting", (event, magnetUri) => {
  const torrent = client.get(magnetUri);
  torrent.pause();
});

ipcMain.on("wt-resume-torrenting", (event, magnetUri) => {
  const torrent = client.get(magnetUri);
  torrent.resume();
});

// sends torrent progress to renderer
const updateTorrentProgress = () => {
  const progress = getTorrentProgress();

  if (prevProgress && util.isDeepStrictEqual(progress, prevProgress)) {
    return;
  }

  mainWindow.webContents.send("wt-progress", progress);
  prevProgress = progress;
};

// gets the progress of all torrents
const getTorrentProgress = () => {
  const progress = client.progress;
  const hasActiveTorrents = client.torrents.some(
    (torrent) => torrent.progress !== 1
  );

  const torrentProg = client.torrents
    .filter((torrent) => torrent.ready)
    .map((torrent) => {
      const mp4File =
        torrent.files &&
        torrent.files.find((file) => {
          return file.name.endsWith(".mp4");
        });

      const fileProg = mp4File && {
        name: mp4File.name,
        progress: mp4File.progress,
        length: mp4File.length,
        downloaded: mp4File.downloaded,
        path: mp4File.path,
      };

      return {
        magnetUri: torrent.magnetURI,
        infoHash: torrent.infoHash,
        name: torrent.name,
        ready: torrent.ready,
        progress: torrent.progress,
        downloaded: torrent.downloaded,
        downloadSpeed: torrent.downloadSpeed,
        uploadSpeed: torrent.uploadSpeed,
        numPeers: torrent.numPeers,
        length: torrent.length,
        file: fileProg,
        paused: torrent.paused,
        stopped: false,
      };
    });

  return {
    torrents: torrentProg,
    progress,
    hasActiveTorrents,
  };
};
