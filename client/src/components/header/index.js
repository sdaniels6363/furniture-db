import React from "react";
// import ReactDOM from "./node_modules/react-dom";
import Navbar from 'react-bootstrap/Navbar'
import "../../styles/Header.css";
import logoBG from "./logoBG.png";


class Header extends React.Component {
    render() {
        return (
            <Navbar fixedTop className="header">
                <Navbar.Brand href="#home">
                    <img
                        src={logoBG}
                        width="300"
                        height="50"
                        className="d-inline-block align-top"
                        alt="The Custom Corner"
                    />
                </Navbar.Brand>
            </Navbar>
        )
    }
}


export default Header 