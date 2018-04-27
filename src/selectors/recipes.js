import moment from "moment";

export default (recipes, {name, sortBy, startDate, endDate}) => {
    return recipes.filter((recipe) => {
        const createdAtMoment = moment(recipe.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true ;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true ;
        const nameMatch = recipe.name.toLowerCase().includes(name.toLowerCase());

        return startDateMatch && endDateMatch && nameMatch;
    }).sort((a , b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === "name") {
            return a.name > b.name ? 1 : -1;
        } else if (sortBy === "cookTime") {
            return a.cookTime < b.cookTime ? 1 : -1;
        } else if (sortBy === "feeds") {
            return a.feeds < b.feeds ? 1 : -1;
        }
    });
};