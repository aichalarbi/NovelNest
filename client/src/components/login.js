import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import logo from '../novelnew.webp';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    dispatch(login(formData));
    navigate("/");
  };

  const handleClick = () => {
    navigate('/users/register');
  };

  return (
    <>
      <form onSubmit={userLogin} className="form-outline mb-4">
        <h1>Login</h1>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="formBasicEmail"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label" htmlFor="formBasicEmail">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="formBasicPassword"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label" htmlFor="formBasicPassword">
            Password
          </label>
        </div>
        <img src={logo} width="120" height="80" className="d-inline-block align-top" alt="Logo"/>
        <button type="submit" className="btn-primary btn-sm">Log In</button>
      </form>
      <button onClick={handleClick} className="btn-primary btn-sm">
        Not a member? Sign Up
      </button>
    </>
  );
};

export default Login;
