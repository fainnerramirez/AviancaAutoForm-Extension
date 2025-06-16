import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyBpqkCgo0JTllWwhDHGa9HH-rB7Xp9Hx2g",
    authDomain: "avianca-94a3f.firebaseapp.com",
    projectId: "avianca-94a3f",
    storageBucket: "avianca-94a3f.firebasestorage.app",
    messagingSenderId: "1024443142187",
    appId: "1:1024443142187:web:c7dc9982055a7a56c45a6e",
    measurementId: "G-FFG631FWWC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);