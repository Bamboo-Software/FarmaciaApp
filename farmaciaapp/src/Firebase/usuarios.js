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
  const user = auth.currentUser;
  if (user != null) {
    const res = await firestore.collection("usuarios").doc(id).get();
    return res.data();
  }
};

export const getCurrentUser = async () => {
  const user = auth.currentUser;
  if (user != null) {
    const res = await firestore.collection("usuarios").doc(user.uid).get();
    return res.data();
  }
  return null;
}

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

export const CrearModificarUsuario = async (usuario) => {
  const user = auth.currentUser;
  if (user != null) {
    try {
      await firestore.collection("usuarios").doc(user.uid).set(usuario);
    } catch (error) {
      console.error(error);
    }
  }
};

export const modificarUsuario = async usuario => {
  return await firestore
    .collection("usuarios")
    .doc(usuario.uid)
    .update(usuario);
};

export const agregarUsuario = async usuario => {
  try {
    return await firestore.collection("usuarios").add(usuario);
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
      const direccion="";
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
