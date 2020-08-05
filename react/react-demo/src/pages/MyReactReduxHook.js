import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "../kreact-redux/";
export default function MyReactReduxHook(props) {
  const count = useSelector(({ count }) => count);
  const count2 = useSelector(({ count2 }) => count2);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>MyReactReduxHook</h3>
      <p>{count}</p>
      <p>{count2.num}</p>
      <button
        onClick={() => {
          dispatch({ type: "ADD" });
        }}
      >
        hook add
      </button>

      <button
        onClick={() => {
          dispatch({ type: "ADD2" });
        }}
      >
        hook add2
      </button>
    </div>
  );
}
