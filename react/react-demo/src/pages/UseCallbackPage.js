import * as React from "react";
import { useState, useCallback, PureComponent } from "react";
export default function UseCallbackPage(props) {
  const [count, setCount] = useState(0);
  const addClick = () => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  };
  const addClickCb = useCallback(addClick, [count]);
  const [value, setValue] = useState("尼日利亚");
  return (
    <div>
      <h3>UseCallbackPage</h3>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
      <Child addClick={addClickCb} />
    </div>
  );
}
class Child extends PureComponent {
  render() {
    console.log("child render");
    const { addClick } = this.props;
    return (
      <div>
        {" "}
        <h3>Child</h3>{" "}
        <button onClick={() => console.log(addClick())}>add</button>{" "}
      </div>
    );
  }
}
