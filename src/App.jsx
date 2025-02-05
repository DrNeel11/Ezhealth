import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import ForgotPassword from './components/Forgotpassword';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<SignIn />} /> {/* Default to Sign In page */}
      </Routes>
    </Router>
  );
}

export default App;