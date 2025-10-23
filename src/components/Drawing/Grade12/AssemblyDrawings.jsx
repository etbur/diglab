import React from "react";

const AssemblyDrawings = () => {
  return (
    <div className="assembly-drawings-grade12">
      <h1>🔧 Advanced Assembly Drawings - Grade 12</h1>
      <p>Create professional assembly drawings with detailed specifications and BOM.</p>

      <div className="content-section">
        <h2>Professional Assembly Documentation</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Complete BOM</h3>
            <p>Comprehensive bill of materials with specifications</p>
            <ul>
              <li>Part numbering systems</li>
              <li>Material specifications</li>
              <li>Quantity and procurement info</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Assembly Sequences</h3>
            <p>Detailed step-by-step assembly procedures</p>
            <ul>
              <li>Installation sequences</li>
              <li>Tool requirements</li>
              <li>Safety procedures</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>GD&T Integration</h3>
            <p>Geometric dimensioning and tolerancing in assemblies</p>
            <ul>
              <li>Assembly tolerances</li>
              <li>Fit specifications</li>
              <li>Inspection requirements</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Professional Projects</h2>
        <div className="projects">
          <div className="project">
            <h3>Machine Assembly</h3>
            <p>Complete assembly documentation for mechanical systems</p>
          </div>

          <div className="project">
            <h3>Electronic Assembly</h3>
            <p>PCB and electronic component assemblies</p>
          </div>

          <div className="project">
            <h3>Structural Assembly</h3>
            <p>Building and construction assemblies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssemblyDrawings;