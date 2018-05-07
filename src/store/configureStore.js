import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import recipesReducer from "../reducers/recipes";
import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";
import shoppingCartReducer from "../reducers/shoppingCart";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            recipes: recipesReducer,
            filters: filtersReducer,
            auth: authReducer,
            shoppingCart: shoppingCartReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};