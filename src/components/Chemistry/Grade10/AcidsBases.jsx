import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AcidsBases.css";

const AcidsBases = () => {
  // Simulation states
  const [phValue, setPhValue] = useState(7);
  const [substance, setSubstance] = useState("water");
  const [concentration, setConcentration] = useState(0.1);
  const [temperature, setTemperature] = useState(25);
  const [reactionLog, setReactionLog] = useState([]);
  const [colorIndicator, setColorIndicator] = useState("#7fdbff");
  const [isTitrating, setIsTitrating] = useState(false);
  const [titrationComplete, setTitrationComplete] = useState(false);

  // Common substances in Ethiopia
  const ethiopianSubstances = [
    { name: "water", ph: 7, color: "#7fdbff", commonUse: "Drinking, Cooking" },
    { name: "coffee", ph: 5, color: "#6F4E37", commonUse: "Traditional beverage" },
    { name: "tej", ph: 3.5, color: "#FFD700", commonUse: "Honey wine" },
    { name: "lemon juice", ph: 2, color: "#F5F5DC", commonUse: "Food flavoring" },
    { name: "enjera wash", ph: 9, color: "#D2B48C", commonUse: "Traditional food preparation" },
    { name: "soap solution", ph: 10, color: "#FFDAB9", commonUse: "Cleaning" },
    { name: "stomach acid", ph: 1.5, color: "#FF6347", commonUse: "Digestion" },
    { name: "baking soda", ph: 9, color: "#F5F5F5", commonUse: "Cooking, Cleaning" }
  ];

  // Indicators with Amharic names
  const indicators = [
    { name: "Litmus", amharic: "ሊትማስ", acidColor: "red", baseColor: "blue" },
    { name: "Phenolphthalein", amharic: "ፊኖልፍታሊን", acidColor: "clear", baseColor: "pink" },
    { name: "Methyl Orange", amharic: "ሜቲል ኦራንጅ", acidColor: "red", baseColor: "yellow" },
    { name: "Universal", amharic: "አለም አቀፍ", colors: ["#FF0000","#FF3300","#FF6600","#FF9900","#FFCC00","#FFFF00","#CCFF33","#66FF33","#33CC33","#009933","#006633"] }
  ];

  const [selectedIndicator, setSelectedIndicator] = useState(indicators[0]);

  // Titration simulation
  const startTitration = () => {
    setIsTitrating(true);
    setTitrationComplete(false);
    setReactionLog([]);
    
    let currentPh = phValue;
    let dropsAdded = 0;
    const targetPh = substance === "lemon juice" ? 7 : 7; // Neutralization target
    
    const titrationInterval = setInterval(() => {
      dropsAdded++;
      currentPh = substance === "lemon juice" ? 
        Math.min(7, currentPh + 0.2) : 
        Math.max(7, currentPh - 0.2);
      
      setPhValue(currentPh);
      
      // Log reaction
      const logEntry = {
        time: new Date().toLocaleTimeString(),
        action: `Added drop ${dropsAdded}`,
        ph: currentPh.toFixed(2)
      };
      setReactionLog(prev => [logEntry, ...prev.slice(0, 9)]);
      
      // Check for completion
      if (Math.abs(currentPh - targetPh) < 0.1) {
        clearInterval(titrationInterval);
        setIsTitrating(false);
        setTitrationComplete(true);
        setReactionLog(prev => [{
          time: new Date().toLocaleTimeString(),
          action: "Titration complete! Neutralization achieved",
          ph: currentPh.toFixed(2)
        }, ...prev]);
      }
    }, 800);

    return () => clearInterval(titrationInterval);
  };

  // Update color based on pH
  useEffect(() => {
    const currentSubstance = ethiopianSubstances.find(s => s.name === substance);
    if (currentSubstance) {
      setPhValue(currentSubstance.ph);
      setColorIndicator(currentSubstance.color);
    }

    // Update indicator color
    if (selectedIndicator.name === "Universal") {
      const phIndex = Math.min(Math.max(Math.floor(phValue * 0.9), 0), 10);
      setColorIndicator(selectedIndicator.colors[phIndex]);
    } else {
      setColorIndicator(phValue < 7 ? selectedIndicator.acidColor : selectedIndicator.baseColor);
    }
  }, [phValue, substance, selectedIndicator]);

  // Reset experiment
  const resetExperiment = () => {
    setPhValue(7);
    setSubstance("water");
    setConcentration(0.1);
    setReactionLog([]);
    setTitrationComplete(false);
  };

  // Calculate properties
  const isAcidic = phValue < 7;
  const isBasic = phValue > 7;
  const isNeutral = phValue === 7;
  const hydrogenIonConcentration = Math.pow(10, -phValue).toExponential(2);
  const hydroxideIonConcentration = Math.pow(10, -(14 - phValue)).toExponential(2);

  return (
    <div className="acids-bases-lab">
      <header>
        <h1>Acids and Bases Lab Ethiopia</h1>
        <p>Interactive simulation of pH and chemical properties</p>
      </header>

      <div className="lab-container">
        <div className="simulation-area">
          <div className="ph-meter">
            <h3>pH Measurement</h3>
            <div className="ph-scale">
              <div className="ph-indicator" style={{ 
                backgroundColor: colorIndicator,
                left: `${(phValue / 14) * 100}%`
              }}></div>
              <div className="ph-labels">
                {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(num => (
                  <span key={num} className={num === 7 ? "neutral" : num < 7 ? "acid" : "base"}>
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <div className="ph-value-display">
              Current pH: <strong>{phValue.toFixed(1)}</strong>
              <span className={`ph-status ${isAcidic ? "acid" : isBasic ? "base" : "neutral"}`}>
                {isAcidic ? "Acidic" : isBasic ? "Basic" : "Neutral"}
              </span>
            </div>
          </div>

          <div className="beaker-visualization">
            <div className="beaker" style={{ backgroundColor: colorIndicator }}>
              <div className="substance-info">
                {ethiopianSubstances.find(s => s.name === substance)?.name || substance}
              </div>
              <div className="bubbles">
                {Array.from({ length: isAcidic ? 10 : isBasic ? 5 : 7 }).map((_, i) => (
                  <div key={i} className="bubble" style={{
                    left: `${10 + (i * 8)}%`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="control-panel">
          <div className="substance-selector">
            <h3>Common Ethiopian Substances</h3>
            <div className="substance-grid">
              {ethiopianSubstances.map(sub => (
                <button
                  key={sub.name}
                  onClick={() => setSubstance(sub.name)}
                  className={substance === sub.name ? "active" : ""}
                  style={{ backgroundColor: sub.color }}
                >
                  {sub.name}
                  <span>pH {sub.ph}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="indicator-selector">
            <h3>pH Indicators {selectedIndicator.amharic && `(${selectedIndicator.amharic})`}</h3>
            <div className="indicator-buttons">
              {indicators.map(ind => (
                <button
                  key={ind.name}
                  onClick={() => setSelectedIndicator(ind)}
                  className={selectedIndicator.name === ind.name ? "active" : ""}
                >
                  {ind.name}
                </button>
              ))}
            </div>
          </div>

          <div className="experiment-controls">
            <h3>Experiment Controls</h3>
            <div className="slider-control">
              <label>Concentration: {concentration}M</label>
              <input
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={concentration}
                onChange={(e) => setConcentration(parseFloat(e.target.value))}
              />
            </div>
            <div className="slider-control">
              <label>Temperature: {temperature}°C</label>
              <input
                type="range"
                min="0"
                max="100"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
              />
            </div>
            <div className="action-buttons">
              <button 
                onClick={startTitration} 
                disabled={isTitrating}
                className={isTitrating ? "titrating" : ""}
              >
                {isTitrating ? "Titrating..." : "Start Titration"}
              </button>
              <button onClick={resetExperiment}>Reset</button>
            </div>
          </div>
        </div>

        <div className="data-panel">
          <div className="chemical-properties">
            <h3>Chemical Properties</h3>
            <table>
              <tbody>
                <tr>
                  <td>Hydrogen Ion Concentration [H⁺]:</td>
                  <td>{hydrogenIonConcentration} mol/L</td>
                </tr>
                <tr>
                  <td>Hydroxide Ion Concentration [OH⁻]:</td>
                  <td>{hydroxideIonConcentration} mol/L</td>
                </tr>
                <tr>
                  <td>pOH:</td>
                  <td>{(14 - phValue).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Common Uses:</td>
                  <td>{ethiopianSubstances.find(s => s.name === substance)?.commonUse || "Various"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="reaction-log">
            <h3>Reaction Log</h3>
            {reactionLog.length > 0 ? (
              <div className="log-entries">
                {reactionLog.map((entry, index) => (
                  <div key={index} className="log-entry">
                    <span className="time">[{entry.time}]</span>
                    <span className="action">{entry.action}</span>
                    <span className="ph">pH: {entry.ph}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reactions yet. Start experimenting!</p>
            )}
            {titrationComplete && (
              <div className="success-message">
                Neutralization achieved! The solution is now pH {phValue.toFixed(1)}
              </div>
            )}
          </div>
        </div>

        <div className="learning-resources">
          <h3>Acids and Bases Learning Resources</h3>
          <div className="resource-grid">
            <NavLink to="/ph-scale" className="resource-card">
              <h4>Understanding pH Scale</h4>
              <p>Learn about acidity and alkalinity</p>
            </NavLink>
            <NavLink to="/ethiopian-substances" className="resource-card">
              <h4>Common Ethiopian Substances</h4>
              <p>pH values of local materials</p>
            </NavLink>
            <NavLink to="/titration-methods" className="resource-card">
              <h4>Titration Techniques</h4>
              <p>Neutralization experiments</p>
            </NavLink>
            <NavLink to="/chemical-indicators" className="resource-card">
              <h4>pH Indicators</h4>
              <p>Visual detection methods</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcidsBases;