import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

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

// actions
import { startTorrent } from "./actions/webTorrent";

// css
import "./App.css";

function App({ torrents, startTorrent }) {
	const [selectedScreen, setSelectedScreen] = useState(<MoviesScreen />);

	const changeScreenHandler = (screen) => {
		setSelectedScreen(screen);
	};

	useEffect(() => {
		torrents
			.filter((torrent) => !torrent.stopped)
			.forEach((torrent) => {
				startTorrent(torrent.magnetUri);
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
						<Route replace path="/buffer/:torrentInfoHash">
							<BufferScreen />
						</Route>
						<Route path="/player/:filePath">
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
});

const mapDispatchToProps = (dispatch) => ({
	startTorrent: (magnetURI) => dispatch(startTorrent(magnetURI)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
