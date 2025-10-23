import React from "react";

const Trigonometry = () => {
  return (
    <div className="trigonometry-grade11">
      <h1>📐 Trigonometry - Grade 11</h1>
      <p>Advanced trigonometric functions, identities, and applications.</p>

      <div className="content-section">
        <h2>Trigonometric Functions</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Basic Functions</h3>
            <p>Sine, cosine, tangent and their reciprocals</p>
            <ul>
              <li>sin(x), cos(x), tan(x)</li>
              <li>csc(x), sec(x), cot(x)</li>
              <li>Domain and range</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Trigonometric Identities</h3>
            <p>Fundamental identities and their applications</p>
            <ul>
              <li>Pythagorean identities</li>
              <li>Sum and difference formulas</li>
              <li>Double angle formulas</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Trigonometric Equations</h3>
            <p>Solving equations involving trigonometric functions</p>
            <ul>
              <li>Basic equations</li>
              <li>Multiple angles</li>
              <li>Using identities</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Right Triangle Problems</h3>
            <p>Using trigonometry in right triangles</p>
          </div>

          <div className="application">
            <h3>Wave Functions</h3>
            <p>Trigonometric functions in physics</p>
          </div>

          <div className="application">
            <h3>Periodic Phenomena</h3>
            <p>Modeling periodic behavior</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trigonometry;