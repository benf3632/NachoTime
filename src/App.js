import { useState } from "react";

// componenets
import SideNav from "./components/SideNav";

// screens
import MoviesScreen from "./screens/MoviesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import MovieSearchScreen from "./screens/MovieSearchScreen";

// css
import "./App.css";

function App() {
  const [selectedScreen, setSelectedScreen] = useState(<MoviesScreen />);

  const changeScreenHandler = (screen) => {
    setSelectedScreen(screen);
  };

  return (
    <div className="App">
      <SideNav
        moviesScreen={<MoviesScreen />}
        favoritesScreen={<FavoritesScreen />}
        movieSearchScreen={<MovieSearchScreen />}
        changeScreenHandler={changeScreenHandler}
      />
      <div className="MainScreen">{selectedScreen}</div>
    </div>
  );
}

export default App;
