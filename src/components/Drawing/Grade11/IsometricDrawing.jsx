import React from "react";

const IsometricDrawing = () => {
  return (
    <div className="isometric-drawing-grade11">
      <h1>📦 Isometric Drawing - Grade 11</h1>
      <p>Learn to create three-dimensional representations on a two-dimensional surface.</p>

      <div className="content-section">
        <h2>Isometric Projection Principles</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Isometric Axes</h3>
            <p>Understanding the 30-degree projection angles</p>
            <ul>
              <li>Axis orientation</li>
              <li>Equal scaling</li>
              <li>Projection angles</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Isometric Circles</h3>
            <p>Drawing circles in isometric projection</p>
            <ul>
              <li>Ellipse construction</li>
              <li>Four-center method</li>
              <li>Box method</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Complex Shapes</h3>
            <p>Drawing irregular and curved surfaces</p>
            <ul>
              <li>Cylinders and cones</li>
              <li>Spheres</li>
              <li>Irregular solids</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Practice Isometric Drawings</h2>
        <div className="examples">
          <div className="example">
            <h3>Simple Objects</h3>
            <p>Cubes, rectangular prisms, and basic shapes</p>
          </div>

          <div className="example">
            <h3>Cylinders and Pipes</h3>
            <p>Round objects and tubular structures</p>
          </div>

          <div className="example">
            <h3>Complex Assemblies</h3>
            <p>Multi-part objects with cutouts and details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsometricDrawing;