import { withFormik } from "formik";

import spotFactory from "../../templates/spot";
import firebase from "../../firebase";
import Form from "./index";

const AddPlaceForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    console.log(props);
    return {
      name: "",
      images: [],
      description: "",
      features: {},
      coordinates: props.coordinates,
    };
  },
  validate: (values, props) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },
  handleSubmit: (values, { props, setSubmitting, setError }) => {
    setSubmitting(true);

    const newSpotKey = firebase
      .database()
      .ref()
      .child("spots")
      .push().key;

    console.log(props);

    const newSpot = spotFactory(newSpotKey, {
      coordinates: props.coordinates,
      lat: props.coordinates[0],
      lng: props.coordinates[1],
      ...values,
    });

    const updates = {};
    updates[`/spots/${newSpotKey}`] = newSpot;
    updates[`/users/${localStorage.getItem("uid")}/${newSpotKey}`] = newSpotKey;

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        setSubmitting(false);
        props.onCloseForm();
      })
      .catch(error => {
        setError(error);
        setSubmitting(false);
      });
  },
})(Form);

export default AddPlaceForm;
