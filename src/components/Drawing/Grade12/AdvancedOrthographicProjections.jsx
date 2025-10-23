import React from "react";

const AdvancedOrthographicProjections = () => {
  return (
    <div className="advanced-orthographic-projections-grade12">
      <h1>📐 Advanced Orthographic Projections - Grade 12</h1>
      <p>Master complex multi-view drawings and advanced projection techniques.</p>

      <div className="content-section">
        <h2>Advanced Projection Methods</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Auxiliary Views</h3>
            <p>Additional views for complex surfaces</p>
            <ul>
              <li>Primary auxiliary views</li>
              <li>Secondary auxiliary views</li>
              <li>Revolution methods</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Oblique Surfaces</h3>
            <p>Projections of inclined and oblique planes</p>
            <ul>
              <li>True length determination</li>
              <li>Point and line views</li>
              <li>Edge views</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Intersection Problems</h3>
            <p>Line and plane intersections in projections</p>
            <ul>
              <li>Line-plane intersections</li>
              <li>Plane-plane intersections</li>
              <li>Edge views of intersections</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Complex Drawing Practice</h2>
        <div className="exercises">
          <div className="exercise">
            <h3>Multi-view Assemblies</h3>
            <p>Complete orthographic projections of complex assemblies</p>
          </div>

          <div className="exercise">
            <h3>Auxiliary View Construction</h3>
            <p>Creating auxiliary views for true shape representation</p>
          </div>

          <div className="exercise">
            <h3>Intersection Drawings</h3>
            <p>Drawing line and plane intersections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOrthographicProjections;