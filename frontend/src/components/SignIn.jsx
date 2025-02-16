import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const API_URL = "http://127.0.0.1:8000/auth/signin"; // FastAPI backend URL

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(API_URL, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email); // Store email in local storage
      navigate('/home'); // Redirect to home page upon successful login
    } catch (error) {
      setError(error.response?.data?.detail || 'An error occurred during sign in');
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignIn;