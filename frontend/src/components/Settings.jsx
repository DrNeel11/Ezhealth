import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Settings.css';

const API_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

const Settings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    share_data: false,
    receive_newsletters: false,
  });

  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: false,
    sms_notifications: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current settings from the backend
    const fetchSettings = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const privacyResponse = await axios.get(`${API_URL}/settings/privacy`, config);
      setPrivacySettings(privacyResponse.data);

      const profileResponse = await axios.get(`${API_URL}/settings/profile`, config);
      setProfile(profileResponse.data);

      const notificationResponse = await axios.get(`${API_URL}/settings/notifications`, config);
      setNotificationSettings(notificationResponse.data);
    };

    fetchSettings();
  }, []);

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setPrivacySettings({ ...privacySettings, [name]: checked });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({ ...notificationSettings, [name]: checked });
  };

  const handlePrivacySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.put(`${API_URL}/settings/privacy`, privacySettings, config);
    alert('Privacy settings updated');
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.put(`${API_URL}/settings/profile`, profile, config);
    alert('Profile updated');
    // Update localStorage with new email
    localStorage.setItem('email', profile.email);
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.put(`${API_URL}/settings/notifications`, notificationSettings, config);
    alert('Notification settings updated');
  };

  const handleDoneClick = () => {
    navigate('/home'); // Navigate to the home page
  };

  const handleSignOutClick = () => {
    navigate('/signout'); // Navigate to the sign-out page
  };

  return (
    <div className="settings-page-container">
      <h1 className="settings-title">Settings</h1>

      <form onSubmit={handlePrivacySubmit}>
        <h2>Privacy Settings</h2>
        <label>
          <input
            type="checkbox"
            name="share_data"
            checked={privacySettings.share_data}
            onChange={handlePrivacyChange}
          />
          Share my data
        </label>
        <label>
          <input
            type="checkbox"
            name="receive_newsletters"
            checked={privacySettings.receive_newsletters}
            onChange={handlePrivacyChange}
          />
          Receive newsletters
        </label>
        <button type="submit">Update Privacy Settings</button>
      </form>

      <form onSubmit={handleProfileSubmit}>
        <h2>Profile Information</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>

      <form onSubmit={handleNotificationSubmit}>
        <h2>Notification Settings</h2>
        <label>
          <input
            type="checkbox"
            name="email_notifications"
            checked={notificationSettings.email_notifications}
            onChange={handleNotificationChange}
          />
          Email notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="sms_notifications"
            checked={notificationSettings.sms_notifications}
            onChange={handleNotificationChange}
          />
          SMS notifications
        </label>
        <button type="submit">Update Notification Settings</button>
      </form>

      <button className="done-button" onClick={handleDoneClick}>Done</button>
      <button className="signout-button" onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
};

export default Settings;