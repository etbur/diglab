import React from "react";

const Algorithms = () => {
  return (
    <div className="algorithms-grade11">
      <h1>⚙️ Algorithms - Grade 11</h1>
      <p>Introduction to algorithm design, analysis, and implementation.</p>

      <div className="content-section">
        <h2>Algorithm Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Algorithm Design</h3>
            <p>Principles of algorithm development</p>
            <ul>
              <li>Problem solving strategies</li>
              <li>Pseudocode writing</li>
              <li>Flowchart design</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Sorting Algorithms</h3>
            <p>Common sorting techniques</p>
            <ul>
              <li>Bubble sort</li>
              <li>Selection sort</li>
              <li>Insertion sort</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Search Algorithms</h3>
            <p>Finding elements in data structures</p>
            <ul>
              <li>Linear search</li>
              <li>Binary search</li>
              <li>Hash table lookup</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Algorithm Analysis</h2>
        <div className="applications">
          <div className="application">
            <h3>Efficiency Analysis</h3>
            <p>Big O notation and complexity</p>
          </div>

          <div className="application">
            <h3>Optimization</h3>
            <p>Improving algorithm performance</p>
          </div>

          <div className="application">
            <h3>Problem Solving</h3>
            <p>Applying algorithms to real problems</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algorithms;