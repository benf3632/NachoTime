import "./MaterialButton.css";

const MaterialButton = (props) => {
	return (
		<button
			style={props.style}
			onClick={props.onClick}
			className={`pure-material-button-contained ${props.className}`}
		>
			{props.children}
		</button>
	);
};

export default MaterialButton;
