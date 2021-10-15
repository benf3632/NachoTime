import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
const MovieScreen = () => {
  let { movieID } = useParams();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        color: "white",
        flexDirection: "column",
      }}
    >
      {movieID}
      <Link
        style={{
          height: "25px",
          width: "25px",
          textAlign: "center",
        }}
        to="/"
      >
        <MdOutlineArrowBackIos
          style={{
            width: "100%",
            height: "100%",
            color: "black",
          }}
        />
      </Link>
    </div>
  );
};

export default MovieScreen;
