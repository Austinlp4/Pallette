import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBF005NPJDUpt4536zuBp_FfYbU81Whhu0",
    authDomain: "pallete-6b871.firebaseapp.com",
    databaseURL: "https://pallete-6b871.firebaseio.com",
    projectId: "pallete-6b871",
    storageBucket: "pallete-6b871.appspot.com",
    messagingSenderId: "953289263453"
  };
  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;