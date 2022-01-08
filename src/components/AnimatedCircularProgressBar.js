import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

const AnimatedCirucularProgressbar = ({ valueStart, valueEnd }) => {
	return (
		<AnimatedProgressProvider
			valueStart={valueStart}
			valueEnd={valueEnd}
			duration={0.5}
			easingFunction={easeQuadInOut}
		>
			{(value) => {
				const roundedValue = Math.round(value);
				return (
					<CircularProgressbar
						value={value}
						text={`${roundedValue} %`}
						styles={buildStyles({ pathTransition: "none" })}
					/>
				);
			}}
		</AnimatedProgressProvider>
	);
};

export default AnimatedCirucularProgressbar;
