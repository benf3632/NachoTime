import { useParams } from "react-router";
import { Player, ControlBar } from "video-react";

import "video-react/dist/video-react.css";

const PlayerScreen = () => {
	let { filePath } = useParams();
	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Player height="100%" fluid={false} autoPlay>
				<source src={`file://${decodeURIComponent(filePath)}`} />
				<ControlBar autoHide />
			</Player>
		</div>
	);
};

export default PlayerScreen;
