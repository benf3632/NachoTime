const messages = (state = [], action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state, action.message];
    case "DELETE_MESSAGE":
      let newMessages = state.slice();
      newMessages.splice(action.id, 1);
      return newMessages;
    default:
      return state;
  }
};

export default messages;
