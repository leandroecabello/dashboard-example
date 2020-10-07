// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBZZZOY3z2_OVKvP-tS4Eu27Py-zO5wTgc",
    authDomain: "my-fb-crud.firebaseapp.com",
    databaseURL: "https://my-fb-crud.firebaseio.com",
    projectId: "my-fb-crud",
    storageBucket: "my-fb-crud.appspot.com",
    messagingSenderId: "773124027011",
    appId: "1:773124027011:web:8fe16c254e00965d0ee1b6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


/* service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if request.auth != null;
      }
    }
  } */