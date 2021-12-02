const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const WebTorrent = require("webtorrent");

const client = new WebTorrent();
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
		const torrent = client.add(torrentId, { path: "/tmp/webtorrent" });
	} catch {
	}
});
