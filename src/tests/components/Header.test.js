import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { Header } from "../../components/Header";

let startLogin, startLogout, wrapper;

beforeEach (() => {
  startLogin = jest.fn();
  wrapper = shallow(<Header/>)
});

test("should render Header correctly", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});