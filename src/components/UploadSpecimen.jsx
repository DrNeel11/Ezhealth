import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadSpecimen.css';

const UploadSpecimen = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-specimen-container">
      <h1>Upload Specimen</h1>
      <div className="upload-section">
        <div className="drag-drop-area">
          <p>Drag and drop your image here</p>
          <p>or</p>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            multiple // Remove this if you only want single file selection
          />
          <button onClick={handleBrowseClick}>Browse Files</button>
          {selectedFiles.length > 0 && (
            <div className="selected-files">
              <p>Selected files:</p>
              {selectedFiles.map((file, index) => (
                <span key={index}>{file.name}</span>
              ))}
            </div>
          )}
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