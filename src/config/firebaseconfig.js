import  firebase from "firebase"
import 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiefIa-ZS6Sznwh1qN93qkqUWaJsCa4JM",
  authDomain: "appmy-73b69.firebaseapp.com",
  projectId: "appmy-73b69",
  storageBucket: "appmy-73b69.appspot.com",
  messagingSenderId: "863577441913",
  appId: "1:863577441913:web:0a19df4507ae308076f6a8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
export default database