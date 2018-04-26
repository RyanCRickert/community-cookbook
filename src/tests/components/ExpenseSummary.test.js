import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import ReactShallowRenderer from "react-test-renderer/shallow";
import { ExpenseSummary } from "../../components/ExpenseSummary";

const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={461} />);

test("should render ExpenseSummary correctly", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test("should correctly render ExpenseSummary with multiple expenses", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});