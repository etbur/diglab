import React from "react";
import { NavLink } from "react-router-dom";
import { FaKeyboard, FaFileWord, FaTable, FaGlobe, FaEnvelope, FaFolderOpen, FaCode, FaNetworkWired, FaPlusCircle } from "react-icons/fa";

const ICT = () => {
  return (
    <div className="ict-dashboard" style={{ position: "relative" }}>
      <h1>🌍 ICT Lab Grade 9 Dashboard - Digital Simulations</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/ict/grade9/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: 5 }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/ict/grade9/typing-speed-test" className="btn-card">
          <FaKeyboard /> Typing Speed Test
        </NavLink>
        
        <NavLink to="/ict/grade9/internet-safety" className="btn-card">
          <FaGlobe /> Internet Safety & Browsing
        </NavLink>

        <NavLink to="/ict/grade9/email-simulator" className="btn-card">
          <FaEnvelope /> Email Sending & Receiving Simulator
        </NavLink>

        <NavLink to="/ict/grade9/file-management" className="btn-card">
          <FaFolderOpen /> File Management Simulation
        </NavLink>

        <NavLink to="/ict/grade9/basic-programming" className="btn-card">
          <FaCode /> Basic Programming (Scratch)
        </NavLink>

        <NavLink to="/ict/grade9/networking-basics" className="btn-card">
          <FaNetworkWired /> Networking Basics Simulation
        </NavLink>
      </div>
    </div>
  );
};

export default ICT;
