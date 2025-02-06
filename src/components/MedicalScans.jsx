import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicalScans.css';

const MedicalScans = () => {
  const navigate = useNavigate();

  // Example scan data for Recent Scans
  const recentScans = [
    {
      id: 1,
      name: 'Cancer-1',
      type: 'Breast Cancer',
      patientName: 'Jane Doe',
      severity: 'Moderate',
      date: '2h ago',
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: 2,
      name: 'Cancer-2',
      type: 'Lung Cancer',
      patientName: 'John Smith',
      severity: 'High',
      date: 'Yesterday',
      doctor: 'Dr. Michael Chen',
    },
  ];

  // Example scan data for Monthly Scans
  const monthlyScans = [
    {
      id: 3,
      name: 'Monthly Checkup',
      type: 'Routine Checkup',
      patientName: 'Alice Brown',
      severity: 'Low',
      date: 'Last Month',
      doctor: 'Dr. Emily Davis',
    },
  ];

  const handleScanClick = (scan) => {
    navigate('/scan-details', { state: { scan } }); // Pass scan data to the details page
  };

  const handleUploadClick = () => {
    navigate('/upload-specimen'); // Navigate to the Upload Specimen page
  };

  const handleAnalysisClick = () => {
    navigate('/analysis'); // Navigate to the Analysis page
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
        <button onClick={handleAnalysisClick}>Analysis</button>
        <button>Settings</button>
      </div>
    </div>
  );
};

export default MedicalScans;
