import React from "react";

const AssemblyDrawings = () => {
  return (
    <div className="assembly-drawings-grade11">
      <h1>🔧 Assembly Drawings - Grade 11</h1>
      <p>Learn to create detailed assembly drawings showing how parts fit together.</p>

      <div className="content-section">
        <h2>Assembly Drawing Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Assembly Views</h3>
            <p>Multiple views showing component relationships</p>
            <ul>
              <li>Exploded views</li>
              <li>Sectional views</li>
              <li>Detailed assembly views</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Bill of Materials (BOM)</h3>
            <p>Complete list of all components and materials</p>
            <ul>
              <li>Part numbers</li>
              <li>Quantities</li>
              <li>Material specifications</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Assembly Instructions</h3>
            <p>Step-by-step assembly procedures</p>
            <ul>
              <li>Sequence of operations</li>
              <li>Tools required</li>
              <li>Safety precautions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Practice Assembly Drawings</h2>
        <div className="assembly-examples">
          <div className="example">
            <h3>Simple Mechanical Assembly</h3>
            <p>Create assembly drawing for a basic shaft and bearing system</p>
          </div>

          <div className="example">
            <h3>Electronic Device Assembly</h3>
            <p>Assembly drawing for a simple electronic circuit board</p>
          </div>

          <div className="example">
            <h3>Structural Assembly</h3>
            <p>Drawing showing structural component connections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssemblyDrawings;