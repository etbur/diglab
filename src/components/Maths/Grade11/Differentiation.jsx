import React from "react";

const Differentiation = () => {
  return (
    <div className="differentiation-grade11">
      <h1>📈 Differentiation - Grade 11</h1>
      <p>Introduction to derivatives and differentiation techniques.</p>

      <div className="content-section">
        <h2>Basic Differentiation</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Derivative Concept</h3>
            <p>Understanding the derivative as a rate of change</p>
            <ul>
              <li>Instantaneous rate of change</li>
              <li>Slope of tangent line</li>
              <li>Limit definition</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Basic Rules</h3>
            <p>Fundamental differentiation rules</p>
            <ul>
              <li>Power rule</li>
              <li>Sum and difference rules</li>
              <li>Product and quotient rules</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Trigonometric Derivatives</h3>
            <p>Derivatives of trigonometric functions</p>
            <ul>
              <li>d/dx sin(x) = cos(x)</li>
              <li>d/dx cos(x) = -sin(x)</li>
              <li>d/dx tan(x) = sec²(x)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Rate of Change</h3>
            <p>Velocity and acceleration problems</p>
          </div>

          <div className="application">
            <h3>Optimization</h3>
            <p>Finding maximum and minimum values</p>
          </div>

          <div className="application">
            <h3>Marginal Analysis</h3>
            <p>Economic applications of derivatives</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Differentiation;