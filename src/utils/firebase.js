import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuMXlsSWkKwi2QBYZlSzVwExHH8y6T8ZU",
  authDomain: "reactnative-restaurante.firebaseapp.com",
  projectId: "reactnative-restaurante",
  storageBucket: "reactnative-restaurante.appspot.com",
  messagingSenderId: "781519364472",
  appId: "1:781519364472:web:e1ddb2006377c41a91288d",
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
