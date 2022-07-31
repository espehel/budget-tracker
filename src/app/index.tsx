import React from "react";
import { render } from "react-dom";
import App from "./App";
import { initializeApp } from "firebase/app";

initializeApp({
    apiKey: "AIzaSyCXVN0IeRpd9rJUafcqmvCqGwvZQ5wXZw8",
    authDomain: "budget-tracker-62d3c.firebaseapp.com",
    projectId: "budget-tracker-62d3c",
    storageBucket: "budget-tracker-62d3c.appspot.com",
    messagingSenderId: "168684940775",
    appId: "1:168684940775:web:e508fc141d7eaae6cf2142"
});

render(<App />, document.getElementById("root"));
