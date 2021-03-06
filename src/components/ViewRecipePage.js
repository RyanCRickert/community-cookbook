import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class ViewRecipePage extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">{this.props.recipe.name}</h1>
          </div>
        </div>
          <div className="content-container view-page">
            <span>Cook Time: {this.props.recipe.cookTime} {this.props.recipe.cookTime === 1 ? "minute" : "minutes"}</span><br />
            <span>Feeds: {this.props.recipe.feeds} {this.props.recipe.feeds === 1 ? "person" : "people"}</span>
            <div>
              <h3>Ingredients</h3>
              <span>{this.props.recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
              </span>
            </div>
            <div>
              <h3>Cooking Directions</h3>
              <span>{this.props.recipe.instructions}</span>
            </div>
          </div>
          <div className="content-container">
            <Link to="/" className="button">To Dashboard</Link>
          </div>
        </div>
    )}
}

const mapStateToProps = (state, props) => ({
  recipe: state.recipes.find((recipe) => recipe.id === props.match.params.id)
});

export default connect(mapStateToProps)(ViewRecipePage);