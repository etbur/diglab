import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFlask,
  FaCalculator,
  FaDraftingCompass,
  FaChartBar,
  FaCogs,
  FaRocket,
  FaGraduationCap,
  FaUsers,
  FaLightbulb,
  FaMicroscope,
  FaPalette,
  FaCode,
  FaBookOpen
} from "react-icons/fa";
import "./Dashboard.css";

const grades = Array.from({ length: 12 }, (_, i) => i + 1);

const Dashboard = () => {
  const getGradeColor = (grade) => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57",
      "#FF9FF3", "#54A0FF", "#5F27CD", "#00D2D3", "#FF9F43",
      "#10AC84", "#EE5A24"
    ];
    return colors[grade - 1] || "#6c5ce7";
  };

  const getGradeIcon = (grade) => {
    if (grade <= 3) return <FaBookOpen />;
    if (grade <= 6) return <FaMicroscope />;
    if (grade <= 9) return <FaCogs />;
    return <FaRocket />;
  };

  const getGradeDescription = (grade) => {
    const descriptions = {
      1: "Explore basic concepts through fun activities",
      2: "Build foundational skills with interactive tools",
      3: "Develop problem-solving abilities",
      4: "Discover scientific principles",
      5: "Master mathematical operations",
      6: "Advanced experiments and calculations",
      7: "Complex problem-solving challenges",
      8: "Prepare for high school level work",
      9: "High school foundation building",
      10: "College preparatory labs",
      11: "Advanced placement preparation",
      12: "University-level challenges"
    };
    return descriptions[grade] || "Interactive learning experiences";
  };

  const progressValues = grades.reduce((acc, grade) => {
    acc[grade] = Math.floor(Math.random() * 100);
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <FaRocket className="hero-icon" />
            Digital Laboratory Hub
          </h1>
          <p className="hero-subtitle">
            Interactive learning experiences for Grades 1–12
          </p>
          <div className="hero-stats">
            <div className="stat">
              <FaUsers className="stat-icon" />
              <span>12 Grade Levels</span>
            </div>
            <div className="stat">
              <FaFlask className="stat-icon" />
              <span>3 Lab Types</span>
            </div>
            <div className="stat">
              <FaLightbulb className="stat-icon" />
              <span>100+ Activities</span>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="floating-icon math-icon">
            <FaCalculator />
          </div>
          <div className="floating-icon science-icon">
            <FaFlask />
          </div>
          <div className="floating-icon art-icon">
            <FaPalette />
          </div>
        </div>
      </header>

      {/* Quick Access Section */}
      <section className="quick-access">
        <h2>Quick Access Labs</h2>
        <div className="quick-labs">
          <NavLink to="/maths" className="quick-lab-card maths">
            <FaCalculator className="lab-icon" />
            <h3>Mathematics Lab</h3>
            <p>Interactive calculations and problem-solving</p>
          </NavLink>
          <NavLink to="/chemistry" className="quick-lab-card science">
            <FaFlask className="lab-icon" />
            <h3>Science Lab</h3>
            <p>Virtual experiments and discoveries</p>
          </NavLink>
          <NavLink to="/drawing" className="quick-lab-card art">
            <FaDraftingCompass className="lab-icon" />
            <h3>Drawing Lab</h3>
            <p>Creative design and technical drawing</p>
          </NavLink>
        </div>
      </section>

      {/* Grades Grid Section */}
      <section className="grades-section">
        <h2>
          <FaGraduationCap className="section-icon" />
          Explore by Grade Level
        </h2>
        <div className="grades-grid">
          {grades.map((grade) => (
            <div 
              key={grade} 
              className="grade-card"
              style={{ '--grade-color': getGradeColor(grade) }}
            >
              <div className="grade-header">
                <span className="grade-icon">{getGradeIcon(grade)}</span>
                <h3>Grade {grade}</h3>
              </div>
              
              <p className="grade-description">{getGradeDescription(grade)}</p>

              <div className="lab-links">
                <NavLink 
                  to={`/maths/grade${grade}`} 
                  className="lab-btn maths-btn"
                >
                  <FaCalculator /> Math Lab
                </NavLink>
                <NavLink 
                  to={`/chemistry/grade${grade}`} 
                  className="lab-btn science-btn"
                >
                  <FaFlask /> Science Lab
                </NavLink>
                <NavLink 
                  to={`/drawing/grade${grade}`} 
                  className="lab-btn art-btn"
                >
                  <FaDraftingCompass /> Drawing Lab
                </NavLink>
              </div>

              <div className="progress-section">
                <div className="progress-info">
                  <FaChartBar className="progress-icon" />
                  <span>Learning Progress</span>
                  <span className="progress-value">{progressValues[grade]}%</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-fill"
                    style={{ width: `${progressValues[grade]}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Digital Lab?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaMicroscope className="feature-icon" />
            <h3>Hands-on Experience</h3>
            <p>Virtual labs that mimic real-world experiments</p>
          </div>
          <div className="feature-card">
            <FaCode className="feature-icon" />
            <h3>Interactive Learning</h3>
            <p>Engaging activities that adapt to your level</p>
          </div>
          <div className="feature-card">
            <FaChartBar className="feature-icon" />
            <h3>Progress Tracking</h3>
            <p>Monitor your improvement with detailed analytics</p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Safe Environment</h3>
            <p>Learn and experiment without any risks</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;