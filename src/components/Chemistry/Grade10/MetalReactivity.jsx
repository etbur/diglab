import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const MetalReactivity = () => {
  // Experiment states
  const [experimentPhase, setExperimentPhase] = useState("setup"); // setup, running, results
  const [selectedMetal, setSelectedMetal] = useState("sodium");
  const [selectedSolution, setSelectedSolution] = useState("water");
  const [temperature, setTemperature] = useState(25);
  const [concentration, setConcentration] = useState(1);
  const [reactionProgress, setReactionProgress] = useState(0);
  const [reactionIntensity, setReactionIntensity] = useState(0);
  const [showEquation, setShowEquation] = useState(false);
  const [safetyChecklist, setSafetyChecklist] = useState({
    goggles: false,
    gloves: false,
    labCoat: false,
    ventilation: false
  });

  // Results data
  const [experimentResults, setExperimentResults] = useState(null);
  const [reactionComplete, setReactionComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Available metals with properties
  const metals = {
    sodium: {
      name: "Sodium (Na)",
      color: "#FFEB3B",
      density: 0.97,
      reactivity: 9,
      products: ["NaOH", "H₂"],
      hazards: "Highly reactive with water"
    },
    magnesium: {
      name: "Magnesium (Mg)",
      color: "#BDBDBD",
      density: 1.74,
      reactivity: 7,
      products: ["Mg(OH)₂", "H₂"],
      hazards: "Reactive with acids"
    },
    aluminum: {
      name: "Aluminum (Al)",
      color: "#E0E0E0",
      density: 2.70,
      reactivity: 5,
      products: ["Al₂O₃", "H₂"],
      hazards: "Requires strong acids/bases"
    },
    zinc: {
      name: "Zinc (Zn)",
      color: "#9E9E9E",
      density: 7.14,
      reactivity: 4,
      products: ["Zn²⁺", "H₂"],
      hazards: "Reactive with acids"
    },
    iron: {
      name: "Iron (Fe)",
      color: "#795548",
      density: 7.87,
      reactivity: 3,
      products: ["Fe²⁺", "H₂"],
      hazards: "Slow reaction with acids"
    },
    copper: {
      name: "Copper (Cu)",
      color: "#FF9800",
      density: 8.96,
      reactivity: 1,
      products: ["No reaction"],
      hazards: "Minimal reactivity"
    }
  };

  // Available solutions
  const solutions = {
    water: {
      name: "Water (H₂O)",
      reactivity: "neutral",
      equation: {
        sodium: "2Na + 2H₂O → 2NaOH + H₂",
        magnesium: "Mg + 2H₂O → Mg(OH)₂ + H₂",
        aluminum: "2Al + 3H₂O → Al₂O₃ + 3H₂",
        default: "No reaction"
      }
    },
    hcl: {
      name: "Hydrochloric Acid (HCl)",
      concentration: 1,
      reactivity: "acid",
      equation: {
        sodium: "2Na + 2HCl → 2NaCl + H₂ (DANGEROUS)",
        magnesium: "Mg + 2HCl → MgCl₂ + H₂",
        aluminum: "2Al + 6HCl → 2AlCl₃ + 3H₂",
        zinc: "Zn + 2HCl → ZnCl₂ + H₂",
        iron: "Fe + 2HCl → FeCl₂ + H₂",
        default: "No reaction"
      }
    },
    naoh: {
      name: "Sodium Hydroxide (NaOH)",
      concentration: 1,
      reactivity: "base",
      equation: {
        aluminum: "2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂",
        zinc: "Zn + 2NaOH + 2H₂O → Na₂[Zn(OH)₄] + H₂",
        default: "No reaction"
      }
    }
  };

  // Reset experiment
  const resetExperiment = () => {
    setExperimentPhase("setup");
    setReactionProgress(0);
    setReactionIntensity(0);
    setExperimentResults(null);
    setReactionComplete(false);
    setErrorMessage("");
  };

  // Start the experiment
  const startExperiment = () => {
    if (!safetyChecklist.goggles || !safetyChecklist.labCoat) {
      setErrorMessage("Essential safety gear (goggles and lab coat) required!");
      return;
    }
    
    if (selectedMetal === "sodium" && !safetyChecklist.gloves) {
      setErrorMessage("Gloves required when working with sodium!");
      return;
    }
    
    if (selectedSolution === "hcl" && concentration > 2 && !safetyChecklist.ventilation) {
      setErrorMessage("Ventilation required for concentrated acids!");
      return;
    }

    setExperimentPhase("running");
    setErrorMessage("");
  };

  // Run the reaction
  const runReaction = () => {
    const metal = metals[selectedMetal];
    const solution = solutions[selectedSolution];
    
    // Check if reaction will occur
    const willReact = solution.equation[selectedMetal] || solution.equation.default !== "No reaction";
    
    if (!willReact) {
      setExperimentResults({
        reactionOccurred: false,
        message: "No reaction observed - this combination is not reactive",
        equation: solution.equation.default
      });
      setExperimentPhase("results");
      return;
    }

    // Dangerous combinations
    if (selectedMetal === "sodium" && selectedSolution === "hcl") {
      setErrorMessage("DANGER! Sodium reacts violently with strong acids!");
      return;
    }

    setErrorMessage("");
    setReactionProgress(0);
    setReactionIntensity(0);

    // Simulate reaction progress
    const interval = setInterval(() => {
      setReactionProgress(prev => {
        const newProgress = prev + 1;
        
        // Calculate intensity based on metal reactivity and conditions
        const baseIntensity = metal.reactivity * 10;
        const tempEffect = temperature > 30 ? (temperature - 30) * 0.5 : 0;
        const concEffect = selectedSolution !== "water" ? concentration * 5 : 0;
        const currentIntensity = Math.min(100, baseIntensity + tempEffect + concEffect);
        
        setReactionIntensity(currentIntensity);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setReactionComplete(true);
          calculateResults();
          return 100;
        }
        
        return newProgress;
      });
    }, 50 - (metal.reactivity * 4)); // Faster for more reactive metals
  };

  // Calculate final results
  const calculateResults = () => {
    const metal = metals[selectedMetal];
    const solution = solutions[selectedSolution];
    const equation = solution.equation[selectedMetal] || solution.equation.default;
    
    let reactionSpeed = "";
    if (reactionIntensity > 80) reactionSpeed = "Violent reaction";
    else if (reactionIntensity > 50) reactionSpeed = "Rapid reaction";
    else if (reactionIntensity > 20) reactionSpeed = "Moderate reaction";
    else reactionSpeed = "Slow reaction";
    
    setExperimentResults({
      reactionOccurred: true,
      metal: metal.name,
      solution: solution.name,
      reactionSpeed,
      products: metal.products,
      equation,
      hazards: metal.hazards,
      intensity: reactionIntensity
    });
    setExperimentPhase("results");
  };

  // Render reaction animation
  const renderReaction = () => {
    if (reactionIntensity <= 0) return null;

    const metal = metals[selectedMetal];
    const bubbleCount = Math.floor(reactionIntensity / 10);
    const heatLevel = reactionIntensity > 50 ? Math.min(100, reactionIntensity - 50) : 0;

    return (
      <div className="reaction-container">
        {/* Metal piece */}
        <div 
          className="metal-piece"
          style={{
            backgroundColor: metal.color,
            transform: reactionIntensity > 70 ? "rotate(5deg)" : "rotate(0deg)",
            boxShadow: reactionIntensity > 80 ? `0 0 20px ${metal.color}` : "none"
          }}
        />
        
        {/* Solution */}
        <div className="solution">
          {/* Bubbles */}
          {Array.from({ length: bubbleCount }).map((_, i) => (
            <div 
              key={i}
              className="bubble"
              style={{
                left: `${10 + (i * 8)}%`,
                bottom: `${10 + (i * 3)}%`,
                animationDuration: `${1 + Math.random()}s`,
                width: `${5 + (reactionIntensity / 20)}px`,
                height: `${5 + (reactionIntensity / 20)}px`
              }}
            />
          ))}
          
          {/* Heat effect */}
          {heatLevel > 0 && (
            <div 
              className="heat-effect"
              style={{
                opacity: heatLevel / 100,
                background: `radial-gradient(circle, rgba(255,100,0,0.5) 0%, rgba(255,0,0,0) 70%)`
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="metal-reactivity-lab">
      <header>
        <h1>Metal Reactivity Series Laboratory</h1>
        <p className="subtitle">Interactive Digital Simulation • Ethiopian Science Academy</p>
      </header>

      {experimentPhase === "setup" && (
        <div className="setup-phase">
          <div className="config-panel">
            <h2>Experiment Configuration</h2>
            
            <div className="control-group">
              <label>Select Metal:</label>
              <div className="metal-options">
                {Object.keys(metals).map(metalKey => (
                  <button
                    key={metalKey}
                    className={`metal-btn ${selectedMetal === metalKey ? "active" : ""}`}
                    onClick={() => setSelectedMetal(metalKey)}
                    style={{ 
                      backgroundColor: metals[metalKey].color,
                      borderColor: metals[metalKey].color
                    }}
                  >
                    {metals[metalKey].name}
                    <span className="reactivity-badge">
                      Reactivity: {metals[metalKey].reactivity}/10
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label>Select Solution:</label>
              <div className="solution-options">
                {Object.keys(solutions).map(solutionKey => (
                  <button
                    key={solutionKey}
                    className={`solution-btn ${selectedSolution === solutionKey ? "active" : ""}`}
                    onClick={() => setSelectedSolution(solutionKey)}
                  >
                    {solutions[solutionKey].name}
                  </button>
                ))}
              </div>
            </div>

            {selectedSolution !== "water" && (
              <div className="control-group">
                <label>Solution Concentration: {concentration}M</label>
                <input
                  type="range"
                  min="0.1"
                  max="6"
                  step="0.1"
                  value={concentration}
                  onChange={(e) => setConcentration(parseFloat(e.target.value))}
                />
                <span className={`warning ${concentration > 2 ? "show" : ""}`}>
                  Warning: High concentration!
                </span>
              </div>
            )}

            <div className="control-group">
              <label>Temperature: {temperature}°C</label>
              <input
                type="range"
                min="10"
                max="80"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
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
                  {item === "hcl" ? "HCl" : item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, ' $1')}
                  {item === "goggles" && " (Required)"}
                  {item === "labCoat" && " (Required)"}
                  {item === "gloves" && selectedMetal === "sodium" && " (Required)"}
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
            <div className="reaction-preview">
              <p>Selected Metal: <strong>{metals[selectedMetal].name}</strong></p>
              <p>Selected Solution: <strong>{solutions[selectedSolution].name}</strong></p>
              {selectedSolution !== "water" && (
                <p>Concentration: <strong>{concentration}M</strong></p>
              )}
              <p>Temperature: <strong>{temperature}°C</strong></p>
              
              <div className="hazard-info">
                <h4>Hazard Information:</h4>
                <p>{metals[selectedMetal].hazards}</p>
                {selectedSolution === "hcl" && concentration > 2 && (
                  <p className="warning">Concentrated acid - handle with care!</p>
                )}
                {selectedSolution === "naoh" && (
                  <p>Strong base - can cause burns</p>
                )}
              </div>
              
              <button onClick={() => setShowEquation(!showEquation)}>
                {showEquation ? "Hide Equation" : "Show Predicted Reaction"}
              </button>
              
              {showEquation && (
                <div className="chemical-equation">
                  <p>{solutions[selectedSolution].equation[selectedMetal] || 
                      solutions[selectedSolution].equation.default}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {experimentPhase === "running" && (
        <div className="experiment-phase">
          <div className="reaction-chamber">
            <h2>Reaction Chamber</h2>
            <div className="chamber-display">
              <div className="status-info">
                <p>Reaction Progress: <strong>{reactionProgress}%</strong></p>
                <p>Reaction Intensity: <strong>{reactionIntensity.toFixed(1)}</strong></p>
                <p>Current Temp: <strong>{(temperature + (reactionIntensity / 2)).toFixed(1)}°C</strong></p>
              </div>
              
              {renderReaction()}
              
              <div className="controls">
                {reactionProgress === 0 ? (
                  <button className="run-btn" onClick={runReaction}>
                    Start Reaction
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
            <div className="result-card reaction-occurred">
              <h3>Reaction Occurred</h3>
              <p className="value">
                {experimentResults.reactionOccurred ? "YES" : "NO"}
              </p>
              {experimentResults.reactionOccurred && (
                <p className="speed">
                  Speed: <span className={`${experimentResults.reactionSpeed.toLowerCase().includes("violent") ? "violent" : 
                                          experimentResults.reactionSpeed.toLowerCase().includes("rapid") ? "rapid" : 
                                          "moderate"}`}>
                    {experimentResults.reactionSpeed}
                  </span>
                </p>
              )}
            </div>
            
            <div className="result-card products">
              <h3>Products</h3>
              <ul>
                {Array.isArray(experimentResults.products) ? (
                  experimentResults.products.map((product, i) => (
                    <li key={i}>{product}</li>
                  ))
                ) : (
                  <li>{experimentResults.products}</li>
                )}
              </ul>
            </div>
            
            <div className="result-card equation">
              <h3>Chemical Equation</h3>
              <p className="equation">{experimentResults.equation}</p>
            </div>
          </div>
          
          <div className="analysis">
            <h3>Scientific Analysis</h3>
            
            {experimentResults.reactionOccurred ? (
              <>
                <p>The reaction between {metals[selectedMetal].name} and {solutions[selectedSolution].name} 
                {selectedSolution !== "water" ? ` (${concentration}M)` : ""} produced:</p>
                
                <ul>
                  {Array.isArray(experimentResults.products) ? (
                    experimentResults.products.filter(p => p !== "No reaction").map((product, i) => (
                      <li key={i}>
                        <strong>{product}</strong> - {
                          product.includes("H₂") ? "hydrogen gas" :
                          product.includes("OH") ? "hydroxide compound" :
                          product.includes("O") ? "oxide compound" :
                          "ionic compound"
                        }
                      </li>
                    ))
                  ) : null}
                </ul>
                
                <p>This reaction is characteristic of {metals[selectedMetal].name}'s position in the 
                reactivity series ({metals[selectedMetal].reactivity}/10 reactivity).</p>
                
                {experimentResults.reactionSpeed.includes("Violent") && (
                  <p className="warning">This combination produced a violent reaction due to the high 
                  reactivity of {metals[selectedMetal].name} with {solutions[selectedSolution].name}.</p>
                )}
              </>
            ) : (
              <p>No observable reaction occurred. This indicates that {metals[selectedMetal].name} is not 
              sufficiently reactive with {solutions[selectedSolution].name} under these conditions.</p>
            )}
            
            <div className="reactivity-series">
              <h4>Metal Reactivity Series Reference:</h4>
              <div className="series-list">
                {Object.keys(metals)
                  .sort((a, b) => metals[b].reactivity - metals[a].reactivity)
                  .map(metalKey => (
                    <div 
                      key={metalKey}
                      className={`series-item ${selectedMetal === metalKey ? "highlighted" : ""}`}
                      style={{ backgroundColor: metals[metalKey].color }}
                    >
                      {metals[metalKey].name} - {metals[metalKey].reactivity}/10
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
          <button className="new-experiment-btn" onClick={resetExperiment}>
            Conduct New Experiment
          </button>
        </div>
      )}

      <style jsx>{`
        .metal-reactivity-lab {
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
        
        .metal-options, .solution-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .metal-btn, .solution-btn {
          border: none;
          padding: 10px;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: left;
          position: relative;
        }
        
        .metal-btn {
          border: 2px solid;
          color: #333;
        }
        
        .solution-btn {
          background: #2196F3;
        }
        
        .solution-btn.active {
          background: #0b7dda;
        }
        
        .metal-btn.active {
          transform: translateY(-2px);
          box-shadow: 0 0 0 3px #2c3e50;
        }
        
        .reactivity-badge {
          display: block;
          font-size: 0.8em;
          margin-top: 5px;
          background: rgba(0,0,0,0.1);
          padding: 2px 5px;
          border-radius: 3px;
        }
        
        .warning {
          color: #e74c3c;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .warning.show {
          opacity: 1;
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
        
        .reaction-chamber {
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
        
        .reaction-container {
          margin: 20px auto;
          position: relative;
          height: 200px;
          width: 200px;
        }
        
        .metal-piece {
          width: 40px;
          height: 40px;
          border-radius: 5px;
          position: absolute;
          top: 50px;
          left: 80px;
          z-index: 2;
          transition: all 0.3s;
        }
        
        .solution {
          width: 180px;
          height: 150px;
          background: rgba(66, 165, 245, 0.3);
          border-radius: 0 0 90px 90px;
          position: absolute;
          bottom: 0;
          left: 10px;
          overflow: hidden;
        }
        
        .bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: bubble-up linear infinite;
        }
        
        @keyframes bubble-up {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        
        .heat-effect {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        
        .run-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .run-btn:hover {
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
        
        .speed .violent {
          color: #e74c3c;
        }
        
        .speed .rapid {
          color: #f39c12;
        }
        
        .speed .moderate {
          color: #27ae60;
        }
        
        .equation {
          font-family: monospace;
          font-size: 18px;
          margin-top: 15px;
          white-space: pre-wrap;
        }
        
        .analysis {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        
        .warning {
          color: #e74c3c;
        }
        
        .reactivity-series {
          margin-top: 20px;
        }
        
        .series-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 10px;
        }
        
        .series-item {
          padding: 8px 12px;
          border-radius: 4px;
          color: #333;
          font-weight: 500;
        }
        
        .series-item.highlighted {
          outline: 3px solid #2c3e50;
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

export default MetalReactivity;