import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiZoomIn, FiZoomOut, FiMove, FiShare2, FiDownload } from 'react-icons/fi';
import './Analysis.css';
import BottomNavBar from './BottomNavBar';

const Analysis = () => {
  const location = useLocation();
  const { imageData } = location.state || {};

  if (!imageData) {
    return <div className="error-message">No analysis data available. Please upload an image first.</div>;
  }

  return (
    <div className="analysis-container">
      {/* Header */}
      <h1 className="analysis-head">AI Analysis Results</h1>

      {/* Main Content */}
      <div className="main-section">
        {/* Image Panel */}
        <div className="image-panel glassmorphism-effect">
          <h2 className="image-title">Original Image</h2>
          <div className="image-container">
            {imageData.original_image && (
                  <img src={imageData.original_image} alt="Original Image" className="scan-image" />
            )}
          </div>
          
          <div className="image-controls">
            <button className="control-btn">
              <FiZoomIn className="icon" />
              Zoom In
            </button>
            <button className="control-btn">
              <FiZoomOut className="icon" />
              Zoom Out
            </button>
            <button className="control-btn">
              <FiMove className="icon" />
              Pan
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="results-panel glassmorphism-effect">
          <h2 className="results-title">
            <span className="highlight">Diagnostic</span> Insights
          </h2>
          
          <div className="metrics-grid">
            <div className="metric-card confidence">
              <h3>AI Confidence</h3>
              <div className="metric-value">{imageData.confidence}</div>
              <div className="confidence-bar">
                <div 
                  className="confidence-fill" 
                  style={{ width: `${imageData.confidence}%` }}
                ></div>
              </div>
            </div>

            <div className="metric-card anomalies">
              <h3>Detected Anomalies</h3>
              <ul className="anomaly-list">
                {imageData.anomalies?.map((anomaly, index) => (
                  <li key={index}>{anomaly}</li>
                ))}
              </ul>
            </div>

            <div className="metric-card heatmap">
              <h3>Tissue Analysis</h3>
              {imageData.heatmap && (
                <img src={imageData.heatmap} alt="Heatmap Visualization" className="heatmap-image" />
              )}
            </div>
          </div>

          {/* Predicted Subtype */}
          <div className="metric-card subtype">
            <h3>Predicted Subtype</h3>
            <div className="subtype-value">{imageData.predicted_subtype || 'Unknown'}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn share-btn">
          <FiShare2 className="icon" />
          Share Case
        </button>
        <button className="action-btn download-btn">
          <FiDownload className="icon" />
          Download Report
        </button>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Analysis;