import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaDraftingCompass,
  FaShapes,
  FaRulerCombined,
  FaPlusCircle,
  FaVectorSquare,
  FaProjectDiagram,
} from "react-icons/fa";

const Drawing = () => {
  return (
    <div className="drawing-dashboard" style={{ position: "relative" }}>
      <h1>🌍 Drawing Grade 11 Lab Dashboard</h1>

      {/* Custom Work Button */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <NavLink to="/drawing/grade11/custom-work" className="custom-work-btn">
          <FaPlusCircle style={{ marginRight: "5px" }} />
          Custom Work
        </NavLink>
      </div>

      <div className="simulation-grid">

        <NavLink to="/drawing/grade11/engineering-drawing-basics" className="btn-card">
          <FaDraftingCompass /> Engineering Drawing Basics
        </NavLink>

        <NavLink to="/drawing/grade11/orthographic-projections" className="btn-card">
          <FaRulerCombined /> Orthographic Projections
        </NavLink>

        <NavLink to="/drawing/grade11/isometric-drawing" className="btn-card">
          <FaShapes /> Isometric Drawing
        </NavLink>

        <NavLink to="/drawing/grade11/sectional-views" className="btn-card">
          <FaProjectDiagram /> Sectional Views
        </NavLink>

        <NavLink to="/drawing/grade11/threads-and-fasteners" className="btn-card">
          <FaVectorSquare /> Threads and Fasteners
        </NavLink>

        <NavLink to="/drawing/grade11/scale-drawing" className="btn-card">
          <FaDraftingCompass /> Scale Drawing
        </NavLink>

        <NavLink to="/drawing/grade11/assembly-drawings" className="btn-card">
          <FaProjectDiagram /> Assembly Drawings
        </NavLink>

      </div>
    </div>
  );
};

export default Drawing;
