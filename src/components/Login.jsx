import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import './Login.css'

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Username: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/login", {
        Username: inputs.Username,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
        sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => history("/user"));
  };
  return (
    <div className="form">
      <form className="login-box" onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Login</Typography>
          <div className="user-box">
          <input            
            name="Username"
            onChange={handleChange}
            type="text"
            value={inputs.Username}
             />
             <label>Username</label>
             </div>
             <div className="user-box">
          <input
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            />
            <label>Password</label>
          </div>
          <Button className="btn" variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
