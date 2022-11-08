import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    username:"",
    phonenumber: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/signup", {
        name: inputs.name,
        username: inputs.username,
        phonenumber: inputs.phonenumber,
        password: inputs.password,
        confirmpassword: inputs.confirmpassword,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   sendRequest().then(() => history("/login"));
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
          <Typography variant="h2">Signup</Typography>

          <div className="user-box">
          <input            
            name="name"
            onChange={handleChange}
            type="text"
            value={inputs.name}
             />
             <label>Name</label>
             </div>
             <div className="user-box">
          <input            
            name="username"
            onChange={handleChange}
            type="text"
            value={inputs.username}
             />
             <label>Username</label>
             </div>
             <div className="user-box">
          <input            
            name="phonenumber"
            onChange={handleChange}
            type="text"
            value={inputs.phonenumber}
             />
             <label>Phone Number</label>
             </div>
             <div className="user-box">
          <input
            name="password"
            onChange={handleChange}
            type="text"
            value={inputs.password}
            />
            <label>Password</label>
          </div>
          <div className="user-box">
          <input
            name="confirmpassword"
            onChange={handleChange}
            type="text"
            value={inputs.confirmpassword}
            />
            <label>Confirm Password</label>
          </div>
         
          
          <Button className="btn" variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
