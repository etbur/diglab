import React from "react";
import { NavLink } from "react-router-dom";

const Physics = () => {
  return (
    <div className="physics-dashboard">
      <h1>🌍 Physics Lab Grade 12 Dashboard</h1>
      <div className="simulation-grid">

        <NavLink to="/physics/grade12/uniform-circular-motion" className="btn-card">
          Uniform Circular Motion
        </NavLink>

        <NavLink to="/physics/grade12/centripetal-force" className="btn-card">
          Centripetal Force Investigation
        </NavLink>

        <NavLink to="/physics/grade12/hookes-law-springs" className="btn-card">
          Hooke’s Law and Springs
        </NavLink>

        <NavLink to="/physics/grade12/simple-harmonic-motion" className="btn-card">
          Simple Harmonic Motion (Pendulum/Spring)
        </NavLink>

        <NavLink to="/physics/grade12/standing-waves" className="btn-card">
          Standing Waves in a String
        </NavLink>

        <NavLink to="/physics/grade12/interference-diffraction" className="btn-card">
          Light Interference & Diffraction
        </NavLink>

        <NavLink to="/physics/grade12/electric-fields" className="btn-card">
          Mapping Electric Fields
        </NavLink>

        <NavLink to="/physics/grade12/charging-capacitors" className="btn-card">
          Charging and Discharging Capacitors
        </NavLink>

        <NavLink to="/physics/grade12/kirchhoffs-laws" className="btn-card">
          Kirchhoff's Laws
        </NavLink>

        <NavLink to="/physics/grade12/ac-circuits" className="btn-card">
          AC Circuits & Resonance
        </NavLink>

        <NavLink to="/physics/grade12/electromagnetic-induction" className="btn-card">
          Electromagnetic Induction
        </NavLink>

        <NavLink to="/physics/grade12/photoelectric-effect" className="btn-card">
          Photoelectric Effect
        </NavLink>

        <NavLink to="/physics/grade12/radioactivity" className="btn-card">
          Radioactivity & Half-Life
        </NavLink>

        <NavLink to="/physics/grade12/atomic-spectra" className="btn-card">
          Atomic Spectra & Quantum Transitions
        </NavLink>

      </div>
    </div>
  );
};

export default Physics;
