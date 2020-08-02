import React from "react";
// const RouterContext = React.createContext(null);
// RouterContext.$id = 1234;
// export default RouterContext;

const createNamedContext = (name) => {
  const context = React.createContext();
  context.displayName = name;

  return context;
};

const context = /*#__PURE__*/ createNamedContext("Router");
export default context;
