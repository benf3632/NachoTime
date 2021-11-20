import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";

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

	useEffect( () => {
		const fetchMovie = async () => {
			const movie = await fetchMovieDetails(movieID);
			setMovieDetails(movie);
		};
		fetchMovie();
	}, [movieID]);

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
			{movieID}<br></br>
			{movieDetails && movieDetails.title}	
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
