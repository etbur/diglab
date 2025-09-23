import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const CombustionLab = () => {
  // Experiment states
  const [experimentPhase, setExperimentPhase] = useState("setup"); // setup, running, results
  const [selectedFuel, setSelectedFuel] = useState("methane");
  const [oxygenPercent, setOxygenPercent] = useState(21);
  const [temperature, setTemperature] = useState(25);
  const [ignitionTime, setIgnitionTime] = useState(3);
  const [reactionProgress, setReactionProgress] = useState(0);
  const [flameIntensity, setFlameIntensity] = useState(0);
  const [showEquation, setShowEquation] = useState(false);
  const [safetyChecklist, setSafetyChecklist] = useState({
    goggles: false,
    ventilation: false,
    equipment: false
  });

  // Results data
  const [experimentResults, setExperimentResults] = useState(null);
  const [reactionComplete, setReactionComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Available fuels with properties
  const fuels = {
    methane: {
      name: "Methane (CH₄)",
      color: "#4FC3F7",
      equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
      energy: 890,
      products: ["CO₂", "H₂O"]
    },
    propane: {
      name: "Propane (C₃H₈)",
      color: "#FFB74D",
      equation: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
      energy: 2220,
      products: ["CO₂", "H₂O"]
    },
    ethanol: {
      name: "Ethanol (C₂H₅OH)",
      color: "#81C784",
      equation: "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O",
      energy: 1367,
      products: ["CO₂", "H₂O"]
    },
    diesel: {
      name: "Diesel (C₁₂H₂₃)",
      color: "#E57373",
      equation: "2C₁₂H₂₃ + 37O₂ → 24CO₂ + 26H₂O",
      energy: 10800,
      products: ["CO₂", "H₂O", "SO₂"]
    }
  };

  // Reset experiment
  const resetExperiment = () => {
    setExperimentPhase("setup");
    setReactionProgress(0);
    setFlameIntensity(0);
    setExperimentResults(null);
    setReactionComplete(false);
    setErrorMessage("");
  };

  // Start the experiment
  const startExperiment = () => {
    if (!safetyChecklist.goggles || !safetyChecklist.ventilation || !safetyChecklist.equipment) {
      setErrorMessage("Please complete all safety checks before starting!");
      return;
    }
    setExperimentPhase("running");
    setErrorMessage("");
  };

  // Handle ignition
  const ignite = () => {
    if (oxygenPercent < 15) {
      setErrorMessage("Oxygen level too low for combustion!");
      return;
    }

    if (temperature < 100 && selectedFuel !== "ethanol") {
      setErrorMessage("Temperature too low for ignition!");
      return;
    }

    setErrorMessage("");
    setReactionProgress(0);
    setFlameIntensity(0);

    // Simulate reaction progress
    const interval = setInterval(() => {
      setReactionProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setReactionComplete(true);
          calculateResults();
          return 100;
        }
        
        // Adjust flame intensity based on progress
        if (newProgress < 20) {
          setFlameIntensity(newProgress * 2); // Ramp up
        } else if (newProgress > 80) {
          setFlameIntensity((100 - newProgress) * 2); // Ramp down
        } else {
          setFlameIntensity(40 + (oxygenPercent - 20)); // Steady based on oxygen
        }
        
        return newProgress;
      });
    }, ignitionTime * 10);
  };

  // Calculate final results
  const calculateResults = () => {
    const fuel = fuels[selectedFuel];
    const efficiency = Math.min(98, 
      70 + 
      (oxygenPercent - 15) + 
      (temperature > 150 ? 15 : temperature > 100 ? 5 : 0) -
      (selectedFuel === "diesel" ? 10 : 0)
    );

    const incomplete = oxygenPercent < 18 || temperature < 150;
    const byproducts = [
      ...fuel.products,
      ...(incomplete ? ["CO"] : []),
      ...(selectedFuel === "diesel" ? ["NOx"] : [])
    ];

    setExperimentResults({
      efficiency,
      byproducts,
      energyOutput: (fuel.energy * efficiency / 100).toFixed(2),
      complete: !incomplete,
      equation: fuel.equation
    });
    setExperimentPhase("results");
  };

  // Render flame animation
  const renderFlame = () => {
    if (flameIntensity <= 0) return null;

    const flameHeight = 50 + (flameIntensity * 2);
    const flameWidth = 30 + flameIntensity;
    const glowSize = flameIntensity * 0.5;

    return (
      <div className="flame-container">
        <div 
          className="flame"
          style={{
            height: `${flameHeight}px`,
            width: `${flameWidth}px`,
            background: `linear-gradient(to top, ${fuels[selectedFuel].color}, yellow, white)`,
            boxShadow: `0 0 ${glowSize}px ${fuels[selectedFuel].color}`
          }}
        />
        <div className="burner" />
      </div>
    );
  };

  return (
    <div className="combustion-lab">
      <header>
        <h1>Combustion Reactions Laboratory</h1>
        <p className="subtitle">Interactive Digital Simulation • Addis Ababa Science Museum</p>
      </header>

      {experimentPhase === "setup" && (
        <div className="setup-phase">
          <div className="config-panel">
            <h2>Experiment Configuration</h2>
            
            <div className="control-group">
              <label>Fuel Type:</label>
              <div className="fuel-options">
                {Object.keys(fuels).map(fuelKey => (
                  <button
                    key={fuelKey}
                    className={`fuel-btn ${selectedFuel === fuelKey ? "active" : ""}`}
                    onClick={() => setSelectedFuel(fuelKey)}
                    style={{ backgroundColor: fuels[fuelKey].color }}
                  >
                    {fuels[fuelKey].name}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label>
                Oxygen Concentration: {oxygenPercent}%
                <span className={`status ${oxygenPercent < 15 ? "danger" : oxygenPercent < 18 ? "warning" : "good"}`}>
                  {oxygenPercent < 15 ? " (Too low)" : oxygenPercent < 18 ? " (Marginal)" : " (Good)"}
                </span>
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={oxygenPercent}
                onChange={(e) => setOxygenPercent(parseInt(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>
                Initial Temperature: {temperature}°C
                <span className={`status ${temperature < 100 ? "danger" : temperature < 150 ? "warning" : "good"}`}>
                  {temperature < 100 ? " (Too low)" : temperature < 150 ? " (Marginal)" : " (Good)"}
                </span>
              </label>
              <input
                type="range"
                min="25"
                max="500"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Ignition Duration: {ignitionTime} seconds</label>
              <input
                type="range"
                min="1"
                max="10"
                value={ignitionTime}
                onChange={(e) => setIgnitionTime(parseInt(e.target.value))}
              />
            </div>

            <div className="safety-checks">
              <h3>Safety Checklist</h3>
              {Object.keys(safetyChecklist).map(item => (
                <label key={item} className="safety-item">
                  <input
                    type="checkbox"
                    checked={safetyChecklist[item]}
                    onChange={() => setSafetyChecklist(prev => ({
                      ...prev,
                      [item]: !prev[item]
                    }))}
                  />
                  {item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
              ))}
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button className="start-btn" onClick={startExperiment}>
              Begin Experiment
            </button>
          </div>

          <div className="preview-panel">
            <h3>Experiment Preview</h3>
            <div className="combustion-chamber-preview">
              <p>Selected Fuel: <strong>{fuels[selectedFuel].name}</strong></p>
              <p>Oxygen: <strong>{oxygenPercent}%</strong></p>
              <p>Temperature: <strong>{temperature}°C</strong></p>
              
              <button onClick={() => setShowEquation(!showEquation)}>
                {showEquation ? "Hide Equation" : "Show Chemical Equation"}
              </button>
              
              {showEquation && (
                <div className="chemical-equation">
                  <p>{fuels[selectedFuel].equation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {experimentPhase === "running" && (
        <div className="experiment-phase">
          <div className="combustion-chamber">
            <h2>Combustion Chamber</h2>
            <div className="chamber-display">
              <div className="status-info">
                <p>Reaction Progress: <strong>{reactionProgress}%</strong></p>
                <p>Flame Intensity: <strong>{flameIntensity.toFixed(1)}</strong></p>
                <p>Current Temp: <strong>{(temperature + (flameIntensity * 3)).toFixed(1)}°C</strong></p>
              </div>
              
              {renderFlame()}
              
              <div className="controls">
                {reactionProgress === 0 ? (
                  <button className="ignite-btn" onClick={ignite}>
                    Ignite Reaction
                  </button>
                ) : reactionProgress < 100 ? (
                  <div className="reaction-progress">
                    <progress value={reactionProgress} max="100" />
                    <p>Reaction in progress...</p>
                  </div>
                ) : null}
                
                <button className="reset-btn" onClick={resetExperiment}>
                  Abort Experiment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {experimentPhase === "results" && (
        <div className="results-phase">
          <h2>Experiment Results</h2>
          
          <div className="results-summary">
            <div className="result-card efficiency">
              <h3>Combustion Efficiency</h3>
              <p className="value">{experimentResults.efficiency}%</p>
              <p className={`rating ${
                experimentResults.efficiency > 90 ? "excellent" :
                experimentResults.efficiency > 75 ? "good" :
                experimentResults.efficiency > 50 ? "fair" : "poor"
              }`}>
                {experimentResults.efficiency > 90 ? "Excellent" :
                 experimentResults.efficiency > 75 ? "Good" :
                 experimentResults.efficiency > 50 ? "Fair" : "Poor"}
              </p>
            </div>
            
            <div className="result-card products">
              <h3>Byproducts</h3>
              <ul>
                {experimentResults.byproducts.map((product, i) => (
                  <li key={i}>{product}</li>
                ))}
              </ul>
              <p className={`completeness ${experimentResults.complete ? "complete" : "incomplete"}`}>
                {experimentResults.complete ? "Complete Combustion" : "Incomplete Combustion"}
              </p>
            </div>
            
            <div className="result-card energy">
              <h3>Energy Output</h3>
              <p className="value">{experimentResults.energyOutput} kJ/mol</p>
              <p className="equation">{experimentResults.equation}</p>
            </div>
          </div>
          
          <div className="analysis">
            <h3>Analysis</h3>
            {oxygenPercent < 18 && (
              <p className="warning">Low oxygen levels led to incomplete combustion and CO production.</p>
            )}
            {temperature < 150 && selectedFuel !== "ethanol" && (
              <p className="warning">Low initial temperature affected reaction efficiency.</p>
            )}
            {selectedFuel === "diesel" && (
              <p className="info">Diesel combustion typically produces more pollutants like NOx and SO₂.</p>
            )}
            {experimentResults.complete && (
              <p className="success">Ideal conditions achieved complete combustion!</p>
            )}
          </div>
          
          <button className="new-experiment-btn" onClick={resetExperiment}>
            Conduct New Experiment
          </button>
        </div>
      )}

      <style jsx>{`
        .combustion-lab {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        
        header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        h1 {
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .subtitle {
          color: #7f8c8d;
          font-style: italic;
          margin-top: 0;
        }
        
        .setup-phase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .config-panel, .preview-panel {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .control-group {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        input[type="range"] {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: #ddd;
          outline: none;
        }
        
        .fuel-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .fuel-btn {
          border: none;
          padding: 10px;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .fuel-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }
        
        .fuel-btn.active {
          transform: translateY(-2px);
          box-shadow: 0 0 0 3px #2c3e50;
        }
        
        .status {
          margin-left: 10px;
          font-weight: normal;
        }
        
        .status.danger {
          color: #e74c3c;
        }
        
        .status.warning {
          color: #f39c12;
        }
        
        .status.good {
          color: #27ae60;
        }
        
        .safety-checks {
          margin: 25px 0;
          padding: 15px;
          background: #ecf0f1;
          border-radius: 5px;
        }
        
        .safety-item {
          display: block;
          margin: 10px 0;
          cursor: pointer;
        }
        
        .error-message {
          color: #e74c3c;
          background: #fadbd8;
          padding: 10px;
          border-radius: 5px;
          margin: 15px 0;
        }
        
        .start-btn {
          background: #27ae60;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .start-btn:hover {
          background: #2ecc71;
        }
        
        .combustion-chamber {
          background: #34495e;
          color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        
        .chamber-display {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .flame-container {
          margin: 20px auto;
          position: relative;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .flame {
          border-radius: 50% 50% 20% 20%;
          filter: blur(5px);
          animation: flicker 0.5s infinite alternate;
          z-index: 2;
        }
        
        .burner {
          width: 60px;
          height: 15px;
          background: #7f8c8d;
          border-radius: 0 0 5px 5px;
          margin-top: -10px;
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        
        .ignite-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .ignite-btn:hover {
          background: #c0392b;
        }
        
        .reset-btn {
          background: #7f8c8d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-left: 15px;
          cursor: pointer;
        }
        
        .results-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 30px 0;
        }
        
        .result-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        
        .result-card h3 {
          color: #2c3e50;
          margin-top: 0;
        }
        
        .value {
          font-size: 24px;
          font-weight: bold;
          margin: 15px 0;
        }
        
        .rating.excellent {
          color: #27ae60;
        }
        
        .rating.good {
          color: #2ecc71;
        }
        
        .rating.fair {
          color: #f39c12;
        }
        
        .rating.poor {
          color: #e74c3c;
        }
        
        .completeness.complete {
          color: #27ae60;
        }
        
        .completeness.incomplete {
          color: #e74c3c;
        }
        
        .equation {
          font-family: monospace;
          font-size: 18px;
          margin-top: 15px;
        }
        
        .analysis {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        
        .analysis .warning {
          color: #e74c3c;
        }
        
        .analysis .info {
          color: #3498db;
        }
        
        .analysis .success {
          color: #27ae60;
        }
        
        .new-experiment-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .new-experiment-btn:hover {
          background: #2980b9;
        }
      `}</style>
    </div>
  );
};

export default CombustionLab;