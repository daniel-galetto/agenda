import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAVHxEZ8EmkgEdYBpIbas3GI3eSlHXpl4I",
    authDomain: "login-e931b.firebaseapp.com",
    databaseURL: "https://login-e931b.firebaseio.com",
    projectId: "login-e931b",
    storageBucket: "login-e931b.appspot.com",
  };

  const fireb = firebase.initializeApp(config);
  const store = fireb.firestore()

  export { store }