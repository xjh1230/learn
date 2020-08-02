let uuid = 1;
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);

    let dispatch = store.dispatch;

    let midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };
    let middlewareChain = middlewares.map((middleware) => middleware(midApi));
    let comp = compose(...middlewareChain);
    // let newdispatch = comp(dispatch);
    // let newdispatch = (dispatch = comp(dispatch));
    dispatch = comp(dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length == 0) {
    return (a) => a;
  }
  if (funcs.length == 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...arg) => a(b(...arg)));
}

// export default function applyMiddleware(...middlewares) {
//   return (createStore) => (reducer) => {
//     const store = createStore(reducer);
//     let dispatch = store.dispatch;

//     const midApi = {
//       getState: store.getState,
//       dispatch: (action, ...args) => dispatch(action, ...args),
//     };
//     const middlewareChain = middlewares.map((middleware) => middleware(midApi));

//     // dispatch被加强了
//     dispatch = compose(...middlewareChain)(store.dispatch);

//     return {
//       ...store,
//       //  返回加强之后的dispatch
//       dispatch,
//     };
//   };
// }
