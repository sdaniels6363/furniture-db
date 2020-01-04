import React from "react";
import "../../styles/About.css";
// import Form from "../Form";
import API from "../../utils/API";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import "../../styles/Form.css";


class LoginButtonAbout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    console.log(event.target.value);
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
        switch (err.response.status) {
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
      <div className="container">
        <div className="btn-wrapper">
          <button type="button" className="btn btn-primary" id="about-login-btn" data-toggle="modal" data-target="#LoginModal">
            Login
        </button>
        </div>

        <div className="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="LoginModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="LoginModalLabel">Login</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Container>
                  <Form onSubmit={this.login}>
                    <Form.Group controlId="formBasicLogin">
                      <Form.Control type="text" placeholder="Enter Login" name="username" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Enter Password" name="password" onChange={this.handleChange} />
                    </Form.Group>
                  </Form>
                </Container>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" id="btn-close" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" id="btn-go" onClick={this.login}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginButtonAbout;
