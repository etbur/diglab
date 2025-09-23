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

const ChemistryGrade11 = () => {
  return (
    <div className="chemistry-dashboard" style={{ position: "relative" }}>
      <h1>🧪 Chemistry Lab Grade 11 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/chemistry/grade11/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/chemistry/grade11/mole-concept" className="btn-card">
          <FaFlask /> Mole Concept & Molar Mass
        </NavLink>

        <NavLink to="/chemistry/grade11/stoichiometry" className="btn-card">
          <FaBalanceScale /> Stoichiometry
        </NavLink>

        <NavLink to="/chemistry/grade11/gas-laws" className="btn-card">
          <FaAtom /> Gas Laws
        </NavLink>

        <NavLink to="/chemistry/grade11/atomic-structure" className="btn-card">
          <FaMicroscope /> Atomic Structure
        </NavLink>

        <NavLink to="/chemistry/grade11/chemical-bonding" className="btn-card">
          <FaProjectDiagram /> Chemical Bonding
        </NavLink>

        <NavLink to="/chemistry/grade11/thermochemistry" className="btn-card">
          <FaBurn /> Thermochemistry
        </NavLink>

        <NavLink to="/chemistry/grade11/empirical-formula" className="btn-card">
          <FaTools /> Empirical & Molecular Formulas
        </NavLink>

        <NavLink to="/chemistry/grade11/solution-preparation" className="btn-card">
          <FaVial /> Preparing Standard Solutions
        </NavLink>

        <NavLink to="/chemistry/grade11/titration" className="btn-card">
          <FaTint /> Acid-Base Titration
        </NavLink>

      </div>
    </div>
  );
};

export default ChemistryGrade11;
