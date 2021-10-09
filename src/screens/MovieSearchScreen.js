import "./MovieSearchScreen.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
const MovieSearchScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div>
      <div
        className="Search"
        style={searchValue !== "" ? { width: "200px" } : {}}
      >
        <FaSearch color="#5f6f7d" />
        <input
          //   placeholder="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          style={searchValue === "" ? {} : { display: "flex", width: "85%" }}
        ></input>
      </div>
    </div>
  );
};

export default MovieSearchScreen;
