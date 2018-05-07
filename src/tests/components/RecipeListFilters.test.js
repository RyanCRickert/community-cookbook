import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { RecipeListFilters } from "../../components/RecipeListFilters";
import recipes from "../fixtures/recipes";
import { filters, altFilters } from "../fixtures/filters";

let setNameFilter, setCategoryFilter, sortByName, sortByCookTime, sortByFeeds, wrapper;

beforeEach(() => {
  setNameFilter = jest.fn();
  setCategoryFilter = jest.fn();
  sortByName = jest.fn();
  sortByCookTime = jest.fn();
  sortByFeeds = jest.fn();
  wrapper =  shallow(
    <RecipeListFilters
      filters={filters}
      setNameFilter={setNameFilter}
      setCategoryFilter={setCategoryFilter}
      sortByName={sortByName}
      sortByCookTime={sortByCookTime}
      sortByFeeds={sortByFeeds}
      />)
});

it("should render RecipeListFilters correctly", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render RecipeListFilters with alt data correctly", () => {
  wrapper.setProps({ filters: altFilters });
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle name change", () => {
  const value = "some new text";

  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("input").simulate("change", {
    target: { value }
  });
  expect(setNameFilter).toHaveBeenLastCalledWith(value);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle sort by name", () => {
  const value = "name";

  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find("select").at(1).simulate("change", {
    target: { value }
  });
  expect(sortByName).toHaveBeenCalled();
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle sort by cook time", () => {
  const value = "cookTime";

  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("select").at(1).simulate("change", {
    target: { value }
  });
  expect(sortByCookTime).toHaveBeenCalled();
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle sort by feeds", () => {
  const value = "feeds";

  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("select").at(1).simulate("change", {
    target: { value }
  });
  expect(sortByFeeds).toHaveBeenCalled();
  expect(toJSON(wrapper)).toMatchSnapshot();
});