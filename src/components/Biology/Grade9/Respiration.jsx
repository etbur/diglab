import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Respiration = () => {
  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [oxygenLevel, setOxygenLevel] = useState(100); // % oxygen
  const [co2Level, setCo2Level] = useState(0); // % CO2
  const intervalRef = useRef(null);

  // Update simulation every second when running
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((t) => t + 1);

        // Oxygen consumption: decrease gradually
        setOxygenLevel((o2) => Math.max(o2 - 0.7, 0));

        // CO2 production: increase gradually
        setCo2Level((co2) => Math.min(co2 + 0.7, 100));
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Format time in mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Germination stage based on time
  const getGerminationStage = () => {
    if (time < 10) return "Seed Imbibition (Water absorption)";
    if (time < 20) return "Radicle emergence";
    if (time < 30) return "Hypocotyl elongation";
    if (time < 40) return "Cotyledon expansion";
    return "Seedling growth";
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Respiration in Germinating Seeds Lab Ethiopia</h1>

      <section style={{ margin: "20px 0", textAlign: "center" }}>
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          style={{
            padding: "10px 20px",
            marginRight: 10,
            fontSize: 16,
            cursor: isRunning ? "not-allowed" : "pointer",
          }}
        >
          Start Experiment
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          style={{
            padding: "10px 20px",
            marginRight: 10,
            fontSize: 16,
            cursor: !isRunning ? "not-allowed" : "pointer",
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTime(0);
            setOxygenLevel(100);
            setCo2Level(0);
          }}
          style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer" }}
        >
          Reset
        </button>
      </section>

      <section style={{ display: "flex", justifyContent: "space-around", marginTop: 30 }}>
        {/* Timer */}
        <div style={{ textAlign: "center" }}>
          <h3>Elapsed Time</h3>
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "#2e7d32",
              fontFamily: "Courier New, monospace",
            }}
          >
            {formatTime(time)}
          </div>
        </div>

        {/* Germination Stage */}
        <div style={{ maxWidth: 300, textAlign: "center" }}>
          <h3>Germination Stage</h3>
          <p
            style={{
              fontSize: 18,
              padding: "10px",
              border: "2px solid #4caf50",
              borderRadius: 8,
              backgroundColor: "#e8f5e9",
            }}
          >
            {getGerminationStage()}
          </p>
        </div>
      </section>

      <section
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-around",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {/* Oxygen Meter */}
        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          <h3>Oxygen Level</h3>
          <div
            style={{
              height: 200,
              width: 100,
              border: "2px solid #2196f3",
              borderRadius: 20,
              position: "relative",
              backgroundColor: "#bbdefb",
              margin: "auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: `${oxygenLevel}%`,
                backgroundColor: "#0d47a1",
                borderRadius: "0 0 18px 18px",
                transition: "height 1s ease-out",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                color: "#0d47a1",
                fontSize: 24,
                userSelect: "none",
                transform: "translateY(-50%)",
              }}
            >
              {oxygenLevel.toFixed(0)}%
            </div>
          </div>
          <small>O₂ consumed by germinating seeds</small>
        </div>

        {/* CO2 Meter */}
        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          <h3>Carbon Dioxide Level</h3>
          <div
            style={{
              height: 200,
              width: 100,
              border: "2px solid #f44336",
              borderRadius: 20,
              position: "relative",
              backgroundColor: "#ffcdd2",
              margin: "auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: `${co2Level}%`,
                backgroundColor: "#b71c1c",
                borderRadius: "0 0 18px 18px",
                transition: "height 1s ease-out",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                color: "#b71c1c",
                fontSize: 24,
                userSelect: "none",
                transform: "translateY(-50%)",
              }}
            >
              {co2Level.toFixed(0)}%
            </div>
          </div>
          <small>CO₂ produced by germinating seeds</small>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>About the Experiment</h2>
        <p>
          This digital simulation models the process of respiration in germinating seeds.
          As seeds germinate, they consume oxygen and release carbon dioxide.
          The oxygen meter shows the decreasing oxygen level, while the carbon dioxide meter
          shows the increase in CO₂ concentration.
          The timer tracks elapsed time, and the germination stage changes accordingly.
        </p>
      </section>

      <nav
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          fontWeight: "bold",
        }}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/biology">Biology Labs</NavLink>
        <NavLink to="/respiration">Respiration Lab</NavLink>
      </nav>
    </div>
  );
};

export default Respiration;
