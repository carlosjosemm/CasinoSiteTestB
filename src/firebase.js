import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA1mz3xYj1bqwjy_1-EE6vDjkIksK9lG3s",
    authDomain: "casino-testcm.firebaseapp.com",
    projectId: "casino-testcm",
    storageBucket: "casino-testcm.appspot.com",
    messagingSenderId: "728027221194",
    appId: "1:728027221194:web:c4cd6cd9b39e12b607b833",
    measurementId: "G-L89YTR1LJF"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;