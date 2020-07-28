import React, { Component, useEffect } from "react";
import CreateForm from "../components/my-rc-form/";
import Input from "../components/my-rc-form/input";

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

// @createForm
function _MyRcForm(form) {
  const {
    getFieldsValue,
    validateFields,
    getFieldDecorator,
    setFieldsValue,
  } = form;
  function submit() {
    console.log("submit", getFieldsValue()); //sy-log
    validateFields((err, val) => {
      if (err) {
        console.log("err", err); //sy-log
      } else {
        console.log("校验成功", val); //sy-log
      }
    });
  }
  useEffect(() => {
    setFieldsValue({ userName: "1230" });
  }, []);
  var s = (
    <div>
      <h3>MyRCForm</h3>
      {getFieldDecorator("userName", { rules: [nameRules] })(
        <Input placeholder="Username" />
      )}
      {getFieldDecorator("password", { rules: [passworRules] })(
        <Input placeholder="Password" />
      )}
      <button onClick={submit}>submit</button>
    </div>
  );
  //   console.log(s);
  return s;
}

const MyRcForm = CreateForm(_MyRcForm);

export default MyRcForm;

// const foo = (Cmp) => (props) => {
//   return (
//     <div className="border">
//       <Cmp {...props} />
//     </div>
//   );
// };

// function Child(props) {
//   useEffect(() => {
//     console.log(123456);
//   }, []);
//   return <div>chiild- {props.name}</div>;
// }

// const Foo = foo(foo(Child));

// export default Foo;
