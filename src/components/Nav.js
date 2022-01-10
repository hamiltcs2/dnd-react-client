import React from "react";
import {NavLink} from "react-router-dom";
import logo from '../images/logo.svg';
// import styled from "styled-components";
//import '../style/index.css';
function Nav() {
    // const container = styled.div`
    //     width: 80%
    //     margin: 0 auto;
    // `
    return(
        <div className = "nav-container">
            <img src={logo} className="App-logo" alt="logo" />
        <nav>
            <ul> 
            <li><NavLink exact to={"/"}>Home </NavLink></li>
            <li><NavLink exact to={"/combatants"}>Combatants </NavLink></li>
            <li><NavLink exact to={"/combatselect"}>Start Combat</NavLink></li>
            </ul> 
        </nav>
        </div>
    )
}
export default Nav;