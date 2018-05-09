import database from "../firebase/firebase";

export const addItem = (item) => ({
  type: "ADD_ITEM",
  item
});

export const startAddItem = (itemData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name = ""
    } = itemData;
    const item = { name }
    return database.ref(`users/${uid}/shoppingCart`).push(item).then((ref) => {
      dispatch(addItem({
        id: ref.key,
        ...item
      }));
    });
  };
};

export const removeItem = ({ id }) => ({
  type: "REMOVE_ITEM",
  id
});

export const startRemoveItem = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/shoppingCart/${id}`).remove().then(() => {
      dispatch(removeItem({ id }));
    });
  };
};

export const setItems = (items) => ({
  type: "SET_ITEMS",
  items
});

export const startSetItems = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`users/${uid}/shoppingCart`).once("value", (snapshot) => {
      const items = [];

      snapshot.forEach((childSnapshot) => {
        items.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setItems(items));
    });
  };
};