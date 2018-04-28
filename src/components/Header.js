import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { firebase } from "../firebase/firebase";
import LoginModal from "./LoginModal";

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: null,
      modalOpen: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(() => ({ loggedIn: true }));
      } else {
        this.setState(() => ({ loggedIn: false }));
      }
    })
  }

  handleOpenModal() {
    this.setState(() => ({ modalOpen: true }));
  }

  handleCloseModal() {
    this.setState(() => ({ modalOpen: false }));
  }

  render() {
    return (
      <header className="header">
        <div className="content-container">
          <div className="header-main">
            <h1 className="header-title">Community Cookbook</h1>
            <h3 className="header-subtitle">A place for sharing</h3>
          </div>
            {this.state.loggedIn ?
              <div className="header-log"><Link className="button header-button" to="/add">New Recipe</Link><button className="button header-button" onClick={this.props.startLogout}>Logout</button></div> :
              <div className="header-log"><LoginModal modalOpen={this.state.modalOpen} handleCloseModal={this.handleCloseModal}/><button className="button header-button" onClick={this.handleOpenModal}>Login</button></div>}
        </div>
      </header>
    )
  }

};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header)