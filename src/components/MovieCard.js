import "./MovieCard.css";
import ReactStars from "react-rating-stars-component";
const MovieCard = ({ movieDetails }) => {
  return (
    <div
      className="MovieCardWrapper"
      style={{
        backgroundImage: `url("${movieDetails.medium_cover_image}")`,
      }}
    >
      <div className="MovieCardDetails">
        <span
          style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
        >
          {movieDetails.title_long}
        </span>
        <ReactStars
          edit={false}
          value={movieDetails.rating / 2}
          isHalf={true}
          size={24}
        />
      </div>
    </div>
  );
};

export default MovieCard;
