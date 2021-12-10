export const addMessage = (message, type) => {
	console.log("Add message action", message);
	return {
		type: "ADD_MESSAGE",
		message: {
			text: message,
			type,
		},
	};
};

export const deleteMessage = (id) => {
	return {
		type: "DELETE_MESSAGE",
		id,
	};
};
