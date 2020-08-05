import React, { Component } from "react";
import RouterContext from "./Context";

export default class Link extends Component {
  static contextType = RouterContext;
  // constructor(props) {
  //   super(props);
  // }
  handleClick = (event) => {
    event.preventDefault();
    this.context.history.push(this.props.to);
    console.log("context", this.context);
  };

  render() {
    const { to, children, ...otherProps } = this.props;
    return (
      <a href={to} {...otherProps} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
