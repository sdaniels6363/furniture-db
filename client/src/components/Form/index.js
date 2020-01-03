import React from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import "../../styles/Form.css";


class LoginForm extends React.Component {
  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="formBasicLogin">
            <Form.Control type="text" placeholder="Enter Login" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}


export default LoginForm;