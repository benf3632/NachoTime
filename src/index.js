import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import webTorrent from "./reducers/webTorrent";
import reportWebVitals from "./reportWebVitals";

import { throttle } from "lodash";

import { loadState, saveState } from "./localStorage";

// actions
import { startTorrent } from "./actions/webTorrent";

const persistedState = loadState();
const store = createStore(webTorrent, persistedState, applyMiddleware(thunk));

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
