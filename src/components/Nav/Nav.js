import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import logo from '../../images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
function Nav() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])
    return(
        <div className = "nav-container">
            <script src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"></script>
            {(screenWidth > 500) && (
                <img src={logo} className="App-logo" alt="logo"></img>
            )}
        <nav>
            {(toggleMenu || screenWidth > 500) && (
            
            <ul className="list"> 
            <li className="items"><NavLink exact to={"/"}>Home </NavLink></li>
            <li className="items"><NavLink exact to={"/combatants"}>Combatants </NavLink></li>
            <li className="items"><NavLink exact to={"/combatselect"}>Start Combat</NavLink></li>
            </ul> 
            )}
        </nav>
        <FontAwesomeIcon onClick={toggleNav} className = "bars" icon ={faBars}/>
        </div>
    )
}
export default Nav;