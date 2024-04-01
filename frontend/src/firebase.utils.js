import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";




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
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);