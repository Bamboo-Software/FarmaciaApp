import { firestore, auth } from "./firebase.utils";
import * as firebase from "firebase/firestore";

export const agregarPago = async Pago => {
    const user = auth.currentUser;
    try {
        return await firestore.collection("Pagos").doc().set(Pago);
    } catch (error) {
       // console.log(error);
    }
};