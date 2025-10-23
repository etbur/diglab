import React from "react";

const ThreadsAndFasteners = () => {
  return (
    <div className="threads-fasteners-grade12">
      <h1>🔩 Advanced Threads and Fasteners - Grade 12</h1>
      <p>Professional fastener specification, thread design, and assembly standards.</p>

      <div className="content-section">
        <h2>Advanced Fastening Systems</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Thread Standards</h3>
            <p>International and industry thread specifications</p>
            <ul>
              <li>ISO metric threads</li>
              <li>Unified threads (UNC/UNF)</li>
              <li>Specialty threads</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Fastener Design</h3>
            <p>Engineering design of fastening systems</p>
            <ul>
              <li>Load calculations</li>
              <li>Material selection</li>
              <li>Failure analysis</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Assembly Standards</h3>
            <p>Professional assembly and installation standards</p>
            <ul>
              <li>Torque specifications</li>
              <li>Installation procedures</li>
              <li>Quality control</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Engineering Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Machine Design</h3>
            <p>Fastener selection for mechanical systems</p>
          </div>

          <div className="application">
            <h3>Structural Engineering</h3>
            <p>High-strength fastening for construction</p>
          </div>

          <div className="application">
            <h3>Aerospace Standards</h3>
            <p>Critical fastening systems and specifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadsAndFasteners;