import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
import DashboardPage from "../components/DashboardPage";
import NotFoundPage from "../components/NotFoundPage";
import AddRecipePage from "../components/AddRecipePage";
import EditRecipePage from "../components/EditRecipePage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ShoppingCartPage from "../components/ShoppingCartPage";
import ViewRecipePage from "../components/ViewRecipePage";
import ViewRecipePageLogged from "../components/ViewRecipePageLogged";

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
			<Switch>
				<Route path="/" component={DashboardPage} exact/>
				<PrivateRoute path="/add" component={AddRecipePage} />
				<PrivateRoute path="/edit/:id" component={EditRecipePage} />
				<PublicRoute path="/view/:id" component={ViewRecipePage} />
				<PrivateRoute path="/viewLogged/:id" component={ViewRecipePageLogged} />
				<PrivateRoute path="/cart" component={ShoppingCartPage} />
				<Route component={NotFoundPage} />
			</Switch>
	</Router>
);

export default AppRouter;