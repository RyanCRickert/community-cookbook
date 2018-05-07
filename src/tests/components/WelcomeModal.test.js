import React from "react";
import { shallow } from "enzyme";
import WelcomeModal from "../../components/WelcomeModal";

test("should render WelcomeModal correctly", () => {
  const wrapper = shallow(<WelcomeModal/>)
  expect(wrapper).toMatchSnapshot();
});