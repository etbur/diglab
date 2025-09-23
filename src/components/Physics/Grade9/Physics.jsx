import React from "react";
import { NavLink } from "react-router-dom";

const Physics = () => {
  return (
    <div className="physics-dashboard">
      <h1>🌍 Physics Lab Grade 9 Dashboard</h1>
      <div className="simulation-grid">

        <NavLink to="/physics/grade9/measurement-units" className="btn-card">
          Measurement and Units
        </NavLink>

        <NavLink to="/physics/grade9/motion-speed" className="btn-card">
          Motion and Speed
        </NavLink>

        <NavLink to="/physics/grade9/newtons-laws" className="btn-card">
          Newton’s Laws of Motion
        </NavLink>

        <NavLink to="/physics/grade9/friction" className="btn-card">
          Friction
        </NavLink>

        <NavLink to="/physics/grade9/work-energy-power" className="btn-card">
          Work, Energy, and Power
        </NavLink>

        <NavLink to="/physics/grade9/heat-temperature" className="btn-card">
          Heat and Temperature
        </NavLink>

        <NavLink to="/physics/grade9/sound" className="btn-card">
          Sound
        </NavLink>

        <NavLink to="/physics/grade9/electricity" className="btn-card">
          Electricity (Basic Circuits)
        </NavLink>

        <NavLink to="/physics/grade9/magnetism" className="btn-card">
          Magnetism
        </NavLink>

      </div>
    </div>
  );
};

export default Physics;
