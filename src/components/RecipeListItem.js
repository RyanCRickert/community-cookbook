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
      <div className="list-item">
        <Link className="list-item__view" to={"/" + (this.state.loggedIn ? "viewLogged" : "view") + "/" + this.props.id}>
          <div>
            <h3 className="list-item__title">{this.props.name}</h3>
            <span className="list-item__sub-title">Category: {this.props.category}</span>
          </div>
          <div>
            <h3 className="list-item__data show-for-larger">{parseInt(this.props.cookTime)} {this.props.cookTime === 1 ? "minute" : "minutes"}</h3>
            <span className="list-item__sub-title-right">Feeds: {parseInt(this.props.feeds)}</span>
            <h3 className="list-item__data show-for-mobile">Cooking time: {parseInt(this.props.cookTime)} {this.props.cookTime === 1 ? "minute" : "minutes"}</h3>
          </div>
        </Link>
        {this.state.loggedIn &&
        <Link to={`/edit/${this.props.id}`}>
          <div className="list-item__edit">
            Edit
          </div>
        </Link>
        }
      </div>
    )
  }


}