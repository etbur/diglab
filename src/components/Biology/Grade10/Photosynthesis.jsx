import React, { useState, useEffect, useRef } from 'react';
import './Photosynthesis.css';

const Photosynthesis = () => {
  // Experiment parameters
  const [lightIntensity, setLightIntensity] = useState(50); // %
  const [co2Concentration, setCO2Concentration] = useState(400); // ppm
  const [temperature, setTemperature] = useState(25); // °C
  const [waterAvailability, setWaterAvailability] = useState(70); // %
  const [timeElapsed, setTimeElapsed] = useState(0); // minutes
  const [isRunning, setIsRunning] = useState(false);
  
  // Simulation outputs
  const [oxygenProduction, setOxygenProduction] = useState(0);
  const [glucoseProduction, setGlucoseProduction] = useState(0);
  const [bubbleCount, setBubbleCount] = useState(0);
  
  // AI analysis
  const [aiInsights, setAiInsights] = useState('');
  const [limitingFactor, setLimitingFactor] = useState('');
  
  // Refs for animation
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const lastUpdateRef = useRef(0);
  const bubbleParticles = useRef([]);
  const plantHealthRef = useRef(100);

  // Photosynthesis rate calculation
  const calculatePhotosynthesisRate = () => {
    // Base rate affected by light intensity (logarithmic response)
    const lightEffect = 0.5 * Math.log10(lightIntensity + 1);
    
    // CO2 effect (Michaelis-Menten kinetics)
    const co2Effect = co2Concentration / (co2Concentration + 200);
    
    // Temperature effect (bell curve peaking at 25°C)
    const tempEffect = Math.exp(-Math.pow((temperature - 25)/15, 2));
    
    // Water availability effect
    const waterEffect = Math.min(1, waterAvailability / 70);
    
    // Combine all factors
    const rate = lightEffect * co2Effect * tempEffect * waterEffect;
    
    return Math.max(0, rate * 0.1); // Scale to reasonable values
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

      // Calculate current photosynthesis rate
      const currentRate = calculatePhotosynthesisRate();
      
      // Update outputs
      setOxygenProduction(prev => prev + currentRate * deltaTime / 1000);
      setGlucoseProduction(prev => prev + currentRate * 0.1 * deltaTime / 1000);
      
      // Generate bubbles based on oxygen production
      const newBubbles = Math.floor(currentRate * deltaTime / 50);
      if (newBubbles > 0) {
        setBubbleCount(prev => prev + newBubbles);
        for (let i = 0; i < newBubbles; i++) {
          bubbleParticles.current.push({
            x: 140 + Math.random() * 20,
            y: 180,
            size: 2 + Math.random() * 4,
            speed: 0.5 + Math.random() * currentRate,
            opacity: 0.3 + Math.random() * 0.5
          });
        }
      }

      // Update plant health
      plantHealthRef.current = Math.min(100, 
        (currentRate * 200) + // Base on photosynthesis rate
        (waterAvailability * 0.8) + // Water contribution
        (temperature > 15 && temperature < 35 ? 20 : 0) // Temperature range bonus
      );

      // Update and draw particles
      updateParticles(deltaTime);
      drawPlant();

      // Generate AI insights periodically
      if (timeElapsed % 5 < 0.05) {
        generateAIInsights(currentRate);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, lightIntensity, co2Concentration, temperature, waterAvailability]);

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

  // Draw plant and bubbles
  const drawPlant = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw water background
    ctx.fillStyle = '#E3F2FD';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw plant stem
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 5 + (plantHealthRef.current / 30);
    ctx.beginPath();
    ctx.moveTo(150, 180);
    ctx.lineTo(150, 120);
    ctx.stroke();

    // Draw leaves (health affects size and color)
    const leafCount = 3 + Math.floor(plantHealthRef.current / 25);
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const size = 15 + (plantHealthRef.current / 5);
      const greenness = 80 + (plantHealthRef.current / 2);
      
      ctx.save();
      ctx.translate(150, 130);
      ctx.rotate(angle);
      
      // Leaf shape
      ctx.fillStyle = `hsl(${100 - greenness/3}, 70%, ${30 + greenness/3}%)`;
      ctx.beginPath();
      ctx.ellipse(20, 0, size, size/2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Leaf veins
      ctx.strokeStyle = `hsl(${100 - greenness/3}, 70%, ${10 + greenness/4}%)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();
      
      ctx.restore();
    }

    // Draw bubbles
    bubbleParticles.current.forEach(bubble => {
      ctx.fillStyle = `rgba(100, 200, 255, ${bubble.opacity})`;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Generate AI insights
  const generateAIInsights = (currentRate) => {
    const optimalRate = 0.5; // Theoretical maximum
    const insights = [];
    let currentLimitingFactor = '';

    // Light analysis
    if (lightIntensity < 30) {
      insights.push("Low light intensity is limiting photosynthesis");
      currentLimitingFactor = 'Light Intensity';
    } else if (lightIntensity > 80 && currentRate < optimalRate * 0.8) {
      insights.push("Light saturation reached - another factor is limiting");
    }

    // CO2 analysis
    if (co2Concentration < 200) {
      insights.push("Low CO₂ concentration is limiting the Calvin cycle");
      currentLimitingFactor = 'CO₂ Concentration';
    } else if (co2Concentration > 1000 && currentRate < optimalRate * 0.9) {
      insights.push("CO₂ saturation reached - another factor is limiting");
    }

    // Temperature analysis
    if (temperature < 15) {
      insights.push("Low temperature is slowing enzymatic reactions");
      currentLimitingFactor = 'Temperature';
    } else if (temperature > 35) {
      insights.push("High temperature may be damaging photosynthetic enzymes");
      currentLimitingFactor = 'Temperature';
    }

    // Water analysis
    if (waterAvailability < 40) {
      insights.push("Low water availability is causing stomatal closure");
      currentLimitingFactor = 'Water Availability';
    }

    // Efficiency calculation
    const efficiency = (currentRate / optimalRate) * 100;
    insights.push(`Current photosynthetic efficiency: ${efficiency.toFixed(1)}% of maximum`);

    setAiInsights(insights.join('\n\n'));
    setLimitingFactor(currentLimitingFactor || 'None - optimal conditions');
  };

  // Reset experiment
  const resetExperiment = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setOxygenProduction(0);
    setGlucoseProduction(0);
    setBubbleCount(0);
    bubbleParticles.current = [];
    plantHealthRef.current = 100;
    setAiInsights('');
    setLimitingFactor('');
  };

  return (
    <div className="photosynthesis-lab">
      <header>
        <h1>Photosynthesis Experiment Lab</h1>
        <p className="subtitle">Real-Time Digital Simulation with AI Analysis</p>
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
              disabled={isRunning}
            />
          </div>
          
          <div className="control-group">
            <label>CO₂ Concentration: {co2Concentration} ppm</label>
            <input
              type="range"
              min="100"
              max="1500"
              value={co2Concentration}
              onChange={(e) => setCO2Concentration(parseInt(e.target.value))}
              disabled={isRunning}
            />
          </div>
          
          <div className="control-group">
            <label>Temperature: {temperature}°C</label>
            <input
              type="range"
              min="10"
              max="40"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              disabled={isRunning}
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
              disabled={isRunning}
            />
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
          <div className="plant-container">
            <canvas 
              ref={canvasRef} 
              width="300" 
              height="200"
            />
          </div>
          
          <div className="light-source" style={{
            opacity: lightIntensity / 100,
            background: `radial-gradient(ellipse at center, 
              rgba(255,255,200,0.8) 0%, 
              transparent 70%)`
          }} />
          
          <div className="metrics">
            <div className="metric">
              <h3>O₂ Production</h3>
              <p>{oxygenProduction.toFixed(2)} μmol/m²/s</p>
            </div>
            <div className="metric">
              <h3>Glucose Production</h3>
              <p>{glucoseProduction.toFixed(4)} μmol/m²/s</p>
            </div>
            <div className="metric">
              <h3>Bubble Count</h3>
              <p>{bubbleCount}</p>
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
          
          <div className="limiting-factor">
            <h3>Current Limiting Factor</h3>
            <div className="factor-display">
              {limitingFactor}
            </div>
          </div>
          
          <div className="reaction-equation">
            <h3>Photosynthesis Equation</h3>
            <p>6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p>
          </div>
        </div>
      </div>
      
      <div className="educational-tips">
        <h3>Did You Know?</h3>
        <ul>
          <li>Photosynthesis converts about 1-2% of light energy into chemical energy</li>
          <li>The Calvin cycle uses 9 ATP and 6 NADPH molecules to produce one glucose molecule</li>
          <li>C₄ plants have specialized anatomy to minimize photorespiration</li>
        </ul>
      </div>
    </div>
  );
};

export default Photosynthesis;