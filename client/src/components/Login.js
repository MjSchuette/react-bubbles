import React, { useState } from "react";
import { axiosWithAuth } from "../Utilities/axiosWithAuth";
import '../Login.css';

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
    console.log('handleChange results: ', credentials)
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage')
      })
  }

  return (
    <div>
      <h1 className="Title">Welcome to the Bubble App!</h1>
      <div >
        <form onSubmit={handleSubmit}>
          <input
            className="LoginInput"
            type='text'
            name='username'
            placeholder='Username'
            value={credentials.username}
            onChange={handleChange}
            />
            <input
            className="LoginInput"
            type='text'
            name='password'
            placeholder='Password'
            value={credentials.password}
            onChange={handleChange}
            />
            <button className="Submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
