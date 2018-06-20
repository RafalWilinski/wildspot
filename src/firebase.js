import firebase from "firebase";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

firebase
  .auth()
  .signInAnonymously()
  .catch(function(error) {});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem("uid", user.uid);
  }
});

export default firebase;
