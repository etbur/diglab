import React from "react";

const OrthographicProjections = () => {
  return (
    <div className="orthographic-projections-grade11">
      <h1>📐 Orthographic Projections - Grade 11</h1>
      <p>Master multi-view drawings and orthographic projection techniques.</p>

      <div className="content-section">
        <h2>Projection Theory</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>First Angle Projection</h3>
            <p>European standard projection method</p>
            <ul>
              <li>View arrangement</li>
              <li>Projection planes</li>
              <li>Standard layouts</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Third Angle Projection</h3>
            <p>American standard projection method</p>
            <ul>
              <li>View positioning</li>
              <li>Folding sequence</li>
              <li>Standard arrangements</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Hidden Lines</h3>
            <p>Representing invisible features</p>
            <ul>
              <li>Hidden line conventions</li>
              <li>Center lines</li>
              <li>Phantom lines</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Multi-View Drawing Practice</h2>
        <div className="exercises">
          <div className="exercise">
            <h3>Simple Objects</h3>
            <p>Create front, top, and side views of basic shapes</p>
          </div>

          <div className="exercise">
            <h3>Complex Objects</h3>
            <p>Objects with holes, slots, and irregular features</p>
          </div>

          <div className="exercise">
            <h3>Auxiliary Views</h3>
            <p>Additional views for inclined surfaces</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrthographicProjections;