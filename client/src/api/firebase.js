import { initializeApp } from "firebase/app";

//require('dotenv').config({path: __dirname+'../../../.env'})

const apiFirebase = initializeApp({
    apiKey: "AIzaSyCf73Jwmf7LSwi5hjTXLFXmFnqQWxRP_bs",
    authDomain: "dashboard-b0e8c.firebaseapp.com",
    projectId: "dashboard-b0e8c",
    storageBucket: "dashboard-b0e8c.appspot.com",
    messagingSenderId: "462021239846",
    appId: "1:462021239846:web:caedef2a7ada6ffe6572e7"
});

export default apiFirebase.firestore;