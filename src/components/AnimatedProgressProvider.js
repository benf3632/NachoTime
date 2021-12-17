import { useEffect, useState } from "react";
import { Animate } from "react-move";

const AnimatedProgressProvider = ({
	children,
	valueEnd,
	valueStart,
	easingFunction,
	duration,
}) => {
	return (
		<Animate
			start={() => ({
				value: valueStart,
			})}
			update={() => ({
				value: [valueEnd],
				timing: {
					duration: duration * 1000,
					ease: easingFunction,
				},
			})}
		>
			{({ value }) => children(value)}
		</Animate>
	);
};

AnimatedProgressProvider.defaultProps = {
	valueStart: 0,
};

export default AnimatedProgressProvider;
