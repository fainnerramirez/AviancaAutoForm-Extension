import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
// const { getAnalytics } = require('https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js');
// const { getAuth } = require('https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js');
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
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
const db = getFirestore(app);

const createHistoryUsage = async (countUsage = 0) => {
    try {
        const doc = await db.collection("historyAviancaAutoForm").add({ count: countUsage });
        return doc.id;
    }
    catch (error) {
        console.error("Ha ocurrio un error al crear la colección de History Usage. | Error: ", error);
        throw error;
    }
}

const getDataHistoryUsage = async () => {
    try {
        const collection = await db.collection("historyAviancaAutoForm").get();
        Array.from(collection).forEach(doc => {
            console.log("Doc: ", { id: doc.id, data: doc.data() });
        });
    }
    catch (error) {
        console.error("Ha ocurrido un error al obtener la data de la colección history usage. | Error: ", error);
        throw error;
    }
}