import React from "react";
import RouterContext from "./Context";

export default function withRouter(Comp) {
  return (props) => {
    return (
      <RouterContext.Consumer>
        {(context) => {
          return <Comp {...props} {...context} />;
        }}
      </RouterContext.Consumer>
    );
  };
}
