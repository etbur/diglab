import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaDatabase,
  FaCode,
  FaGlobe,
  FaShieldAlt,
  FaProjectDiagram,
  FaPlusCircle
} from "react-icons/fa";

const ICT = () => {
  return (
    <div className="ict-dashboard" style={{ position: "relative" }}>
      <h1>🌍 ICT Lab Grade 10 Dashboard - Digital Simulations</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/ict/grade10/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: 5 }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/ict/grade10/database-basics" className="btn-card">
          <FaDatabase /> Database Basics Simulation
        </NavLink>

        <NavLink to="/ict/grade10/programming-fundamentals" className="btn-card">
          <FaCode /> Programming Fundamentals (Python/JavaScript)
        </NavLink>

        <NavLink to="/ict/grade10/web-design" className="btn-card">
          <FaGlobe /> Web Design & HTML/CSS Basics
        </NavLink>

        <NavLink to="/ict/grade10/cyber-security" className="btn-card">
          <FaShieldAlt /> Cyber Security Basics Simulation
        </NavLink>

        <NavLink to="/ict/grade10/network-topology" className="btn-card">
          <FaProjectDiagram /> Network Topology Builder
        </NavLink>
      </div>
    </div>
  );
};

export default ICT;
