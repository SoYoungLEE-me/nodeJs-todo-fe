import React, { useState } from "react";
import "./RegisterPage.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !secPassword) {
        throw new Error("All fields are required.");
      }

      if (password !== secPassword) {
        throw new Error("Passwords do not match.");
      }
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      });
      console.log("register success", response.data);

      if (response.status == 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }

      if (err?.error) {
        setError(err.error);
        return;
      }

      setError("Something went wrong");
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register" onSubmit={onSubmit}>
        <h2 className="register-title">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="register-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="register-input"
          value={secPassword}
          onChange={(e) => setSecPassword(e.target.value)}
        />

        {error && <p className="register-error">{error}</p>}

        <button type="submit" className="register-button">
          Create Account
        </button>

        <p className="register-footer">
          Already have an account?
          <Link to="/login" className="register-link">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
