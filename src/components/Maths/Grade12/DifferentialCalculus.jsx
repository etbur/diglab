import React from "react";

const DifferentialCalculus = () => {
  return (
    <div className="differential-calculus-grade12">
      <h1>📈 Differential Calculus - Grade 12</h1>
      <p>Advanced differentiation techniques and applications.</p>

      <div className="content-section">
        <h2>Advanced Differentiation</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Higher Order Derivatives</h3>
            <p>Second, third, and higher derivatives</p>
            <ul>
              <li>Notation and interpretation</li>
              <li>Physical meaning</li>
              <li>Applications in physics</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Implicit Differentiation</h3>
            <p>Differentiating implicit functions</p>
            <ul>
              <li>Chain rule applications</li>
              <li>Related rates problems</li>
              <li>Curve sketching</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Parametric Equations</h3>
            <p>Differentiation of parametric functions</p>
            <ul>
              <li>dx/dt and dy/dt</li>
              <li>Second derivatives</li>
              <li>Arc length formulas</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Optimization Problems</h3>
            <p>Finding maximum and minimum values</p>
          </div>

          <div className="application">
            <h3>Motion Analysis</h3>
            <p>Velocity, acceleration, and jerk</p>
          </div>

          <div className="application">
            <h3>Economic Applications</h3>
            <p>Marginal cost and revenue analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferentialCalculus;