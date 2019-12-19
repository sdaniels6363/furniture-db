import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import "../../styles/Footer.css";

class AppFooter extends React.Component {
    render() {
        return(
            <div className="footer">  
            <Navbar color="dark" dark>
                <div>
                    <NavbarBrand>Footer</NavbarBrand>
                </div>
            </Navbar>
        </div>
        )
    }
}



export default AppFooter

