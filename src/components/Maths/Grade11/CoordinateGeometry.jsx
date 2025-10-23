import React from "react";

const CoordinateGeometry = () => {
  return (
    <div className="coordinate-geometry-grade11">
      <h1>📍 Coordinate Geometry - Grade 11</h1>
      <p>Advanced coordinate geometry including conics and transformations.</p>

      <div className="content-section">
        <h2>Conic Sections</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Circles</h3>
            <p>Equations and properties of circles</p>
            <ul>
              <li>Standard form equation</li>
              <li>General form equation</li>
              <li>Tangent lines</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Parabolas</h3>
            <p>Quadratic relations and their graphs</p>
            <ul>
              <li>Vertex form</li>
              <li>Focus and directrix</li>
              <li>Applications</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Ellipses and Hyperbolas</h3>
            <p>Conic sections with two foci</p>
            <ul>
              <li>Eccentricity</li>
              <li>Foci and vertices</li>
              <li>Asymptotes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Transformations</h2>
        <div className="applications">
          <div className="application">
            <h3>Translations</h3>
            <p>Shifting graphs in the coordinate plane</p>
          </div>

          <div className="application">
            <h3>Reflections</h3>
            <p>Mirroring across axes and lines</p>
          </div>

          <div className="application">
            <h3>Rotations</h3>
            <p>Rotating figures around points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinateGeometry;