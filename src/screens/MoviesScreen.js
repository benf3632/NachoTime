import { useState, useRef } from "react";
import Loader from "react-loader-spinner";

// componenets
import InfiniteScroll from "../components/InfiniteScroller";
import MoviesGrid from "../components/MoviesGrid";

// icons
import { FaSearch } from "react-icons/fa";

// css
import "./MoviesScreen.css";

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

const searchMovies = async (query, page) => {
  const resp = await fetch(
    `https://yts.mx/api/v2/list_movies.json?limit=50&query_term=${query}&page=${page}&sort_by=download_count`
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
  const [searchValueInput, setSearchValueInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const scrollerRef = useRef();

  const loadMovies = async (page) => {
    let new_movies = [];
    if (isSearching) {
      new_movies = await searchMovies(searchValueInput, page);
    } else {
      new_movies = await listMovies(page);
    }
    if (new_movies.length === 0) {
      setHasMoreMovies(false);
    } else {
      setMovies([...movies, ...new_movies]);
    }
  };

  const resetMovies = () => {
    scrollerRef.current.setPage(0);
    setMovies([]);
    setHasMoreMovies(true);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      if (searchValueInput === "") {
        resetMovies();
        setIsSearching(false);
      } else {
        resetMovies();
        setIsSearching(true);
      }
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
        <div className="Search">
          <FaSearch color="#5f6f7d" />
          <input
            placeholder="Search"
            value={searchValueInput}
            onChange={(event) => setSearchValueInput(event.target.value)}
            onKeyPress={(e) => handleKeypress(e)}
          ></input>
        </div>
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
