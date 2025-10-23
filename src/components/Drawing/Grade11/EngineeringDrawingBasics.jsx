import React from "react";

const EngineeringDrawingBasics = () => {
  return (
    <div className="engineering-drawing-basics-grade11">
      <h1>📐 Engineering Drawing Basics - Grade 11</h1>
      <p>Master the fundamental principles of engineering drawing and documentation.</p>

      <div className="content-section">
        <h2>Drawing Standards and Conventions</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>ISO Standards</h3>
            <p>International standards for technical drawings</p>
            <ul>
              <li>Line types and conventions</li>
              <li>Dimensioning standards</li>
              <li>Title block requirements</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Drawing Layout</h3>
            <p>Proper organization of drawing sheets</p>
            <ul>
              <li>Border and title block</li>
              <li>Revision blocks</li>
              <li>Notes and specifications</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Scale and Proportion</h3>
            <p>Understanding scale in technical drawings</p>
            <ul>
              <li>Scale ratios</li>
              <li>Full size vs reduced scale</li>
              <li>Scale conversion</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Practice Exercises</h2>
        <div className="exercises">
          <div className="exercise">
            <h3>Title Block Creation</h3>
            <p>Practice creating proper title blocks with all required information</p>
          </div>

          <div className="exercise">
            <h3>Scale Conversion</h3>
            <p>Convert measurements between different scales</p>
          </div>

          <div className="exercise">
            <h3>Line Type Practice</h3>
            <p>Draw different line types according to standards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringDrawingBasics;