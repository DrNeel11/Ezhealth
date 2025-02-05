import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadSpecimen.css'; // Optional: Add styling for this component

const UploadSpecimen = () => {
  const navigate = useNavigate();

  return (
    <div className="upload-specimen-container">
      <h1>Upload Specimen</h1>
      <div className="upload-section">
        <div className="drag-drop-area">
          <p>Drag and drop your image here</p>
          <p>or</p>
          <button>Browse Files</button>
        </div>
        <div className="patient-details">
          <input type="text" placeholder="Enter patient name" />
          <input type="text" placeholder="Enter patient ID" />
          <div className="gender-selection">
            <label>
              <input type="radio" name="gender" value="male" /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" /> Female
            </label>
            <label>
              <input type="radio" name="gender" value="other" /> Other
            </label>
          </div>
          <select>
            <option value="">Select specimen type</option>
            <option value="blood">Blood</option>
            <option value="tissue">Tissue</option>
            <option value="urine">Urine</option>
          </select>
        </div>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default UploadSpecimen;