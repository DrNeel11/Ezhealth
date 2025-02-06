import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicalScans.css';

const MedicalScans = () => {
  const navigate = useNavigate();
  const [recentScans, setRecentScans] = useState([]);
  const [monthlyScans, setMonthlyScans] = useState([]);

  // Load scans from localStorage on component mount
  useEffect(() => {
    const savedScans = JSON.parse(localStorage.getItem('scans')) || [];
    setRecentScans(savedScans); // Set all scans as recent scans for simplicity
  }, []);

  const handleScanClick = (scan) => {
    navigate('/scan-details', { state: { scan } }); // Pass scan data to the details page
  };

  const handleUploadClick = () => {
    navigate('/upload-specimen'); // Navigate to the Upload Specimen page
  };

  return (
    <div className="medical-scans-container">
      <h1>Medical Scans</h1>

      {/* Recent Scans Section */}
      <div className="scans-section">
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

      {/* Monthly Scans Section */}
      <div className="scans-section">
        <h2>Monthly Scans</h2>
        {monthlyScans.map((scan) => (
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

      {/* Navigation Buttons */}
      <div className="navigation">
        <button>Home</button>
        <button>Reports</button>
        <button className="plus-button" onClick={handleUploadClick}>
          +
        </button>
        <button>Analysis</button>
        <button>Settings</button>
      </div>
    </div>
  );
};

export default MedicalScans;