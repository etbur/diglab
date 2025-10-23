import React from "react";

const SectionalViews = () => {
  return (
    <div className="sectional-views-grade12">
      <h1>✂️ Advanced Sectional Views - Grade 12</h1>
      <p>Master complex sectional representations and cutting plane techniques.</p>

      <div className="content-section">
        <h2>Advanced Sectioning Techniques</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Multiple Cutting Planes</h3>
            <p>Complex sectioning with multiple planes</p>
            <ul>
              <li>Aligned section views</li>
              <li>Offset sections</li>
              <li>Broken-out sections</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Revolved Sections</h3>
            <p>Rotational section views</p>
            <ul>
              <li>Full revolved sections</li>
              <li>Half sections</li>
              <li>Removed sections</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Assembly Sections</h3>
            <p>Sectioning of multi-part assemblies</p>
            <ul>
              <li>Assembly cross-sections</li>
              <li>Detail sections</li>
              <li>Exploded sections</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Professional Section Drawings</h2>
        <div className="exercises">
          <div className="exercise">
            <h3>Complex Machinery</h3>
            <p>Sectional views of mechanical systems</p>
          </div>

          <div className="exercise">
            <h3>Building Sections</h3>
            <p>Architectural and structural sections</p>
          </div>

          <div className="exercise">
            <h3>Product Disassembly</h3>
            <p>Exploded views for assembly instructions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionalViews;