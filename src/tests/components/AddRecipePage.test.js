import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { AddRecipePage } from "../../components/AddRecipePage";
import recipes from "../fixtures/recipes";

let startAddRecipe, history, wrapper;

beforeEach(() => {
  startAddRecipe = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddRecipePage
    buttonType={"Add"}
    startAddRecipe={startAddRecipe}
    history={history}
    />);
});

test("should render AddRecipePage correctly", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("RecipeForm").prop("onSubmit")(recipes[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startAddRecipe).toHaveBeenLastCalledWith(recipes[1]);
  expect(toJSON(wrapper)).toMatchSnapshot();
});