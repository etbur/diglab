import React from "react";

const ThreeDGeometry = () => {
  return (
    <div className="three-d-geometry-grade12">
      <h1>📦 3D Geometry - Grade 12</h1>
      <p>Explore three-dimensional geometry, solids, and spatial relationships.</p>

      <div className="content-section">
        <h2>3D Geometric Shapes</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Solids of Revolution</h3>
            <p>Shapes created by rotating 2D figures</p>
            <ul>
              <li>Cylinders and cones</li>
              <li>Spheres and hemispheres</li>
              <li>Toroids</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Polyhedra</h3>
            <p>Regular and irregular polyhedrons</p>
            <ul>
              <li>Platonic solids</li>
              <li>Prisms and pyramids</li>
              <li>Volume calculations</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Coordinate Geometry</h3>
            <p>Points, lines, and planes in 3D space</p>
            <ul>
              <li>Distance formulas</li>
              <li>Equation of planes</li>
              <li>Intersection problems</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Surface Area & Volume</h3>
            <p>Calculating areas and volumes of 3D shapes</p>
          </div>

          <div className="application">
            <h3>Engineering Design</h3>
            <p>3D modeling for manufacturing</p>
          </div>

          <div className="application">
            <h3>Computer Graphics</h3>
            <p>3D rendering and visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDGeometry;