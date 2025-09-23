import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalculator,
  FaRulerCombined,
  FaSquareRootAlt,
  FaChartBar,
  FaShapes,
  FaPercentage,
  FaSuperscript,
  FaPlusCircle,
} from "react-icons/fa";

const Maths = () => {
  return (
    <div className="maths-dashboard" style={{ position: "relative" }}>
      <h1>🌍 Mathematics Lab Grade 10 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/maths/grade10/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">
        <NavLink to="/maths/grade10/real-numbers" className="btn-card">
          <FaCalculator /> Real Numbers
        </NavLink>

        <NavLink to="/maths/grade10/polynomials" className="btn-card">
          <FaShapes /> Polynomials
        </NavLink>

        <NavLink to="/maths/grade10/pairs-linear-equations" className="btn-card">
          <FaRulerCombined /> Pair of Linear Equations in Two Variables
        </NavLink>

        <NavLink to="/maths/grade10/quadratic-equations" className="btn-card">
          <FaSquareRootAlt /> Quadratic Equations
        </NavLink>

        <NavLink to="/maths/grade10/arithmetic-progressions" className="btn-card">
          <FaChartBar /> Arithmetic Progressions
        </NavLink>

        <NavLink to="/maths/grade10/triangles" className="btn-card">
          <FaShapes /> Triangles
        </NavLink>

        <NavLink to="/maths/grade10/co-ordinate-geometry" className="btn-card">
          <FaChartBar /> Coordinate Geometry
        </NavLink>

        <NavLink to="/maths/grade10/introduction-to-trigonometry" className="btn-card">
          <FaSuperscript /> Introduction to Trigonometry
        </NavLink>

        <NavLink to="/maths/grade10/applications-of-trigonometry" className="btn-card">
          <FaSuperscript /> Applications of Trigonometry
        </NavLink>

        <NavLink to="/maths/grade10/circles" className="btn-card">
          <FaShapes /> Circles
        </NavLink>

        <NavLink to="/maths/grade10/constructions" className="btn-card">
          <FaRulerCombined /> Constructions
        </NavLink>

        <NavLink to="/maths/grade10/areas-related-to-circles" className="btn-card">
          <FaChartBar /> Areas Related to Circles
        </NavLink>

        <NavLink to="/maths/grade10/surface-areas-volumes" className="btn-card">
          <FaCalculator /> Surface Areas and Volumes
        </NavLink>
      </div>
    </div>
  );
};

export default Maths;
