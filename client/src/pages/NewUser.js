import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Bootstrap from "react-bootstrap";

function passwordRequirements(password){
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (strongRegex.text(password)) {
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
      this.state.username.length > 6 &&
      passwordRequirements(this.state.password)
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="NewUser">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="username" bsSize="large">
            <Form.Control
              autoFocus
              placeholder="Username (min 6 chars)"
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Control
            placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="password2" bsSize="large">
            <Form.Control
            placeholder="Re-enter Password"
              value={this.state.password2}
              onChange={this.handleChange}
              type="password2"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            New User
          </Button>
        </Form>
      </div>
    );
  }
}

export default NewUser;
