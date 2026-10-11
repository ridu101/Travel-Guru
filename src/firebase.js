
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAECkBzOyt65Ytk5fQkw0mZ-ChNPWnA1io",
    authDomain: "travel-guru-30834.firebaseapp.com",
    projectId: "travel-guru-30834",
    storageBucket: "travel-guru-30834.firebasestorage.app",
    messagingSenderId: "191067323997",
    appId: "1:191067323997:web:f5abfde6e80c7c3b7dd7b4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
