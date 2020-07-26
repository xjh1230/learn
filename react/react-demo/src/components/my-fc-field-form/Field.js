import React, { Component } from "react";
import FieldContext from "./FieldContext";

class Field extends Component {
  static contextType = FieldContext;
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    const { registerEntity } = this.context;
    this.cancelRegister = registerEntity(this);
  }
  componentWillUnmount() {
    if (this.cancelRegister) {
      this.cancelRegister();
    }
  }
  onStoreChange() {
    this.forceUpdate();
  }
  getControlled = () => {
    const { name } = this.props;
    const { setFieldValue, getFieldValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (event) => {
        const newVal = event.target.value;
        setFieldValue(name, newVal);
      },
    };
  };
  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
export default Field;
