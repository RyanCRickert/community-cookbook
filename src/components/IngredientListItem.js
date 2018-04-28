import React from "react";

export default (props) => (
  <div className="ingredient-item">
    <div className="ingredient-item__left">
      {props.name}
    </div>
    <div
      className="ingredient-item__right"
      onClick={(e) => {
        props.handleRemoveIngredient(props.name)
      }}>
      Remove   
    </div>
  </div>
)