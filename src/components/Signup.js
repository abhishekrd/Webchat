import React, { useState } from 'react'
import Layout from './Layout'
import { signup } from '../actions';
import { useDispatch } from 'react-redux';

const Signup = () => {

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();

    const signupUser = (e) => {
         e.preventDefault();

         const user = { firstname, lastname, email, password}
         
         dispatch(signup(user))
    }

  return (
    <Layout>
     <form onSubmit={signupUser}>
 
 <div className="container">

   <input type="text" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
   <input type="text" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
   <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
   <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  
   <button type="submit">SignUp</button>
 
 </div>

</form>

    </Layout>
  )
}

export default Signup