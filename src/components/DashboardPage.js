import React from "react";
import Header from "./Header";
import RecipeList from "./RecipeList";
import RecipeListFilters from "./RecipeListFilters";
import WelcomeModal from "./WelcomeModal";
import { Link } from "react-router-dom";

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstVisit: true,
    }

    this.openWelcomeModal = this.openWelcomeModal.bind(this);
    this.closeWelcomeModal = this.closeWelcomeModal.bind(this);
  }

  componentWillMount() {
    let local = localStorage.getItem("firstVisit");

    if (local) {
      this.setState(() => ({ firstVisit: false }));
    }
  }

  closeWelcomeModal() {
    this.setState(() => ({ firstVisit: false }));
    localStorage.setItem("firstVisit", "visited");
  }

  openWelcomeModal() {
    this.setState(() => ({ firstVisit: true }));
  }


  render() {
    return(
      <div>
        <WelcomeModal closeWelcomeModal={this.closeWelcomeModal} firstVisit={this.state.firstVisit} />
        <Header openWelcomeModal={this.openWelcomeModal} />
        <RecipeListFilters />
        <RecipeList />
      </div>
    )
  }
};