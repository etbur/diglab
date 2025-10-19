import React from "react";
import { NavLink } from "react-router-dom";

const Physics = () => {
  return (
    <div className="physics-dashboard">
      <h1>🌍 Physics Lab Grade 11 Experiments</h1>
      <div className="simulation-grid">

        <NavLink to="/physics/grade11/motion-graph-analysis" className="btn-card">
          Motion Graph Analysis
        </NavLink>

        <NavLink to="/physics/grade11/projectile-motion" className="btn-card">
          Projectile Motion
        </NavLink>

        <NavLink to="/physics/grade11/newtons-second-law" className="btn-card">
          Newton’s Second Law (Atwood Machine)
        </NavLink>

        <NavLink to="/physics/grade11/friction" className="btn-card">
          Friction on an Inclined Plane
        </NavLink>

        <NavLink to="/physics/grade11/conservation-of-momentum" className="btn-card">
          Conservation of Momentum (Collisions)
        </NavLink>

        <NavLink to="/physics/grade11/work-energy-principle" className="btn-card">
          Work-Energy Principle
        </NavLink>

        <NavLink to="/physics/grade11/power" className="btn-card">
          Measuring Power of a Motor
        </NavLink>

        <NavLink to="/physics/grade11/thermal-expansion" className="btn-card">
          Thermal Expansion of Solids
        </NavLink>

        <NavLink to="/physics/grade11/specific-heat" className="btn-card">
          Specific Heat Capacity of Water
        </NavLink>

        <NavLink to="/physics/grade11/reflection-refraction" className="btn-card">
          Reflection and Refraction of Light
        </NavLink>

        <NavLink to="/physics/grade11/lens-experiment" className="btn-card">
          Focal Length of a Convex Lens
        </NavLink>

        <NavLink to="/physics/grade11/ohms-law" className="btn-card">
          Ohm's Law
        </NavLink>

        <NavLink to="/physics/grade11/resistance-series-parallel" className="btn-card">
          Resistors in Series and Parallel
        </NavLink>

        <NavLink to="/physics/grade11/magnetic-field-coil" className="btn-card">
          Magnetic Field around a Current-Carrying Coil
        </NavLink>

        <NavLink to="/physics/grade11/induced-current" className="btn-card">
          Electromagnetic Induction
        </NavLink>

      </div>
    </div>
  );
};

export default Physics;
