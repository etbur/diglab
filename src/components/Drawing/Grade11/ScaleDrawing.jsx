import React from "react";

const ScaleDrawing = () => {
  return (
    <div className="scale-drawing-grade11">
      <h1>📏 Scale Drawing - Grade 11</h1>
      <p>Learn to create drawings at different scales and understand scale relationships.</p>

      <div className="content-section">
        <h2>Scale Concepts</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Scale Ratios</h3>
            <p>Understanding different scale representations</p>
            <ul>
              <li>Full size (1:1)</li>
              <li>Enlarged scales (2:1, 5:1)</li>
              <li>Reduced scales (1:2, 1:10, 1:100)</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Scale Conversion</h3>
            <p>Converting measurements between scales</p>
            <ul>
              <li>Linear measurements</li>
              <li>Area calculations</li>
              <li>Volume relationships</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Architectural Scales</h3>
            <p>Common scales used in building design</p>
            <ul>
              <li>1:50, 1:100 for plans</li>
              <li>1:20, 1:10 for details</li>
              <li>1:500 for site plans</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Scale Drawing Practice</h2>
        <div className="exercises">
          <div className="exercise">
            <h3>Scale Conversion Calculator</h3>
            <p>Practice converting measurements between different scales</p>
          </div>

          <div className="exercise">
            <h3>Scaled Drawings</h3>
            <p>Create drawings at specified scales</p>
          </div>

          <div className="exercise">
            <h3>Scale Reading</h3>
            <p>Interpret measurements from scaled drawings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleDrawing;