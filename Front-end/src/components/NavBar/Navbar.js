import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../NavBar/Navbar.css'
import Logo1 from '../img/Logo1.png'
import Hamburger from '../Hamburger/Hamburger';



class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm mb-4">
                    <div className="container">
                        <img className="logo" src={Logo1} style={{ width: "10vw", height: 'auto', maxWidth: "1000px", minWidth: "70px" }} alt="logo" />
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav" >
                            <span className="navbar-toggler-icon"></span>
                            <Hamburger />
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav ml-auto text-right">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/landing">Home</Link>
                                </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/modeselection">Form</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/reports">Report</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/contact">Contact</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">Sign out</Link>
                                    </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>

        )
    }
}

export default Navbar;