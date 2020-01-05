import React from "react";
// import ReactDOM from "./node_modules/react-dom";
import Navbar from 'react-bootstrap/Navbar'
import "../../styles/Header.css";
import logoBG from "./CClogo-white.svg";


class Header extends React.Component {
    render() {
        return (
            <Navbar className="header">
                {/* <Navbar.Brand href="#home"> */}
                <a className="my-a" href="/about">
                    <img
                        src={logoBG}
                        alt="The Custom Corner"
                        id="header-logo"
                    />
                </a>
                {/* </Navbar.Brand> */}
            </Navbar>
        )
    }
}


export default Header
