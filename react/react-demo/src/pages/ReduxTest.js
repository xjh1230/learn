import React, { Component, useState } from "react";
import store from "../store";

export default class ReduxTest extends Component {
  componentDidMount() {
    this.unsubscride = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    if (this.unsubscride) {
      this.unsubscride();
    }
  }

  add = () => {
    store.dispatch({ type: "ADD" });
  };
  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      dispatch((dispatch, getState) => {
        setTimeout(() => {
          dispatch({ type: "ADD", payload: 10 });
        }, 1000);
      });
    });
  };
  promiseMinus = () => {};
  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promise minus</button>
      </div>
    );
  }
}
