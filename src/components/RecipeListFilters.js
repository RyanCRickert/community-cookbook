import React from "react";
import { connect } from "react-redux";
import { setNameFilter, sortByName, sortByCookTime, sortByCategory, sortByFeeds } from "../actions/filters";

export class RecipeListFilters extends React.Component {
  onNameChange = (e) => {
    this.props.setNameFilter(e.target.value);
  };

  onSortChange = (e) => {
    if (e.target.value === "category") {
      this.props.sortByCategory();
    } else if (e.target.value === "cookTime") {
      this.props.sortByCookTime();
    } else if (e.target.value === "name") {
      this.props.sortByName();
    } else if (e.target.value === "feeds") {
      this.props.sortByFeeds();
    }
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__search">
            <input
              type="text"
              className="text-input"
              placeholder="Search recipes"
              value={this.props.filters.name}
              onChange={this.onNameChange}
            />
          </div>
          <div className="input-group__select">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="category">Category</option>
              <option value="cookTime">Cook Time</option>
              <option value="name">Name</option>
              <option value="feeds">Feeds</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setNameFilter: (name) => dispatch(setNameFilter(name)),
  sortByCategory: () => dispatch(sortByCategory()),
  sortByName: () => dispatch(sortByName()),
  sortByCookTime: () => dispatch(sortByCookTime()),
  sortByFeeds: () => dispatch(sortByFeeds())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListFilters);