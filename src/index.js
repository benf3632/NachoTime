import React from "react";
import ReactDOM from "react-dom";

// redux
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// components
import App from "./App";

// css
import "./index.css";

// reducers
import webTorrent from "./reducers/webTorrent";
import messages from "./reducers/messagesReducer";
import settings from "./reducers/settings";

import { throttle } from "lodash";

import { loadState, saveState } from "./localStorage";

// load state
const persistedState = loadState();

// create store
const store = createStore(combineReducers({torrents: webTorrent, messages, settings}), persistedState, applyMiddleware(thunk));

// save store every 1 second
store.subscribe(
	throttle(() => {
		saveState(store.getState());
	}, 1000)
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
