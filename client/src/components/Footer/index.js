// import React from './node_modules/react';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
// import Navbar from './node_modules/react-bootstrap/Navbar'
// import NavbarBrand from './node_modules/react-bootstrap/NavbarBrand';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
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

