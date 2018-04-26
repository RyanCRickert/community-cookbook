import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpense, history, wrapper, startRemoveExpense;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[0]}
    />
  );
});

test("should render a snapshot", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test("should handle editExpense", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test("should handle removeExpense", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("button").prop("onClick")(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[0].id
  })
  expect(toJSON(wrapper)).toMatchSnapshot();
});