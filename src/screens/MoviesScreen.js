import MovieCard from "../components/MovieCard";
import { SpringGrid, makeResponsive, measureItems } from "react-stonecutter";
import InfiniteScroll from "react-infinite-scroller";
import { useState, useRef } from "react";
import Loader from "react-loader-spinner";

const Grid = makeResponsive(measureItems(SpringGrid), {
  maxWidth: 1920,
  minPadding: 100,
});

const listMovies = async (page) => {
  const resp = await fetch(
    `https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}`
  );
  const json = await resp.json();
  return json["data"]["movies"];
};

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const moviesScrollRef = useRef();

  const loadMovies = async (page) => {
    console.log(page);
    const new_movies = await listMovies(page);
    setMovies([...movies, ...new_movies]);
  };

  return (
    <div
      style={{ height: "100%", overflow: "auto" }}
      ref={(ref) => (moviesScrollRef.current = ref)}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMovies}
        hasMore={true || false}
        useWindow={false}
        getScrollParent={() => moviesScrollRef.current}
        loader={
          <div
            style={{
              width: "150px",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              borderRadius: "25px",
            }}
          >
            <Loader type="TailSpin" color="grey" />
          </div>
        }
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
    </div>
  );
};

export default MoviesScreen;
