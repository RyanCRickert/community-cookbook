import moment from "moment";
import { setNameFilter, setCategoryFilter, sortByName, sortByCookTime, sortByFeeds } from "../../actions/filters";

test("should generate set name filter for provided name", () => {
  const action = setNameFilter("test");
  expect(action).toEqual({
    type: "SET_NAME_FILTER",
    name: "test"
  });
});

test("should generate set category filter for provided category", () => {
  const action = setCategoryFilter("test");
  expect(action).toEqual({
    type: "SET_CATEGORY_FILTER",
    category: "test"
  });
});

test("should generate action object for sort by name", () => {
  const action = sortByName();
  expect(action).toEqual({
    type: "SORT_BY_NAME"
  })
});

test("should generate action object for sort by feeds", () => {
  const action = sortByFeeds();
  expect(action).toEqual({
    type: "SORT_BY_FEEDS"
  })
});

test("should generate action object for sort by cook time", () => {
  const action = sortByCookTime();
  expect(action).toEqual({
    type: "SORT_BY_COOKTIME"
  })
});