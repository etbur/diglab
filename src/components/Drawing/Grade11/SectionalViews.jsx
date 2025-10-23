import React from "react";

const SectionalViews = () => {
  return (
    <div className="sectional-views-grade11">
      <h1>✂️ Sectional Views - Grade 11</h1>
      <p>Learn to create section views to show internal features and construction details.</p>

      <div className="content-section">
        <h2>Section View Types</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Full Sections</h3>
            <p>Complete cross-section through an object</p>
            <ul>
              <li>Full sectional views</li>
              <li>Hatching conventions</li>
              <li>Section lines</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Half Sections</h3>
            <p>Section view combined with external view</p>
            <ul>
              <li>Symmetrical objects</li>
              <li>External features visible</li>
              <li>Internal details shown</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Offset Sections</h3>
            <p>Section planes that change direction</p>
            <ul>
              <li>Complex internal features</li>
              <li>Non-aligned features</li>
              <li>Multiple section planes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Section Drawing Practice</h2>
        <div className="exercises">
          <div className="exercise">
            <h3>Simple Sections</h3>
            <p>Create full sections of basic geometric shapes</p>
          </div>

          <div className="exercise">
            <h3>Half Sections</h3>
            <p>Combine section and external views</p>
          </div>

          <div className="exercise">
            <h3>Complex Assemblies</h3>
            <p>Section views of multi-part objects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionalViews;