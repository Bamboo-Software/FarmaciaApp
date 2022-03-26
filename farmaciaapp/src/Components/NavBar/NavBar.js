import React from "react";
import { NavLink } from 'react-bootstrap';
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function Barra() {
    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
    }
    return (
        <>
            <div className="d-flex justify-content-around align-items-center Fondo-menubar">
                <NavLink className="Links"onClick={() => handleClick("/Medicamentos")}>Medicamentos</NavLink>
                <NavLink className="Links"onClick={() => handleClick("/Mascarillas")}>Mascarillas</NavLink>
                <NavLink className="Links"onClick={() => handleClick("/Higiene")}>Higiene</NavLink>
            </div>
        </>
    );
}
//    <NavLink className="Links">Promociones</NavLink>
export default Barra;