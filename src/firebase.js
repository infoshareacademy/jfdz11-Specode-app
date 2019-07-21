import * as firebase from "firebase";

const db = firebase.initializeApp({
  apiKey: "AIzaSyCm4hot4CmtrZIO-FatVPxfSlNShg785CM",
  authDomain: "specode-app.firebaseapp.com",
  databaseURL: "https://specode-app.firebaseio.com",
  projectId: "specode-app",
  storageBucket: "",
  messagingSenderId: "27552982687",
  appId: "1:27552982687:web:d7fe34e627e4b5c8"
});

export default db;
