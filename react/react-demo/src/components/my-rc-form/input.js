import React, { Component } from "react";

const Input = (props) => {
  return <input {...props} />;
};

class CustomizeInput extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = { value };
  }
  handleChange = (e) => {
    const { value, onFieldValChanged, ...otherProps } = this.props;
    this.setState({ value: e.target.value }, () =>
      onFieldValChanged(this.state.value)
    );
  };
  render() {
    const { value, onFieldValChanged, setValue, ...otherProps } = this.props;

    return (
      <div style={{ padding: 10 }}>
        <Input
          style={{ outling: "none" }}
          value={this.state.value}
          onChange={this.handleChange}
          {...otherProps}
        />
      </div>
    );
  }
}
export default CustomizeInput;
