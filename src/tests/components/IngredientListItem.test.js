import React from "react";
import { shallow } from "enzyme";
import IngredientListItem from "../../components/IngredientListItem";
import ingredients from "../fixtures/ingredients";

test("should render IngredientListItem correctly", () => {
  const wrapper = shallow(<IngredientListItem {...ingredients}/>)
  expect(wrapper).toMatchSnapshot();
});