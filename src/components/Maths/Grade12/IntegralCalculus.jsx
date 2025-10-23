import React from "react";

const IntegralCalculus = () => {
  return (
    <div className="integral-calculus-grade12">
      <h1>∫ Integral Calculus - Grade 12</h1>
      <p>Master integration techniques and their applications.</p>

      <div className="content-section">
        <h2>Integration Methods</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Definite Integrals</h3>
            <p>Integration with limits and area calculation</p>
            <ul>
              <li>Fundamental theorem</li>
              <li>Area under curves</li>
              <li>Definite integral properties</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Integration Techniques</h3>
            <p>Advanced integration methods</p>
            <ul>
              <li>Integration by parts</li>
              <li>Trigonometric substitution</li>
              <li>Partial fractions</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Improper Integrals</h3>
            <p>Integration of unbounded functions</p>
            <ul>
              <li>Infinite limits</li>
              <li>Discontinuous integrands</li>
              <li>Convergence tests</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Area and Volume</h3>
            <p>Calculating areas and volumes of revolution</p>
          </div>

          <div className="application">
            <h3>Physics Applications</h3>
            <p>Work, energy, and center of mass</p>
          </div>

          <div className="application">
            <h3>Probability</h3>
            <p>Continuous probability distributions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegralCalculus;