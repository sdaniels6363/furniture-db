import React from "react";
import LoginModal from "../Modal";
import "../../styles/About.css";

function goToLogin() {
  window.location.assign("/login");
}

class LoginButtonAbout extends React.Component {
  render() {
    return (
      <div className="btn-wrapper">
        <button type="button" id="about-login-btn" onClick={<LoginModal />}>
          LOGIN
        </button>
      </div>
    );
  }
}

export default LoginButtonAbout;
