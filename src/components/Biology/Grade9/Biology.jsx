import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaLeaf,
  FaMicroscope,
  FaVial,
  FaTint,
  FaSeedling,
  FaPlusCircle,
  FaSeedling as FaSeedGerm, // reusing for seed germination
  FaWind,                    // for respiration (breath/air)
  FaFlask                   // for chemical tests like starch/diffusion
} from "react-icons/fa";

const Biology = () => {
  return (
    <div className="biology-dashboard" style={{ position: "relative" }}>
      <h1>🧬 Biology Lab Grade 9 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/biology/grade9/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: 5 }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/biology/grade9/plant-cells" className="btn-card">
          <FaLeaf /> Plant Cell Observation
        </NavLink>

        <NavLink to="/biology/grade9/microscope-use" className="btn-card">
          <FaMicroscope /> Using a Microscope
        </NavLink>

        <NavLink to="/biology/grade9/osmosis" className="btn-card">
          <FaTint /> Osmosis in Potatoes
        </NavLink>

        <NavLink to="/biology/grade9/microorganisms" className="btn-card">
          <FaVial /> Observing Microorganisms
        </NavLink>

        <NavLink to="/biology/grade9/photosynthesis" className="btn-card">
          <FaLeaf /> Photosynthesis (Leaf Disk Experiment)
        </NavLink>

        <NavLink to="/biology/grade9/diffusion" className="btn-card">
          <FaFlask /> Diffusion (Iodine Starch Test)
        </NavLink>

        <NavLink to="/biology/grade9/seed-germination" className="btn-card">
          <FaSeedGerm /> Seed Germination Study
        </NavLink>

        <NavLink to="/biology/grade9/respiration" className="btn-card">
          <FaWind /> Respiration in Germinating Seeds
        </NavLink>

        <NavLink to="/biology/grade9/starch-test" className="btn-card">
          <FaFlask /> Starch Test in Plants
        </NavLink>
      </div>
    </div>
  );
};

export default Biology;
