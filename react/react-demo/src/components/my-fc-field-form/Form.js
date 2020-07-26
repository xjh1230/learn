import React, { Component } from "react";
import FieldContext from "./FieldContext";
import UseForm from "./useForm";

export default function Form({ form, children, onFinshed, onFinishFailed }) {
  const [formInstance] = UseForm(form);
  formInstance.setCallback({
    onFinishFailed,
    onFinshed,
  });
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
