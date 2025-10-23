import React from "react";

const ThreadsAndFasteners = () => {
  return (
    <div className="threads-fasteners-grade11">
      <h1>🔩 Threads and Fasteners - Grade 11</h1>
      <p>Learn to draw and specify threaded fasteners and fastening systems.</p>

      <div className="content-section">
        <h2>Thread Representation</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Thread Standards</h3>
            <p>Standard thread forms and specifications</p>
            <ul>
              <li>Metric threads (M)</li>
              <li>Unified threads (UNC/UNF)</li>
              <li>Thread pitch and diameter</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Fastener Types</h3>
            <p>Common fastening hardware</p>
            <ul>
              <li>Bolts and nuts</li>
              <li>Screws</li>
              <li>Washers and rivets</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Drawing Conventions</h3>
            <p>How to represent threads in drawings</p>
            <ul>
              <li>Simplified representation</li>
              <li>Detailed thread profiles</li>
              <li>Section views</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Thread and Fastener Practice</h2>
        <div className="exercises">
          <div className="exercise">
            <h3>Thread Specifications</h3>
            <p>Identify and specify different thread types</p>
          </div>

          <div className="exercise">
            <h3>Fastener Assemblies</h3>
            <p>Draw complete fastener assemblies</p>
          </div>

          <div className="exercise">
            <h3>Detail Drawings</h3>
            <p>Create detailed drawings of fasteners</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadsAndFasteners;