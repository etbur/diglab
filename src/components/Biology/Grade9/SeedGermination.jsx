import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const SeedGermination = () => {
  const [time, setTime] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Germination stages with images (simple shapes, no external images)
  const stages = [
    { label: "Dry Seed", color: "#a67c00", description: "Seed before water absorption" },
    { label: "Imbibition", color: "#4caf50", description: "Seed absorbs water, swells" },
    { label: "Radicle Emergence", color: "#388e3c", description: "Root begins to grow" },
    { label: "Hypocotyl Growth", color: "#2e7d32", description: "Stem grows upwards" },
    { label: "Cotyledon Expansion", color: "#1b5e20", description: "First leaves open" },
    { label: "Seedling", color: "#0d3c10", description: "Seedling growing strong" },
  ];

  // Update time when running
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((t) => (t < 50 ? t + 1 : t));
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Determine current stage based on time
  const currentStageIndex = Math.min(Math.floor(time / 10), stages.length - 1);
  const currentStage = stages[currentStageIndex];

  // Format time mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Seed Germination Lab Ethiopia</h1>

      <section style={{ textAlign: "center", marginBottom: 20 }}>
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
          Start
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
          }}
          style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer" }}
        >
          Reset
        </button>
      </section>

      <section style={{ textAlign: "center", marginBottom: 30 }}>
        <div
          style={{
            width: 200,
            height: 300,
            margin: "auto",
            backgroundColor: currentStage.color,
            borderRadius: "50% 50% 45% 45% / 70% 70% 30% 30%",
            position: "relative",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {/* Simple seedling illustration */}
          {currentStageIndex >= 2 && (
            <>
              {/* Radicle */}
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  width: 8,
                  height: 60,
                  backgroundColor: "#654321",
                  borderRadius: 4,
                  transform: "translateX(-50%)",
                }}
              />
            </>
          )}
          {currentStageIndex >= 3 && (
            <>
              {/* Hypocotyl */}
              <div
                style={{
                  position: "absolute",
                  bottom: 70,
                  left: "50%",
                  width: 10,
                  height: 80,
                  backgroundColor: "#2e7d32",
                  borderRadius: 5,
                  transform: "translateX(-50%)",
                }}
              />
            </>
          )}
          {currentStageIndex >= 4 && (
            <>
              {/* Cotyledon leaves */}
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  left: "50%",
                  width: 60,
                  height: 40,
                  backgroundColor: "#4caf50",
                  borderRadius: "50% 50% 50% 50%",
                  transform: "translateX(-50%) rotate(15deg)",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  left: "50%",
                  width: 60,
                  height: 40,
                  backgroundColor: "#4caf50",
                  borderRadius: "50% 50% 50% 50%",
                  transform: "translateX(-50%) rotate(-15deg)",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                }}
              />
            </>
          )}
        </div>
        <h2 style={{ marginTop: 20 }}>{currentStage.label}</h2>
        <p style={{ maxWidth: 400, margin: "auto", fontSize: 16, color: "#555" }}>{currentStage.description}</p>
      </section>

      <section style={{ textAlign: "center", marginBottom: 30 }}>
        <h3>Elapsed Time: {formatTime(time)}</h3>
      </section>

      <section>
        <h2>Instructions</h2>
        <ol>
          <li>Click <b>Start</b> to begin seed germination simulation.</li>
          <li>Observe changes in seed stages every 10 seconds.</li>
          <li>Use Pause to halt, and Reset to start over.</li>
        </ol>
      </section>

    </div>
  );
};

export default SeedGermination;
