import React from "react";

const SoftwareEngineering = () => {
  return (
    <div className="software-engineering-grade12">
      <h1>💻 Software Engineering - Grade 12</h1>
      <p>Master the principles and practices of professional software development.</p>

      <div className="content-section">
        <h2>Software Development Lifecycle</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Requirements Analysis</h3>
            <p>Gathering and documenting software requirements</p>
            <ul>
              <li>Functional requirements</li>
              <li>Non-functional requirements</li>
              <li>Use case modeling</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Design Patterns</h3>
            <p>Reusable solutions to common software design problems</p>
            <ul>
              <li>Creational patterns</li>
              <li>Structural patterns</li>
              <li>Behavioral patterns</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Testing & Quality Assurance</h3>
            <p>Ensuring software reliability and quality</p>
            <ul>
              <li>Unit testing</li>
              <li>Integration testing</li>
              <li>System testing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Software Engineering Practices</h2>
        <div className="practices">
          <div className="practice">
            <h3>Agile Development</h3>
            <p>Learn agile methodologies and scrum practices</p>
          </div>

          <div className="practice">
            <h3>Version Control</h3>
            <p>Master Git and collaborative development workflows</p>
          </div>

          <div className="practice">
            <h3>Code Reviews</h3>
            <p>Best practices for peer code review and feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareEngineering;