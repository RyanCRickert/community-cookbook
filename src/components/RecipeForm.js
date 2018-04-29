import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import IngredientListItem from "./IngredientListItem";

export default class RecipeForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.recipe ? props.recipe.name : "",
			instructions: props.recipe ? props.recipe.instructions : "",
			ingredients: props.recipe ? props.recipe.ingredients : [],
			cookTime: props.recipe ? parseInt(props.recipe.cookTime) : 1,
			feeds: props.recipe ? parseInt(props.recipe.feeds) : 1,
			category: props.recipe ? props.recipe.category : "",
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
		this.setState(() => ({ cookTime: parseInt(cookTime) }));
	};

	onFeedChange = (e) => {
		const feeds = e.target.value;
		this.setState(() => ({ feeds: parseInt(feeds) }));
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

	onCategoryChange = (e) => {
    if (e.target.value === "Beef") {
      this.setState({ category: "Beef"})
    } else if (e.target.value === "Chicken") {
      this.setState({ category: "Chicken"})
    } else if (e.target.value === "Other") {
      this.setState({ category: "Other"})
    } else if (e.target.value === "Meatless") {
      this.setState({ category: "Meatless"})
    } else if (e.target.value === "Pork") {
      this.setState({ category: "Pork"})
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
				cookTime: parseInt(this.state.cookTime),
				feeds: parseInt(this.state.feeds),
				category: this.state.category
			});
		}
	};

	render() {
		const pStyle = {marginTop: "0"};
		return (
			<div className="form-edit">
				{this.state.error && <p className="form__error">{this.state.error}</p>}
				<input
					className="text-input"
					type="text"
					placeholder="Name of Dish"
					autoFocus
					value={this.state.name}
					onChange={this.onNameChange}
				/>
				<div className="number-input">
				<div>
					Cook Time : 
					<input
						className="number-input__item"
						type="number"
						value={1}
						min={1}
						value={this.state.cookTime}
						onChange={this.onCookChange}
					/>
					&nbsp;{this.state.cookTime === 1 ? "minute" : "minutes"}
				</div>
				<div>
					Feeds : 
					<input
						className="number-input__item"
						type="number"
						value={1}
						min={1}
						value={this.state.feeds}
						onChange={this.onFeedChange}
					/>
					&nbsp;{this.state.feeds === 1 ? "person" : "people"}
				</div>
				<div>
					Category : 
					<select
					className="number-input__item-category"
					value={this.state.category}
					onChange={this.onCategoryChange}
				>
					<option value={null}></option>
					<option value="Beef">Beef</option>
					<option value="Chicken">Chicken</option>
					<option value="Meatless">Meatless</option>
					<option value="Other">Other</option>
					<option value="Pork">Pork</option>
				</select>
				</div>
				</div>
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
					<p style={pStyle}>*Please add at least one ingredient*</p> :
					this.state.ingredients.map((ingredient) => (
						<IngredientListItem
							key={ingredient}
							name={ingredient}
							handleRemoveIngredient={this.handleRemoveIngredient}
						/>
					)
					)}
				<form onSubmit={this.onSubmit}>
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
				<Link to="/" className="button home-button">Home</Link>
			</div>
		)
	}
}