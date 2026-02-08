import React from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="register-wrapper">
      <div className="register">
        <h2 className="register-title">Sign Up</h2>

        <input type="text" placeholder="Name" className="register-input" />

        <input type="email" placeholder="Email" className="register-input" />

        <input
          type="password"
          placeholder="Password"
          className="register-input"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="register-input"
        />

        <button className="register-button">Create Account</button>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
