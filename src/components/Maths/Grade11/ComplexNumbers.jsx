import React from "react";

const ComplexNumbers = () => {
  return (
    <div className="complex-numbers-grade11">
      <h1>🔢 Complex Numbers - Grade 11</h1>
      <p>Introduction to complex numbers and their operations.</p>

      <div className="content-section">
        <h2>Complex Number Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Imaginary Unit</h3>
            <p>Understanding the imaginary unit i</p>
            <ul>
              <li>Definition of i</li>
              <li>i² = -1</li>
              <li>Powers of i</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Complex Number Operations</h3>
            <p>Addition, subtraction, multiplication, division</p>
            <ul>
              <li>Arithmetic operations</li>
              <li>Complex conjugates</li>
              <li>Magnitude and argument</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Complex Plane</h3>
            <p>Geometric representation of complex numbers</p>
            <ul>
              <li>Real and imaginary axes</li>
              <li>Polar form</li>
              <li>Euler's formula</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Quadratic Equations</h3>
            <p>Solving equations with complex roots</p>
          </div>

          <div className="application">
            <h3>Electrical Engineering</h3>
            <p>AC circuits and impedance</p>
          </div>

          <div className="application">
            <h3>Quantum Physics</h3>
            <p>Wave functions and quantum states</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexNumbers;