import Context from "./useContext";
import { useContext, useReducer, useEffect } from "react";

export function useSelector(selector) {
  const store = useContext(Context);
  const { getState, subscribe } = store;
  let state = selector(getState());
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    let unSubscribe = subscribe(() => {
      forceUpdate();
      console.log("useEffect", 1234);
    });
    return () => {
      console.log("unsubscribe", 2222);
      unSubscribe && unSubscribe();
    };
  }, [state]);

  return state;
}

export function useDispatch() {
  const store = useContext(Context);
  const { dispatch } = store;
  return dispatch;
}
