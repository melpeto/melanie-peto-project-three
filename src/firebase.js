import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAi7p7cU-0guskBo5DQ66F_Fr6HPHeDioU",
    authDomain: "melanie-peto-project-three.firebaseapp.com",
    projectId: "melanie-peto-project-three",
    storageBucket: "melanie-peto-project-three.appspot.com",
    messagingSenderId: "134444887082",
    appId: "1:134444887082:web:20bdd5458feff4749d6753"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;