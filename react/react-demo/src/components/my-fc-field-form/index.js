import _Form from "./Form";
import Field from "./Field";
import UseForm from "./useForm";

const Form = _Form;
Form.useForm = UseForm;

export { Field, UseForm };
export default Form;
