// src/firebaseConfig.js
import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC6gJ3sV7mZ5eb0huIeu_oKciWqj03GnJ4",
    authDomain: "hackathon-cd299.firebaseapp.com",
    databaseURL: "https://hackathon-cd299.firebaseio.com",
    projectId: "hackathon-cd299",
    storageBucket: "hackathon-cd299.appspot.com",
    messagingSenderId: "149670035716",
    appId: "1:149670035716:web:702e098bc9bf94e1079051"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);