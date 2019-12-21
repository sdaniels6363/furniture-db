import React, { Component } from "react";
import API from "../../utils/API";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class Category extends Component {
    state = {
        categories: [],
        collapse: "-",
        searchCategories: []
    };

    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {
        API.getCategories()
            .then(res => {
                let data = res.data.sort()
                this.setState({
                    categories: data
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

    searchCategories = (e) => {
        //Set tempState to searchCategories state, so we can modify
        let tempState = this.state.searchCategories;
        //If the Changed switch is on/checked
        if(e.target.checked){
            //Push switch value to the tempState Array
            tempState.push(e.target.value);
        }else{
            //If off/not checked, first grab array index of the value of the switch.
            let index = tempState.indexOf(e.target.value);
            if(index !== -1){
                //If the value exists (array index starts at 0), then use splice to remove the single element from the array.
                tempState.splice(index, 1);
            }
        }
        //Set the new value of the searchCategories state.
        this.setState({searchCategories: tempState});
    }

    render() {
        return (
            <Accordion>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Category
                            <Accordion.Toggle as={Button} variant="Link" eventkey='0' className="float-right" onClick={this.changeToggle}>
                                <h5>{this.state.collapse}</h5>
                            </Accordion.Toggle>
                        </Card.Title>
                        <Accordion.Collapse>
                            <Form>
                                <Form.Row>
                                    {this.state.categories.map((category, i) => {
                                        return (
                                            <Col key={i} xs={4}>
                                                <Form.Switch
                                                    id={category}
                                                    value={category}
                                                    label={category.toUpperCase()}
                                                    onChange={this.searchCategories}
                                                    />
                                            </Col>
                                );
                            })}
                                </Form.Row>
                            </Form>
                        {/* <Row>
                            {this.state.categories.map((category, i) => {
                                return (
                                    <Col key={i} xs={4}>
                                        <Button variant="link"
                                            href={`/test/category/${category}`}>
                                            {category.toUpperCase()}
                                        </Button>
                                    </Col>
                                );
                            })}
                        </Row> */}
                        </Accordion.Collapse>
                    </Card.Body>
                </Card>
            </Accordion >
            //     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            //         {/* 
            // All navigation links with the exception of the About page are derived from a database call.
            // Which occurs via the getCategories function.
            // This will allow us to load links dynamically based on the category of furniture in the database.
            // */}
            //         {this.state.categories.map((category, i) => {
            //             return (
            //                 <a
            //                     key={i}
            //                     className="navbar-brand"
            //                     href={`/category/${category}`}>
            //                     {category.toUpperCase()}
            //                 </a>
            //             );
            //         })}
            //     </nav>
        );
    }
}

export default Category;
