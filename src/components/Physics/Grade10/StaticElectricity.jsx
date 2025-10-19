import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './StaticElectricity.css';

const StaticElectricity = () => {
  const [chargeLevel, setChargeLevel] = useState(0);
  const [material, setMaterial] = useState('wool');
  const [environment, setEnvironment] = useState('dry');
  const [isRubbing, setIsRubbing] = useState(false);
  const canvasRef = useRef(null);
  
  // Handle material change
  const handleMaterialChange = (newMaterial) => {
    setMaterial(newMaterial);
    setChargeLevel(0);
  };
  
  // Handle rubbing action
  const handleRubbing = () => {
    setIsRubbing(true);
    // Increase charge level based on material
    const chargeIncrease = material === 'wool' ? 15 : material === 'plastic' ? 20 : 10;
    setChargeLevel(prev => Math.min(prev + chargeIncrease, 100));
    
    // Reset rubbing after a short time
    setTimeout(() => setIsRubbing(false), 500);
  };
  
  // Handle discharge
  const handleDischarge = () => {
    setChargeLevel(0);
  };
  
  // Handle environment change
  const handleEnvironmentChange = (env) => {
    setEnvironment(env);
    // Humidity reduces charge
    if (env === 'humid') {
      setChargeLevel(prev => Math.max(prev - 30, 0));
    }
  };
  
  // Draw simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background based on environment
    if (environment === 'dry') {
      ctx.fillStyle = '#f0e6d2';
    } else {
      ctx.fillStyle = '#d0e3f0';
      // Draw some humidity effect
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = 'rgba(200, 220, 240, 0.3)';
        ctx.beginPath();
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 3 + 1,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
    ctx.fillRect(0, 0, width, height);
    
    // Draw the material
    ctx.fillStyle = material === 'wool' ? '#cc9966' : material === 'plastic' ? '#3366cc' : '#66cc99';
    ctx.fillRect(width/2 - 60, height/2 - 40, 120, 80);
    
    // Draw charge particles
    const particleCount = Math.abs(chargeLevel) / 3;
    for (let i = 0; i < particleCount; i++) {
      ctx.beginPath();
      
      if (chargeLevel > 0) {
        // Positive charges (red)
        ctx.fillStyle = `rgba(255, 50, 50, ${0.2 + chargeLevel/150})`;
        ctx.arc(
          width/2 + Math.random() * 80 - 40,
          height/2 + Math.random() * 60 - 30,
          Math.random() * 4 + 2,
          0,
          Math.PI * 2
        );
      } else if (chargeLevel < 0) {
        // Negative charges (blue)
        ctx.fillStyle = `rgba(50, 50, 255, ${0.2 + Math.abs(chargeLevel)/150})`;
        ctx.arc(
          width/2 + Math.random() * 80 - 40,
          height/2 + Math.random() * 60 - 30,
          Math.random() * 4 + 2,
          0,
          Math.PI * 2
        );
      }
      
      ctx.fill();
    }
    
    // Draw sparks if highly charged
    if (Math.abs(chargeLevel) > 70) {
      for (let i = 0; i < 3; i++) {
        drawSpark(ctx, width/2 + (chargeLevel > 0 ? 70 : -70), height/2);
      }
    }
    
    // Draw text label
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(material.toUpperCase(), width/2, height/2 + 70);
  }, [chargeLevel, material, environment]);
  
  // Draw a spark effect
  const drawSpark = (ctx, x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    const length = 30 + Math.random() * 20;
    const angle = Math.random() * Math.PI * 2;
    const branches = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < branches; i++) {
      const branchX = x + Math.cos(angle) * length * (i+1)/branches;
      const branchY = y + Math.sin(angle) * length * (i+1)/branches;
      
      ctx.lineTo(branchX, branchY);
      
      // Add some jaggedness
      for (let j = 0; j < 2; j++) {
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        ctx.lineTo(branchX + offsetX, branchY + offsetY);
      }
    }
    
    ctx.strokeStyle = chargeLevel > 0 ? 'rgba(255, 50, 50, 0.7)' : 'rgba(50, 50, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  
  return (
    <div className="static-electricity-lab">
      <header className="lab-header">
        <h1>Static Electricity Lab Ethiopia</h1>
        <nav className="lab-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/simulation" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Simulation
          </NavLink>
          <NavLink to="/theory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Theory
          </NavLink>
          <NavLink to="/experiments" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Experiments
          </NavLink>
        </nav>
      </header>
      
      <div className="simulation-container">
        <div className="simulation-content">
          <div className="canvas-container">
            <canvas 
              ref={canvasRef} 
              width="400" 
              height="300" 
              className="simulation-canvas"
            />
            <div className="charge-indicator">
              <div className="charge-label">CHARGE LEVEL:</div>
              <div className="charge-meter">
                <div 
                  className="charge-fill"
                  style={{ 
                    width: `${Math.abs(chargeLevel)}%`,
                    backgroundColor: chargeLevel > 0 ? '#ff3333' : '#3366ff'
                  }}
                />
              </div>
              <div className="charge-value">
                {chargeLevel > 0 ? `+${chargeLevel}%` : `${chargeLevel}%`}
              </div>
            </div>
          </div>
          
          <div className="controls-panel">
            <h2>Simulation Controls</h2>
            
            <div className="control-group">
              <h3>Material Selection</h3>
              <div className="button-group">
                <button 
                  className={material === 'wool' ? 'btn active' : 'btn'}
                  onClick={() => handleMaterialChange('wool')}
                >
                  Wool
                </button>
                <button 
                  className={material === 'plastic' ? 'btn active' : 'btn'}
                  onClick={() => handleMaterialChange('plastic')}
                >
                  Plastic
                </button>
                <button 
                  className={material === 'glass' ? 'btn active' : 'btn'}
                  onClick={() => handleMaterialChange('glass')}
                >
                  Glass
                </button>
              </div>
            </div>
            
            <div className="control-group">
              <h3>Environment</h3>
              <div className="button-group">
                <button 
                  className={environment === 'dry' ? 'btn active' : 'btn'}
                  onClick={() => handleEnvironmentChange('dry')}
                >
                  Dry Air
                </button>
                <button 
                  className={environment === 'humid' ? 'btn active' : 'btn'}
                  onClick={() => handleEnvironmentChange('humid')}
                >
                  Humid Air
                </button>
              </div>
            </div>
            
            <div className="control-group">
              <h3>Actions</h3>
              <div className="button-group">
                <button 
                  className={isRubbing ? 'btn rubbing' : 'btn'}
                  onClick={handleRubbing}
                  disabled={isRubbing}
                >
                  {isRubbing ? 'Rubbing...' : 'Rub Material'}
                </button>
                <button 
                  className="btn"
                  onClick={handleDischarge}
                >
                  Discharge
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="explanation-panel">
          <h2>Static Electricity Principles</h2>
          <p>
            Static electricity is the result of an imbalance between negative and positive charges in an object.
            When two materials are rubbed together, electrons can be transferred from one material to the other.
          </p>
          
          <div className="principle">
            <h3>Current Charge Status</h3>
            <p>
              Your {material} material is currently {chargeLevel === 0 ? 'neutral' : chargeLevel > 0 ? 
              `positively charged (lost electrons)` : `negatively charged (gained electrons)`}.
            </p>
            <p>
              The {environment} environment {environment === 'humid' ? 
              'makes it easier for charges to dissipate' : 
              'helps maintain the charge buildup'}.
            </p>
          </div>
          
          <div className="principle">
            <h3>Try These Experiments</h3>
            <ul>
              <li>Rub wool with plastic to create a strong negative charge</li>
              <li>Switch to humid environment to see how charge dissipates</li>
              <li>Build up a strong charge and watch the spark effects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticElectricity;