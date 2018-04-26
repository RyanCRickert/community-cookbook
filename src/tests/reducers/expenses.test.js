import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";


test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should add new expense", () => {
  const expense = {
    id: "123",
    description: "Computer",
    note: "",
    amount: 20000,
    createdAt: 6169510
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense])
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[0].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1] , expenses[2]]);
});

test("should not remove expense by invalid id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1"
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses]);
});

test("should edit an expense by id", () => {
  const amount = 1222200;
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      amount
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].amount).toBe(amount);
});

test("should not edit an expense with invaild id", () => {
  const amount = 1222200;
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      amount
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: [expenses[1]]
  }
const state = expensesReducer(expenses, action);

expect(state).toEqual([expenses[1]]);
});