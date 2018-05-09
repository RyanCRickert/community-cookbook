const shoppingCartReducerDefaultState = [];

export default (state = shoppingCartReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
           return [
               ...state,
               action.item
           ]
        case "REMOVE_ITEM":
           return state.filter(({ id }) => id !== action.id);
        case "REMOVE_ITEM_ALL":
           return [];
        case "SET_ITEMS":
           return action.items;
        default:
            return state;
    }
};