import React from 'react';
import BottomNavBar from './BottomNavBar'; // Import BottomNavBar component
import './Settings.css'; // Import the CSS file for styling

const Settings = () => {
  return (
    <div className="settings-page-container">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-description">Manage your account settings here.</p>
      <div className="settings-options">
        <h2>Profile</h2>
        <p>Update your profile information.</p>
        <h2>Privacy</h2>
        <p>Manage your privacy settings.</p>
        <h2>Notifications</h2>
        <p>Set your notification preferences.</p>
      </div>
      <BottomNavBar /> {/* Add BottomNavBar component */}
    </div>
  );
};

export default Settings;