import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaDna,
  FaMicroscope,
  FaHeartbeat,
  FaVirus,
  FaFlask,
  FaPlusCircle,
  FaLeaf,
  FaBrain
} from "react-icons/fa";

const Biology = () => {
  return (
    <div className="biology-dashboard" style={{ position: "relative" }}>
      <h1>🧬 Biology Lab Grade 12 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/biology/grade12/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: 5 }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/biology/grade12/genetics" className="btn-card">
          <FaDna /> Genetics and Heredity Experiments
        </NavLink>

        <NavLink to="/biology/grade12/microscopic-study" className="btn-card">
          <FaMicroscope /> Microscopic Study of Cells & Tissues
        </NavLink>

        <NavLink to="/biology/grade12/physiology" className="btn-card">
          <FaHeartbeat /> Human Physiology Experiments
        </NavLink>

        <NavLink to="/biology/grade12/virology" className="btn-card">
          <FaVirus /> Study of Viruses and Immunology
        </NavLink>

        <NavLink to="/biology/grade12/biochemistry" className="btn-card">
          <FaFlask /> Biochemical Tests (e.g., sugars, proteins)
        </NavLink>

        <NavLink to="/biology/grade12/plant-physiology" className="btn-card">
          <FaLeaf /> Plant Physiology Experiments (e.g., transpiration, photosynthesis)
        </NavLink>

        <NavLink to="/biology/grade12/neurobiology" className="btn-card">
          <FaBrain /> Neurobiology and Reflex Actions
        </NavLink>
      </div>
    </div>
  );
};

export default Biology;
