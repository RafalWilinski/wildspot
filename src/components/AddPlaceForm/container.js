import { withFormik } from "formik";

import spotFactory from "../../templates/spot";
import firebase from "../../firebase";
import Form from "./index";

const AddPlaceForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
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
  handleSubmit: (values, { props }) => {
    const newSpotKey = firebase
      .database()
      .ref()
      .child("spots")
      .push().key;

    console.log(values);

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
      .update(updates);
  },
})(Form);

export default AddPlaceForm;
