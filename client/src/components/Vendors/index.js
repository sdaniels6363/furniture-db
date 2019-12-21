import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../../styles/Vendors.css";

class Vendors extends Component {
    state = {
        collapse: "-",
    };

    temp = ["init"];

    changeToggle = (e) => {
        if (this.state.collapse === "-") {
            this.setState({ collapse: "+" })
        }
        else {
            this.setState({ collapse: "-" })
        }
    }

    updateVendors = (e) => {
        //Initialize temp variable
        if (this.temp[0] === "init") {
            this.temp = [];
            this.props.vendorList.forEach(ele => this.temp.push(ele));
        }
        //If the changed switch is now "on/checked"
        if (e.target.checked) {
            //Push switch value to the this.temp Array
            this.temp.push(e.target.value);
        } else {
            //If off/not checked, first grab array index of the value of the switch.
            let index = this.temp.indexOf(e.target.value);
            if (index !== -1) {
                //If the value exists (array index starts at 0), then use splice to remove the single element from the array.
                this.temp.splice(index, 1);
            }
        }
        //Send vendor list back to Items page for filtering.
        this.props.filterVendors(this.temp)
    }

    render() {
        return (
            <Accordion>
                <Card id="vendorCard">
                    <Card.Body>
                        <Row>

                            <Col xs={9}>
                                <Card.Title className="text-left">
                                    <h3>Vendors</h3>
                        </Card.Title>
                            </Col>
                            <Col xs={1}>
                                <Accordion.Toggle as={Col} variant="Link" eventkey='0' className="text-right" onClick={this.changeToggle}>
                                    <h3>{this.state.collapse}</h3>
                                </Accordion.Toggle>
                            </Col>
                        </Row>
                        <Accordion.Collapse>
                            <Form>
                                <Form.Row>
                                    {this.props.vendorList.map((vendor, i) => {
                                        return (
                                            <Col key={i} xs={12}>
                                                <Form.Switch
                                                    id={vendor}
                                                    value={vendor}
                                                    label={vendor.toUpperCase()}
                                                    onChange={this.updateVendors}
                                                    defaultChecked
                                                />
                                            </Col>
                                        );
                                    })}
                                </Form.Row>
                            </Form>
                        </Accordion.Collapse>
                    </Card.Body>
                </Card>
            </Accordion >
        );
    }
}

export default Vendors;
