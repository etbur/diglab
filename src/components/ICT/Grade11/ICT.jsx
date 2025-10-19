
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaProjectDiagram,
  FaCodeBranch,
  FaMobileAlt,
  FaCloud,
  FaServer,
  FaPlusCircle
} from "react-icons/fa";

const ICT = () => {
  return (
    <div className="ict-dashboard" style={{ position: "relative" }}>
      <h1>🌍 ICT Lab Grade 11 Dashboard - Digital Simulations</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/ict/grade11/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: 5 }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/ict/grade11/data-structures" className="btn-card">
          <FaProjectDiagram /> Data Structures Simulator (Stacks, Queues)
        </NavLink>

        <NavLink to="/ict/grade11/algorithms" className="btn-card">
          <FaCodeBranch /> Algorithms Practice (Sorting, Searching)
        </NavLink>

        <NavLink to="/ict/grade11/mobile-app-dev" className="btn-card">
          <FaMobileAlt /> Mobile App Development Basics
        </NavLink>

        <NavLink to="/ict/grade11/cloud-computing" className="btn-card">
          <FaCloud /> Cloud Computing Simulation
        </NavLink>

        <NavLink to="/ict/grade11/server-management" className="btn-card">
          <FaServer /> Server & Database Management
        </NavLink>
      </div>
    </div>
  );
};

export default ICT;
