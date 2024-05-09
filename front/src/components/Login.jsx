import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Archivo CSS para estilos personalizados

function Login(props) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function btnLogin(event) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logintoken",
      data: {
        email: loginForm.email,
        password: loginForm.password
      }
    })
      .then((response) => {
        console.log(response);
        props.setToken(response.data.access_token);
        //alert("Successfully Logged In");
        localStorage.setItem("email", loginForm.email);
        navigate("/profile");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        }
      });

    setLoginForm({
      email: "",
      password: ""
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  return (
    <div className="container-fluid futuristic-login">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 col-lg-4">
          <form className="p-4 shadow rounded bg-dark">
            <h2 className="text-center mb-4 text-light">Log In</h2>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label text-light">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                value={loginForm.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label text-light">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                value={loginForm.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label text-light" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary futuristic-btn"
                onClick={btnLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
