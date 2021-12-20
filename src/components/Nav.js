import React from "react";
import {NavLink} from "react-router-dom";
function Nav() {
    return(
        <nav>
            <NavLink exact to={"/"}>Home </NavLink>
            <NavLink exact to={"/combatants"}>Combatants </NavLink>
            <NavLink exact to={"/combatselect"}>Start Combat</NavLink>
        </nav>
    )
}
export default Nav;