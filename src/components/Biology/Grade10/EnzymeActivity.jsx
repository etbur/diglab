import React, { useState, useEffect, useRef } from 'react';
import './EnzymeActivity.css';

const EnzymeActivity = () => {
  // Simulation parameters
  const [enzymeConcentration, setEnzymeConcentration] = useState(50); // %
  const [substrateConcentration, setSubstrateConcentration] = useState(50); // %
  const [temperature, setTemperature] = useState(37); // °C
  const [ph, setPH] = useState(7); 
  const [inhibitor, setInhibitor] = useState('none'); // 'none', 'competitive', 'noncompetitive'
  const [isRunning, setIsRunning] = useState(false);
  const [reactionRate, setReactionRate] = useState(0);
  const [oxygenProduced, setOxygenProduced] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [aiInsights, setAiInsights] = useState('');
  
  // Refs for animation
  const animationRef = useRef();
  const lastTimeRef = useRef(0);
  const canvasRef = useRef(null);
  const bubbleParticles = useRef([]);
  const enzymeParticles = useRef([]);
  const substrateParticles = useRef([]);

  // Calculate reaction rate using Michaelis-Menten kinetics
  const calculateReactionRate = () => {
    // Base parameters
    const Vmax = enzymeConcentration / 10;
    const Km = 30; // Michaelis constant
    
    // Adjust Km for competitive inhibition
    const adjustedKm = inhibitor === 'competitive' ? Km * 3 : Km;
    
    // Adjust Vmax for noncompetitive inhibition
    const adjustedVmax = inhibitor === 'noncompetitive' ? Vmax / 3 : Vmax;
    
    // Temperature effect (Q10 model)
    const tempEffect = Math.pow(2, (temperature - 37)/10);
    
    // pH effect (bell curve around pH 7)
    const phEffect = Math.exp(-Math.pow((ph - 7)/2, 2));
    
    // Michaelis-Menten equation
    const rate = (adjustedVmax * tempEffect * phEffect * substrateConcentration) / 
                 (adjustedKm + substrateConcentration);
    
    return Math.max(0, rate);
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
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Update simulation time (1 second = 1 second in simulation)
      setTimeElapsed(prev => prev + deltaTime / 1000);

      // Calculate current reaction rate
      const currentRate = calculateReactionRate();
      setReactionRate(currentRate);
      setOxygenProduced(prev => prev + currentRate * deltaTime / 1000);

      // Create enzyme and substrate particles
      if (enzymeParticles.current.length < enzymeConcentration / 5) {
        enzymeParticles.current.push(createEnzymeParticle());
      }
      
      if (substrateParticles.current.length < substrateConcentration / 5) {
        substrateParticles.current.push(createSubstrateParticle());
      }

      // Create bubbles when reaction occurs
      if (currentRate > 0.1 && deltaTime > 0) {
        const newBubbles = Math.floor(currentRate * deltaTime / 50);
        for (let i = 0; i < newBubbles; i++) {
          bubbleParticles.current.push(createBubbleParticle());
        }
      }

      // Update and draw particles
      updateParticles(deltaTime);
      drawReaction();

      // Generate AI feedback periodically
      if (timeElapsed % 5 < 0.05) {
        generateAIInsights(currentRate);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, enzymeConcentration, substrateConcentration, temperature, ph, inhibitor]);

  // Create enzyme particle
  const createEnzymeParticle = () => ({
    x: Math.random() * 100 + 50,
    y: Math.random() * 100 + 50,
    size: 8,
    color: '#4A89DC',
    targetX: null,
    targetY: null,
    speed: 0.5 + Math.random() * 0.5
  });

  // Create substrate particle
  const createSubstrateParticle = () => ({
    x: Math.random() * 100 + 150,
    y: Math.random() * 100 + 50,
    size: 6,
    color: '#E9573F',
    targetX: null,
    targetY: null,
    speed: 0.3 + Math.random() * 0.5
  });

  // Create bubble particle
  const createBubbleParticle = () => ({
    x: 150 + Math.random() * 40,
    y: 180,
    size: 2 + Math.random() * 4,
    speed: 0.5 + Math.random() * reactionRate,
    opacity: 0.3 + Math.random() * 0.5
  });

  // Update particle positions
  const updateParticles = (deltaTime) => {
    // Update enzymes
    enzymeParticles.current = enzymeParticles.current.map(enzyme => {
      // Find nearest substrate if not already targeting one
      if (!enzyme.targetX || !enzyme.targetY) {
        const nearestSubstrate = substrateParticles.current
          .sort((a, b) => 
            Math.sqrt(Math.pow(a.x - enzyme.x, 2) + Math.pow(a.y - enzyme.y, 2)) -
            Math.sqrt(Math.pow(b.x - enzyme.x, 2) + Math.pow(b.y - enzyme.y, 2))
          [0]);
        
        if (nearestSubstrate) {
          return {
            ...enzyme,
            targetX: nearestSubstrate.x,
            targetY: nearestSubstrate.y
          };
        }
      }
      
      // Move toward target
      if (enzyme.targetX && enzyme.targetY) {
        const dx = enzyme.targetX - enzyme.x;
        const dy = enzyme.targetY - enzyme.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If close enough, react (remove substrate)
        if (distance < 10 && Math.random() > 0.7) {
          substrateParticles.current = substrateParticles.current.filter(
            sub => sub.x !== enzyme.targetX && sub.y !== enzyme.targetY
          );
          return {
            ...enzyme,
            targetX: null,
            targetY: null
          };
        }
        
        // Otherwise move toward target
        return {
          ...enzyme,
          x: enzyme.x + (dx / distance) * enzyme.speed,
          y: enzyme.y + (dy / distance) * enzyme.speed
        };
      }
      
      // Random movement if no target
      return {
        ...enzyme,
        x: enzyme.x + (Math.random() - 0.5) * enzyme.speed,
        y: enzyme.y + (Math.random() - 0.5) * enzyme.speed
      };
    });

    // Update substrates
    substrateParticles.current = substrateParticles.current.map(substrate => ({
      ...substrate,
      x: substrate.x + (Math.random() - 0.5) * substrate.speed,
      y: substrate.y + (Math.random() - 0.5) * substrate.speed
    }));

    // Update bubbles
    bubbleParticles.current = bubbleParticles.current
      .map(bubble => ({
        ...bubble,
        y: bubble.y - bubble.speed,
        opacity: bubble.opacity * 0.99
      }))
      .filter(bubble => bubble.y > -10 && bubble.opacity > 0.1);
  };

  // Draw reaction visualization
  const drawReaction = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw test tube
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(100, 200);
    ctx.lineTo(200, 200);
    ctx.lineTo(200, 50);
    ctx.stroke();

    // Draw liquid
    ctx.fillStyle = 'rgba(200, 230, 255, 0.3)';
    ctx.fillRect(100, 100, 100, 100);

    // Draw enzymes
    enzymeParticles.current.forEach(enzyme => {
      ctx.fillStyle = enzyme.color;
      ctx.beginPath();
      ctx.arc(enzyme.x, enzyme.y, enzyme.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw active site if targeting substrate
      if (enzyme.targetX && enzyme.targetY) {
        ctx.strokeStyle = '#F5F7FA';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(enzyme.x, enzyme.y, enzyme.size * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // Draw substrates
    substrateParticles.current.forEach(substrate => {
      ctx.fillStyle = substrate.color;
      ctx.beginPath();
      ctx.arc(substrate.x, substrate.y, substrate.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw bubbles
    bubbleParticles.current.forEach(bubble => {
      ctx.fillStyle = `rgba(100, 200, 255, ${bubble.opacity})`;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw inhibitor if present
    if (inhibitor !== 'none') {
      const inhibitorColor = inhibitor === 'competitive' ? '#8CC152' : '#AAB2BD';
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = inhibitorColor;
        ctx.beginPath();
        ctx.arc(120 + i * 15, 180, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  // Generate AI insights
  const generateAIInsights = (currentRate) => {
    const insights = [];
    const optimalRate = 5; // Theoretical maximum

    // Enzyme concentration analysis
    if (enzymeConcentration < 30) {
      insights.push("Low enzyme concentration is limiting the reaction rate. Try increasing enzyme amount.");
    }

    // Substrate concentration analysis
    if (substrateConcentration < 30) {
      insights.push("Low substrate concentration is limiting the reaction rate. Add more hydrogen peroxide.");
    } else if (substrateConcentration > 70 && currentRate < optimalRate * 0.9) {
      insights.push("Enzyme saturation detected - most active sites are occupied.");
    }

    // Temperature analysis
    if (temperature < 25) {
      insights.push("Low temperature is slowing molecular motion and reducing enzyme-substrate collisions.");
    } else if (temperature > 45) {
      insights.push("High temperature may be denaturing the catalase enzyme.");
    }

    // pH analysis
    if (ph < 5 || ph > 9) {
      insights.push("Extreme pH is altering the enzyme's shape and reducing activity.");
    }

    // Inhibitor analysis
    if (inhibitor === 'competitive') {
      insights.push("Competitive inhibitor detected - it's competing with substrate for active sites.");
    } else if (inhibitor === 'noncompetitive') {
      insights.push("Noncompetitive inhibitor detected - it's altering the enzyme's shape.");
    }

    // Efficiency calculation
    const efficiency = (currentRate / optimalRate) * 100;
    insights.push(`Current reaction efficiency: ${efficiency.toFixed(1)}% of maximum potential.`);

    setAiInsights(insights.join('\n\n'));
  };

  // Reset simulation
  const resetExperiment = () => {
    setTimeElapsed(0);
    setOxygenProduced(0);
    bubbleParticles.current = [];
    enzymeParticles.current = [];
    substrateParticles.current = [];
  };

  return (
    <div className="enzyme-lab">
      <header>
        <h1>Enzyme Activity (Catalase) Lab</h1>
        <p className="subtitle">Real-Time Digital Simulation with AI Analysis</p>
      </header>

      <div className="lab-container">
        <div className="control-panel">
          <h2>Experiment Controls</h2>
          
          <div className="control-group">
            <label>Enzyme Concentration: {enzymeConcentration}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={enzymeConcentration}
              onChange={(e) => setEnzymeConcentration(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="control-group">
            <label>Substrate (H₂O₂) Concentration: {substrateConcentration}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={substrateConcentration}
              onChange={(e) => setSubstrateConcentration(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="control-group">
            <label>Temperature: {temperature}°C</label>
            <input
              type="range"
              min="10"
              max="60"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="control-group">
            <label>pH: {ph}</label>
            <input
              type="range"
              min="3"
              max="11"
              value={ph}
              onChange={(e) => setPH(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="control-group">
            <label>Inhibitor Type:</label>
            <select
              value={inhibitor}
              onChange={(e) => setInhibitor(e.target.value)}
              disabled={isRunning}
            >
              <option value="none">None</option>
              <option value="competitive">Competitive</option>
              <option value="noncompetitive">Noncompetitive</option>
            </select>
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
          <div className="reaction-visualization">
            <canvas 
              ref={canvasRef} 
              width="300" 
              height="250"
            />
          </div>
          
          <div className="metrics-display">
            <div className="metric">
              <h3>Reaction Rate</h3>
              <p>{reactionRate.toFixed(2)} μmol/s</p>
            </div>
            <div className="metric">
              <h3>O₂ Produced</h3>
              <p>{oxygenProduced.toFixed(2)} μmol</p>
            </div>
            <div className="metric">
              <h3>Time Elapsed</h3>
              <p>{timeElapsed.toFixed(1)} s</p>
            </div>
          </div>
          
          <div className="reaction-equation">
            <h3>Catalase Reaction:</h3>
            <p>2H₂O₂ → 2H₂O + O₂</p>
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
          
          <div className="kinetics-graph">
            <h3>Enzyme Kinetics</h3>
            <div className="graph-container">
              {/* This would be a dynamic graph in a real implementation */}
              <div className="graph-axis">
                <span>Reaction Rate</span>
              </div>
              <div className="graph-axis">
                <span>Substrate Concentration</span>
              </div>
              <div 
                className="graph-line mm-curve" 
                style={{ '--vmax': `${enzymeConcentration/10}`, '--km': '30' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="educational-content">
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Catalase</strong> breaks down hydrogen peroxide into water and oxygen</li>
          <li><strong>Michaelis-Menten kinetics</strong> describe enzyme-substrate interactions</li>
          <li><strong>Optimal conditions</strong> for catalase: ~37°C, pH 7</li>
          <li><strong>Competitive inhibitors</strong> bind to the active site</li>
          <li><strong>Noncompetitive inhibitors</strong> bind elsewhere, changing enzyme shape</li>
        </ul>
      </div>
    </div>
  );
};

export default EnzymeActivity;