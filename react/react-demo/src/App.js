import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import MyRcFieldForm from "./pages/MyRcFieldForm";
import MyRcFieldForm from "./pages/MyRcFieldForm";
import Test from "./pages/test";
import MyRcForm from "./pages/MyRcForm";

function App() {
  return (
    <div className="App">
      <MyRcForm name="Foo" />
      {/* <Test></Test> */}
    </div>
  );
}

export default App;
