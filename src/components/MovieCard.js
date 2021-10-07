import "./MovieCard.css";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const MovieCard = ({ movieDetails }) => {
  const [coverLoading, setCoverLoading] = useState(true);
  const [loadCover, setLoadCover] = useState(true);

  const handleCoverLoaded = () => {
    setCoverLoading(false);
  };

  const handleCoverError = () => {
    console.log("Failed to load cover");
    setLoadCover(false);
    setCoverLoading(false);
  };
  return (
    <div className="MovieCardWrapper">
      <div className="MovieCardCover">
        {coverLoading && (
          <SkeletonTheme
            color="#202020"
            highlightColor="#444"
            className="MovieCardCover"
          >
            <Skeleton width={150} height={200} />
          </SkeletonTheme>
        )}
        {!loadCover ? (
          <div
            className="MovieCardCover"
            style={{ backgroundColor: "black" }}
          ></div>
        ) : (
          <img
            className="MovieCardCover"
            style={coverLoading ? { display: "none" } : {}}
            src={movieDetails.medium_cover_image}
            onLoad={handleCoverLoaded}
            onError={handleCoverError}
            alt="cover"
          />
        )}
      </div>
      <div className="MovieCardContentWrapper">
        <div className="MovieCardContent">
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
    </div>
  );
};

export default MovieCard;
