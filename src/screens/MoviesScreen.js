import InfiniteScroll from "../components/InfiniteScroller";
import { useState, useRef } from "react";
import Loader from "react-loader-spinner";
import MoviesGrid from "../components/MoviesGrid";

const listMovies = async (page) => {
  const resp = await fetch(
    `https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}&sort_by=download_count`
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
  const scrollerRef = useRef();

  const loadMovies = async (page) => {
    const new_movies = await listMovies(page);
    if (new_movies.length === 0) {
      setHasMoreMovies(false);
    } else {
      setMovies([...movies, ...new_movies]);
    }
  };

  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <div
        style={{
          position: "fixed",
          display: "flex",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          height: "50px",
          width: "100%",
        }}
      >
        Header
      </div>
      <div style={{ height: "100%", overflow: "auto", marginTop: "50px" }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMovies}
          hasMore={hasMoreMovies}
          useWindow={false}
          ref={(ref) => (scrollerRef.current = ref)}
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
    </div>
  );
};

export default MoviesScreen;
