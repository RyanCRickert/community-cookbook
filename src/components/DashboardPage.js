import React from "react";
import Header from "./Header";
import RecipeList from "./RecipeList";
import RecipeListFilters from "./RecipeListFilters";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <Header />
    <RecipeListFilters />
    <RecipeList />
  </div>
);