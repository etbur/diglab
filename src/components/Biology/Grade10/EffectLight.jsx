import React, { useState, useEffect, useRef } from 'react';
import './EffectLight.css';

const EffectLight = () => {
  // Simulation states
  const [lightIntensity, setLightIntensity] = useState(50); // Percent
  const [lightWavelength, setLightWavelength] = useState(450); // nm
  const [temperature, setTemperature] = useState(25); // °C
  const [co2Concentration, setCo2Concentration] = useState(400); // ppm
  const [waterAvailability, setWaterAvailability] = useState(70); // Percent
  const [timeElapsed, setTimeElapsed] = useState(0); // Minutes
  const [oxygenProduction, setOxygenProduction] = useState(0);
  const [glucoseProduction, setGlucoseProduction] = useState(0);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [aiInsights, setAiInsights] = useState('');
  const [experimentHistory, setExperimentHistory] = useState([]);
  
  // Chart references
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Photosynthesis calculation
  const calculatePhotosynthesis = () => {
    // Base rate affected by light intensity (logarithmic relationship)
    let rate = Math.log10(lightIntensity + 1) * 0.5;
    
    // Wavelength effect - optimal in blue (450nm) and red (650nm) ranges
    const wavelengthEffect = 
      Math.max(
        0.7 * Math.exp(-Math.pow((lightWavelength - 450)/100, 2)),
        0.7 * Math.exp(-Math.pow((lightWavelength - 650)/100, 2))
      );
    rate *= wavelengthEffect;
    
    // Temperature effect - optimal around 25°C
    rate *= Math.exp(-Math.pow((temperature - 25)/15, 2));
    
    // CO2 effect - saturation curve
    rate *= (1 - Math.exp(-co2Concentration/1000));
    
    // Water availability effect
    rate *= waterAvailability / 100;
    
    return rate;
  };
  
  // Run simulation
  useEffect(() => {
    if (!simulationRunning) return;
    
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
      
      const rate = calculatePhotosynthesis();
      setOxygenProduction(prev => prev + rate * 0.1);
      setGlucoseProduction(prev => prev + rate * 0.01);
      
      // Update AI insights periodically
      if (timeElapsed % 5 === 0) {
        generateAiInsights();
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [simulationRunning, timeElapsed, lightIntensity, lightWavelength, temperature, co2Concentration, waterAvailability]);
  
  // Generate AI insights
  const generateAiInsights = () => {
    const rate = calculatePhotosynthesis();
    let insights = [];
    
    // Light intensity analysis
    if (lightIntensity < 30) {
      insights.push("Low light intensity is limiting the rate of photosynthesis.");
    } else if (lightIntensity > 80) {
      insights.push("High light intensity may cause photoinhibition.");
    }
    
    // Wavelength analysis
    if (lightWavelength < 400 || lightWavelength > 700) {
      insights.push("Light wavelength outside visible spectrum (400-700nm) is less effective for photosynthesis.");
    } else if (lightWavelength > 500 && lightWavelength < 600) {
      insights.push("Green light (500-600nm) is least absorbed by chlorophyll.");
    }
    
    // Temperature analysis
    if (temperature < 15) {
      insights.push("Low temperature is slowing down enzymatic reactions in photosynthesis.");
    } else if (temperature > 35) {
      insights.push("High temperature may denature photosynthetic enzymes.");
    }
    
    // CO2 analysis
    if (co2Concentration < 200) {
      insights.push("CO2 concentration is limiting the Calvin cycle.");
    } else if (co2Concentration > 1000) {
      insights.push("CO2 concentration is saturating the photosynthetic machinery.");
    }
    
    // Water analysis
    if (waterAvailability < 40) {
      insights.push("Low water availability is causing stomatal closure and reducing CO2 uptake.");
    }
    
    // General efficiency
    const efficiency = (rate / 0.5) * 100; // Compared to optimal conditions
    insights.push(`Current photosynthetic efficiency: ${efficiency.toFixed(1)}% of maximum potential.`);
    
    setAiInsights(insights.join('\n\n'));
  };
  
  // Start/stop simulation
  const toggleSimulation = () => {
    if (simulationRunning) {
      setSimulationRunning(false);
      // Save experiment to history
      setExperimentHistory(prev => [...prev, {
        conditions: { lightIntensity, lightWavelength, temperature, co2Concentration, waterAvailability },
        results: { oxygenProduction, glucoseProduction, timeElapsed },
        timestamp: new Date().toLocaleString()
      }]);
    } else {
      // Reset metrics for new run
      setTimeElapsed(0);
      setOxygenProduction(0);
      setGlucoseProduction(0);
      setSimulationRunning(true);
    }
  };
  
  // Render plant visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw pot
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(canvas.width/2 - 40, canvas.height - 40, 80, 40);
    
    // Draw stem
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height - 40);
    ctx.lineTo(canvas.width/2, canvas.height - 150);
    ctx.stroke();
    
    // Draw leaves - size and color affected by photosynthesis
    const leafSize = 0.5 + (oxygenProduction / 50);
    const leafGreenness = 100 + Math.min(oxygenProduction, 100);
    
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const x = canvas.width/2 + Math.cos(angle) * 50;
      const y = canvas.height - 150 + Math.sin(angle) * 30;
      
      drawLeaf(ctx, x, y, angle + Math.PI/2, leafSize, leafGreenness);
    }
    
    // Draw bubbles for oxygen production
    if (oxygenProduction > 0) {
      const bubbleCount = Math.min(10, Math.floor(oxygenProduction / 5));
      
      for (let i = 0; i < bubbleCount; i++) {
        const size = 3 + Math.random() * 5;
        const x = canvas.width/2 - 30 + Math.random() * 60;
        const y = canvas.height - 180 - (timeElapsed % 50) - Math.random() * 50;
        
        ctx.fillStyle = `rgba(100, 200, 255, ${0.3 + Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [oxygenProduction, timeElapsed]);
  
  // Helper function to draw a leaf
  const drawLeaf = (ctx, x, y, angle, size, greenness) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(size, size);
    
    ctx.fillStyle = `hsl(${100 - greenness/2}, 60%, ${40 + greenness/3}%)`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(20, 5, 30, 30, 0, 40);
    ctx.bezierCurveTo(-30, 30, -20, 5, 0, 0);
    ctx.fill();
    
    // Leaf veins
    ctx.strokeStyle = `hsl(${100 - greenness/2}, 60%, ${20 + greenness/4}%)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);
    ctx.bezierCurveTo(10, 30, 10, 20, 0, 10);
    ctx.bezierCurveTo(-10, 20, -10, 30, 0, 40);
    ctx.stroke();
    
    ctx.restore();
  };
  
  // Render chart
  useEffect(() => {
    if (!chartRef.current) return;
    
    // In a real implementation, you would use a charting library like Chart.js
    // This is a simplified representation
    const ctx = chartRef.current.getContext('2d');
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
    
    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 20);
    ctx.lineTo(30, 180);
    ctx.lineTo(280, 180);
    ctx.stroke();
    
    // Draw labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('O₂ Production', 10, 100);
    ctx.fillText('Time (min)', 150, 195);
    
    // Draw data (simplified)
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 180);
    
    const maxOxygen = Math.max(10, oxygenProduction);
    for (let t = 0; t <= timeElapsed; t += 5) {
      const x = 30 + (t / 60) * 250;
      const y = 180 - (Math.min(t, 60) / 60) * 160 * (oxygenProduction / maxOxygen);
      ctx.lineTo(x, y);
    }
    
    ctx.stroke();
  }, [oxygenProduction, timeElapsed]);
  
  return (
    <div className="photosynthesis-lab">
      <header>
        <h1>Effect of Light on Photosynthesis Lab</h1>
        <p className="subtitle">Interactive Digital Simulation with AI Analysis</p>
      </header>
      
      <div className="lab-container">
        <div className="control-panel">
          <h2>Experiment Controls</h2>
          
          <div className="control-group">
            <label>Light Intensity: {lightIntensity}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(parseInt(e.target.value))}
              disabled={simulationRunning}
            />
          </div>
          
          <div className="control-group">
            <label>Light Wavelength: {lightWavelength} nm</label>
            <input
              type="range"
              min="380"
              max="750"
              value={lightWavelength}
              onChange={(e) => setLightWavelength(parseInt(e.target.value))}
              disabled={simulationRunning}
            />
            <div className="wavelength-visual">
              {[380, 450, 500, 550, 600, 650, 700, 750].map((w) => (
                <div
                  key={w}
                  className={`wavelength-mark ${w === 450 || w === 650 ? 'optimal' : ''}`}
                  style={{
                    left: `${((w - 380) / (750 - 380)) * 100}%`,
                    backgroundColor: `hsl(${((750 - w) / (750 - 380)) * 360}, 80%, 50%)`
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="control-group">
            <label>Temperature: {temperature}°C</label>
            <input
              type="range"
              min="10"
              max="40"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              disabled={simulationRunning}
            />
          </div>
          
          <div className="control-group">
            <label>CO₂ Concentration: {co2Concentration} ppm</label>
            <input
              type="range"
              min="100"
              max="1500"
              value={co2Concentration}
              onChange={(e) => setCo2Concentration(parseInt(e.target.value))}
              disabled={simulationRunning}
            />
          </div>
          
          <div className="control-group">
            <label>Water Availability: {waterAvailability}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(parseInt(e.target.value))}
              disabled={simulationRunning}
            />
          </div>
          
          <button 
            className={`simulation-button ${simulationRunning ? 'stop' : 'start'}`}
            onClick={toggleSimulation}
          >
            {simulationRunning ? 'Stop Experiment' : 'Start Experiment'}
          </button>
        </div>
        
        <div className="visualization-area">
          <div className="plant-visualization">
            <canvas 
              ref={canvasRef} 
              width="300" 
              height="250"
            ></canvas>
            
            <div className="light-source" style={{
              opacity: lightIntensity / 100,
              background: `radial-gradient(circle at center, hsl(${(750 - lightWavelength) / 370 * 360}, 80%, 80%) 0%, transparent 70%)`
            }}></div>
          </div>
          
          <div className="metrics-display">
            <div className="metric">
              <h3>Oxygen Production</h3>
              <p className="value">{oxygenProduction.toFixed(2)} μmol/m²/s</p>
            </div>
            
            <div className="metric">
              <h3>Glucose Production</h3>
              <p className="value">{glucoseProduction.toFixed(4)} μmol/m²/s</p>
            </div>
            
            <div className="metric">
              <h3>Time Elapsed</h3>
              <p className="value">{timeElapsed} minutes</p>
            </div>
          </div>
          
          <div className="results-chart">
            <canvas ref={chartRef} width="300" height="200"></canvas>
          </div>
        </div>
        
        <div className="analysis-panel">
          <h2>AI Analysis</h2>
          
          <div className="ai-insights">
            {aiInsights ? (
              <div className="insight-messages">
                {aiInsights.split('\n\n').map((msg, i) => (
                  <p key={i} className="insight">
                    {msg}
                  </p>
                ))}
              </div>
            ) : (
              <p className="no-insights">
                {simulationRunning 
                  ? "AI is analyzing the experiment..." 
                  : "Run the experiment to get AI insights"}
              </p>
            )}
          </div>
          
          <div className="experiment-history">
            <h3>Experiment History</h3>
            {experimentHistory.length > 0 ? (
              <ul>
                {experimentHistory.map((exp, i) => (
                  <li key={i}>
                    <button onClick={() => {
                      setLightIntensity(exp.conditions.lightIntensity);
                      setLightWavelength(exp.conditions.lightWavelength);
                      setTemperature(exp.conditions.temperature);
                      setCo2Concentration(exp.conditions.co2Concentration);
                      setWaterAvailability(exp.conditions.waterAvailability);
                    }}>
                      {exp.timestamp}: O₂ = {exp.results.oxygenProduction.toFixed(2)}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No previous experiments</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="educational-content">
        <h2>Photosynthesis Fundamentals</h2>
        
        <div className="content-section">
          <h3>Light-Dependent Reactions</h3>
          <p>
            In the thylakoid membranes, chlorophyll absorbs light energy, 
            exciting electrons that travel through an electron transport chain. 
            This process splits water molecules, releasing oxygen as a byproduct 
            and generating ATP and NADPH.
          </p>
        </div>
        
        <div className="content-section">
          <h3>Calvin Cycle</h3>
          <p>
            Using ATP and NADPH from the light reactions, the Calvin cycle 
            fixes carbon dioxide into organic molecules. For every 6 CO₂ 
            molecules fixed, one glucose molecule is produced.
          </p>
        </div>
        
        <div className="content-section">
          <h3>Factors Affecting Photosynthesis</h3>
          <ul>
            <li><strong>Light Intensity:</strong> Increases rate until all chlorophyll are saturated</li>
            <li><strong>Light Wavelength:</strong> Chlorophyll absorbs best in blue (450nm) and red (650nm) ranges</li>
            <li><strong>Temperature:</strong> Affects enzyme activity in the Calvin cycle</li>
            <li><strong>CO₂ Concentration:</strong> Substrate for carbon fixation</li>
            <li><strong>Water Availability:</strong> Needed for electron replacement in photosystem II</li>
          </ul>
        </div>
      </div>
      
      <footer>
        <p>Interactive Photosynthesis Lab - Ethiopia STEM Education Initiative</p>
        <p>© {new Date().getFullYear()} Digital Biology Labs</p>
      </footer>
    </div>
  );
};

export default EffectLight;