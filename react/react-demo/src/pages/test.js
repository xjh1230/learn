import React, { Component, useState } from "react";

export default function Test() {
  let [count, setCount] = useState(0);
  function changeCount() {
    console.log(count);
    setCount(count + 1);

    // setCount(count++);
    // setCount(count++);
    console.log(count);
  }

  return (
    <div>
      {count}
      <button onClick={changeCount}>click</button>
    </div>
  );
}
