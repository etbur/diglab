import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFlask,
  FaCalculator,
  FaDraftingCompass,
  FaChartBar,
  FaCogs,
} from "react-icons/fa";

const grades = Array.from({ length: 12 }, (_, i) => i + 1);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>🌍 Digital Lab Dashboard (Grades 1–12)</h1>

      <div className="grades-grid">
        {grades.map((grade) => (
          <div key={grade} className="grade-card">
            <h2>Grade {grade}</h2>

            <div className="lab-links">
              <NavLink to={`/maths/grade${grade}`} className="lab-btn">
                <FaCalculator /> Math Lab
              </NavLink>
              <NavLink to={`/chemistry/grade${grade}`} className="lab-btn">
                <FaFlask /> Science Lab
              </NavLink>
              <NavLink to={`/drawing/grade${grade}`} className="lab-btn">
                <FaDraftingCompass /> Drawing Lab
              </NavLink>
              {/* Add more labs if needed */}
            </div>

            {/* Placeholder for progress bar */}
            <div className="progress-bar">
              <FaChartBar /> Progress: <progress value={Math.random() * 100} max="100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
