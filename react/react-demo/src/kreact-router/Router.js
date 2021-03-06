import React, { Component } from "react";
import RouterContext from "./Context";

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }
  constructor(props) {
    super(props);

    this.state = {
      location: props.history.location,
    };
    if (!props.staticContext) {
      this.unlisten = props.history.listen((location) => {
        console.log("loaction");
        this.setState({ location });
      });
    }
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      >
        <button
          onClick={() => {
            console.log(this.props, this.state.id);
          }}
        >
          show
        </button>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
