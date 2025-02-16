import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNavBar from './BottomNavBar';
import './UploadSpecimen.css';

const API_URL = "http://127.0.0.1:8000/api/upload"; // FastAPI backend URL

const UploadSpecimen = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientID, setPatientID] = useState('');
  const [gender, setGender] = useState('');
  const [specimenType, setSpecimenType] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Only JPG and PNG image files are allowed!");
      return;
    }
    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('patientName', patientName);
      formData.append('patientID', patientID);
      formData.append('gender', gender);
      formData.append('specimenType', specimenType);

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      setUploadStatus('success');
      navigate('/analysis', { state: { result: response.data } });
    } catch (error) {
      setUploadStatus('error');
      setError(error.response?.data?.detail || 'An error occurred during file upload');
    }
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
          />
          <button onClick={handleBrowseClick}>Browse Files</button>
          {selectedFile && (
            <div className="selected-files">
              <p>Selected file: {selectedFile.name}</p>
            </div>
          )}
        </div>
        <div className="patient-details">
          <input
            type="text"
            placeholder="Enter patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter patient ID"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
            required
          />
          <div className="gender-selection">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              /> Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={(e) => setGender(e.target.value)}
              /> Other
            </label>
          </div>
          <select
            value={specimenType}
            onChange={(e) => setSpecimenType(e.target.value)}
            required
          >
            <option value="">Select specimen type</option>
            <option value="blood">Blood</option>
            <option value="tissue">Tissue</option>
            <option value="urine">Urine</option>
          </select>
        </div>
      </div>
      <div className="action-buttons">
        <button onClick={handleSubmit} disabled={!selectedFile}>
          Submit
        </button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
      {error && <p className="error-message">{error}</p>}
      <BottomNavBar />
    </div>
  );
};

export default UploadSpecimen;