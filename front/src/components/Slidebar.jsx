import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaInfo, FaUserPlus, FaSignOutAlt, FaBars, FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import "../styles/Header.css"; 

function Header(props) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleSidebar() {
        setIsMenuOpen(!isMenuOpen);
    }

    function logMeOut() {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/logout",
        })
            .then((response) => {
                props.removeToken(); 
                localStorage.removeItem('email');
                navigate("/login");
            }).catch((error) => {
                console.error("Error logging out:", error);
            })
    }

    const logged = localStorage.getItem('email');

    return (
        <div>
            <button
                className="btn btn-primary d-md-none"
                type="button"
                onClick={toggleSidebar}
                style={{
                    borderRadius: '2%',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '10px 15px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease'
                }}
            >
                <FaBars style={{ marginRight: '5px' }} />
                Mostrar Menú
            </button>

            <div className={"sidebar" + (isMenuOpen ? "" : " toggled")} onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
                <nav className="navbar navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <div className="user-profile">
                        {logged && <FaUser />}
                        {isMenuOpen && logged}
                    </div>
                    <div className="sidebar-wrapper">
                        <ul className="list-unstyled components">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile"><FaHome /><span> Home</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about"><FaInfo /><span> About</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register"><FaUserPlus /><span> Register</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/opticalusers"><FaUserDoctor/><span> Optical Users</span></Link>
                            </li>
                        </ul>
                    </div>
                    {logged && (
                        <div className="logout-container">
                            <button className="btn btn-danger btn-logout" onClick={logMeOut}>
                                <FaSignOutAlt />
                                <span>{!isMenuOpen ? null : 'Login'}</span>
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Header;
