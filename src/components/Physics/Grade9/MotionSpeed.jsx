import React, { useState, useEffect, useRef } from "react";

const speedUnits = {
  mps: { label: "Meters/second (m/s)", factor: 1 },
  kmph: { label: "Kilometers/hour (km/h)", factor: 3.6 },
  mph: { label: "Miles/hour (mph)", factor: 2.23694 },
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  const ms = Math.floor((seconds * 100) % 100)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}:${ms}`;
};

const MotionSpeed = () => {
  const [distance, setDistance] = useState(100); // meters

  // Stopwatch timer state
  const [time, setTime] = useState(0); // seconds as float
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const [speedUnit, setSpeedUnit] = useState("mps");

  // Start/Stop timer logic
  useEffect(() => {
    if (running) {
      const startTime = Date.now() - time * 1000;
      timerRef.current = setInterval(() => {
        setTime((Date.now() - startTime) / 1000);
      }, 30);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  // Reset timer function
  const resetTimer = () => {
    setRunning(false);
    setTime(0);
  };

  // Calculate speed in m/s
  const speedMps = time > 0 ? distance / time : 0;

  // Converted speed
  const speedConverted = (speedMps * speedUnits[speedUnit].factor).toFixed(2);

  // Animation control
  const [animPosition, setAnimPosition] = useState(0);
  const requestRef = useRef();

  // Animate object movement along 400px track width
  const trackWidth = 400;

  // Update animation frame
  const animate = () => {
    setAnimPosition((prev) => {
      const maxDistance = 200; // max distance for full track
      // Use speedMps for px/frame with scale factor for smoothness
      const speedPxPerFrame = (speedMps / maxDistance) * trackWidth * 0.05;
      let nextPos = prev + speedPxPerFrame;
      if (nextPos > trackWidth) nextPos = 0; // loop back
      return nextPos;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speedMps]);

  const buttonStyle = (active) => ({
    margin: "0 8px",
    padding: "8px 14px",
    fontSize: 16,
    borderRadius: 6,
    border: active ? "2.5px solid #1976d2" : "1.5px solid #999",
    backgroundColor: active ? "#1976d2" : "#f0f0f0",
    color: active ? "white" : "#333",
    cursor: "pointer",
    fontWeight: active ? "700" : "500",
    transition: "all 0.3s",
  });

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0d47a1" }}>
        MotionSpeed Lab Ethiopia
      </h1>

      <div style={{ marginBottom: 30 }}>
        <label
          style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          htmlFor="distanceSlider"
        >
          Distance (meters): {distance} m
        </label>
        <input
          id="distanceSlider"
          type="range"
          min={0}
          max={200}
          step={1}
          value={distance}
          onChange={(e) => setDistance(parseInt(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <div
        style={{
          marginBottom: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          fontWeight: 700,
          fontSize: 24,
          fontFamily: "'Courier New', Courier, monospace",
          userSelect: "none",
        }}
      >
        <div
          aria-label="Stopwatch timer"
          style={{
            backgroundColor: "#e3f2fd",
            borderRadius: 10,
            padding: "10px 20px",
            border: "3px solid #1976d2",
            minWidth: 140,
            textAlign: "center",
          }}
        >
          {formatTime(time)}
        </div>

        <button
          onClick={() => setRunning(!running)}
          style={{
            padding: "10px 16px",
            fontSize: 18,
            backgroundColor: running ? "#d32f2f" : "#388e3c",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            minWidth: 80,
            transition: "background-color 0.3s",
          }}
          aria-pressed={running}
        >
          {running ? "Stop" : "Start"}
        </button>

        <button
          onClick={resetTimer}
          style={{
            padding: "10px 16px",
            fontSize: 18,
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            minWidth: 80,
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <span style={{ fontWeight: 600, marginRight: 12 }}>Speed unit:</span>
        {Object.entries(speedUnits).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setSpeedUnit(key)}
            style={buttonStyle(speedUnit === key)}
          >
            {val.label}
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          marginBottom: 40,
          fontSize: 26,
          fontWeight: "700",
          color: "#0d47a1",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        Speed: {speedConverted} {speedUnits[speedUnit].label.split(" ")[1]}
      </div>

      {/* Track animation */}
      <div
        style={{
          width: trackWidth,
          height: 60,
          border: "3px solid #1976d2",
          borderRadius: 30,
          margin: "40px auto",
          position: "relative",
          backgroundColor: "#e3f2fd",
        }}
        aria-label="Motion track"
      >
        <div
          style={{
            position: "absolute",
            top: 7,
            left: animPosition,
            width: 46,
            height: 46,
            backgroundColor: "#1565c0",
            borderRadius: "50%",
            boxShadow: "0 0 10px #0d47a1",
            transition: "left 0.05s linear",
          }}
          aria-label="Moving object"
        />
      </div>

      {/* Tips */}
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          backgroundColor: "#dbe9fc",
          borderRadius: 12,
          padding: 20,
          fontSize: 15,
          lineHeight: 1.6,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginTop: 20,
        }}
      >
        <h3>Lab Tips:</h3>
        <ul>
          <li>Use the stopwatch to measure time in real time.</li>
          <li>Adjust the distance slider to set the distance traveled.</li>
          <li>The speed updates live based on your input and timer.</li>
          <li>The blue ball moves along the track according to calculated speed.</li>
          <li>Choose your preferred speed unit to visualize speed better.</li>
        </ul>
      </div>
    </div>
  );
};

export default MotionSpeed;
