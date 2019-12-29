import React from "react";
import "../../styles/About.css";

function goToLogin() {
  window.location.assign("/login");
}

class LoginButtonAbout extends React.Component {
  render() {
    return (
      <div className="btn-wrapper">
        <button type="button" id="about-login-btn" onClick={goToLogin}>
          LOGIN
        </button>
      </div>
    );
  }
}

export default LoginButtonAbout;
