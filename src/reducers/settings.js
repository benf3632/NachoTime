const settings = (state = {}, action) => {
	switch(action.type) {
		case "SET_SETTING":
			let newState = Object.assign({}, state);
			newState[action.name] = action.value;
			return newState;
		default:
			return state;
	}	
};
export default settings;
