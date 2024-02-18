import { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="username">Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
        <Link to={"/signup"} type="">
          <button className="btn-login">Sign Up</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
