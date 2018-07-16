import { withFormik } from "formik";
import * as Yup from "yup";

import spotFactory from "../../templates/spot";
import firebase from "../../firebase";
import Form from "./index";

const AddPlaceForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    name: "",
    images: [],
    description: "",
    features: { empty: true },
    coordinates: props.coordinates,
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Required 👮‍")
      .min(3, "At least 3 characters 😠")
      .max(59, "Max 60 chars!"),
    description: Yup.string().max(4999, "Max 5000 chars!"),
    groundwork: Yup.string().required("Required 👮‍"),
  }),
  handleSubmit: (values, { props, setSubmitting, setError }) => {
    setSubmitting(true);

    const newSpotKey = firebase
      .database()
      .ref()
      .child("spots")
      .push().key;

    const newSpot = spotFactory(newSpotKey, {
      coordinates: props.coordinates,
      lat: parseFloat(props.coordinates[0]),
      lng: parseFloat(props.coordinates[1]),
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
        console.log(error);
        setSubmitting(false);
      });
  },
})(Form);

export default AddPlaceForm;
