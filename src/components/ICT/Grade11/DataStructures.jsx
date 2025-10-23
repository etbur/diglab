import React from "react";

const DataStructures = () => {
  return (
    <div className="data-structures-grade11">
      <h1>📊 Data Structures - Grade 11</h1>
      <p>Introduction to fundamental data structures and algorithms.</p>

      <div className="content-section">
        <h2>Basic Data Structures</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Arrays and Lists</h3>
            <p>Linear data structures for storing collections</p>
            <ul>
              <li>Static vs dynamic arrays</li>
              <li>Linked lists</li>
              <li>Array operations</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Stacks and Queues</h3>
            <p>LIFO and FIFO data structures</p>
            <ul>
              <li>Stack operations</li>
              <li>Queue implementations</li>
              <li>Applications</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Trees and Graphs</h3>
            <p>Non-linear data structures</p>
            <ul>
              <li>Binary trees</li>
              <li>Graph representations</li>
              <li>Traversal algorithms</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Algorithm Analysis</h2>
        <div className="applications">
          <div className="application">
            <h3>Time Complexity</h3>
            <p>Analyzing algorithm efficiency</p>
          </div>

          <div className="application">
            <h3>Space Complexity</h3>
            <p>Memory usage analysis</p>
          </div>

          <div className="application">
            <h3>Sorting Algorithms</h3>
            <p>Comparison and implementation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructures;