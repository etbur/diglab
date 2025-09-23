import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalculator,
  FaChartLine,
  FaVectorSquare,
  FaInfinity,
  FaPlusCircle,
  FaShapes,
  FaRulerCombined,
  FaSquareRootAlt,
  FaProjectDiagram,
} from "react-icons/fa";

const Maths = () => {
  return (
    <div className="maths-dashboard" style={{ position: "relative" }}>
      <h1>🌍 Mathematics Lab Grade 11 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/maths/grade11/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/maths/grade11/sets" className="btn-card">
          <FaProjectDiagram /> Sets and Functions
        </NavLink>

        <NavLink to="/maths/grade11/matrices" className="btn-card">
          <FaVectorSquare /> Matrices and Determinants
        </NavLink>

        <NavLink to="/maths/grade11/trigonometry" className="btn-card">
          <FaRulerCombined /> Trigonometry
        </NavLink>

        <NavLink to="/maths/grade11/progressions" className="btn-card">
          <FaChartLine /> Sequence and Series (Progressions)
        </NavLink>

        <NavLink to="/maths/grade11/complex-numbers" className="btn-card">
          <FaInfinity /> Complex Numbers
        </NavLink>

        <NavLink to="/maths/grade11/differentiation" className="btn-card">
          <FaCalculator /> Differentiation
        </NavLink>

        <NavLink to="/maths/grade11/integration" className="btn-card">
          <FaCalculator /> Integration
        </NavLink>

        <NavLink to="/maths/grade11/coordinate-geometry" className="btn-card">
          <FaShapes /> Coordinate Geometry
        </NavLink>

        <NavLink to="/maths/grade11/statistics" className="btn-card">
          <FaProjectDiagram /> Statistics and Probability
        </NavLink>

      </div>
    </div>
  );
};

export default Maths;
