import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBrain,
  FaTint,
  FaMicroscope,
  FaBacteria,
  FaPlusCircle,
  FaFlask,
  FaLeaf,
  FaHeartbeat,
  FaDna
} from "react-icons/fa";

const Biology = () => {
  return (
    <div className="biology-dashboard" style={{ position: "relative" }}>
      <h1>🧬 Biology Lab Grade 11 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/biology/grade11/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: 5 }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/biology/grade11/dna-extraction" className="btn-card">
          <FaDna /> DNA Extraction (e.g., from bananas)
        </NavLink>

        <NavLink to="/biology/grade11/nerve-function" className="btn-card">
          <FaBrain /> Nerve Response Experiment
        </NavLink>

        <NavLink to="/biology/grade11/blood-pressure" className="btn-card">
          <FaTint /> Measuring Blood Pressure
        </NavLink>

        <NavLink to="/biology/grade11/microbial-culture" className="btn-card">
          <FaBacteria /> Microbial Culturing
        </NavLink>

        <NavLink to="/biology/grade11/enzyme-activity" className="btn-card">
          <FaFlask /> Enzyme Activity (pH/Temperature Effects)
        </NavLink>

        <NavLink to="/biology/grade11/photosynthesis-rate" className="btn-card">
          <FaLeaf /> Photosynthesis Rate Experiment
        </NavLink>

        <NavLink to="/biology/grade11/cellular-respiration" className="btn-card">
          <FaHeartbeat /> Cellular Respiration
        </NavLink>

        <NavLink to="/biology/grade11/mitosis-study" className="btn-card">
          <FaMicroscope /> Study of Mitosis (Microscope Slides)
        </NavLink>

        <NavLink to="/biology/grade11/blood-typing" className="btn-card">
          <FaTint /> Blood Typing Experiment
        </NavLink>

        <NavLink to="/biology/grade11/muscle-reflex" className="btn-card">
          <FaBrain /> Muscle Contraction & Reflexes
        </NavLink>
      </div>
    </div>
  );
};

export default Biology;
