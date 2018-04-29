import moment from "moment";

export default (recipes, {name, sortBy, startDate, endDate}) => {
    return recipes.filter((recipe) => {
        const createdAtMoment = moment(recipe.createdAt);
        const nameMatch = recipe.name.toLowerCase().includes(name.toLowerCase());

        return nameMatch;
    }).sort((a , b) => {
        if (sortBy === "category") {
            return a.category > b.category ? 1 : -1;
        } else if (sortBy === "name") {
            return a.name > b.name ? 1 : -1;
        } else if (sortBy === "cookTime") {
            return a.cookTime > b.cookTime ? 1 : -1;
        } else if (sortBy === "feeds") {
            return a.feeds < b.feeds ? 1 : -1;
        }
    });
};