import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import "../../styles/Form.css";


class LoginForm extends React.Component {
  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="formBasicLogin">
            {/* <Form.Label>Login</Form.Label> */}
            <Form.Control type="email" placeholder="Enter Login" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
      </Container>
    )
  }
}


export default LoginForm;