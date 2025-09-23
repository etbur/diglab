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
      <h1>🧪 Chemistry Lab Grade 10 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/chemistry/grade10/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/chemistry/grade10/periodic-table" className="btn-card">
          <FaProjectDiagram /> Periodic Table Trends
        </NavLink>

        <NavLink to="/chemistry/grade10/chemical-bonding" className="btn-card">
          <FaAtom /> Chemical Bonding
        </NavLink>

        <NavLink to="/chemistry/grade10/reactions-types" className="btn-card">
          <FaFlask /> Types of Chemical Reactions
        </NavLink>

        <NavLink to="/chemistry/grade10/balancing-equations" className="btn-card">
          <FaBalanceScale /> Balancing Chemical Equations
        </NavLink>

        <NavLink to="/chemistry/grade10/acids-bases" className="btn-card">
          <FaTint /> Acids and Bases
        </NavLink>

        <NavLink to="/chemistry/grade10/phindicators" className="btn-card">
          <FaVial /> pH and Indicators
        </NavLink>

        <NavLink to="/chemistry/grade10/combustion" className="btn-card">
          <FaFireAlt /> Combustion Reactions
        </NavLink>

        <NavLink to="/chemistry/grade10/thermal-decomposition" className="btn-card">
          <FaBurn /> Thermal Decomposition
        </NavLink>

        <NavLink to="/chemistry/grade10/metals-reactivity" className="btn-card">
          <FaTools /> Reactivity of Metals
        </NavLink>

        <NavLink to="/chemistry/grade10/rusting" className="btn-card">
          <FaMicroscope /> Rusting and Corrosion
        </NavLink>

      </div>
    </div>
  );
};

export default Chemistry;
