import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { crearDocumentoUsuarios } from "./usuarios";

const config = {
    apiKey: "AIzaSyCLPxyFIhheZDY77DAOsG8xOdF9-VsuEuI",
    authDomain: "farmaciaapp-16a43.firebaseapp.com",
    projectId: "farmaciaapp-16a43",
    storageBucket: "farmaciaapp-16a43.appspot.com",
    messagingSenderId: "188152559161",
    appId: "1:188152559161:web:4085a4ac0e9a863eb03fe8",
    measurementId: "G-70SG5GQRTT"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = async () =>
    await auth
        .signInWithPopup(provider)
        .then(() => {
            crearDocumentoUsuarios({});
        })
        .catch(err => {
            switch (err.code) {
                case "auth/popup-closed-by-user":
                    break;

                default:
                    console.log(err);
                    break;
            }
        });

export default firebase;