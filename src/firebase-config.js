import { initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy8MxPYaXxs3LNyber9mmhnSrl_L9O35g",
  authDomain: "flicks-c3dc9.firebaseapp.com",
  projectId: "flicks-c3dc9",
  storageBucket: "flicks-c3dc9.appspot.com",
  messagingSenderId: "361971686680",
  appId: "1:361971686680:web:9b62577ae474d02bf9926d",
  measurementId: "G-EHCNVX8CE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)