import selectRecipes from "../../selectors/recipes";
import recipes from "../fixtures/recipes";


test("should filter by name value", () => {
  const filters = {
    name: "c",
    sortBy: "feeds",
    category: ""
  };
  const result = selectRecipes(recipes, filters);
  expect(result).toEqual([recipes[0], recipes[2]]);
});

test("should filter by name", () => {
  const filters = {
    name: "", 
    sortBy: "name",
    category: ""
  }
  const result = selectRecipes(recipes, filters);
  expect(result).toEqual([recipes[0], recipes[2], recipes[1]]);
});

test("should filter by cook time", () => {
  const filters = {
    name: "", 
    sortBy: "cookTime",
    category: ""
  }
  const result = selectRecipes(recipes, filters);
  expect(result).toEqual([recipes[1], recipes[0], recipes[2]]);
});