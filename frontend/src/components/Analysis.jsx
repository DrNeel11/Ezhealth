import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Analysis.css'; // Import the CSS file for styling
import BottomNavBar from './BottomNavBar'; // Import BottomNavBar component

const Analysis = () => {
  const navigate = useNavigate();

  return (
    <div className="analysis-container">
      {/* Header (Top Bar) */}
      <div className="header">
        <div className="header-actions">
          <button className="share-case-button">Share Case</button>
          <button className="download-button">Download</button>
        </div>
      </div>

      {/* Main Section (Split View) */}
      <div className="main-section">
        {/* Left Side: Image Display Panel */}
        <div className="image-panel">
          <div className="image-container">
            <img src="https://via.placeholder.com/800x600" alt="Pathology Image" />
          </div>
          <div className="image-controls">
            <button>Zoom In</button>
            <button>Zoom Out</button>
            <button>Pan</button>
            <label>
              <input type="checkbox" /> Toggle AI Overlay
            </label>
          </div>
        </div>

        {/* Right Side: AI Results Panel */}
        <div className="ai-results-panel">
          <h2>AI Results</h2>
          <div className="ai-confidence-score">
            <strong>AI Confidence Score:</strong> 92%
          </div>
          <div className="detected-anomalies">
            <strong>Detected Anomalies:</strong>
            <ul>
              <li>Region A: High cell density</li>
              <li>Region B: Abnormal morphology</li>
            </ul>
          </div>
          <div className="cell-density">
            <strong>Cell Density:</strong> 78 cells/mm²
          </div>
          <div className="heatmap">
            <strong>Heatmap Visualization:</strong>
            <img src="https://via.placeholder.com/300x200" alt="Heatmap" />
          </div>
        </div>
      </div>

      {/* Go Back Button */}
      <button className="go-back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>

      <BottomNavBar /> {/* Add BottomNavBar component */}
    </div>
  );
};

export default Analysis;