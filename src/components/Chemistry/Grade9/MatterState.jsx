import React, { useState, useEffect } from "react";

const MatterStateAdvanced = () => {
  // Temperature (°C)
  const [temp, setTemp] = useState(25);
  // Pressure (atm)
  const [pressure, setPressure] = useState(1);

  // Phase state
  const [phase, setPhase] = useState("liquid");

  /*
    Simplified model:
    - Melting point (mp) changes with pressure: approx linear shift
    - Boiling point (bp) changes with pressure: simplified Clausius-Clapeyron approx
  */
  const meltingPoint = 0 + 0.5 * (pressure - 1); // melting point increases 0.5°C per atm above 1 atm
  const boilingPoint = 100 + 20 * Math.log2(pressure); // boiling point increases approx 20°C per doubling atm

  useEffect(() => {
    if (temp < meltingPoint) setPhase("solid");
    else if (temp >= meltingPoint && temp < boilingPoint) setPhase("liquid");
    else setPhase("gas");
  }, [temp, pressure, meltingPoint, boilingPoint]);

  const phaseColors = {
    solid: "#90caf9",
    liquid: "#64b5f6",
    gas: "#ffcc80",
  };

  const phaseEmojis = {
    solid: "🧊 Solid",
    liquid: "💧 Liquid",
    gas: "💨 Gas",
  };

  return (
    <div style={styles.container}>
      <h1>🌡️ Real-Time Phase Transitions & Factors Affecting States</h1>

      <div style={{ ...styles.phaseBox, backgroundColor: phaseColors[phase] }}>
        <h2>{phaseEmojis[phase]}</h2>
        <p>Temperature: <strong>{temp.toFixed(1)}°C</strong></p>
        <p>Pressure: <strong>{pressure.toFixed(2)} atm</strong></p>
        <p style={{ fontSize: 14, fontStyle: "italic", marginTop: -10 }}>
          Melting Point: {meltingPoint.toFixed(1)}°C | Boiling Point: {boilingPoint.toFixed(1)}°C
        </p>
      </div>

      <div style={styles.sliderContainer}>
        <label>
          Temperature (°C): {temp.toFixed(1)}
          <input
            type="range"
            min={-50}
            max={150}
            step={0.1}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            style={styles.slider}
          />
        </label>
      </div>

      <div style={styles.sliderContainer}>
        <label>
          Pressure (atm): {pressure.toFixed(2)}
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.01}
            value={pressure}
            onChange={(e) => setPressure(Number(e.target.value))}
            style={styles.slider}
          />
        </label>
      </div>

      <div style={styles.explanationBox}>
        <h3>🔍 Explanation</h3>
        <ul>
          <li><strong>Temperature:</strong> Determines kinetic energy of particles and their phase.</li>
          <li><strong>Pressure:</strong> Increasing pressure raises melting and boiling points by pushing particles closer.</li>
          <li><strong>Phase transitions:</strong> Occur when temperature crosses melting or boiling point, affected by pressure.</li>
          <li><strong>Melting Point Shift:</strong> Here modeled as +0.5°C per atm above 1 atm.</li>
          <li><strong>Boiling Point Shift:</strong> Approximated to increase by 20°C per doubling of pressure.</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 650,
    margin: "20px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  phaseBox: {
    marginTop: 20,
    padding: 30,
    borderRadius: 15,
    color: "#fff",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    transition: "background-color 0.5s ease",
  },
  sliderContainer: {
    marginTop: 30,
    textAlign: "left",
  },
  slider: {
    width: "100%",
    marginTop: 10,
  },
  explanationBox: {
    marginTop: 40,
    backgroundColor: "#f0f4f8",
    padding: 20,
    borderRadius: 10,
    textAlign: "left",
  },
};

export default MatterStateAdvanced;
