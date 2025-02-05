import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="signin-container">
      <h2>Welcome back</h2>
      <p>Sign in to continue your journey</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span onClick={handleForgotPasswordClick}>Forgot password?</span>
        </div>
        <button type="submit">Sign In</button>
      </form>

      <p>Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span></p>
    </div>
  );
};

export default SignIn;