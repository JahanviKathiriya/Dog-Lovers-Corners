import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './navbar.css'

class NavbarNav extends Component {
    render() {
        return (
            <nav className="navbar px-3">
                <span className='navbar-brand mb-0 h1'>Dog Lovers Corner</span>
                <div className='justify-content-end'>
                    <a className='text-decoration-none' href = "mailto: jckathiriya@crimson.ua.edu">Contact me!</a>
                </div>
            </nav>
        );
    }
}

export default NavbarNav;