import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOut.css';

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token and other user data
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    // Redirect to the sign-in page
    navigate('/signin');
  }, [navigate]);

  return (
    <div className="signout-page-container">
      <h1 className="signout-title">Signing Out...</h1>
    </div>
  );
};

export default SignOut;