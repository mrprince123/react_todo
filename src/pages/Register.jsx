import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';

const Register = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(name, email, password);

    try {
      const { data } = await axios.post(`${server}/user/register`, {
        name,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }

  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <input type='text' required value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
          <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
          <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          <button disabled={loading} type='submit'>Register</button>
          <p>Or</p>
          <Link to="/login">Sign in</Link>
        </form>
      </section>
    </div>
  )
}

export default Register