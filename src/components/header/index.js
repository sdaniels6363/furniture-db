import React from "./node_modules/react";
// import ReactDOM from "react-dom";
import Navbar from 'react-bootstrap/Navbar'
import "./style.css";


class Header extends React.Component {
    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand href="#home">Custom Corner</Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }

}

export default Header 