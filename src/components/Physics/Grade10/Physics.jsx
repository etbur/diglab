import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaArrowsAlt,         // Motion and Forces
  FaBolt,              // Work, Energy, Power
  FaTemperatureHigh,   // Heat
  FaVolumeUp,          // Sound
  FaLightbulb,         // Light (Optics)
  FaBatteryHalf,       // Electricity
  FaMagnet,            // Magnetism
  FaChargingStation,   // Static Electricity
  FaMicrochip          // Practical Electronics
} from "react-icons/fa";

const Physics = () => {
  return (
    <div className="physics-dashboard">
      <h1>🌍 Physics Lab Grade 10 Dashboard</h1>
      <div className="simulation-grid">

        <NavLink to="/physics/grade10/motion-forces" className="btn-card">
          <FaArrowsAlt /> Motion and Forces
        </NavLink>

        <NavLink to="/physics/grade10/work-energy-power" className="btn-card">
          <FaBolt /> Work, Energy, and Power
        </NavLink>

        <NavLink to="/physics/grade10/heat-thermodynamics" className="btn-card">
          <FaTemperatureHigh /> Heat and Thermodynamics
        </NavLink>

        <NavLink to="/physics/grade10/sound-waves" className="btn-card">
          <FaVolumeUp /> Sound and Waves
        </NavLink>

        <NavLink to="/physics/grade10/light-optics" className="btn-card">
          <FaLightbulb /> Light (Optics)
        </NavLink>

        <NavLink to="/physics/grade10/electricity" className="btn-card">
          <FaBatteryHalf /> Electricity
        </NavLink>

        <NavLink to="/physics/grade10/magnetism" className="btn-card">
          <FaMagnet /> Magnetism and Electromagnetism
        </NavLink>

        <NavLink to="/physics/grade10/static-electricity" className="btn-card">
          <FaChargingStation /> Static Electricity
        </NavLink>

        <NavLink to="/physics/grade10/practical-electronics" className="btn-card">
          <FaMicrochip /> Practical Electronics
        </NavLink>

        <NavLink to="/physics/grade10/OhmsLaw" className="btn-card">
          <FaMicrochip /> Ohms Law
        </NavLink>

      </div>
    </div>
  );
};

export default Physics;
