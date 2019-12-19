import React, { Component } from "react";
import API from "../../utils/API";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class Vendors extends Component {
    state = {
        vendors: [],
        collapse: "-",
    };

    componentDidMount() {
        this.getVendors();
    }

    getVendors() {
        API.getVendors()
          .then(res => {
            this.setState({
              vendors: res.data
            });
          })
          .catch(err => console.log(err));
      }

    changeToggle = (e) => {
        if (this.state.collapse === "-") {
            this.setState({ collapse: "+" })
        }
        else {
            this.setState({ collapse: "-" })
        }
    }

    searchVendors = (e) => {
        //Set tempState to searchVendors state, so we can modify
        let tempState = this.state.searchVendors;
        //If the Changed switch is on/checked
        if (e.target.checked) {
            //Push switch value to the tempState Array
            tempState.push(e.target.value);
        } else {
            //If off/not checked, first grab array index of the value of the switch.
            let index = tempState.indexOf(e.target.value);
            if (index !== -1) {
                //If the value exists (array index starts at 0), then use splice to remove the single element from the array.
                tempState.splice(index, 1);
            }
        }
        //Set the new value of the searchVendors state.
        this.setState({ searchVendors: tempState });
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
                                    {this.state.vendors.map((vendor, i) => {
                                        return (
                                            <Col key={i} xs={4}>
                                                <Form.Switch
                                                    id={vendor}
                                                    value={vendor}
                                                    label={vendor.toUpperCase()}
                                                    onChange={this.searchCategories}
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
