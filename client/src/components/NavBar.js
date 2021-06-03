import React, { Component,useState,useContext } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/GlobalContext';

const NavBar=(props)=>{
    const auth=useContext(AuthContext);

    const onLogout=()=>{
        auth.isLoggedOut(); 
    }

        return (
            <div className="nav-bar-full">
                <div className="nav-bar-left">
                    <span className="navbarTitle">NETFLIX</span>
                    <Link to="/home" className="nav-links">Home</Link>
                    <Link to="/movies" className="nav-links">Movies</Link>
                    <Link to="/series" className="nav-links">Series</Link>
                    <Link to="/my-list" className="nav-links">My List</Link>
                </div>
                <div className="nav-bar-right">
                    <Link to="/" onClick={()=>onLogout()} className="nav-links">Logout</Link>
                </div>
            </div>
        )
    }

export default NavBar;