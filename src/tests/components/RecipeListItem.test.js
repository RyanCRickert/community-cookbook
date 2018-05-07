import React from "react";
import { shallow } from "enzyme";
import RecipeListItem from "../../components/RecipeListItem";
import recipes from "../fixtures/recipes";

test("should render RecipeListItem correctly", () => {
  const wrapper = shallow(<RecipeListItem {...recipes[0]}/>)
  expect(wrapper).toMatchSnapshot();
});