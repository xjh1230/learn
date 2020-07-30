export default function createStore(reducer, enhancer) {
  // console.log(reducer);
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState;
  let currentListeners = [];
  function getRandom() {
    return Math.random().toFixed(16).substr(2);
  }
  function getState() {
    return currentState;
  }
  let uuid = 1;
  function subscribe(listener) {
    listener.$id = uuid++;
    currentListeners.push(listener);
    return () => {
      currentListeners = currentListeners.filter((s) => s.$id != listener.$id);
    };
  }
  function notify() {
    currentListeners.forEach((listener) => listener());
  }
  function dispatch({ type, payload }) {
    currentState = reducer(currentState, { type, payload });
    notify();
  }
  dispatch({ type: "$MyRedux$" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}
