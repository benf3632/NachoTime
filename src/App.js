import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// componenets
import SideNav from "./components/SideNav";

// screens
import MoviesScreen from "./screens/MoviesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import MovieScreen from "./screens/MovieScreen";
import DownloadsScreen from "./screens/DownloadsScreen";

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
			<Router>
				<SideNav
					moviesScreen={<MoviesScreen />}
					favoritesScreen={<FavoritesScreen />}
					downloadsScreen={<DownloadsScreen />}
					changeScreenHandler={changeScreenHandler}
				/>
				<Switch>
					<Route path="/movie/:movieID">
						<MovieScreen />
					</Route>
					<Route path="/">
						<div className="MainScreen">{selectedScreen}</div>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => ({
	torrents: state,
});

const mapDispatchToProps = (dispatch) => ({
	startTorrent: (magnetURI) => dispatch(startTorrent(magnetURI)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
