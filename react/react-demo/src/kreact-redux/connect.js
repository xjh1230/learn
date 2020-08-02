import React, { useContext, useReducer, useEffect } from "react";
import { bindActionCreators } from "./bindActionCreators";

import Context from "./useContext";

export function connect(mapStateToProps, mapDispatchToProps) {
  return (Comp) => (props) => {
    const store = useContext(Context);
    console.log("store", store, Context); //sy-log
    const { getState, dispatch, subscribe } = store;
    const propState = mapStateToProps(getState());
    // const propDispatch = mapDispatchToProps(dispatch);
    let propDispatch = { dispatch };
    if (typeof mapStateToProps === "function") {
      propDispatch = mapDispatchToProps(dispatch);
    } else if (typeof mapDispatchToProps === "object") {
      propDispatch = bindActionCreators(mapDispatchToProps, dispatch);
    }
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate();
      });
    }, [store]);

    return <Comp {...props} {...propState} {...propDispatch} />;
  };
}

export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
