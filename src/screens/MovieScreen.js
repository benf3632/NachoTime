import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";

import MaterialButton from "../components/MaterialButton";

import IMDBLogo from "../assets/IMDB_Logo.svg";

import "./MovieScreen.css";

const fetchMovieDetails = async (movieId) => {
	const response = await fetch(
		`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`
	);
	const json = await response.json();
	return json.data.movie;
};

const MovieScreen = () => {
	let { movieID } = useParams();
	const [movieDetails, setMovieDetails] = useState(null);

	useEffect(() => {
		const fetchMovie = async () => {
			const movie = await fetchMovieDetails(movieID);
			console.log(movie);
			setMovieDetails(movie);
		};
		fetchMovie();
	}, [movieID]);

	return (
		<div className="MovieScreenContainer">
			<div className="MovieScreenTitleContainer">
				<Link to="/">
					<MdOutlineArrowBackIos className="MovieScreenBackIcon" />
				</Link>
			</div>
			<div className="MovieScreenContentContainer">
				<div className="MovieScreenMovieCoverContainer">
					<img
						className="MovieScreenMovieCover"
						src={movieDetails && movieDetails.large_cover_image}
					/>
				</div>
				<div className="MovieScreenMovieDetailsContainer">
					<div>
						<p className="MovieScreenTitle">
							{movieDetails && movieDetails.title_long}
						</p>
						<p>{movieDetails && movieDetails.genres.join(" - ")}</p>
						<p>{movieDetails && movieDetails.description_full}</p>
					</div>
					<div>
						<MaterialButton>Watch Movie</MaterialButton>
						<MaterialButton style={{ marginLeft: "1%" }}>
							Download Movie
						</MaterialButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieScreen;
