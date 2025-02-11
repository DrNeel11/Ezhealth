import React from 'react';
import BottomNavBar from './BottomNavBar'; // Import BottomNavBar component
import './Home.css'; // Import the CSS file for styling

const Home = () => {
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
        <p>No recent scans available.</p>
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