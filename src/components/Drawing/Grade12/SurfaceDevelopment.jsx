import React from "react";

const SurfaceDevelopment = () => {
  return (
    <div className="surface-development-grade12">
      <h1>🎯 Surface Development - Grade 12</h1>
      <p>Master the art of developing surfaces for manufacturing and pattern making.</p>

      <div className="content-section">
        <h2>Surface Development Techniques</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Geometric Solids</h3>
            <p>Developing surfaces of basic geometric shapes</p>
            <ul>
              <li>Prisms and pyramids</li>
              <li>Cylinders and cones</li>
              <li>Spherical surfaces</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Transition Pieces</h3>
            <p>Developing complex transition surfaces</p>
            <ul>
              <li>Eccentric cones</li>
              <li>Elbows and bends</li>
              <li>Offset pipes</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Pattern Development</h3>
            <p>Creating patterns for manufacturing</p>
            <ul>
              <li>Sheet metal patterns</li>
              <li>Duct work development</li>
              <li>Seam allowances</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Manufacturing Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Sheet Metal Work</h3>
            <p>Developing patterns for metal fabrication</p>
          </div>

          <div className="application">
            <h3>HVAC Systems</h3>
            <p>Duct and ventilation system development</p>
          </div>

          <div className="application">
            <h3>Product Design</h3>
            <p>Surface development for packaging and products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurfaceDevelopment;