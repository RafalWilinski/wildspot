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
      .min(3, "At least 3 characters 😠"),
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
