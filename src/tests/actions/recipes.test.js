import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddRecipe,
  addRecipe,
  editRecipe,
  startEditRecipe,
  removeRecipe,
  startRemoveRecipe,
  setRecipes,
  startSetRecipes
 } from "../../actions/recipes";
import recipes from "../fixtures/recipes";
import database from "../../firebase/firebase"

const uid = "testuid";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const recipesData = {};

  recipes.forEach(({ id, name, ingredients, instructions, createdAt, cookTime, feeds, category }) => {
    recipesData[id] = { name, ingredients, instructions, createdAt, cookTime, feeds, category };
  });
  database.ref(`recipes`).set(recipesData).then(() => done());
});

test("should setup remove recipe action object", () => {
  const action = removeRecipe({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_RECIPE",
    id: "123abc"
  });
});

test("should remove recipe from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = recipes[0].id;

  store.dispatch(startRemoveRecipe({ id })).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: "REMOVE_RECIPE",
      id
    });
    return database.ref(`recipes/${id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test("should setup edit recipe action object", () => {
  const action = editRecipe("123abc", { name: "New name value" });
  expect(action).toEqual({
    type: "EDIT_RECIPE",
    id: "123abc",
    updates: {
      name: "New name value"
    }
  });
});

test("should edit recipes from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = recipes[1].id;
  const updates = { name: "Example name" };

  store.dispatch(startEditRecipe(id, updates)).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: "EDIT_RECIPE",
      id,
      updates  
    });
    return database.ref(`recipes/${id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val().name).toBe(updates.name);
    done();
  });
});

test("should setup add recipe action object with data", () => {
  const action = addRecipe(recipes[2]);
  expect(action).toEqual({
      type: "ADD_RECIPE",
      recipe: recipes[2]
  });
});

test("should add recipe to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const recipeData = {
      name: "Steak Strip",
      ingredients: ["steak", "spices", "carrots"],
      instructions: "Cook it up",
      createdAt: 511691,
      cookTime: 20,
      feeds: 2,
      category: "steak"
  }

  store.dispatch(startAddRecipe(recipeData)).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: "ADD_RECIPE",
        recipe: {
          id: expect.any(String),
          ...recipeData
        }
    })

    return database.ref(`recipes/${actions[0].recipe.id}`).once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(recipeData);
    done();
  });;
});

test("should add recipe with defaults to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const recipeDefaults = {
    name: "",
    createdAt: 0,
    cookTime: 0,
    feeds: 0,
    instructions: "",
    category: ""
  }

  store.dispatch(startAddRecipe({})).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: "ADD_RECIPE",
      recipe: {
        id: expect.any(String),
        ingredients: expect.any(Array),
        ...recipeDefaults
      }
    })

    return database.ref(`recipes/${actions[0].recipe.id}`).once("value");
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(recipeDefaults);
      done();
    });
});

test("should setup set recipe action object with data", () => {
  const action = setRecipes(recipes);

  expect(action).toEqual({
    type: "SET_RECIPES",
    recipes
  });
});

test("should fetch recipes from firebase", (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetRecipes({})).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: "SET_RECIPES",
      recipes
    });
    done();
  });
});