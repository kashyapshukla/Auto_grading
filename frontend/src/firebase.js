// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEqhnnM_y1RDk0M8N_5rqO36fqGB9BQF8",
  authDomain: "assignment-grader-f1a6f.firebaseapp.com",
  projectId: "assignment-grader-f1a6f",
  storageBucket: "assignment-grader-f1a6f.appspot.com",
  messagingSenderId: "1021092319380",
  appId: "1:1021092319380:web:945d462868cbcb86b46481",
  measurementId: "G-0HQTJY80P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;