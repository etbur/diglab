import React from "react";

const CADIntroduction = () => {
  return (
    <div className="cad-introduction-grade12">
      <h1>🖥️ Computer-Aided Design (CAD) - Grade 12</h1>
      <p>Master professional CAD software and 3D modeling techniques.</p>

      <div className="content-section">
        <h2>CAD Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>CAD Software</h3>
            <p>Professional CAD applications and tools</p>
            <ul>
              <li>AutoCAD</li>
              <li>SolidWorks</li>
              <li>Fusion 360</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>3D Modeling</h3>
            <p>Creating three-dimensional models</p>
            <ul>
              <li>Parametric modeling</li>
              <li>Feature-based design</li>
              <li>Assembly modeling</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Technical Drawings</h3>
            <p>Creating professional technical documentation</p>
            <ul>
              <li>Detail drawings</li>
              <li>Assembly drawings</li>
              <li>Bill of materials</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>CAD Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Product Design</h3>
            <p>Designing consumer products and components</p>
          </div>

          <div className="application">
            <h3>Engineering Design</h3>
            <p>Mechanical and structural engineering</p>
          </div>

          <div className="application">
            <h3>Manufacturing</h3>
            <p>CAD/CAM integration for manufacturing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CADIntroduction;