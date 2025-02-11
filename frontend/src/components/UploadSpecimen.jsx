import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import './UploadSpecimen.css';

const UploadSpecimen = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [patientID, setPatientID] = useState('');
  const [gender, setGender] = useState('');
  const [specimenType, setSpecimenType] = useState('');

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      file.type === "image/jpeg" || file.type === "image/png"
    );

    if (files.length === 0) {
      alert("Only JPG and PNG image files are allowed!");
      return;
    }

    setSelectedFiles(files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newScan = {
      id: Date.now(),
      name: `Scan-${selectedFiles[0].name}`,
      type: specimenType,
      patientName: patientName,
      severity: 'Pending',
      date: 'Just now',
      doctor: 'Dr. Uploader',
    };

    const existingScans = JSON.parse(localStorage.getItem('scans')) || [];
    const updatedScans = [newScan, ...existingScans];
    localStorage.setItem('scans', JSON.stringify(updatedScans));

    navigate('/home');
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
            accept="image/jpeg, image/png"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            multiple
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
          <input
            type="text"
            placeholder="Enter patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter patient ID"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
          />
          <div className="gender-selection">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />{' '}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />{' '}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={(e) => setGender(e.target.value)}
              />{' '}
              Other
            </label>
          </div>
          <select
            value={specimenType}
            onChange={(e) => setSpecimenType(e.target.value)}
          >
            <option value="">Select specimen type</option>
            <option value="blood">Blood</option>
            <option value="tissue">Tissue</option>
            <option value="urine">Urine</option>
          </select>
        </div>
      </div>
      <div className="action-buttons">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={handleSubmit} disabled={!selectedFiles.length}>
          Submit
        </button>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default UploadSpecimen;
