import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFlask,
  FaProjectDiagram,
  FaBalanceScale,
  FaBurn,
  FaTools,
  FaAtom,
  FaMicroscope,
  FaTint,
  FaVial,
  FaPlusCircle
} from "react-icons/fa";

const ChemistryGrade12 = () => {
  return (
    <div className="chemistry-dashboard" style={{ position: "relative" }}>
      <h1>🧪 Chemistry Lab Grade 12 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/chemistry/grade12/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/chemistry/grade12/reaction-rates" className="btn-card">
          <FaBurn /> Reaction Rates
        </NavLink>

        <NavLink to="/chemistry/grade12/chemical-equilibrium" className="btn-card">
          <FaBalanceScale /> Chemical Equilibrium
        </NavLink>

        <NavLink to="/chemistry/grade12/acid-base-equilibrium" className="btn-card">
          <FaTint /> Acid-Base Equilibrium
        </NavLink>

        <NavLink to="/chemistry/grade12/solubility-equilibrium" className="btn-card">
          <FaVial /> Solubility Product (Ksp)
        </NavLink>

        <NavLink to="/chemistry/grade12/oxidation-reduction" className="btn-card">
          <FaTools /> Redox Reactions
        </NavLink>

        <NavLink to="/chemistry/grade12/electrochemistry" className="btn-card">
          <FaFlask /> Electrochemical Cells
        </NavLink>

        <NavLink to="/chemistry/grade12/organic-reactions" className="btn-card">
          <FaProjectDiagram /> Organic Reactions
        </NavLink>

        <NavLink to="/chemistry/grade12/polymerization" className="btn-card">
          <FaAtom /> Polymerization
        </NavLink>

        <NavLink to="/chemistry/grade12/qualitative-analysis" className="btn-card">
          <FaMicroscope /> Qualitative Analysis
        </NavLink>

      </div>
    </div>
  );
};

export default ChemistryGrade12;
