import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaLeaf,
  FaMicroscope,
  FaHeartbeat,
  FaTint,
  FaFlask,
  FaPlusCircle,
  FaSeedling,
  FaLightbulb
} from "react-icons/fa";

const Biology = () => {
  return (
    <div className="biology-dashboard" style={{ position: "relative" }}>
      <h1>🧬 Biology Lab Grade 10 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/biology/grade10/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: 5 }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/biology/grade10/photosynthesis" className="btn-card">
          <FaLeaf /> Photosynthesis Experiment
        </NavLink>

        <NavLink to="/biology/grade10/blood-components" className="btn-card">
          <FaTint /> Blood Components
        </NavLink>

        <NavLink to="/biology/grade10/respiration" className="btn-card">
          <FaHeartbeat /> Respiration in Yeast
        </NavLink>

        <NavLink to="/biology/grade10/leaf-structure" className="btn-card">
          <FaMicroscope /> Leaf Microscopy
        </NavLink>

        <NavLink to="/biology/grade10/enzyme-activity" className="btn-card">
          <FaFlask /> Enzyme Activity (Catalase)
        </NavLink>

        <NavLink to="/biology/grade10/transpiration" className="btn-card">
          <FaSeedling /> Transpiration Rate Experiment
        </NavLink>

        <NavLink to="/biology/grade10/animal-cells" className="btn-card">
          <FaMicroscope /> Animal Cell Microscopy
        </NavLink>

        <NavLink to="/biology/grade10/light-effect" className="btn-card">
          <FaLightbulb /> Effect of Light on Photosynthesis
        </NavLink>

        <NavLink to="/biology/grade10/plant-hormones" className="btn-card">
          <FaLeaf /> Plant Hormones & Growth
        </NavLink>
      </div>
    </div>
  );
};

export default Biology;
