import React from "react";

const Integration = () => {
  return (
    <div className="integration-grade11">
      <h1>∫ Integration - Grade 11</h1>
      <p>Introduction to antiderivatives and the fundamental theorem of calculus.</p>

      <div className="content-section">
        <h2>Basic Integration</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Antiderivatives</h3>
            <p>Finding functions whose derivatives are known</p>
            <ul>
              <li>Reverse of differentiation</li>
              <li>Indefinite integrals</li>
              <li>Constant of integration</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Basic Integration Rules</h3>
            <p>Fundamental integration techniques</p>
            <ul>
              <li>Power rule</li>
              <li>Sum and difference rules</li>
              <li>Integration of trigonometric functions</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Definite Integrals</h3>
            <p>Integration between limits</p>
            <ul>
              <li>Fundamental theorem</li>
              <li>Area under curves</li>
              <li>Properties of definite integrals</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Area Calculation</h3>
            <p>Finding areas using integration</p>
          </div>

          <div className="application">
            <h3>Accumulated Change</h3>
            <p>Total change from rate of change</p>
          </div>

          <div className="application">
            <h3>Physics Applications</h3>
            <p>Displacement from velocity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;