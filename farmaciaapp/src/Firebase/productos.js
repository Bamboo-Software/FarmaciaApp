import { firestore } from "./firebase.utils";
import * as firebase from "firebase/firestore";

export const obtenerProductos = async () => {
    return await firestore
        .collection("productos")
        .get()
        .then(collection => {
            let Sugeridos = [];
            collection.forEach(doc => {
                Sugeridos.push({ ...doc.data(), id: doc.id });
            });
            return Sugeridos;
        });
};

export const obtenerHigiene = async () => {
    return await firestore
        .collection("higiene")
        .get()
        .then(collection => {
            let Sugeridos = [];
            collection.forEach(doc => {
                Sugeridos.push({ ...doc.data(), id: doc.id });
            });
            return Sugeridos;
        });
};

export const obtenerMascarilla = async () => {
    return await firestore
        .collection("mascarillas")
        .get()
        .then(collection => {
            let Sugeridos = [];
            collection.forEach(doc => {
                Sugeridos.push({ ...doc.data(), id: doc.id });
            });
            return Sugeridos;
        });
};