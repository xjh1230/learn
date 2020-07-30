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
  add2 = () => {
    store.dispatch({ type: "ADD2", payload: 12 });
  };
  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promise minus</button>

        <p>{store.getState().count2.num}</p>
        <button onClick={this.add2}>
          addd count 2 {store.getState().count2.msg}
        </button>
      </div>
    );
  }
}
