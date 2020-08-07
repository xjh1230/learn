export default function thunk({ getState, dispatch }) {
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
