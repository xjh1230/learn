import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import MyRcFieldForm from "./pages/MyRcFieldForm";
import MyRcFieldForm from "./pages/MyRcFieldForm";
import ReduxTest from "./pages/ReduxTest";
import MyRcForm from "./pages/MyRcForm";

import HookTest from "./pages/HookTest";

import MyReactRedux from "./pages/MyReactRedux";

import MyReactReduxHook from "./pages/MyReactReduxHook";

import MyRouterPage from "./pages/MyRouterPage";

import "./util/test";
function App() {
  return (
    <div className="App">
      {/* <MyRcForm name="Foo" /> */}
      {/* <ReduxTest /> */}
      {/* <HookTest /> */}
      <MyReactRedux />
      {/* <MyReactReduxHook /> */}
      {/* <MyRouterPage /> */}
    </div>
  );
}

export default App;
