import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetRecipes } from "./actions/recipes";
import { login, logout } from "./actions/auth";
import getVisibleRecipes from "./selectors/recipes";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { firebase } from "./firebase/firebase";

const store = configureStore();
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
let hasRendered = false;

const renderApp = () =>{
	if(!hasRendered) {
		store.dispatch(startSetRecipes()).then(() => {
			ReactDOM.render(jsx, document.getElementById("app"));
			hasRendered = true;
		});
}
};

renderApp();