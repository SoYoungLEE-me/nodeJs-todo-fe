import { useState } from "react";
import "./LoginPage.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }

      const response = await api.post("/user/login", {
        email,
        password,
      });
      console.log("login success", response.data);

      if (response.status === 200) {
        setUser(response.data.user);

        console.log(user);

        console.log(typeof response.data.token);
        sessionStorage.setItem("token", response.data.token);

        api.defaults.headers["authorization"] = "Bearer " + response.data.token;

        navigate("/");
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
    <div className="login-wrapper">
      <form className="login" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-button">
          Log In
        </button>

        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="login-link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
