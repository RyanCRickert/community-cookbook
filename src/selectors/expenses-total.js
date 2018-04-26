export default (recipes) => {
  return recipes
  .map(recipe => recipe.amount)
  .reduce((sum, val) => sum + val, 0);
};