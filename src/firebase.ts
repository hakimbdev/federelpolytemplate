import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB_WW0VHuSSf_LsLG0Q0X0zo9mYT7TW_gA",
  authDomain: "ksadpmis.firebaseapp.com",
  databaseURL: "https://ksadpmis-default-rtdb.firebaseio.com",
  projectId: "ksadpmis",
  storageBucket: "ksadpmis.firebasestorage.app",
  messagingSenderId: "124884004154",
  appId: "1:124884004154:web:281e912b5b6563c7fc7403",
  measurementId: "G-TZ4G3NF7X5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);