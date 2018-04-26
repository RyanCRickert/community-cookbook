import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default ({ id, name, ingredients, createdAt, instructions, cookTime }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{name}</h3>
      <span className="list-item__sub-title">Date added: {moment(createdAt).format("MMMM Do YYYY")}</span>
    </div>
    <h3 className="list-item__data">{cookTime}</h3>
  </Link>
);