import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig =  {
    apiKey: "AIzaSyBfiftjP8Fkrt9Y-8J4ImahFAL_xc95M38",
    authDomain: "paradigmas-1.firebaseapp.com",
    databaseURL: "https://paradigmas-1.firebaseio.com",
    projectId: "paradigmas-1",
    storageBucket: "paradigmas-1.appspot.com",
    messagingSenderId: "1025339766387",
    appId: "1:1025339766387:web:44fd19ec007ba575d31c06"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export {firebase};