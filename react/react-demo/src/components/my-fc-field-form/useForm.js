import React, { useRef } from "react";
import { isDef } from "../../util/index";
class FormStore {
  constructor() {
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
  }
  registerEntity = (entity) => {
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities = this.fieldEntities.filter((e) => e != entity);
      delete this.store[entity.props.name];
    };
  };
  setCallback = (cb) => {
    this.callbacks = {
      ...this.callbacks,
      ...cb,
    };
  };

  setFieldValue = (name, value) => {
    this.store[name] = value;
    const entity = this.fieldEntities.find((s) => s.props.name == name);
    entity.onStoreChange();
  };

  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    };
    Object.keys(newStore).forEach((name) => {
      let entity = this.fieldEntities.find((e) => e.props.name == name);
      if (entity) {
        entity.onStoreChange();
      }
    });
  };
  validate = () => {
    let err = [];
    this.fieldEntities.forEach((entity) => {
      const { name, rules } = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];
      if (rules && rule.required && !isDef(value)) {
        err.push({
          [name]: rule.message,
          value,
        });
      }
    });
    return err;
  };
  submit = () => {
    console.log("this.", this.fieldEntities); //sy-log
    let err = this.validate();
    // 在这里校验 成功的话 执行onFinish ，失败执行onFinishFailed
    const { onFinshed, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      // 成功的话 执行onFinish
      onFinshed(this.getFiledsValue());
    } else if (err.length > 0) {
      // ，失败执行onFinishFailed
      onFinishFailed(err);
    }
  };
  getFiledsValue = () => {
    return this.store;
  };
  getFieldValue = (name) => {
    return this.store[name];
  };
  getForm() {
    return {
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      submit: this.submit,
      setCallback: this.setCallback,
      registerEntity: this.registerEntity,
      getFiledsValue: this.getFiledsValue,
    };
  }
}
export default function UseForm(form) {
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
