import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signin() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({ value: "" });
  // const history = useHistory();
  console.log("auth", localStorage.getItem("isAuthenticated"));

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return axios.post(`https://travel-calculator-server.herokuapp.com/login/login`, {"username": userData.username, "password": userData.password})
      .then((result) => {
        console.log("authenticateUser result",result.data.rows.length);
        // if username or password field is empty, return error message
        if (userData.username === "" || userData.password === "") {
          setErrorMessage((prevState) => ({
            value: "Empty username/password field",
          }));
        } else if (result.data.rows.length >= 1) {
          //Signin Success
          localStorage.setItem("isAuthenticated", "true");
          window.location.pathname = "/";
        } else {
          //If credentials entered is invalid
          setErrorMessage((prevState) => ({ value: "Invalid username/password" }));
        }

      })
    
  };

  return (
    <div className="text-center">
      <h1>Signin User</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>

        {errorMessage.value && (
          <p className="text-danger"> {errorMessage.value} </p>
        )}
      </form>
    </div>
  );
}

export default Signin;