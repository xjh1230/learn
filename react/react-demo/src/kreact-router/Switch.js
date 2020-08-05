import React, { Component } from "react";
import RouterContext from "./Context";
import matchPath from "./matchPath";
export default class Switch extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          let match, element;
          React.Children.forEach(this.props.children, (child) => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              const { path } = child.props;
              match = path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });
          return match
            ? React.cloneElement(element, { computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
