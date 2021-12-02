import { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// componenets
import SideNav from "./components/SideNav";

// screens
import MoviesScreen from "./screens/MoviesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import MovieScreen from "./screens/MovieScreen";
import DownloadsScreen from "./screens/DownloadsScreen";

// css
import "./App.css";

function App() {
	const [selectedScreen, setSelectedScreen] = useState(<MoviesScreen />);
	const changeScreenHandler = (screen) => {
		setSelectedScreen(screen);
	};

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

export default App;
