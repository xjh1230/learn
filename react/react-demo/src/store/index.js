// import { createStore, applyMiddleware } from "redux";
import { createStore, applyMiddleware } from "../kredux";

// import thunk from "redux-thunk";
// import logger from "redux-logger";
function countReducer(state = 0, action) {
  let tmp = action.payload || 1;
  switch (action.type) {
    case "ADD":
      return state + tmp;
    case "MUINS":
      return state - tmp;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(thunk));

export default store;

function logger({ getState }) {
  return (next) => (action) => {
    // console.log("**************");

    //dispatch(action)
    let returnVal = next(action);
    // console.log(getState());
    // console.log("**************");
    return returnVal;
  };
}

function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    // console.log(next);
    // console.log(action);
    // console.log(getState);
    console.log(action);
    console.log(123456);
    if (typeof action == "function") {
      //   console.log(2223344);
      return action(dispatch, getState);
    }
    return next(action);
  };
}
