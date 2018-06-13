import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAhoPnB_BMKGGUip1fOv0HaVw-F8QRX18s",
  storageBucket: "gs://wildspots-d2aad.appspot.com",
  databaseURL: "https://wildspots-d2aad.firebaseio.com/",
});

firebase
  .auth()
  .signInAnonymously()
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var uid = user.uid;
    localStorage.setItem("uid", user.uid);
  }
});

export default firebase;
