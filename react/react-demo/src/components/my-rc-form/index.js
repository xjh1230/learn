import React, { useState } from "react";

const getRandom = () => {
  return Math.random().toFixed(16);
};

const CreateForm = (Cmp) => (props) => {
  let state = {};
  let rules = [];
  const Childrens = {};
  const handleChange = (field, val) => {
    state[field] = val;
  };
  const getFieldDecorator = (field, option) => (InputCmp) => {
    rules[field] = option;
    const child = React.cloneElement(InputCmp, {
      name: field,
      value: state[field] || "",
      onFieldValChanged: handleChange.bind(null, field),
    });
    Childrens[field] = child;
    return child;
  };
  /*callBack里不能使用useState，
  得需要在组件内部使用,导致这种写法setFieldsValue不能更新页面
  */
  function setFieldsValue(entity) {
    state = { ...state, ...entity };
    // Object.keys(entity).forEach((k) => {
    //   console.log(Childrens[k]);
    // });
  }
  function getFieldsValue() {
    return state;
  }
  const validateFields = (callback) => {
    let err = [];

    for (let field in rules) {
      if (state[field] === undefined || state[field] === "") {
        err.push({
          [field]: "err  西撒哈拉",
        });
      }
    }
    if (err.length === 0) {
      // 校验成功
      callback(null, state);
    } else {
      callback(err, state);
    }
  };

  function getForm() {
    return {
      getFieldDecorator: getFieldDecorator,
      setFieldsValue: setFieldsValue,
      getFieldsValue: getFieldsValue,
      validateFields: validateFields,
    };
  }
  return <Cmp {...getForm()}></Cmp>;
};

export default CreateForm;
