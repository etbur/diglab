import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaDraftingCompass,
  FaShapes,
  FaRulerCombined,
  FaProjectDiagram,
  FaPlusCircle,
  FaVectorSquare,
} from "react-icons/fa";

const Drawing = () => {
  return (
    <div className="drawing-dashboard" style={{ position: "relative" }}>
      <h1>🌍 Drawing Grade 12 Lab Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/drawing/grade12/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/drawing/grade12/advanced-orthographic-projections" className="btn-card">
          <FaRulerCombined /> Advanced Orthographic Projections
        </NavLink>

        <NavLink to="/drawing/grade12/complex-isometric-drawings" className="btn-card">
          <FaShapes /> Complex Isometric Drawings
        </NavLink>

        <NavLink to="/drawing/grade12/sectional-views" className="btn-card">
          <FaProjectDiagram /> Sectional Views
        </NavLink>

        <NavLink to="/drawing/grade12/threads-and-fasteners" className="btn-card">
          <FaVectorSquare /> Threads and Fasteners
        </NavLink>

        <NavLink to="/drawing/grade12/assembly-drawings" className="btn-card">
          <FaProjectDiagram /> Assembly Drawings
        </NavLink>

        <NavLink to="/drawing/grade12/cad-introduction" className="btn-card">
          <FaDraftingCompass /> Introduction to CAD
        </NavLink>

        <NavLink to="/drawing/grade12/surface-development" className="btn-card">
          <FaProjectDiagram /> Surface Development
        </NavLink>

      </div>
    </div>
  );
};

export default Drawing;
