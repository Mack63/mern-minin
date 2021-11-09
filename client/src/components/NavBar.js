import React from 'react';
import {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const NavBar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHendler = (e)=>{
        e.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                <span className="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHendler}>Exit</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;