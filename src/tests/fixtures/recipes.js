import moment from "moment";

export default [{
  id: "0",
  name: "Baked Chicken",
  instructions: "Place into over at 350F",
  ingredients: ["chicken", "spices"],
  cookTime: 45,
  feeds: 4,
  category: "Chicken",
  createdAt: 0
}, {
  id: "1",
  name: "Steak",
  instructions: "Use a grill",
  ingredients: ["steak", "pepper"],
  cookTime: 30,
  feeds: 2,
  category: "Beef",
  createdAt: moment(0).subtract(4, "days").valueOf()
}, {
  id: "2",
  name: "Chicken Sandwich",
  instructions: "Deep fry chicken",
  ingredients: ["chicken", "bread"],
  cookTime: 60,
  feeds: 4,
  category: "Chicken",
  createdAt: moment(0).add(4, "days").valueOf()
}]