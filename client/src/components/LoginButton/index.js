import React from "react";
// import LoginModal from "../Modal";
import "../../styles/About.css";
import Form from "../Form";



// function goToLogin() {
//   window.location.assign("/login");
// }

class LoginButtonAbout extends React.Component {
  render() {
    return (
      <div class="container">
        <div className="btn-wrapper">
          <button type="button" class="btn btn-primary" id="about-login-btn" data-toggle="modal" data-target="#LoginModal">
            Login
        </button>
        </div>

        <div class="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="LoginModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="LoginModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <Form />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btn-close" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-go">Go</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginButtonAbout;
