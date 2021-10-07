import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroller";
import { useState, useRef } from "react";
import Loader from "react-loader-spinner";
import MoviesGrid from "../components/MoviesGrid";

const listMovies = async (page) => {
  const resp = await fetch(
    `https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}`
  );
  const json = await resp.json();
  if (json["status"] !== "ok" || json["data"]["movies"] === undefined) {
    return [];
  }
  return json["data"]["movies"];
};

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const moviesScrollRef = useRef();

  const loadMovies = async (page) => {
    console.log(page);
    const new_movies = await listMovies(page);
    if (new_movies.length === 0) {
      setHasMoreMovies(false);
    } else {
      setMovies([...movies, ...new_movies]);
    }
  };

  return (
    <div
      style={{ height: "100%", overflow: "auto" }}
      ref={(ref) => (moviesScrollRef.current = ref)}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMovies}
        hasMore={hasMoreMovies}
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
        <MoviesGrid movies={movies} />
      </InfiniteScroll>
    </div>
  );
};

export default MoviesScreen;
