import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFlask,
  FaBalanceScale,
  FaAtom,
  FaBurn,
  FaTint,
  FaVial,
  FaProjectDiagram,
  FaTools,
  FaFireAlt,
  FaMicroscope,
  FaPlusCircle
} from "react-icons/fa";

const Chemistry = () => {
  return (
    <div className="chemistry-dashboard" style={{ position: "relative" }}>
      <h1>🧪 Chemistry Lab Grade 9 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/chemistry/grade9/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/chemistry/grade9/lab-safety" className="btn-card">
          <FaTools /> Lab Safety & Equipment
        </NavLink>

        <NavLink to="/chemistry/grade9/states-of-matter" className="btn-card">
          <FaAtom /> States of Matter
        </NavLink>

        <NavLink to="/chemistry/grade9/physical-chemical-changes" className="btn-card">
          <FaBurn /> Physical vs Chemical Changes
        </NavLink>

        <NavLink to="/chemistry/grade9/separation-techniques" className="btn-card">
          <FaBalanceScale /> Mixtures & Separation Techniques
        </NavLink>

        <NavLink to="/chemistry/grade9/elements-compounds" className="btn-card">
          <FaProjectDiagram /> Elements, Compounds, and Mixtures
        </NavLink>

        <NavLink to="/chemistry/grade9/metals-acids" className="btn-card">
          <FaFireAlt /> Reaction of Metals with Acids
        </NavLink>

        <NavLink to="/chemistry/grade9/acids-bases" className="btn-card">
          <FaTint /> Acids and Bases
        </NavLink>

        <NavLink to="/chemistry/grade9/indicators" className="btn-card">
          <FaVial /> Indicators (Litmus, Universal)
        </NavLink>

        <NavLink to="/chemistry/grade9/rusting" className="btn-card">
          <FaMicroscope /> Rusting of Iron
        </NavLink>

        <NavLink to="/chemistry/grade9/law-conservation-mass" className="btn-card">
          <FaFlask /> Law of Conservation of Mass
        </NavLink>

      </div>
    </div>
  );
};

export default Chemistry;
