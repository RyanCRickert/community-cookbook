import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
import DashboardPage from "../components/DashboardPage";
import NotFoundPage from "../components/NotFoundPage";
import AddRecipePage from "../components/AddRecipePage";
import EditRecipePage from "../components/EditRecipePage";
import ViewRecipePage from "../components/ViewRecipePage";

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
			<Switch>
				<Route path="/" component={DashboardPage} exact/>
				<Route path="/add" component={AddRecipePage} />
				<Route path="/edit/:id" component={EditRecipePage} />
				<Route path="/view/:id" component={ViewRecipePage} />
				<Route component={NotFoundPage} />
			</Switch>
	</Router>
);

export default AppRouter;