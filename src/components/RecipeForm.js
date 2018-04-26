import React from "react";
import moment from "moment";
import IngredientListItem from "./IngredientListItem";

export default class RecipeForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.recipe ? props.recipe.name : "",
			instructions: props.recipe ? props.recipe.instructions : "",
			ingredients: props.recipe ? props.recipe.ingredients : [],
			cookTime: props.recipe ? props.recipe.cookTime : "",
			createdAt: props.recipe ? moment(props.recipe.createdAt) : moment(),
			error: ""
		}
	}

	onNameChange = (e) => {
		const name = e.target.value;
		this.setState(() => ({ name }));
	};

	onCookChange = (e) => {
		const cookTime = e.target.value;
		this.setState(() => ({ cookTime }));
	};

	onInstructionsChange = (e) => {
		const instructions = e.target.value;
		this.setState(() => ({ instructions }));
	};

	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({ createdAt }));
		}
	};

	handleRemoveIngredient = (ingredientToRemove) => {
		this.setState((prevState) => ({
			ingredients: prevState.ingredients.filter((ingredient) => ingredientToRemove !== ingredient)
		}));
	};

	handleAddIngredient = (e) => {
		e.preventDefault();

		const ingredient = e.target.elements.ingredient.value.trim();
		let error = false;

		if (!e.target.elements.ingredient.value) {
			this.setState({ error: "Please enter a valid ingredient" });
			error = true;
		} else if (this.state.ingredients.indexOf(ingredient) > -1) {
			this.setState({ error: "This ingredient already exists" });
			error = true;
		}

		if (!error) {
			e.target.elements.ingredient.value = "";
			this.setState((prevState) => ({ ingredients: prevState.ingredients.concat(ingredient) }));
			this.setState({ error: "" });
		}


	};

	onSubmit = (e) => {
		e.preventDefault();

		if (!this.state.name || !this.state.ingredients || !this.state.cookTime) {
			this.setState(() => ({ error: "Please enter a name, an ingredient and a cooking time." }));
		} else {
			this.setState(() => ({ error: "" }));
			this.props.onSubmit({
				name: this.state.name,
				ingredients: this.state.ingredients,
				createdAt: this.state.createdAt.valueOf(),
				instructions: this.state.instructions,
				cookTime: this.state.cookTime
			});
		}
	};

	render() {
		return (
			<div className="form">
				{this.state.error && <p className="form__error">{this.state.error}</p>}
				<input
					className="text-input"
					type="text"
					placeholder="Name of Dish"
					autoFocus
					value={this.state.name}
					onChange={this.onNameChange}
				/>
				<input
					className="text-input"
					type="text"
					placeholder="Cooking Time"
					value={this.state.cookTime}
					onChange={this.onCookChange}
				/>
				<form onSubmit={this.handleAddIngredient}>
					<input
						className="text-input__ingredient"
						type="text"
						name="ingredient"
						placeholder="Add Ingredient"
						value={this.state.ingredient}
					/>
					<button className="button text-input__button">Add Ingredient</button>
				</form>
				{this.state.ingredients.length === 0 ?
					<p>*Please add at least one ingredient*</p> :
					this.state.ingredients.map((ingredient) => (
						<IngredientListItem
							key={ingredient}
							name={ingredient}
							handleRemoveIngredient={this.handleRemoveIngredient}
						/>
					)
					)}
				<form className="form" onSubmit={this.onSubmit}>
					<textarea
						className="text-area"
						placeholder="Cooking instructions"
						value={this.state.instructions}
						onChange={this.onInstructionsChange}
					></textarea>
					<div>
						<button className="button">{this.props.actionType} Recipe</button>
					</div>
				</form>
			</div>
		)
	}
}