import React, { createContext, useState, useEffect } from "react";
import { auth } from "../Firebase/firebase.utils";
import { obtenerUsuario } from "../Firebase/usuarios";

export const contextoUser = createContext({
    isAuth: false,
    name: "",
    email: "",
    rol: "normal"
});

function Contexto(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            obtenerUsuario(!!userAuth ? userAuth.uid : null)
                .then(usuario => {
                    if (usuario.rol == "bloqueado") {
                        auth.signOut()
                        setUser({
                            isAuth: !!userAuth,
                            name: !!userAuth ? userAuth.displayName : "",
                            email: !!userAuth ? userAuth.email : "",
                            rol: !!userAuth ? "normal" : "normal"
                        });
                        return;
                    }
                    const ref = usuario;
                    console.log("Hola en user Context", usuario);
                    setUser({
                        isAuth: !!userAuth,
                        name: !!userAuth ? ref.displayName : "",
                        email: !!userAuth ? ref.email : "",
                        rol: !!userAuth ? ref.rol : "normal"
                    });
                })
                .catch(() => {
                    setUser({
                        isAuth: !!userAuth,
                        name: !!userAuth ? userAuth.displayName : "",
                        email: !!userAuth ? userAuth.email : "",
                        rol: !!userAuth ? "normal" : "normal"
                    });
                });
        });
    }, []);
    return (
        <contextoUser.Provider value={user}>{props.children}</contextoUser.Provider>
    );
}

export default Contexto;