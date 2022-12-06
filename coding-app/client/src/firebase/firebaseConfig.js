import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAomNZ3_0wZLUdXpt8tw5-e9RAGnhHh8KY",
    authDomain: "coding-app-89f0f.firebaseapp.com",
    projectId: "coding-app-89f0f",
    storageBucket: "coding-app-89f0f.appspot.com",
    messagingSenderId: "623773494391",
    appId: "1:623773494391:web:8253f7a1ac6c571f71aa72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    app , auth, db
};