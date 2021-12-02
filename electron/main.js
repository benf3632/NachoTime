const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const WebTorrent = require("webtorrent");
const util = require("util");

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
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	mainWindow.loadURL(startUrl);
	// mainWindow.removeMenu();
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
	setInterval(updateTorrentProgress, 1000);
}

app.on("ready", createWindow);

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

// Web Torrents events
ipcMain.on("wt-start-torrenting", (event, torrentId) => {
	try {
		client.add(torrentId, { path: "/home/cookies/webtorrent" });
	} catch {}
});

ipcMain.on("wt-get-torrents", (event) => {
	event.returnValue = getTorrentProgress();
});

const updateTorrentProgress = () => {
	const progress = getTorrentProgress();

	if (prevProgress && util.isDeepStrictEqual(progress, prevProgress)) {
		return;
	}

	mainWindow.webContents.send("wt-progress", progress);
	prevProgress = progress;
};

const getTorrentProgress = () => {
	const progress = client.progress;
	const hasActiveTorrents = client.torrents.some(
		(torrent) => torrent.progress !== 1
	);

	const torrentProg = client.torrents.map((torrent) => {
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
			torrentInfoHash: torrent.infoHash,
			torrentName: torrent.name,
			ready: torrent.ready,
			progress: torrent.progress,
			downloaded: torrent.downloaded,
			downloadSpeed: torrent.downloadSpeed,
			uploadSpeed: torrent.uploadSpeed,
			numPeers: torrent.numPeers,
			length: torrent.length,
			bitfield: torrent.bitfield,
			mp4file: fileProg,
		};
	});

	return {
		torrents: torrentProg,
		progress,
		hasActiveTorrents,
	};
};
