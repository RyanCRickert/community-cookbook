import moment from "moment";

const filtersReducerDefaultState = {
  name: "",
  sortBy: "name",
}

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_NAME_FILTER":
      return {
        ...state,
        name: action.name
      };
    case "SORT_BY_CATEGORY":
      return {
        ...state,
        sortBy: "category"
      };
    case "SORT_BY_NAME":
      return {
        ...state,
        sortBy: "name"
      };
    case "SORT_BY_COOKTIME":
      return {
        ...state,
        sortBy: "cookTime"
      }
    case "SORT_BY_FEEDS":
      return {
        ...state,
        sortBy: "feeds"
      }
    default:
      return state;
  }
};