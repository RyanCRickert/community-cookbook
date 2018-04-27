import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { firebase } from "../firebase/firebase";

export default class RecipeListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(() => ({ loggedIn: true }))
      } else {
        this.setState(() => ({ loggedIn: false }))
      }
    })
  }

  render() {
    return (
      <Link className="list-item" to={"/" + (this.state.loggedIn ? "edit" : "view") + "/" + this.props.id}>
        <div>
          <h3 className="list-item__title">{this.props.name}</h3>
          <span className="list-item__sub-title">Date added: {moment(this.props.createdAt).format("MMMM Do YYYY")}</span>
        </div>
        <div>
          <h3 className="list-item__data show-for-larger">{this.props.cookTime}</h3>
          <span className="list-item__sub-title-right">Feeds: {this.props.feeds}</span>
          <h3 className="list-item__data show-for-mobile">Cooking time: {this.props.cookTime}</h3>
        </div>
      </Link>
    )
  }


}