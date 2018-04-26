import React from "react";
import { connect } from "react-redux";
import RecipeListItem from "./RecipeListItem";
import SelectRecipes from "../selectors/recipes";

export const RecipeList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Recipes</div>
      <div className="show-for-larger">Recipe</div>
      <div className="show-for-larger">Cooking Time</div>
    </div>
    <div className="list-body">
  {
    props.recipes.length === 0 ? (
      <div className="list-item list-item--message">
        <span>No recipes found</span>
      </div>
    ) : (
      props.recipes.map((recipe) => (
      <RecipeListItem key={recipe.id} {...recipe}/>
    ))
    )
  }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    recipes: SelectRecipes(state.recipes, state.filters)
  };
}

export default connect(mapStateToProps)(RecipeList);