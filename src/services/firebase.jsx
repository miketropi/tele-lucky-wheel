import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADPUssAy4_6V_4wdFyooKTrmyIp1sfyZQ",
  authDomain: "kombat-ben-con.firebaseapp.com",
  projectId: "kombat-ben-con",
  storageBucket: "kombat-ben-con.firebasestorage.app",
  messagingSenderId: "712271176567",
  appId: "1:712271176567:web:2c4f32de10c0572aa43772",
  measurementId: "G-B5L81MMK9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); 

export { db, onSnapshot }
// const analytics = getAnalytics(app);