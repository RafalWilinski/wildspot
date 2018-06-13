import { withFormik } from "formik";
import Form from "./index";

const AddPlaceForm = withFormik({
  mapPropsToValues: props => {
    return { name: "", groundWork: "", isOpen: props.isOpen };
  },
  validate: (values, props) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */,
    },
  ) => {},
})(Form);

export default AddPlaceForm;
