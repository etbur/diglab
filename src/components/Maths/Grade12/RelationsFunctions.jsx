import React from "react";

const RelationsFunctions = () => {
  return (
    <div className="relations-functions-grade12">
      <h1>🔗 Relations and Functions - Grade 12</h1>
      <p>Explore advanced concepts in relations, functions, and their applications.</p>

      <div className="content-section">
        <h2>Advanced Relations</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Types of Relations</h3>
            <p>Different classifications of relations</p>
            <ul>
              <li>Reflexive relations</li>
              <li>Symmetric relations</li>
              <li>Transitive relations</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Equivalence Relations</h3>
            <p>Relations that partition sets</p>
            <ul>
              <li>Equivalence classes</li>
              <li>Partition of sets</li>
              <li>Modular arithmetic</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Functions</h3>
            <p>Special types of relations</p>
            <ul>
              <li>One-to-one functions</li>
              <li>Onto functions</li>
              <li>Bijective functions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Function Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Real-world Functions</h3>
            <p>Mathematical modeling of real-world phenomena</p>
          </div>

          <div className="application">
            <h3>Composite Functions</h3>
            <p>Combining functions and their properties</p>
          </div>

          <div className="application">
            <h3>Inverse Functions</h3>
            <p>Finding and applying inverse relations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationsFunctions;