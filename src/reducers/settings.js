const settings = (state = {}, action) => {
	switch(action.type) {
		case "SET_SETTING":
			let new_state = state;
			new_state[action.name] = action.value;
			return new_state;
		default:
			return state;
	}	
};
export default settings;
