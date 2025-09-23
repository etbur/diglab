import React, { useState, useEffect, useRef } from 'react';
import './Respiration.css';

const Respiration = () => {
  // Experiment parameters
  const [glucoseConcentration, setGlucoseConcentration] = useState(5); // %
  const [temperature, setTemperature] = useState(30); // °C
  const [oxygenLevel, setOxygenLevel] = useState(100); // %
  const [timeElapsed, setTimeElapsed] = useState(0); // minutes
  const [isRunning, setIsRunning] = useState(false);
  
  // Simulation outputs
  const [co2Production, setCO2Production] = useState(0);
  const [ethanolProduction, setEthanolProduction] = useState(0);
  const [bubbleCount, setBubbleCount] = useState(0);
  const [atpProduction, setAtpProduction] = useState(0);
  
  // AI analysis
  const [aiInsights, setAiInsights] = useState('');
  const [respirationType, setRespirationType] = useState('');
  
  // Refs for animation
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const lastUpdateRef = useRef(0);
  const bubbleParticles = useRef([]);
  const yeastCells = useRef([]);
  const yeastActivityRef = useRef(50);

  // Respiration rate calculation
  const calculateRespirationRate = () => {
    // Base rate affected by glucose (Michaelis-Menten kinetics)
    const glucoseEffect = glucoseConcentration / (glucoseConcentration + 2);
    
    // Temperature effect (bell curve peaking at 30°C for yeast)
    const tempEffect = Math.exp(-Math.pow((temperature - 30)/15, 2));
    
    // Oxygen effect - determines respiration pathway
    let oxygenEffect, pathway;
    if (oxygenLevel > 30) {
      // Aerobic respiration
      oxygenEffect = oxygenLevel / 100;
      pathway = 'Aerobic';
    } else {
      // Anaerobic respiration (fermentation)
      oxygenEffect = (100 - oxygenLevel) / 100;
      pathway = 'Anaerobic';
    }
    
    // Combine all factors
    const rate = glucoseEffect * tempEffect * oxygenEffect;
    
    return {
      rate: Math.max(0.01, rate * 0.2), // Scale to reasonable values
      pathway
    };
  };

  // Main animation loop
  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp) => {
      if (!lastUpdateRef.current) lastUpdateRef.current = timestamp;
      const deltaTime = timestamp - lastUpdateRef.current;
      lastUpdateRef.current = timestamp;

      // Update simulation time (1 second = 1 minute in simulation)
      setTimeElapsed(prev => prev + deltaTime / 1000);

      // Calculate current respiration rate and pathway
      const { rate, pathway } = calculateRespirationRate();
      setRespirationType(pathway);
      
      // Update outputs based on respiration type
      if (pathway === 'Aerobic') {
        // Aerobic respiration: C6H12O6 + 6O2 → 6CO2 + 6H2O + ~30ATP
        setCO2Production(prev => prev + rate * deltaTime / 1000);
        setEthanolProduction(prev => Math.max(0, prev - rate * 0.01 * deltaTime / 1000));
        setAtpProduction(prev => prev + rate * 30 * deltaTime / 60000);
      } else {
        // Anaerobic respiration: C6H12O6 → 2C2H5OH + 2CO2 + 2ATP
        setCO2Production(prev => prev + rate * 0.5 * deltaTime / 1000);
        setEthanolProduction(prev => prev + rate * 0.5 * deltaTime / 1000);
        setAtpProduction(prev => prev + rate * 2 * deltaTime / 60000);
      }
      
      // Generate bubbles based on CO2 production
      const newBubbles = Math.floor(rate * deltaTime / 50);
      if (newBubbles > 0) {
        setBubbleCount(prev => prev + newBubbles);
        for (let i = 0; i < newBubbles; i++) {
          bubbleParticles.current.push({
            x: 50 + Math.random() * 200,
            y: 180,
            size: 2 + Math.random() * 4,
            speed: 0.5 + Math.random() * rate,
            opacity: 0.3 + Math.random() * 0.5
          });
        }
      }

      // Update yeast cells
      updateYeastCells(rate, deltaTime, pathway);

      // Update yeast activity
      yeastActivityRef.current = Math.min(100, 
        (rate * 200) + // Base on respiration rate
        (glucoseConcentration * 0.8) + // Glucose contribution
        (temperature > 25 && temperature < 35 ? 20 : 0) // Optimal temp range
      );

      // Update and draw particles
      updateParticles(deltaTime);
      drawExperiment();

      // Generate AI insights periodically
      if (timeElapsed % 5 < 0.05) {
        generateAIInsights(rate, pathway);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, glucoseConcentration, temperature, oxygenLevel]);

  // Update yeast cells
  const updateYeastCells = (rate, deltaTime, pathway) => {
    // Add new yeast cells occasionally
    if (Math.random() < rate * deltaTime / 2000) {
      yeastCells.current.push({
        x: 50 + Math.random() * 200,
        y: 120 + Math.random() * 60,
        size: 3 + Math.random() * 4,
        activity: 50 + Math.random() * 50,
        type: pathway === 'Aerobic' ? 'budding' : 'fermenting'
      });
    }
    
    // Update existing cells
    yeastCells.current = yeastCells.current.map(cell => {
      const newCell = {...cell};
      // Increase activity based on conditions
      newCell.activity = Math.min(100, cell.activity + (rate * deltaTime / 1000));
      // Change size slightly
      newCell.size = Math.max(2, Math.min(8, cell.size + (Math.random() * 0.2 - 0.1)));
      return newCell;
    }).filter(cell => cell.activity > 10); // Remove inactive cells
  };

  // Update bubble particles
  const updateParticles = (deltaTime) => {
    bubbleParticles.current = bubbleParticles.current
      .map(bubble => ({
        ...bubble,
        y: bubble.y - bubble.speed,
        opacity: bubble.opacity * 0.99
      }))
      .filter(bubble => bubble.y > -10 && bubble.opacity > 0.1);
  };

  // Draw experiment
  const drawExperiment = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw liquid background
    ctx.fillStyle = respirationType === 'Aerobic' ? '#E3F2FD' : '#FFF8E1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw flask outline
    ctx.strokeStyle = '#78909C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(30, 180);
    ctx.lineTo(270, 180);
    ctx.lineTo(250, 50);
    ctx.stroke();

    // Draw yeast cells
    yeastCells.current.forEach(cell => {
      const color = cell.type === 'budding' ? 
        `rgba(255, 235, 59, ${cell.activity / 100})` : 
        `rgba(255, 152, 0, ${cell.activity / 100})`;
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cell.x, cell.y, cell.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw budding if aerobic
      if (cell.type === 'budding' && cell.activity > 70) {
        ctx.beginPath();
        ctx.arc(cell.x + cell.size, cell.y - cell.size, cell.size/2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw bubbles
    bubbleParticles.current.forEach(bubble => {
      ctx.fillStyle = `rgba(100, 200, 255, ${bubble.opacity})`;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw liquid level indicator
    ctx.fillStyle = respirationType === 'Aerobic' ? 'rgba(187, 222, 251, 0.5)' : 'rgba(255, 243, 224, 0.5)';
    ctx.fillRect(0, 180 - (yeastActivityRef.current / 5), canvas.width, canvas.height);
  };

  // Generate AI insights
  const generateAIInsights = (rate, pathway) => {
    const insights = [];

    // Pathway analysis
    if (pathway === 'Aerobic') {
      insights.push("Aerobic respiration active - optimal ATP production");
      insights.push(`Producing ~30 ATP per glucose molecule`);
    } else {
      insights.push("Anaerobic respiration (fermentation) active");
      insights.push("Ethanol production detected - lower ATP yield (2 ATP/glucose)");
    }

    // Glucose analysis
    if (glucoseConcentration < 2) {
      insights.push("Low glucose concentration is limiting respiration rate");
    } else if (glucoseConcentration > 10) {
      insights.push("High glucose concentration - potential for osmotic stress");
    }

    // Temperature analysis
    if (temperature < 25) {
      insights.push("Suboptimal temperature - enzymatic activity reduced");
    } else if (temperature > 37) {
      insights.push("Elevated temperature - risk of denaturing enzymes");
    }

    // Oxygen analysis
    if (oxygenLevel < 20) {
      insights.push("Low oxygen - yeast switching to fermentation");
    } else if (oxygenLevel > 80 && pathway === 'Aerobic') {
      insights.push("High oxygen - optimal for aerobic respiration");
    }

    // Efficiency calculation
    const efficiency = pathway === 'Aerobic' ? 
      (rate / 0.2) * 100 : 
      (rate / 0.1) * 50; // Lower max efficiency for anaerobic
    insights.push(`Current metabolic efficiency: ${efficiency.toFixed(1)}% of maximum`);

    setAiInsights(insights.join('\n\n'));
  };

  // Reset experiment
  const resetExperiment = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setCO2Production(0);
    setEthanolProduction(0);
    setAtpProduction(0);
    setBubbleCount(0);
    bubbleParticles.current = [];
    yeastCells.current = [];
    yeastActivityRef.current = 50;
    setAiInsights('');
    setRespirationType('');
  };

  return (
    <div className="respiration-lab">
      <header>
        <h1>Respiration in Yeast Lab Ethiopia</h1>
        <p className="subtitle">Real-Time Digital Simulation with AI Analysis</p>
      </header>

      <div className="lab-container">
        <div className="control-panel">
          <h2>Experiment Controls</h2>
          
          <div className="control-group">
            <label>Glucose Concentration: {glucoseConcentration}%</label>
            <input
              type="range"
              min="0"
              max="15"
              value={glucoseConcentration}
              onChange={(e) => setGlucoseConcentration(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Energy source for respiration</small>
          </div>
          
          <div className="control-group">
            <label>Temperature: {temperature}°C</label>
            <input
              type="range"
              min="10"
              max="45"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Optimal: 25-35°C for Saccharomyces cerevisiae</small>
          </div>
          
          <div className="control-group">
            <label>Oxygen Level: {oxygenLevel}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={oxygenLevel}
              onChange={(e) => setOxygenLevel(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Determines respiration pathway</small>
          </div>
          
          <div className="action-buttons">
            <button 
              className={isRunning ? 'stop-button' : 'start-button'}
              onClick={() => {
                if (isRunning) {
                  setIsRunning(false);
                } else {
                  resetExperiment();
                  setIsRunning(true);
                }
              }}
            >
              {isRunning ? 'Stop Experiment' : 'Start Experiment'}
            </button>
            <button 
              className="reset-button"
              onClick={resetExperiment}
              disabled={isRunning}
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="visualization-area">
          <div className="experiment-container">
            <canvas 
              ref={canvasRef} 
              width="300" 
              height="200"
            />
          </div>
          
          <div className="metrics">
            <div className="metric">
              <h3>CO₂ Production</h3>
              <p>{co2Production.toFixed(2)} μmol/min</p>
            </div>
            <div className="metric">
              <h3>Ethanol Production</h3>
              <p>{ethanolProduction.toFixed(2)} μmol/min</p>
            </div>
            <div className="metric">
              <h3>ATP Production</h3>
              <p>{atpProduction.toFixed(0)} molecules</p>
            </div>
            <div className="metric">
              <h3>Time Elapsed</h3>
              <p>{Math.floor(timeElapsed)} minutes</p>
            </div>
          </div>
        </div>
        
        <div className="analysis-panel">
          <h2>AI Analysis</h2>
          <div className="ai-insights">
            {aiInsights ? (
              aiInsights.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))
            ) : (
              <p>Run the experiment to receive AI analysis</p>
            )}
          </div>
          
          <div className="respiration-type">
            <h3>Current Respiration Type</h3>
            <div className={`type-display ${respirationType === 'Aerobic' ? 'aerobic' : 'anaerobic'}`}>
              {respirationType || 'Not active'}
            </div>
          </div>
          
          <div className="respiration-equations">
            <h3>Respiration Equations</h3>
            <p><strong>Aerobic:</strong> C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~30ATP</p>
            <p><strong>Anaerobic:</strong> C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2ATP</p>
          </div>
        </div>
      </div>
      
      <div className="educational-tips">
        <h3>Did You Know? (Ethiopian Context)</h3>
        <ul>
          <li>Traditional Ethiopian honey wine (tej) relies on yeast fermentation</li>
          <li>Ethiopian breweries optimize yeast respiration for beer production</li>
          <li>Understanding yeast metabolism helps in biofuel research applications</li>
        </ul>
      </div>
    </div>
  );
};

export default Respiration;