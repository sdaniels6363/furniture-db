import React from "./node_modules/react";
import ReactDOM from "./node_modules/react-dom";
import Navbar from './node_modules/react-bootstrap/Navbar'
import "./Header.css";


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