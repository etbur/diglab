import React from "react";

const Determinants = () => {
  return (
    <div className="determinants-grade12">
      <h1>🔢 Determinants - Grade 12</h1>
      <p>Master determinant calculation and applications in linear algebra.</p>

      <div className="content-section">
        <h2>Determinant Theory</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>2x2 and 3x3 Matrices</h3>
            <p>Calculating determinants of small matrices</p>
            <ul>
              <li>2x2 determinant formula</li>
              <li>3x3 determinant expansion</li>
              <li>Sarrus rule</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Larger Matrices</h3>
            <p>Determinant calculation for n×n matrices</p>
            <ul>
              <li>Cofactor expansion</li>
              <li>Laplace expansion</li>
              <li>Row reduction methods</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Properties</h3>
            <p>Important properties of determinants</p>
            <ul>
              <li>Multiplicative property</li>
              <li>Transpose property</li>
              <li>Row operations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Matrix Inversion</h3>
            <p>Using determinants to find matrix inverses</p>
          </div>

          <div className="application">
            <h3>Cramer's Rule</h3>
            <p>Solving linear systems using determinants</p>
          </div>

          <div className="application">
            <h3>Area and Volume</h3>
            <p>Geometric interpretations of determinants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Determinants;