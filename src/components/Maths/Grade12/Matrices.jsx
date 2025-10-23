import React from "react";

const Matrices = () => {
  return (
    <div className="matrices-grade12">
      <h1>📊 Matrices - Grade 12</h1>
      <p>Advanced matrix operations, transformations, and applications.</p>

      <div className="content-section">
        <h2>Matrix Operations</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Matrix Algebra</h3>
            <p>Advanced matrix operations and properties</p>
            <ul>
              <li>Matrix multiplication</li>
              <li>Matrix inversion</li>
              <li>Determinant calculation</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Matrix Transformations</h3>
            <p>Geometric transformations using matrices</p>
            <ul>
              <li>Rotation matrices</li>
              <li>Translation matrices</li>
              <li>Scaling matrices</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Eigenvalues & Eigenvectors</h3>
            <p>Advanced matrix analysis techniques</p>
            <ul>
              <li>Characteristic equation</li>
              <li>Diagonalization</li>
              <li>Principal component analysis</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Matrix Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Linear Systems</h3>
            <p>Solving systems of linear equations</p>
          </div>

          <div className="application">
            <h3>Computer Graphics</h3>
            <p>3D transformations and rendering</p>
          </div>

          <div className="application">
            <h3>Data Analysis</h3>
            <p>Statistical analysis and machine learning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matrices;