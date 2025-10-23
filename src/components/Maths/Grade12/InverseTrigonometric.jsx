import React from "react";

const InverseTrigonometric = () => {
  return (
    <div className="inverse-trigonometric-grade12">
      <h1>📐 Inverse Trigonometric Functions - Grade 12</h1>
      <p>Master inverse trigonometric functions and their applications.</p>

      <div className="content-section">
        <h2>Inverse Functions</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Basic Inverse Functions</h3>
            <p>Definition and properties of inverse trig functions</p>
            <ul>
              <li>arcsin(x)</li>
              <li>arccos(x)</li>
              <li>arctan(x)</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Domains and Ranges</h3>
            <p>Understanding the restrictions and outputs</p>
            <ul>
              <li>Principal values</li>
              <li>Domain restrictions</li>
              <li>Range of functions</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Identities and Formulas</h3>
            <p>Important identities involving inverse functions</p>
            <ul>
              <li>Sum and difference formulas</li>
              <li>Double angle formulas</li>
              <li>Pythagorean identities</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Triangle Solutions</h3>
            <p>Solving triangles using inverse functions</p>
          </div>

          <div className="application">
            <h3>Real-world Problems</h3>
            <p>Applications in physics and engineering</p>
          </div>

          <div className="application">
            <h3>Calculus Integration</h3>
            <p>Integration techniques using inverse trig</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverseTrigonometric;