import React from "react";

const Progressions = () => {
  return (
    <div className="progressions-grade11">
      <h1>🔢 Progressions - Grade 11</h1>
      <p>Arithmetic and geometric sequences and series.</p>

      <div className="content-section">
        <h2>Sequence Types</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Arithmetic Sequences</h3>
            <p>Sequences with constant differences</p>
            <ul>
              <li>General term formula</li>
              <li>Arithmetic series</li>
              <li>Sum of n terms</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Geometric Sequences</h3>
            <p>Sequences with constant ratios</p>
            <ul>
              <li>General term formula</li>
              <li>Geometric series</li>
              <li>Infinite geometric series</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Applications</h3>
            <p>Real-world applications of progressions</p>
            <ul>
              <li>Growth and decay</li>
              <li>Compound interest</li>
              <li>Population growth</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Problem Solving</h2>
        <div className="applications">
          <div className="application">
            <h3>Word Problems</h3>
            <p>Translating real-world problems into sequences</p>
          </div>

          <div className="application">
            <h3>Recursive Formulas</h3>
            <p>Defining sequences recursively</p>
          </div>

          <div className="application">
            <h3>Convergence</h3>
            <p>When do infinite series converge?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progressions;