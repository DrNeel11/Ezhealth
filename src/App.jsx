import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import MedicalScans from './components/MedicalScans';
import ScanDetails from './components/ScanDetails';
import UploadSpecimen from './components/UploadSpecimen'; 
import Analysis from './components/Analysis'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* Default to Sign In page */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/medical-scans" element={<MedicalScans />} /> {/* Home screen */}
        <Route path="/scan-details" element={<ScanDetails />} /> {/* Add this route */}
        <Route path="/upload-specimen" element={<UploadSpecimen />} /> {/* Add this route */}
        <Route path="/analysis" element={<Analysis />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;