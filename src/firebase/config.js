import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-S4nRd0KYyzzyyEhRm687UMrdyyBAF_c",
  authDomain: "task-manager-challenge-05.firebaseapp.com",
  projectId: "task-manager-challenge-05",
  storageBucket: "task-manager-challenge-05.firebasestorage.app",
  messagingSenderId: "659248773455",
  appId: "1:659248773455:web:255c34d45b925aeb772d3a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);