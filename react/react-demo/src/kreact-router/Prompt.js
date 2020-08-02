import React, { Component } from "react";
import RouterContext from "./Context";
import Lifecycle from "./Lifecycle";
export default class Prompt extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          if (!this.props.when) return null;
          const method = context.history.block;
          return (
            <Lifecycle
              onMount={(self) => {
                self.release = method(this.props.message);
              }}
              onUnmount={(self) => {
                self.release();
              }}
              message={this.props.message}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
