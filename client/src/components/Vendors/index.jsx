import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class Vendors extends Component {
    state = {
        collapse: "-",
    };

    temp = ["init"];
    componentDidMount() {
        // this.getVendors();
    }

    // getVendors() {
    //     API.getVendors()
    //       .then(res => {
    //         this.setState({
    //           vendors: res.data
    //         });
    //       })
    //       .catch(err => console.log(err));
    //   }

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
        if(this.temp[0] === "init"){
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
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Vendors
                            <Accordion.Toggle as={Button} variant="Link" eventkey='0' className="float-right" onClick={this.changeToggle}>
                                <h5>{this.state.collapse}</h5>
                            </Accordion.Toggle>
                        </Card.Title>
                        <Accordion.Collapse>
                            <Form>
                                <Form.Row>
                                    {this.props.vendorList.map((vendor, i) => {
                                        return (
                                            <Col key={i} xs={6}>
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
