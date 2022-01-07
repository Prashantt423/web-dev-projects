import "./login.css";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
export default function Login() {
  const { isFetching, dispatch } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              required
              type="email"
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <Stack
                  sx={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  direction="row"
                >
                  <CircularProgress size="30px" color="inherit" />
                </Stack>
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Stack
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                direction="row"
              >
                <CircularProgress size="30px" color="inherit" />
              </Stack>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
