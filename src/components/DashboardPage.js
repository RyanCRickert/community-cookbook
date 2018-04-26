import React from "react";
import RecipeList from "./RecipeList";
import RecipeListFilters from "./RecipeListFilters";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <h1><Link to="/add">Community Cookbook</Link></h1>
    <h3>A place for sharing</h3>
    <RecipeListFilters />
    <RecipeList />
  </div>
);