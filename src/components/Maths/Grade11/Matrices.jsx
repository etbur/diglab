import React from "react";

const Matrices = () => {
  return (
    <div className="matrices-grade11">
      <h1>📊 Matrices - Grade 11</h1>
      <p>Introduction to matrix operations and applications.</p>

      <div className="content-section">
        <h2>Matrix Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Matrix Operations</h3>
            <p>Basic matrix arithmetic and operations</p>
            <ul>
              <li>Matrix addition</li>
              <li>Scalar multiplication</li>
              <li>Matrix multiplication</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Matrix Types</h3>
            <p>Different types of matrices and their properties</p>
            <ul>
              <li>Square matrices</li>
              <li>Identity matrices</li>
              <li>Zero matrices</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Determinants</h3>
            <p>Calculating determinants of matrices</p>
            <ul>
              <li>2x2 determinants</li>
              <li>3x3 determinants</li>
              <li>Properties of determinants</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Systems of Equations</h3>
            <p>Solving linear systems using matrices</p>
          </div>

          <div className="application">
            <h3>Transformations</h3>
            <p>Geometric transformations with matrices</p>
          </div>

          <div className="application">
            <h3>Data Organization</h3>
            <p>Matrices in data representation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matrices;