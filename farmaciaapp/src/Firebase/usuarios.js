import { QuerySnapshot } from "firebase/firestore";
import { firestore, auth } from "./firebase.utils";

export const getAllUsers = async () => {
  return firestore
    .collection("usuarios")
    .get()
    .then(collection => {
      let usuarios = [];
      collection.forEach(doc => {
        usuarios.push(doc.data());
      });
      return usuarios;
    });
}

export const obtenerUsuario = async id => {
  try {
    const user = auth.currentUser;

    console.log("afuera");
    if (user != null) {
      let ref = "";
      console.log("adentro");
      //const res = await firestore.collection("usuarios").doc('6ZI5S44GCHmquWLzuiDr').get();
      const res = await firestore.collection("usuarios").where('UID', '==', id).get().then((x) => {
        x.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          ref = doc.data();
        })
      });
      return ref;
    }
  } catch (error) {
    console.log(error);
  }

};

export const obtenerUsuarioActual = async () => {
  const user = auth.currentUser;
  console.log(user.uid);
  return await firestore
    .collection("usuarios")
    .where('UID', '==', user.uid.toString)
    .get()
    .then(collection => {
      let users = [];
      collection.forEach(doc => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log("firebase")
      console.log(users);
      return users;
    });
};

export const borrarUsuario = async () => {
  const user = auth.currentUser;
  if (user != null) {
    firestore
      .collection("usuarios")
      .doc(user.uid)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
};

export const modificarUsuario = async (usuario) => {
  const user = auth.currentUser;
  if (user != null) {
    try {
      await firestore.collection("usuarios").doc(user.uid).set(usuario);
    } catch (error) {
      console.error(error);
    }
  }
};

export const agregarUsuario = async usuario => {
  const user = auth.currentUser;
  try {
    return await firestore.collection("usuarios").doc(user.uid).set(usuario);
  } catch (error) {
    console.log(error);
  }
};

export const crearDocumentoUsuarios = async (additionalData) => {
  const user = auth.currentUser;
  if (user != null) {
    const userRef = firestore.doc(`usuarios/${user.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      const { displayName, email, uid } = user;
      const createdAt = new Date();
      const direccion = "";
      const rol = "normal";
      try {
        await userRef.set({
          displayName,
          direccion,
          email,
          createdAt,
          uid,
          rol,
          ...additionalData,
        });
      } catch (error) {
        console.log("Error creating user", error.message);
      }
    }
    return userRef;
  }
  return null;
};
