import React from "react";
import Modal from "../Modal";
import "../../styles/About.css";

function goToLogin() {
  window.location.assign("/login");
}

class LoginButtonAbout extends React.Component {
  render() {
    return (
      <div className="btn-wrapper">
        <button type="button" id="about-login-btn" onClick={handleShow}>
          LOGIN
        </button>
      </div>
    );
  }
}

export default LoginButtonAbout;
