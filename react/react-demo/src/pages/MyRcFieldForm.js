import React, { useEffect } from "react";
import Form, { Field } from "../components/my-fc-field-form/";
import Input from "../components/input";

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

function MyRcFieldForm(props) {
  const [form] = Form.useForm();
  const onFinshed = (val) => {
    console.log("onFinish", val); //sy-log
  };
  const onFinishFailed = (err) => {
    console.log("onFinishFailed", err); //sy-log
  };
  useEffect(() => {
    form.setFieldsValue({ userName: "1230" });
  }, []);
  return (
    <Form form={form} onFinishFailed={onFinishFailed} onFinshed={onFinshed}>
      <Field name="userName" rules={[nameRules]}>
        <Input placeholder="请输入用户名" />
      </Field>
      <Field name="passWord" rules={[passwordRules]}>
        <Input placeholder="请输入密码" />
      </Field>
      <button>Submit</button>
    </Form>
  );
}
export default MyRcFieldForm;
