// import { createStore, applyMiddleware } from "redux";
import { createStore, applyMiddleware, combineReducers } from "../kredux";

// import thunk from "redux-thunk";
// import logger from "redux-logger";

import thunk from "../kreact-redux/kredux-thunk";
import logger from "../kreact-redux/kredux-logger";
function countReducer(state = 0, action) {
  let tmp = action.payload || 1;
  // console.log(action, 123);
  switch (action.type) {
    case "ADD":
      return state + tmp;
    case "MUINS":
      return state - tmp;
    default:
      console.log(state, 222222222);
      return state;
  }
}

function countReducer2(state = { num: 0, msg: "毛里塔尼亚" }, action) {
  let tmp = action.payload || 1;
  // console.log(action, 456);
  switch (action.type) {
    case "ADD2":
      return { ...state, num: state.num + tmp };
    default:
      // console.log(state, 1111111);
      return state;
  }
}

const store = createStore(
  combineReducers({
    count: countReducer,
    count2: countReducer2,
  }),
  applyMiddleware(thunk, logger)
);

export default store;

// function logger({ getState }) {
//   return (next) => (action) => {
//     // console.log("**************");

//     //dispatch(action)
//     let returnVal = next(action);
//     // console.log(getState());
//     // console.log("**************");
//     return returnVal;
//   };
// }

// function thunk({ getState, dispatch }) {
//   return (next) => (action) => {
//     // console.log(next);
//     // console.log(action);
//     // console.log(getState);
//     console.log(action);
//     console.log(123456);
//     if (typeof action == "function") {
//       //   console.log(2223344);
//       return action(dispatch, getState);
//     }
//     return next(action);
//   };
// }

// import { createStore, combineReducers } from "redux";

// // 定义修改规则
// export const counterReducer = (state = 0, { type, payload = 1 }) => {
//   switch (type) {
//     case "ADD":
//       return state + payload;
//     case "MINUS":
//       return state - payload;
//     default:
//       return state;
//   }
// };

// const store = createStore(combineReducers({ count: counterReducer }));

// export default store;
