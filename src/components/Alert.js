import { useEffect } from "react";

// css
import "./Alert.css";

const alertClass = (type) => {
	const classes = {
		error: "alert-error",
		success: "alert-success",
	};
	return classes[type] || "alert-success";
};

const Alert = ({ onClose, message, type }) => {
	useEffect(() => {
		setTimeout(() => {
			onClose();
		}, 5000);
	}, [onClose]);

	return (
		<div className={`alert ${alertClass(type)} alert-fade-in`}>
			{message}
		</div>
	);
};

export default Alert;
