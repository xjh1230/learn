import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import MyRcFieldForm from "./pages/MyRcFieldForm";
import MyRcFieldForm from "./pages/MyRcFieldForm";
import ReduxTest from "./pages/ReduxTest";
import MyRcForm from "./pages/MyRcForm";
import HookTest from "./pages/HookTest";

function App() {
  return (
    <div className="App">
      {/* <MyRcForm name="Foo" /> */}
      {/* <ReduxTest /> */}
      <HookTest />
    </div>
  );
}

export default App;
