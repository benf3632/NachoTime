import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";
import IMDBLogo from "../assets/IMDB_Logo.svg";

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
		<div
			style={{
				display: "flex",
				width: "100%",
				flexDirection: "column",
				padding: "40px",
			}}
		>
			<div
				style={{
					display: "flex",
					width: "100%",
					flexDirection: "row",
				}}
			>
				<Link style={{}} to="/">
					<MdOutlineArrowBackIos
						style={{
							width: "100%",
							height: "100%",
							color: "white",
						}}
					/>
				</Link>
				<span
					style={{
						flex: 1,
						justifyContent: "center",
						display: "flex",
						color: "white",
						fontWeight: "bold",
						fontSize: "1.5em",
					}}
				>
					{movieDetails && movieDetails.title_long}
				</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					paddingTop: "3%",
				}}
			>
				<div
					style={{
						width: "25%",
					}}
				>
					<img
						src={movieDetails && movieDetails.large_cover_image}
						style={{
							width: "100%",
						}}
					/>
				</div>
				<div
					style={{
						display: "flex",
						flex: 2,
						color: "white",
						paddingLeft: "2%",
						paddingRight: "2%",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<span
						style={{
							fontSize: "1em",
							height: "100%",
							display: 'flex',
							justifyContent:'space-between',
							flexDirection: 'column'
						}}
					>
						<div style={{
							height: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-evenly'
							}}>
							{movieDetails && movieDetails.genres.join(" - ")}
							<img
								src={IMDBLogo}
								alt="imdb"
								style={{
									width: '10%',
									display: "inline-block",
									objectFit: "contain",
								}}
							/>
						</div>
						{movieDetails && movieDetails.description_full}
					</span>
					<div>
						<span>Test</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieScreen;
