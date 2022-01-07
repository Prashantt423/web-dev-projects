import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const password_again = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password_again.current.value !== password.current.value) {
      password_again.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        history.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">pkSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on pkSocial.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleSubmit}>
          <form className="loginBox">
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              className="loginInput"
              required
            />
            <input
              placeholder="Password"
              type="password"
              ref={password}
              className="loginInput"
              minLength="6"
              required
            />
            <input
              placeholder="Password Again"
              type="password"
              ref={password_again}
              minLength="6"
              className="loginInput"
              required
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
          </form>
          <button className="loginRegisterButton">Log into Account</button>
        </div>
      </div>
    </div>
  );
}
