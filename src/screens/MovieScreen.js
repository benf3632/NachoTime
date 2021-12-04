import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// actions
import { startNewTorrent } from "../actions/webTorrent";

// components
import MaterialButton from "../components/MaterialButton";

// assets
import IMDBLogo from "../assets/IMDB_Logo.svg";

// css
import "./MovieScreen.css";

// consts
const trackers =
	"tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337";

const fetchMovieDetails = async (movieId) => {
	const response = await fetch(
		`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`
	);
	const json = await response.json();
	return json.data.movie;
};

const MovieScreen = ({ startNewTorrent }) => {
	let { movieID } = useParams();
	const [movieDetails, setMovieDetails] = useState(null);
	const [coverLoading, setCoverLoading] = useState(true);

	const handleCoverLoaded = () => {
		setCoverLoading(false);
	};

	const handleDownloadMovieClick = () => {
		const torrentId = `magnet:?xt=urn:btih:${movieDetails.torrents[2].hash}&${trackers}`;
		startNewTorrent(
			`${movieDetails.title_long} (${movieDetails.torrents[2].quality})`,
			torrentId,
			movieDetails.torrents[2].hash.toLowerCase(),
			"/home/cookies/webtorrent"
		);
	};

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
			<Link to="/" className="MovieScreenBackIconContainer">
				<MdOutlineArrowBackIos className="MovieScreenBackIcon" />
			</Link>
			<div className="MovieScreenContentContainer">
				<div className="MovieScreenMovieCoverContainer">
					{coverLoading && (
						<SkeletonTheme
							className="MovieScreenMovieCover"
							highlightColor="#444"
							color="#202020"
						>
							<Skeleton
								width={300}
								height={300}
								className="MovieScreenMovieCover"
							/>
						</SkeletonTheme>
					)}
					<img
						className="MovieScreenMovieCover"
						style={coverLoading ? { display: "none" } : {}}
						onLoad={handleCoverLoaded}
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
						<MaterialButton
							onClick={handleDownloadMovieClick}
							style={{ marginLeft: "1%" }}
						>
							Download Movie
						</MaterialButton>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startNewTorrent: (torrentName, magnetURI, infoHash, path) =>
		dispatch(startNewTorrent(torrentName, magnetURI, infoHash, path)),
});

export default connect((state) => {}, mapDispatchToProps)(MovieScreen);
