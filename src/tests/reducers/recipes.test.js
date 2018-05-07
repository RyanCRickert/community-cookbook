import recipesReducer from "../../reducers/recipes";
import recipes from "../fixtures/recipes";


test("should set default state", () => {
  const state = recipesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should add new recipe", () => {
  const recipe = {
    id: "123",
    name: "Chicken Marsala",
    instructions: "cook",
    ingredients: ["chicken"],
    createdAt: 6169510,
    cookTime: 60,
    feeds: 4
  };
  const action = {
    type: "ADD_RECIPE",
    recipe
  };
  const state = recipesReducer(recipes, action);
  expect(state).toEqual([...recipes, recipe])
});

test("should remove recipe by id", () => {
  const action = {
    type: "REMOVE_RECIPE",
    id: recipes[0].id
  };
  const state = recipesReducer(recipes, action);
  expect(state).toEqual([recipes[1] , recipes[2]]);
});

test("should not remove recipe by invalid id", () => {
  const action = {
    type: "REMOVE_RECIPE",
    id: "-1"
  };
  const state = recipesReducer(recipes, action);
  expect(state).toEqual([...recipes]);
});

test("should edit an recipe by id", () => {
  const feeds = 2;
  const action = {
    type: "EDIT_RECIPE",
    id: recipes[0].id,
    updates: {
      feeds
    }
  };
  const state = recipesReducer(recipes, action);
  expect(state[0].feeds).toBe(feeds);
});

test("should not edit an recipe with invalid id", () => {
  const feeds = 2;
  const action = {
    type: "EDIT_RECIPE",
    id: "-1",
    updates: {
      feeds
    }
  };
  const state = recipesReducer(recipes, action);
  expect(state).toEqual(recipes);
});

test("should set recipes", () => {
  const action = {
    type: "SET_RECIPES",
    recipes: [recipes[1]]
  }
  const state = recipesReducer(recipes, action);

  expect(state).toEqual([recipes[1]]);
});