import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import './Home.css';


const Home = () => {
  const [recentScans, setRecentScans] = useState([]);
  const [monthlyScans, setMonthlyScans] = useState([]);
  useEffect(() => {
    const savedScans = JSON.parse(localStorage.getItem('scans')) || [];
    setRecentScans(savedScans); // Set all scans as recent scans for simplicity
  }, []);
  return (
    <div className="home-page-container">
      <h1 className="home-title">Welcome to EzHealth</h1>
      <p className="home-description">Empowering Healthcare Professionals with the tools and information they need to provide the best care possible.</p>
      <div className="home-categories">
        <h2>Categories</h2>
        <ul>
          <li>Medical Scans</li>
          <li>Specimen Upload</li>
          <li>Detailed Analysis</li>
          <li>Patient Reports</li>
        </ul>
      </div>
      <div className="recent-scans">
        <h2>Recent Scans</h2>
          {recentScans.map((scan) => (
            <div
              key={scan.id}
              className="scan-item"
              onClick={() => handleScanClick(scan)}
            >
              <span className="scan-name">{scan.name}</span>
              <span className="scan-time">{scan.date}</span>
              <span className="scan-doctor">{scan.doctor}</span>
            </div>
          ))}
      </div>
      <div className="share-scans">
        <h2>Share Scans With</h2>
        <p>No contacts available.</p>
      </div>
      <BottomNavBar /> {/* Add BottomNavBar component */}
    </div>
  );
};

export default Home;