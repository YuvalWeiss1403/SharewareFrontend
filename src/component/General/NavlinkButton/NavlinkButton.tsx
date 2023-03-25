import "../NavlinkButton/NavlinkButton.css"
import React from "react";
import { NavLink } from "react-router-dom"; 
import { INavlinkButton } from "../../../interfaces";

const NavlinkButton: React.FC<INavlinkButton> = (props:INavlinkButton) => {
    return (
        <>
            <NavLink to={props.navigate} id={`button-hidden`} className={({isActive} ) => isActive ? "button button-active" : "button button-not-active" }>
                    {props.name}
            </NavLink>
        </>
    )
}

export default NavlinkButton