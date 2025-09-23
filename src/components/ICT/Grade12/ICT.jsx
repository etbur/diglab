import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaLaptopCode,
  FaShieldAlt,
  FaRobot,
  FaDatabase,
  FaNetworkWired,
  FaPlusCircle
} from "react-icons/fa";

const ICT = () => {
  return (
    <div className="ict-dashboard" style={{ position: "relative" }}>
      <h1>🌍 ICT Lab Grade 12 Dashboard - Digital Simulations</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/ict/grade12/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: 5 }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/ict/grade12/software-engineering" className="btn-card">
          <FaLaptopCode /> Software Engineering Workflow Simulation
        </NavLink>

        <NavLink to="/ict/grade12/advanced-cybersecurity" className="btn-card">
          <FaShieldAlt /> Advanced Cybersecurity Scenarios
        </NavLink>

        <NavLink to="/ict/grade12/artificial-intelligence" className="btn-card">
          <FaRobot /> Artificial Intelligence & Machine Learning Basics
        </NavLink>

        <NavLink to="/ict/grade12/big-data" className="btn-card">
          <FaDatabase /> Big Data Analysis Simulation
        </NavLink>

        <NavLink to="/ict/grade12/network-security" className="btn-card">
          <FaNetworkWired /> Network Security & Ethical Hacking
        </NavLink>
      </div>
    </div>
  );
};

export default ICT;
