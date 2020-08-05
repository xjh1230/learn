import React, { useEffect, useState } from "react";

let uuid = 0;
function HookTest() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log(`you clicked ${count} times`);
    document.title = `you clicked ${count} times`;
    return () => {
      console.log(uuid++, count);
    };
  });
  return (
    <div>
      <p>you click {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default HookTest;
