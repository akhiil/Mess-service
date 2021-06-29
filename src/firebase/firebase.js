import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAGXMWBClw0iLWCat2p5mT3GJpI72R6B6E",
    authDomain: "mealfi-testing.firebaseapp.com",
    databaseURL: "https://mealfi-testing.firebaseio.com",
    projectId: "mealfi-testing",
    storageBucket: "mealfi-testing.appspot.com",
    messagingSenderId: "219782282880",
    appId: "1:219782282880:web:0e8326b78e2a94ae5f3065",
    measurementId: "G-PJVJTG3YFJ"
};

firebase.initializeApp(firebaseConfig);

export default firebase;