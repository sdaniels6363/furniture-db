import React from "react";
// import ReactDOM from "./node_modules/react-dom";
import Nav from 'react-bootstrap/Nav'
import "../../styles/Header.css";


class Header extends React.Component {
    render() {
        return (
            <Nav fixedTop className="header">
                <Nav.Header>
                    <Nav.Brand href="#home">Custom Corner</Nav.Brand>
                </Nav.Header>
            </Nav>
        );
    }

}

export default Header 