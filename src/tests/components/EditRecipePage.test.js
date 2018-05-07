import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { EditRecipePage } from "../../components/EditRecipePage";
import recipes from "../fixtures/recipes";

let startEditRecipe, history, wrapper, startRemoveRecipe;

beforeEach(() => {
  startEditRecipe = jest.fn();
  startRemoveRecipe = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditRecipePage
      startEditRecipe={startEditRecipe}
      startRemoveRecipe={startRemoveRecipe}
      history={history}
      recipe={recipes[0]}
    />
  );
});

test("should render a snapshot", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test("should handle editRecipe", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("RecipeForm").prop("onSubmit")(recipes[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditRecipe).toHaveBeenLastCalledWith(recipes[0].id, recipes[0]);
  expect(toJSON(wrapper)).toMatchSnapshot();
});