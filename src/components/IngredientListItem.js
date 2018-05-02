import React from "react";

export default class IngredientListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      name: this.props.name
    }
  };

  componentWillReceiveProps(nextProps) {
    if(!this.state.owned) {
      this.setState({
        ingredient: nextProps.name,
        owned: false
      });
    }
  };

  getInitialState() {
    return {
      ingredient: this.props.name,
      owned: false
    }
  };

  handleStartEditIngredient = () => {
    this.setState({ editing: true });
  };

  handleFinishEditIngredient = (e) => {
    e.preventDefault();

    this.setState({ editing: false });
    this.props.handleEditIngredient(this.props.name, this.state.name);
  };

  onIngredientChange = (e) => {
    this.setState({ name: e.target.value });
  };

  moveCursorToEnd = (e) => {
    let temp = e.target.value;
    e.target.value = "";
    e.target.value = temp;
  };

  render() {
    return(
  <div>
    {this.state.editing ?
      <div className="ingredient-item__no-pad">
        <form className="ingredient-item__form">
          <input
            className="text-input__ingredient-edit"
            type="text"
            name="ingredient"
            value={this.state.name}
            autoFocus
            onFocus={this.moveCursorToEnd}
            onChange={this.onIngredientChange}
          />
          <button className="ingredient-item__button" onClick={this.handleFinishEditIngredient}>
            Done
          </button>
          <div
            className="ingredient-item__right"
            onClick={(e) => {
              this.props.handleRemoveIngredient(this.props.name)
            }}>
            Remove
          </div>
        </form>
      </div> :
      <div className="ingredient-item">
        <div className="ingredient-item__left">
          {this.state.name}
        </div>
        <div
        className="ingredient-item__right"
        onClick={this.handleStartEditIngredient}>
          Edit
        </div>
      </div>
      }
  </div>
    )
  }
}