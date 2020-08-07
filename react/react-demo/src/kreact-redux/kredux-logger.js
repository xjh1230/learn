export default function logger({ getState }) {
  return (next) => (action) => {
    console.log("**************");
    //dispatch(action)
    let returnVal = next(action);
    console.log(getState());
    console.log("**************");
    return returnVal;
  };
}
