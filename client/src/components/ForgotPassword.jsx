import { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/forgot-password", {
      email,
    })
      .then((response) => {
        console.log(response);
        navigate("/reset-password");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit</button>
        <Link to={"/login"} type="">
          <button className="btn-login">Back to login</button>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
