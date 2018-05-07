import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startAddItem } from "../actions/shoppingCart";
import database from "../firebase/firebase";

export class ViewRecipePageLogged extends React.Component {
  handleClick(ingredient, index) {

    this.refs[index].setAttribute("disabled", "disabled");
    this.props.startAddItem(ingredient);
  }

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
              <span>{this.props.recipe.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <button
                  ref={index}
                  className="view-page__plus"
                  onClick={() => this.handleClick(ingredient, index)}/>
                    <span>{ingredient}</span>
                </div>
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

const mapDispatchToProps = (dispatch) => ({
  startAddItem: (item) => dispatch(startAddItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipePageLogged);