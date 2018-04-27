export const setNameFilter = (name = "") => ({
    type: "SET_NAME_FILTER",
    name
});

export const sortByName = () => ({
    type: "SORT_BY_NAME",
});

export const sortByDate = () => ({
    type: "SORT_BY_DATE",
});

export const sortByCookTime = () => ({
    type: "SORT_BY_COOKTIME",
});

export const sortByFeeds = () => ({
    type: "SORT_BY_FEEDS",
});