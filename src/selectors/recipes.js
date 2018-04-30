import moment from "moment";

export default (recipes, {name, sortBy, category}) => {
  return recipes.filter((recipe) => {
    const createdAtMoment = moment(recipe.createdAt);
    const nameMatch = recipe.name.toLowerCase().includes(name.toLowerCase());
    const categoryMatch = recipe.category.includes(category);


      return categoryMatch && nameMatch;
    
  }).sort((a , b) => {
    if (sortBy === "name") {
      return a.name > b.name ? 1 : -1;
    } else if (sortBy === "cookTime") {
      return a.cookTime > b.cookTime ? 1 : -1;
    } else if (sortBy === "feeds") {
      return a.feeds < b.feeds ? 1 : -1;
    }
});
};