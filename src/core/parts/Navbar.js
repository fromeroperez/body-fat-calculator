import React from "react";

function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <div className="navbar-image">
                            <img src={require("../../assets/img/logo.jpg")} alt="LOGO" className="d-inline-block align-text-top" />
                        </div>
                        <div className="navbar-text">
                            <span>Health Overview</span>
                        </div>
                    </a>
                    <img src={require("../../assets/img/logo-menu.jpg")} alt="BUTTON" className="navbar-button" />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;