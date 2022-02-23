import React from "react";
import { NavLink } from 'react-bootstrap';
import "./NavBar.css";

function Barra() {
    return (
        <>
            <div className="d-flex justify-content-around align-items-center Fondo-menubar">
                <NavLink className="Links">Medicamentos</NavLink>
                <NavLink className="Links">Mascarillas</NavLink>
                <NavLink className="Links">Higiene</NavLink>
                <NavLink className="Links">Promociones</NavLink>
            </div>
        </>
    );
}

export default Barra;