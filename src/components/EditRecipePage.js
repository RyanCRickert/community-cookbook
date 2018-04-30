import React from "react";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";
import { startEditRecipe, startRemoveRecipe } from "../actions/recipes";
import RemoveRecipeModal from "./RemoveRecipeModal";

export class EditRecipePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  onSubmit = (recipe) => {
    this.props.startEditRecipe(this.props.recipe.id, recipe);
    this.props.history.push("/");
  };

  onRemove = () => {
    this.props.startRemoveRecipe({id : this.props.recipe.id});
    this.props.history.push("/");
  }

  handleOpenModal() {
    this.setState(() => ({ modalOpen: true }));
  }

  handleCloseModal() {
    this.setState(() => ({ modalOpen: false }));
  }
    
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Recipe</h1>
          </div>
        </div>
          <div className="content-container">
            <RecipeForm
              actionType={"Edit"}
              recipe={this.props.recipe}
              onSubmit={this.onSubmit}
            />
          <button className="button button--secondary" onClick={this.handleOpenModal}>Remove Recipe</button>
          <RemoveRecipeModal
          modalOpen={this.state.modalOpen}
          handleCloseModal={this.handleCloseModal}
          onRemove={this.onRemove}
          recipeName={this.props.recipe.name}
          />
          </div>
        </div>
    )}
}

const mapStateToProps = (state, props) => ({
  recipe: state.recipes.find((recipe) => recipe.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditRecipe: (id, recipe) => dispatch(startEditRecipe(id, recipe)),
  startRemoveRecipe: (data) => dispatch(startRemoveRecipe(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);