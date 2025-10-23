import React from "react";

const Sets = () => {
  return (
    <div className="sets-grade11">
      <h1>🔢 Sets - Grade 11</h1>
      <p>Explore the fundamentals of set theory and its applications.</p>

      <div className="content-section">
        <h2>Set Theory Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Basic Set Operations</h3>
            <p>Union, intersection, and complement operations</p>
            <ul>
              <li>Union of sets</li>
              <li>Intersection of sets</li>
              <li>Set difference</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Venn Diagrams</h3>
            <p>Visual representation of set relationships</p>
            <ul>
              <li>Two-set diagrams</li>
              <li>Three-set diagrams</li>
              <li>Set relationships</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Set Properties</h3>
            <p>Properties and laws of set operations</p>
            <ul>
              <li>Commutative laws</li>
              <li>Associative laws</li>
              <li>Distributive laws</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Real-world Problems</h3>
            <p>Applying set theory to practical situations</p>
          </div>

          <div className="application">
            <h3>Logic and Reasoning</h3>
            <p>Using sets in logical reasoning</p>
          </div>

          <div className="application">
            <h3>Data Analysis</h3>
            <p>Sets in data organization and analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sets;