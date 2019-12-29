import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import API from "../utils/API";
// import Bootstrap from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length >= 6;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  login = event => {
    event.preventDefault();

    const body = {
      username: this.state.username,
      password: this.state.password
    }

    API.validateUser(body)
      .then(res => {
        console.log(res)
        alert(res.data)
      })
      .catch(err => {
        switch (err.response.status){
          case 401:
            alert(err.response.data);
            break;
          case 500:
            alert("Server error")
            break;
          default:
            console.log("not sure.")
        }
      })

      this.setState({
        username: "",
        password: ""  
      })

  }

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.login}>
          <Form.Group bsSize="large">
            <Form.Control
              autoFocus
              type="username"
              value={this.state.email}
              onChange={this.handleChange}
              name="username"
            />
          </Form.Group>
          <Form.Group bsSize="large">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login