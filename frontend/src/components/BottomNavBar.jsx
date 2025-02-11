import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.css'; // Import the CSS file for styling

const BottomNavBar = () => {
  return (
    <div className="bottom-nav-bar">
      <NavLink to="/home" className="nav-link" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/reports" className="nav-link" activeClassName="active">
        Reports
      </NavLink>
      <NavLink to="/analysis" className="nav-link" activeClassName="active">
        Analysis
      </NavLink>
      <NavLink to="/settings" className="nav-link" activeClassName="active">
        Settings
      </NavLink>
    </div>
  );
};

export default BottomNavBar;