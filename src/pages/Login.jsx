import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const {data} = await axios.post(`${server}/user/login`, {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      console.log(data);
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
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button
            disabled={loading}
            type='submit'>
            Login
          </button>

          <p>Or</p>

          <Link to="/register">Sign up</Link>

        </form>
      </section>
    </div>
  )
}

export default Login