import React, { Component } from "react";

const Input = (props) => {
  console.log(props);
  return <input {...props} />;
};

class CustomizeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { value = "", ...otherProps } = this.props;
    return (
      <div style={{ padding: 10 }}>
        {/* <Input style={{ outling: "none" }} value={value} {...otherProps} /> */}
        <Input style={{ outling: "none" }} {...this.props} />
      </div>
      // <Input style={{ outling: "none" }} {...otherProps} />
    );
  }
}
export default CustomizeInput;
