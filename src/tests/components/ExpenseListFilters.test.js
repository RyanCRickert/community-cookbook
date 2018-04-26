import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import expenses from "../fixtures/expenses";
import { filters, altFilters } from "../fixtures/filters";
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper =  shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      />)
});

it("should render ExpenseListFilters with alt data correctly", () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render ExpenseListFilters correctly", () => {
  wrapper.setProps({ filters: altFilters });
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle text change", () => {
  const value = "some new text";

  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("input").simulate("change", {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle sort by date", () => {
  const value = "date";

  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find("select").simulate("change", {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle sort by amount", () => {
  const value = "amount";

  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("select").simulate("change", {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle date changes", () => {
  const startDate = moment(0).add(7, "days");
  const endDate = moment(0).add(10, "days");

  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({startDate, endDate});
  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should handle date focus changes", () => {
  const calendarFocused = "endDate";
  
  expect(toJSON(wrapper)).toMatchSnapshot();
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(calendarFocused);
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
  expect(toJSON(wrapper)).toMatchSnapshot();
});