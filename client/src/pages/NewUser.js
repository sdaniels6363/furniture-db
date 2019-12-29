import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Bootstrap from "react-bootstrap";
import API from "../utils/API"

function passwordRequirements(password) {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (strongRegex.test(password)) {
    return true;
  } else {
    return false;
  }
}

class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password2: ""
    };
  }

  validateForm() {
    return (
      this.state.username.length >= 6);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  createUser = event => {
    event.preventDefault();

    const body = {
      username: this.state.username,
      password: this.state.password
    }

    // confirm if password and password2 are equal
    if (this.state.password !== this.state.password2) {
      alert("Passwords do not match.")
      // clear state
      this.setState({
        password: "",
        password2: ""
      })
      return false; // terminate new user creation
    }

    // validate if password meets requirements
    if (body.password) {
      let meetsReq = passwordRequirements(body.password);
      if (!meetsReq) {
        alert("Password Requirements: 1 Uppercase letter, 1 Lowercase letter, 1 Special Character, and 1 Number.")
        // clear state
        this.setState({
          password: "",
          password2: ""
        })
        return false; // terminate new user creation
      }
    }

    API.newUser(body)
      .then(res => {
        alert(res.data)
      })
      .catch(err => {
        if (err.response.status === 422) {
          alert("A user with that account name already exists.")
        } else {
          alert("Unknown error")
        }
      });
    // clear state
    this.setState({
      username: "",
      password: "",
      password2: ""
    })

  };

  render() {
    return (
      <div className="NewUser">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group bsSize="large">
            <Form.Control
              autoFocus
              placeholder="Username (min 6 chars)"
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
            />
          </Form.Group>
          <Form.Group bsSize="large">
            <Form.Control
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </Form.Group>
          <Form.Group bsSize="large">
            <Form.Control
              placeholder="Re-enter Password"
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
              name="password2"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.createUser}
          >
            New User
          </Button>
        </Form>
      </div>
    );
  }
}

export default NewUser;
