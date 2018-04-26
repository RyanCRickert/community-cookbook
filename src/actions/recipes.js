import uuid from "uuid";
import database from "../firebase/firebase";

export const addRecipe = (recipe) => ({
  type: "ADD_RECIPE",
  recipe
});

export const startAddRecipe = (recipeData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name = "",
      ingredients = [],
      instructions = "",
      cookTime = 0,
      createdAt = 0
  } = recipeData;
    const recipe = { name, instructions, createdAt, ingredients, cookTime };

    return database.ref(`recipes`).push(recipe).then((ref) => {
      dispatch(addRecipe({
        id: ref.key,
        ...recipe
      }));
    });
  };
};

export const addIngredient = (id, ingredient) => ({
  type: "ADD_INGREDIENT",
  id,
  ingredient
});

export const startAddIngredient = (id, ingredient) => {
  return (dispatch) => {
    const {
      name = ""
    } = ingredientData;
    const ingredient = {name};

    return database.ref(`recipes/${id}/ingredients`).push(ingredient).then((ref) => {
      dispatch(addIngredient({
        iid: ref.key,
        ingredient
      }));
    });
  };
};

export const editIngredient = (id, iid, update) => {
  type:"EDIT_INGREDIENT",
  id,
  iid,
  update
};

export const startEditIngredient = (id, iid, update) => {
  return (dispatch) => {
    return database.ref(`recipes/${id}/ingredients${iid}`)
  };
};

export const removeRecipe = ({ id } = {}) => ({
  type: "REMOVE_RECIPE",
  id
});

export const startRemoveRecipe = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`recipes/${id}`).remove().then(() => {
      dispatch(removeRecipe({ id }));
    });
  };
};

export const editRecipe = (id, updates) => ({
  type: "EDIT_RECIPE",
  id,
  updates
});

export const startEditRecipe = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`recipes/${id}`).update(updates).then(() => {
      dispatch(editRecipe(id, updates));
    });
  };
};

export const setRecipes = (recipes) => ({
  type: "SET_RECIPES",
  recipes
});

export const startSetRecipes = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid

    return database.ref(`recipes`).once("value", (snapshot) => {
      const recipes = [];

      snapshot.forEach((childSnapshot) => {
        recipes.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setRecipes(recipes));
    });
  };
};

export const setIngredients = (id, ingredients) => ({
  type: "SET_INGREDIENTS",
  id,
  ingredients
});

export const startSetIngredients = () => {
  return (dispatch) => {
    return database.ref(`recipes/${id}/ingredients`).once("value", (snapshot) => {
      const ingredients = [];

      snapshot.forEach((childSnapshot) => {
        recipes.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setIngredients(ingredients));
    });
  };
};