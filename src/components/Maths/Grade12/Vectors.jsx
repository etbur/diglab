import React from "react";

const Vectors = () => {
  return (
    <div className="vectors-grade12">
      <h1>➡️ Vectors - Grade 12</h1>
      <p>Master vector algebra, geometry, and applications in 2D and 3D space.</p>

      <div className="content-section">
        <h2>Vector Operations</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Vector Algebra</h3>
            <p>Basic vector operations and properties</p>
            <ul>
              <li>Vector addition and subtraction</li>
              <li>Scalar multiplication</li>
              <li>Dot product and cross product</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>3D Vectors</h3>
            <p>Vectors in three-dimensional space</p>
            <ul>
              <li>Vector components</li>
              <li>Magnitude and direction</li>
              <li>Unit vectors</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Vector Geometry</h3>
            <p>Geometric applications of vectors</p>
            <ul>
              <li>Lines and planes</li>
              <li>Distance calculations</li>
              <li>Angle between vectors</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Physics Applications</h3>
            <p>Force, velocity, and acceleration vectors</p>
          </div>

          <div className="application">
            <h3>Computer Graphics</h3>
            <p>3D modeling and transformations</p>
          </div>

          <div className="application">
            <h3>Navigation</h3>
            <p>Position vectors and bearings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vectors;