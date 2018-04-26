import authReducer from "../../reducers/auth";

test("should set uid for logIn", () => {
  const action = {
    type: "LOGIN",
    uid: 123
  }
  const state = authReducer({}, action);
  expect(state).toEqual({ uid: 123});
});

test("should clear uid for logOut", () => {
  const action = {
    type: "LOGOUT"
  }
  const state = authReducer({ uid: "Some value" }, action);
  expect(state).toEqual({});
});