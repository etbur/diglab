// src/components/AcidsBases.js
import React, { useState } from "react";
import "./style/AcidsBases.css"; // Optional: styling

const pHValues = {
  HCl: 1,
  H2SO4: 1,
  CH3COOH: 4,
  NaOH: 13,
  NH3: 11,
  Water: 7,
};

const getIndicatorColor = (pH, indicator) => {
  if (indicator === "litmus") {
    return pH < 7 ? "red" : pH > 7 ? "blue" : "purple";
  } else if (indicator === "phenolphthalein") {
    return pH > 8 ? "pink" : "colorless";
  } else {
    return "unknown";
  }
};

const AcidsBases = () => {
  const [substanceA, setSubstanceA] = useState("");
  const [substanceB, setSubstanceB] = useState("");
  const [indicator, setIndicator] = useState("litmus");
  const [pH, setPH] = useState(null);
  const [color, setColor] = useState("");

  const handleMix = () => {
    if (!substanceA || !substanceB) return;

    const pH_A = pHValues[substanceA];
    const pH_B = pHValues[substanceB];
    const mixedPH = Math.round((pH_A + pH_B) / 2);

    setPH(mixedPH);
    setColor(getIndicatorColor(mixedPH, indicator));
  };

  const handleReset = () => {
    setSubstanceA("");
    setSubstanceB("");
    setPH(null);
    setColor("");
  };

  return (
    <div className="lab-container">
      <h1>Acids and Bases Lab - Ethiopia</h1>

      <div className="selectors">
        <div>
          <label>Substance A:</label>
          <select value={substanceA} onChange={(e) => setSubstanceA(e.target.value)}>
            <option value="">--Select--</option>
            <option value="HCl">HCl (Strong Acid)</option>
            <option value="H2SO4">H₂SO₄ (Strong Acid)</option>
            <option value="CH3COOH">CH₃COOH (Weak Acid)</option>
            <option value="NaOH">NaOH (Strong Base)</option>
            <option value="NH3">NH₃ (Weak Base)</option>
            <option value="Water">Water</option>
          </select>
        </div>

        <div>
          <label>Substance B:</label>
          <select value={substanceB} onChange={(e) => setSubstanceB(e.target.value)}>
            <option value="">--Select--</option>
            <option value="HCl">HCl (Strong Acid)</option>
            <option value="H2SO4">H₂SO₄ (Strong Acid)</option>
            <option value="CH3COOH">CH₃COOH (Weak Acid)</option>
            <option value="NaOH">NaOH (Strong Base)</option>
            <option value="NH3">NH₃ (Weak Base)</option>
            <option value="Water">Water</option>
          </select>
        </div>

        <div>
          <label>Indicator:</label>
          <select value={indicator} onChange={(e) => setIndicator(e.target.value)}>
            <option value="litmus">Litmus</option>
            <option value="phenolphthalein">Phenolphthalein</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <button onClick={handleMix}>Mix</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {pH !== null && (
        <div className="result">
          <p><strong>pH:</strong> {pH}</p>
          <p><strong>Indicator Color:</strong> <span style={{ color: color }}>{color}</span></p>
        </div>
      )}
    </div>
  );
};

export default AcidsBases;
