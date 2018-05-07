import filtersReducers from "../../reducers/filters";
import moment from "moment";

test("should setup default filter values", () => {
  const state = filtersReducers(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    name: "",
    category: "",
    sortBy: "name"
  });
})

test("should set sortBy to feeds", () => {
  const state = filtersReducers(undefined, { type: "SORT_BY_FEEDS" });
  expect(state.sortBy).toBe("feeds");
});

test("should set name filter", () => {
  const name = "Beef stew"
  const action = { type: "SET_NAME_FILTER", name };
  const state = filtersReducers(undefined, action);
  expect(state.name).toBe(name);
});

test("should set category filter", () => {
  const category = "Other"
  const action = { type: "SET_CATEGORY_FILTER", category };
  const state = filtersReducers(undefined, action);
  expect(state.category).toBe(category);
});