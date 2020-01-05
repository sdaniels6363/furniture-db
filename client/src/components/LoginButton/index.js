import React from "react";
import "../../styles/About.css";
// import Form from "../Form";
import API from "../../utils/API";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import "../../styles/Form.css";


class LoginButtonAbout extends React.Component {

  login = event => {
    event.preventDefault();

    const body = {
      username: document.querySelector("#formBasicLogin").value,
      password: document.querySelector("#formBasicPassword").value
    }

    API.validateUser(body)
      .then(res => {
        // console.log(res)
        //Data returned from login is now an array, first element is the return message.  The second is the JWT generated with the logged in username.
        // console.log(res.data[0]);
        //Store the token to sessionStorage.token
        sessionStorage.token = res.data[1];
        //Redirect to "Home" page.  Logged in users will see the Rooms/Categories and Client Dropdown.
        window.location.href = "/"
      })
      .catch(err => {
        switch (err.response.status) {
          case 401:
            alert(err.response.data);
            document.querySelector("#formBasicPassword").value = ""
            break;
          case 500:
            alert("Server error")
            break;
          default:
            console.log("not sure.")
        }
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

        <div className="modal fade" id="LoginModal" role="dialog" aria-labelledby="LoginModalLabel" aria-hidden="true">
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
                      <Form.Control type="text" placeholder="Enter Login" name="username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Enter Password" name="password" />
                    </Form.Group>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary" id="btn-go" onClick={this.login}>Login</button>
                    </div>
                  </Form>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginButtonAbout;
