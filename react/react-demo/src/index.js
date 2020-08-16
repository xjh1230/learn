// import ReactDOM from "react-dom";
// import React, { Component } from "react";
import React, { Component } from "./kreact/index";
import ReactDOM from "./kreact/react-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// import { Provider } from "react-redux";
import { Provider } from "./kreact-redux/";
import DiffPage from "./pages/DiffPage";
import store from "./store/";

// import "./util/test";
// console.log("store", store);

//myreact
class MyClassCmp extends Component {
  static defaultProps = {
    color: "red",
  };
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="border">
        我是类组建-name-{this.props.name}
        <p className={this.props.color}>暗号:{this.props.anhao}</p>
      </div>
    );
  }
}
function MyFuncCmp(props) {
  return <div className="border">我是func组建-name-{props.name}</div>;
}
var jsx = (
  <div className="border">
    <p>my-react</p>
    <a href="https://zh-hans.reactjs.org/">react文档</a>
    <MyClassCmp name={"MyClassCmp"} />
    <MyFuncCmp name={"MyFuncCmp"} />
    <DiffPage />

    <>
      <h1>aaa</h1>
      <h1>bbb</h1>
    </>
  </div>
);

var jsx2 = (
  <Provider store={store}>
    <App />
  </Provider>
);
var jsx3 = <DiffPage />;
ReactDOM.render(jsx3, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
