import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const MixturesSeparation = () => {
  // State for the simulation
  const [mixtureType, setMixtureType] = useState("sandWater");
  const [processStep, setProcessStep] = useState(0);
  const [temperature, setTemperature] = useState(25);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [separationComplete, setSeparationComplete] = useState(false);
  const [logs, setLogs] = useState([]);

  // Available mixture types and their properties
  const mixtureTypes = {
    sandWater: {
      name: "Sand and Water",
      method: "Filtration",
      description: "Separating insoluble solids from liquids",
      steps: [
        "Preparing the mixture",
        "Setting up filtration apparatus",
        "Pouring mixture through filter paper",
        "Collecting filtrate",
        "Drying the residue"
      ]
    },
    saltWater: {
      name: "Salt and Water",
      method: "Evaporation",
      description: "Separating soluble solids from liquids",
      steps: [
        "Preparing the solution",
        "Heating the solution",
        "Evaporating the water",
        "Collecting salt crystals",
        "Cooling the apparatus"
      ]
    },
    oilWater: {
      name: "Oil and Water",
      method: "Separating Funnel",
      description: "Separating immiscible liquids",
      steps: [
        "Preparing the mixture",
        "Pouring into separating funnel",
        "Allowing layers to separate",
        "Draining the bottom layer",
        "Collecting both liquids"
      ]
    }
  };

  // Add a log entry
  const addLog = (message) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 9)]);
  };

  // Start the simulation
  const startSimulation = () => {
    setIsRunning(true);
    setProcessStep(0);
    setTimeElapsed(0);
    setSeparationComplete(false);
    addLog(`Starting ${mixtureTypes[mixtureType].method} separation for ${mixtureTypes[mixtureType].name}`);
  };

  // Reset the simulation
  const resetSimulation = () => {
    setIsRunning(false);
    setProcessStep(0);
    setTimeElapsed(0);
    setTemperature(25);
    setSeparationComplete(false);
    addLog("Simulation reset");
  };

  // Handle mixture type change
  const handleMixtureChange = (e) => {
    setMixtureType(e.target.value);
    addLog(`Mixture changed to ${mixtureTypes[e.target.value].name}`);
    resetSimulation();
  };

  // Simulation effect
  useEffect(() => {
    let timer;
    if (isRunning && !separationComplete) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Update temperature based on method
        if (mixtureType === "saltWater") {
          setTemperature(prev => Math.min(prev + 2, 105));
        } else if (mixtureType === "oilWater") {
          setTemperature(prev => Math.max(prev - 1, 15));
        }

        // Progress through steps
        if (timeElapsed % 5 === 0 && processStep < mixtureTypes[mixtureType].steps.length - 1) {
          setProcessStep(prev => prev + 1);
          addLog(`Progress: ${mixtureTypes[mixtureType].steps[processStep + 1]}`);
        }

        // Complete simulation after all steps
        if (processStep === mixtureTypes[mixtureType].steps.length - 1 && timeElapsed > mixtureTypes[mixtureType].steps.length * 5) {
          setSeparationComplete(true);
          setIsRunning(false);
          addLog(`Separation complete! ${mixtureTypes[mixtureType].method} successful.`);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeElapsed, processStep, separationComplete, mixtureType]);

  return (
    <div className="mixtures-lab">
      <h1>Mixtures Separation Technique Lab - Ethiopia</h1>
      
      <div className="control-panel">
        <h2>Simulation Controls</h2>
        <div className="form-group">
          <label>Select Mixture:</label>
          <select 
            value={mixtureType} 
            onChange={handleMixtureChange}
            disabled={isRunning}
          >
            <option value="sandWater">Sand and Water</option>
            <option value="saltWater">Salt and Water</option>
            <option value="oilWater">Oil and Water</option>
          </select>
        </div>

        <div className="button-group">
          {!isRunning && !separationComplete && (
            <button onClick={startSimulation}>Start Separation</button>
          )}
          {isRunning && (
            <button onClick={() => setIsRunning(false)}>Pause</button>
          )}
          {(!isRunning && timeElapsed > 0) && (
            <button onClick={() => setIsRunning(true)}>Resume</button>
          )}
          <button onClick={resetSimulation}>Reset</button>
        </div>
      </div>

      <div className="simulation-display">
        <h2>Current Process: {mixtureTypes[mixtureType].method}</h2>
        <p>Mixture: {mixtureTypes[mixtureType].name}</p>
        <p>Description: {mixtureTypes[mixtureType].description}</p>
        
        <div className="progress-container">
          <h3>Separation Progress</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(processStep / (mixtureTypes[mixtureType].steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          <p>Current Step: {mixtureTypes[mixtureType].steps[processStep]}</p>
          <p>Time Elapsed: {timeElapsed} seconds</p>
          <p>Temperature: {temperature}°C</p>
        </div>

        {separationComplete && (
          <div className="completion-message">
            <h3>✅ Separation Complete!</h3>
            <p>The {mixtureTypes[mixtureType].name} mixture has been successfully separated using {mixtureTypes[mixtureType].method}.</p>
          </div>
        )}

        <div className="visual-representation">
          <h3>Apparatus Visualization</h3>
          <div className={`apparatus ${mixtureType}`}>
            {mixtureType === "sandWater" && (
              <>
                <div className="funnel"></div>
                <div className="filter-paper"></div>
                <div className="beaker">
                  <div 
                    className="filtrate" 
                    style={{ height: `${processStep * 20}px` }}
                  ></div>
                  <div 
                    className="residue" 
                    style={{ height: `${(4 - processStep) * 10}px` }}
                  ></div>
                </div>
              </>
            )}
            {mixtureType === "saltWater" && (
              <>
                <div className="evaporating-dish">
                  <div 
                    className="solution" 
                    style={{ height: `${(4 - processStep) * 10}px` }}
                  ></div>
                  <div 
                    className="crystals" 
                    style={{ height: `${processStep * 5}px` }}
                  ></div>
                </div>
                <div className="bunsen-burner" style={{ opacity: temperature > 30 ? 1 : 0.3 }}></div>
              </>
            )}
            {mixtureType === "oilWater" && (
              <>
                <div className="separating-funnel">
                  <div 
                    className="oil-layer" 
                    style={{ height: `${processStep * 10}px` }}
                  ></div>
                  <div 
                    className="water-layer" 
                    style={{ height: `${(4 - processStep) * 10}px` }}
                  ></div>
                </div>
                <div className="flask" style={{ opacity: processStep > 2 ? 1 : 0 }}></div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="simulation-logs">
        <h3>Process Log</h3>
        <div className="log-entries">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mixtures-lab {
          font-family: Arial, sans-serif;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
        .control-panel, .simulation-display, .simulation-logs {
          background: #f5f5f5;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          margin-right: 10px;
        }
        select, button {
          padding: 8px 12px;
          font-size: 16px;
        }
        button {
          margin-right: 10px;
          cursor: pointer;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
        }
        button:hover {
          background: #45a049;
        }
        .progress-bar {
          width: 100%;
          background: #ddd;
          border-radius: 4px;
          margin: 10px 0;
        }
        .progress-fill {
          height: 20px;
          background: #4CAF50;
          border-radius: 4px;
          transition: width 0.3s;
        }
        .apparatus {
          height: 200px;
          position: relative;
          margin: 20px 0;
          background: #f9f9f9;
          border: 1px solid #ddd;
        }
        .funnel, .filter-paper, .beaker, .evaporating-dish, .bunsen-burner, 
        .separating-funnel, .flask {
          position: absolute;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .beaker {
          width: 100px;
          height: 150px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border: 2px solid #333;
          border-radius: 0 0 10px 10px;
        }
        .filtrate {
          background: lightblue;
          width: 100%;
          bottom: 0;
          position: absolute;
          transition: height 0.5s;
        }
        .residue {
          background: tan;
          width: 100%;
          bottom: 0;
          position: absolute;
          transition: height 0.5s;
        }
        .log-entries {
          height: 150px;
          overflow-y: auto;
          background: #333;
          color: #0f0;
          padding: 10px;
          font-family: monospace;
        }
        .completion-message {
          background: #dff0d8;
          color: #3c763d;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default MixturesSeparation;