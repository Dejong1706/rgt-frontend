import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAhsemvTJunlV1rWnn2cRGXu6ISh0pS_RQ",
  authDomain: "bookstore-a242c.firebaseapp.com",
  databaseURL:
    "https://bookstore-a242c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bookstore-a242c",
  storageBucket: "bookstore-a242c.firebasestorage.app",
  messagingSenderId: "180596217859",
  appId: "1:180596217859:web:ab1ad88d7499658bf65636",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
