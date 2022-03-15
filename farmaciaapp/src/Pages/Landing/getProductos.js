import {firestore} from "../../Firebase/firebase.utils";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default async function getProductos() {
    const productos = [];
    const collectionRef = collection(firestore, "productos");
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
      productos.push(doc.data());
    });
    return productos
}