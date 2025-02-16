import React from 'react';
import { useLocation } from 'react-router-dom';
import './Analysis.css'; // Import the CSS file for styling
import BottomNavBar from './BottomNavBar'; // Import BottomNavBar component

const Analysis = () => {
  const location = useLocation();
  const { result } = location.state || {};

  if (!result) {
    return <p>No analysis data available.</p>;
  }

  return (
    <div className="analysis-container">
      {/* Header (Top Bar) */}
      <h1 className="analysis-head">Analysis</h1>

      {/* Main Section (Split View) */}
      <div className="main-section">
        {/* Left Side: Image Display Panel */}
        <div className="image-panel">
          <div className="image-container">
            <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(result.heatmap)))}`} alt="Pathology Image" />
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
            <strong>AI Confidence Score:</strong> {result.confidence.toFixed(2)}%
          </div>
          <div className="predicted-subtype">
            <strong>Predicted Subtype:</strong> {result.predicted_subtype}
          </div>
          <div className="heatmap">
            <strong>Heatmap Visualization:</strong>
            <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(result.heatmap)))}`} alt="Heatmap" />
          </div>
        </div>
      </div>
      <div className="share-download-container">
        <button className="share-case-button">Share Case</button>
        <button className="download-button">Download</button>
      </div>
      {/* Bottom Navigation */}
      <BottomNavBar/>
    </div>
  );
};

export default Analysis;