import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ScanDetails.css'; // Import the CSS file

const ScanDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scan } = location.state || {}; // Get scan data passed via navigation

  if (!scan) {
    return <div>No scan data found.</div>;
  }

  return (
    <div className="scan-details-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Scan Details</h1>
      <div className="scan-info" style={{ backgroundColor: '#f9f9f9', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{scan.name}</h2>
        <p><strong>Type of Cancer:</strong> {scan.type}</p>
        <p><strong>Patient Name:</strong> {scan.patientName}</p>
        <p><strong>Severity:</strong> {scan.severity}</p>
        <p><strong>Date:</strong> {scan.date}</p>
        <p><strong>Doctor:</strong> {scan.doctor}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default ScanDetails;