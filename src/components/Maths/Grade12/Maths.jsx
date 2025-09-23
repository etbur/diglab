import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalculator,
  FaChartLine,
  FaInfinity,
  FaProjectDiagram,
  FaShapes,
  FaRulerCombined,
  FaPlusCircle,
  FaVectorSquare,
  FaSuperscript,
} from "react-icons/fa";

const Maths = () => {
  return (
    <div className="maths-dashboard" style={{ position: "relative" }}>
      <h1>🌍 Mathematics Lab Grade 12 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/maths/grade12/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/maths/grade12/relations-functions" className="btn-card">
          <FaProjectDiagram /> Relations and Functions
        </NavLink>

        <NavLink to="/maths/grade12/inverse-trigonometric-functions" className="btn-card">
          <FaRulerCombined /> Inverse Trigonometric Functions
        </NavLink>

        <NavLink to="/maths/grade12/matrices" className="btn-card">
          <FaVectorSquare /> Matrices
        </NavLink>

        <NavLink to="/maths/grade12/determinants" className="btn-card">
          <FaCalculator /> Determinants
        </NavLink>

        <NavLink to="/maths/grade12/differential-calculus" className="btn-card">
          <FaSuperscript /> Differential Calculus
        </NavLink>

        <NavLink to="/maths/grade12/integral-calculus" className="btn-card">
          <FaCalculator /> Integral Calculus
        </NavLink>

        <NavLink to="/maths/grade12/vectors" className="btn-card">
          <FaShapes /> Vectors
        </NavLink>

        <NavLink to="/maths/grade12/3d-geometry" className="btn-card">
          <FaProjectDiagram /> 3D Geometry
        </NavLink>

        <NavLink to="/maths/grade12/probability" className="btn-card">
          <FaInfinity /> Probability
        </NavLink>

        <NavLink to="/maths/grade12/statistics" className="btn-card">
          <FaChartLine /> Statistics
        </NavLink>

      </div>
    </div>
  );
};

export default Maths;
