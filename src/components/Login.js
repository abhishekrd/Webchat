import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signin } from '../actions';
import Layout from './Layout';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);



  const loginUser = (e) => {
    e.preventDefault();
    if (email == "") {
      alert("Email is required");
      return;
    }
    if (password == "") {
      alert("Password is required");
      return;
    }

    dispatch(signin({ email, password }))
  }

  const isAuth = auth.authenticated;

  return (
    isAuth ? <Navigate to="/" /> : <Layout>

      <form onSubmit={loginUser}>

        <div className="container">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Login</button>

        </div>

      </form>

    </Layout>

  )
}

export default Login