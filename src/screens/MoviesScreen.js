import MovieCard from "../components/MovieCard";
import { SpringGrid, makeResponsive, measureItems } from "react-stonecutter";
import InfiniteScroll from "react-infinite-scroller";
import { useState } from "react";

const Grid = makeResponsive(measureItems(SpringGrid), {
  maxWidth: 1920,
  minPadding: 100,
});

const listMovies = async (page) => {
  const resp = await fetch(
    `https://yts.mx/api/v2/list_movies.json?page=${page}`
  );
  const json = await resp.json();
  return json["data"]["movies"];
};

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = async (page) => {
    const new_movies = await listMovies(page);
    setMovies([...movies, ...new_movies]);
  };

  return (
    <InfiniteScroll
      useWindow={false}
      pageStart={0}
      loadMore={loadMovies}
      hasMore={true}
    >
      <Grid
        component="ul"
        columns={20}
        gutterWidth={20}
        gutterHeight={20}
        columnWidth={150}
        itemHeight={200}
        springConfig={{ stiffness: 170, damping: 26 }}
      >
        {movies.map((movie, index) => (
          <li
            key={index}
            style={{
              listStyle: "none",
            }}
          >
            <MovieCard movieDetails={movie} />
          </li>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default MoviesScreen;
