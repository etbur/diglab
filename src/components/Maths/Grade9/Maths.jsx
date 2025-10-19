import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalculator,
  FaRuler,
  FaSquareRootAlt,
  FaChartLine,
  FaInfinity,
  FaShapes,
  FaPercentage,
  FaPlusCircle,
  FaDivide,
} from "react-icons/fa";

const Maths = () => {
  return (
    <div className="maths-dashboard" style={{ position: "relative" }}>
      <h1>🌍 Mathematics Lab Grade 9 Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/maths/grade9/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/maths/grade9/number-systems" className="btn-card">
          <FaCalculator /> Number Systems
        </NavLink>

        <NavLink to="/maths/grade9/algebraic-expressions" className="btn-card">
          <FaPlusCircle /> Algebraic Expressions
        </NavLink>

        <NavLink to="/maths/grade9/linear-equations" className="btn-card">
          <FaDivide /> Linear Equations
        </NavLink>

        <NavLink to="/maths/grade9/geometry" className="btn-card">
          <FaRuler /> Geometry & Measurements
        </NavLink>

        <NavLink to="/maths/grade9/polynomials" className="btn-card">
          <FaShapes /> Polynomials
        </NavLink>

        <NavLink to="/maths/grade9/coordinate-geometry" className="btn-card">
          <FaChartLine /> Coordinate Geometry
        </NavLink>

        <NavLink to="/maths/grade9/irrational-numbers" className="btn-card">
          <FaSquareRootAlt /> Irrational Numbers
        </NavLink>

        <NavLink to="/maths/grade9/profit-loss" className="btn-card">
          <FaPercentage /> Profit, Loss & Discount
        </NavLink>

        <NavLink to="/maths/grade9/exponents-powers" className="btn-card">
          <FaInfinity /> Exponents and Powers
        </NavLink>

      </div>
    </div>
  );
};

export default Maths;
