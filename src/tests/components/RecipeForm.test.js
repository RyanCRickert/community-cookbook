import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import RecipeForm from "../../components/RecipeForm";
import recipes from "../fixtures/recipes";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<RecipeForm />);
});

test("should render recipe form correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render recipe form with recipe data", () =>{
  wrapper = shallow(<RecipeForm recipe={recipes[0]}/>);
  
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid recipe submission", () =>{
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").at(1).simulate("submit", {
    preventDefault: () => { }
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set name on input change", () => {
  const value =  "New name";

  expect(wrapper).toMatchSnapshot();
  wrapper.find("input").at(0).simulate("change", {
    target: { value }
  });
  expect(wrapper.state("name")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set instruction on textarea change", () => {
  const value =  "New instruction";
  
  expect(wrapper).toMatchSnapshot();
  wrapper.find("textarea").at(0).simulate("change", {
    target: { value }
  });
  expect(wrapper.state("instructions")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set cook time if valid input", () => {
  const value =  2;

  expect(wrapper).toMatchSnapshot();
  wrapper.find("input").at(1).simulate("change", {
    target: { value }
  });
  expect(wrapper.state("cookTime")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should not set cook time on invalid input", () => {
  const value =  20;

  expect(wrapper).toMatchSnapshot();
  wrapper.find("input").at(1).simulate("change", {
    target: { value }
  });
  expect(wrapper.state("cookTime")).toBe(20);
  expect(wrapper).toMatchSnapshot();
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  wrapper = shallow(<RecipeForm recipe={recipes[0]} onSubmit={onSubmitSpy}/>);

  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").at(1).simulate("submit", {
    preventDefault: () => { }
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    name: recipes[0].name,
    instructions: recipes[0].instructions,
    ingredients: recipes[0].ingredients,
    createdAt: recipes[0].createdAt,
    feeds: recipes[0].feeds,
    category: recipes[0].category,
    cookTime: recipes[0].cookTime
  });
  expect(wrapper).toMatchSnapshot();
});