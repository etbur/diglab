import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './HeatThermo.css';

const HeatThermo = () => {
  // State for simulation parameters
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [pressure, setPressure] = useState(101.3); // kPa
  const [volume, setVolume] = useState(1.0); // m³
  const [particles, setParticles] = useState(100);
  const [heatAdded, setHeatAdded] = useState(0);
  const [workDone, setWorkDone] = useState(0);
  const [isHeating, setIsHeating] = useState(false);
  const [isCooling, setIsCooling] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  
  // Refs for animation and canvas
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const gasParticles = useRef([]);

  // Constants
  const R = 8.314; // Ideal gas constant
  const kB = 1.38e-23; // Boltzmann constant

  // Initialize particles
  useEffect(() => {
    initializeParticles();
  }, [particles, volume]);

  // Initialize gas particles
  const initializeParticles = () => {
    const newParticles = [];
    const containerSize = Math.sqrt(volume) * 300;
    
    for (let i = 0; i < particles; i++) {
      const speed = Math.sqrt(temperature) * 0.2;
      const angle = Math.random() * Math.PI * 2;
      
      newParticles.push({
        x: Math.random() * containerSize,
        y: Math.random() * containerSize,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 3 + Math.random() * 2
      });
    }
    
    gasParticles.current = newParticles;
  };

  // Calculate thermodynamics values
  const n = (pressure * volume) / (R * temperature); // moles
  const internalEnergy = (3/2) * n * R * temperature; // Joules
  const heatCapacity = (3/2) * n * R; // J/K

  // Start/pause heating
  const toggleHeating = () => {
    setIsHeating(!isHeating);
    setIsCooling(false);
  };

  // Start/pause cooling
  const toggleCooling = () => {
    setIsCooling(!isCooling);
    setIsHeating(false);
  };

  // Start/pause compression
  const toggleCompression = () => {
    setIsCompressing(!isCompressing);
    setIsExpanding(false);
  };

  // Start/pause expansion
  const toggleExpansion = () => {
    setIsExpanding(!isExpanding);
    setIsCompressing(false);
  };

  // Reset simulation
  const resetSimulation = () => {
    setIsHeating(false);
    setIsCooling(false);
    setIsCompressing(false);
    setIsExpanding(false);
    setHeatAdded(0);
    setWorkDone(0);
    setTemperature(300);
    setPressure(101.3);
    setVolume(1.0);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    initializeParticles();
    drawCanvas();
  };

  // Draw the canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw container background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);
    
    // Draw container
    const containerSize = Math.sqrt(volume) * 300;
    const containerX = (width - containerSize) / 2;
    const containerY = (height - containerSize) / 2;
    
    ctx.strokeStyle = '#4cc9f0';
    ctx.lineWidth = 3;
    ctx.strokeRect(containerX, containerY, containerSize, containerSize);
    
    // Draw particles
    const particles = gasParticles.current;
    const scale = containerSize / Math.sqrt(volume);
    
    particles.forEach(particle => {
      // Draw particle
      const hue = 240 - (temperature / 600 * 240);
      ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.beginPath();
      ctx.arc(
        containerX + particle.x * (scale / 300),
        containerY + particle.y * (scale / 300),
        particle.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Draw velocity vector
      if (temperature > 320) {
        ctx.strokeStyle = `hsl(${hue}, 100%, 80%)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(
          containerX + particle.x * (scale / 300),
          containerY + particle.y * (scale / 300)
        );
        ctx.lineTo(
          containerX + (particle.x + particle.vx * 5) * (scale / 300),
          containerY + (particle.y + particle.vy * 5) * (scale / 300)
        );
        ctx.stroke();
      }
    });
    
    // Draw thermometer
    drawThermometer(ctx, width, height);
    
    // Draw pressure gauge
    drawPressureGauge(ctx, width, height);
    
    // Draw info
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText(`Temperature: ${temperature.toFixed(2)} K`, 20, 30);
    ctx.fillText(`Pressure: ${pressure.toFixed(2)} kPa`, 20, 50);
    ctx.fillText(`Volume: ${volume.toFixed(2)} m³`, 20, 70);
    ctx.fillText(`Heat Added: ${heatAdded.toFixed(2)} J`, 20, 90);
    ctx.fillText(`Work Done: ${workDone.toFixed(2)} J`, 20, 110);
    ctx.fillText(`Internal Energy: ${internalEnergy.toFixed(2)} J`, 20, 130);
  };

  // Draw thermometer
  const drawThermometer = (ctx, width, height) => {
    const x = width - 100;
    const y = height - 200;
    
    // Draw thermometer body
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, 30, 150);
    
    // Draw mercury
    const tempHeight = (temperature / 600) * 140;
    ctx.fillStyle = temperature > 400 ? '#ff3300' : '#ff6600';
    ctx.fillRect(x + 5, y + 150 - tempHeight, 20, tempHeight);
    
    // Draw scale
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 600; i += 100) {
      const scaleY = y + 150 - (i / 600) * 140;
      ctx.beginPath();
      ctx.moveTo(x - 10, scaleY);
      ctx.lineTo(x, scaleY);
      ctx.stroke();
      ctx.fillText(`${i}K`, x - 35, scaleY + 4);
    }
    
    // Draw label
    ctx.fillText('Temperature', x - 40, y - 10);
  };

  // Draw pressure gauge
  const drawPressureGauge = (ctx, width, height) => {
    const x = width - 100;
    const y = height - 40;
    const radius = 35;
    
    // Draw gauge background
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw needle
    const angle = (pressure / 200) * Math.PI - Math.PI / 2;
    ctx.strokeStyle = '#ff3300';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.cos(angle) * (radius - 5),
      y + Math.sin(angle) * (radius - 5)
    );
    ctx.stroke();
    
    // Draw gauge markings
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 200; i += 50) {
      const markAngle = (i / 200) * Math.PI - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(
        x + Math.cos(markAngle) * (radius - 10),
        y + Math.sin(markAngle) * (radius - 10)
      );
      ctx.lineTo(
        x + Math.cos(markAngle) * radius,
        y + Math.sin(markAngle) * radius
      );
      ctx.stroke();
      
      ctx.fillText(`${i}`, 
        x + Math.cos(markAngle) * (radius + 15) - 10,
        y + Math.sin(markAngle) * (radius + 15) + 4
      );
    }
    
    // Draw label
    ctx.fillText('Pressure (kPa)', x - 30, y - radius - 10);
  };

  // Animation loop
  useEffect(() => {
    if (!isHeating && !isCooling && !isCompressing && !isExpanding) {
      drawCanvas();
      return;
    }
    
    const animate = () => {
      // Update temperature if heating or cooling
      if (isHeating) {
        setTemperature(prev => prev + 0.5 * simulationSpeed);
        setHeatAdded(prev => prev + heatCapacity * 0.5 * simulationSpeed);
      } else if (isCooling) {
        setTemperature(prev => Math.max(100, prev - 0.5 * simulationSpeed));
        setHeatAdded(prev => prev - heatCapacity * 0.5 * simulationSpeed);
      }
      
      // Update volume if compressing or expanding
      if (isCompressing) {
        setVolume(prev => Math.max(0.2, prev - 0.01 * simulationSpeed));
        setWorkDone(prev => prev + pressure * 0.01 * simulationSpeed);
      } else if (isExpanding) {
        setVolume(prev => Math.min(2.0, prev + 0.01 * simulationSpeed));
        setWorkDone(prev => prev - pressure * 0.01 * simulationSpeed);
      }
      
      // Update pressure based on ideal gas law
      setPressure((n * R * temperature) / volume);
      
      // Update particle motion
      const containerSize = Math.sqrt(volume) * 300;
      gasParticles.current.forEach(particle => {
        // Update position
        particle.x += particle.vx * simulationSpeed;
        particle.y += particle.vy * simulationSpeed;
        
        // Handle wall collisions
        if (particle.x < 0) {
          particle.x = 0;
          particle.vx = -particle.vx;
        } else if (particle.x > containerSize) {
          particle.x = containerSize;
          particle.vx = -particle.vx;
        }
        
        if (particle.y < 0) {
          particle.y = 0;
          particle.vy = -particle.vy;
        } else if (particle.y > containerSize) {
          particle.y = containerSize;
          particle.vy = -particle.vy;
        }
        
        // Adjust speed based on temperature
        const speedScale = Math.sqrt(temperature / 300);
        const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const baseSpeed = currentSpeed / speedScale;
        
        particle.vx = (particle.vx / currentSpeed) * baseSpeed * speedScale;
        particle.vy = (particle.vy / currentSpeed) * baseSpeed * speedScale;
      });
      
      drawCanvas();
      
      if (isHeating || isCooling || isCompressing || isExpanding) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHeating, isCooling, isCompressing, isExpanding, simulationSpeed, temperature, volume, pressure]);

  // Initial draw and parameter updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawCanvas();
    }
  }, [temperature, pressure, volume, particles]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawCanvas();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="heat-thermo-lab">
      <header className="lab-header">
        <h1>Heat & Thermodynamics Lab Ethiopia</h1>
        <nav className="lab-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/heat" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Heat
          </NavLink>
          <NavLink to="/thermodynamics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Thermodynamics
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
              className="simulation-canvas"
            />
            
            <div className="simulation-controls">
              <div className="control-buttons">
                <button 
                  className={isHeating ? 'btn heating-btn active' : 'btn heating-btn'}
                  onClick={toggleHeating}
                >
                  {isHeating ? 'Stop Heating' : 'Start Heating'}
                </button>
                <button 
                  className={isCooling ? 'btn cooling-btn active' : 'btn cooling-btn'}
                  onClick={toggleCooling}
                >
                  {isCooling ? 'Stop Cooling' : 'Start Cooling'}
                </button>
                <button 
                  className={isCompressing ? 'btn compressing-btn active' : 'btn compressing-btn'}
                  onClick={toggleCompression}
                >
                  {isCompressing ? 'Stop Compression' : 'Start Compression'}
                </button>
                <button 
                  className={isExpanding ? 'btn expanding-btn active' : 'btn expanding-btn'}
                  onClick={toggleExpansion}
                >
                  {isExpanding ? 'Stop Expansion' : 'Start Expansion'}
                </button>
              </div>
              
              <div className="secondary-controls">
                <button 
                  className="btn reset-btn"
                  onClick={resetSimulation}
                >
                  Reset
                </button>
                <div className="speed-control">
                  <label>Speed:</label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="5" 
                    step="0.1" 
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                  />
                  <span>{simulationSpeed.toFixed(1)}x</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="controls-panel">
            <h2>Simulation Parameters</h2>
            
            <div className="control-group">
              <label>Temperature: {temperature.toFixed(2)} K</label>
              <input 
                type="range" 
                min="100" 
                max="600" 
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Pressure: {pressure.toFixed(2)} kPa</label>
              <input 
                type="range" 
                min="50" 
                max="200" 
                step="0.1"
                value={pressure}
                onChange={(e) => setPressure(parseFloat(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Volume: {volume.toFixed(2)} m³</label>
              <input 
                type="range" 
                min="0.2" 
                max="2.0" 
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Particles: {particles}</label>
              <input 
                type="range" 
                min="10" 
                max="200" 
                step="10"
                value={particles}
                onChange={(e) => setParticles(parseInt(e.target.value))}
              />
            </div>
            
            <div className="info-box">
              <h3>Gas Properties</h3>
              <p>Moles: {n.toFixed(4)} mol</p>
              <p>Heat Capacity: {heatCapacity.toFixed(2)} J/K</p>
            </div>
          </div>
        </div>
        
        <div className="calculations-panel">
          <h2>Thermodynamics Calculations</h2>
          
          <div className="calculation">
            <h3>Ideal Gas Law</h3>
            <p>PV = nRT</p>
            <p>{pressure.toFixed(2)} × {volume.toFixed(2)} = {n.toFixed(4)} × {R} × {temperature.toFixed(2)}</p>
            <p>Left side: {(pressure * volume).toFixed(2)}</p>
            <p>Right side: {(n * R * temperature).toFixed(2)}</p>
          </div>
          
          <div className="calculation">
            <h3>First Law of Thermodynamics</h3>
            <p>ΔU = Q - W</p>
            <p>Change in Internal Energy = Heat Added - Work Done</p>
            <p>ΔU = {heatAdded.toFixed(2)} - {workDone.toFixed(2)} = {(heatAdded - workDone).toFixed(2)} J</p>
            <p>Actual Internal Energy: {internalEnergy.toFixed(2)} J</p>
          </div>
          
          <div className="calculation">
            <h3>Kinetic Theory</h3>
            <p>Average Kinetic Energy = (3/2)kT</p>
            <p> = (3/2) × {kB.toExponential(2)} × {temperature.toFixed(2)}</p>
            <p> = {(1.5 * kB * temperature).toExponential(2)} J per molecule</p>
          </div>
        </div>
        
        <div className="explanation-panel">
          <h2>Heat & Thermodynamics Principles</h2>
          
          <div className="principle">
            <h3>Laws of Thermodynamics</h3>
            <ul>
              <li><strong>Zeroth Law:</strong> If two systems are in thermal equilibrium with a third, they are in equilibrium with each other.</li>
              <li><strong>First Law:</strong> Energy cannot be created or destroyed, only converted from one form to another (ΔU = Q - W).</li>
              <li><strong>Second Law:</strong> The entropy of an isolated system never decreases.</li>
              <li><strong>Third Law:</strong> As temperature approaches absolute zero, the entropy of a system approaches a constant minimum.</li>
            </ul>
          </div>
          
          <div className="principle">
            <h3>Ideal Gas Law</h3>
            <p>
              The ideal gas law describes the relationship between pressure, volume, temperature, and the number of moles of a gas:
              PV = nRT, where R is the ideal gas constant.
            </p>
          </div>
          
          <div className="principle">
            <h3>Kinetic Theory of Gases</h3>
            <p>
              The kinetic theory explains the behavior of gases based on the idea that they consist of rapidly moving particles.
              The temperature of a gas is directly proportional to the average kinetic energy of its particles.
            </p>
          </div>
          
          <div className="experiment-tips">
            <h3>Experiment Tips</h3>
            <ul>
              <li>Heat the gas and observe how pressure changes at constant volume</li>
              <li>Compress the gas and observe how temperature changes</li>
              <li>Compare the effects of heating vs. compression on pressure</li>
              <li>Observe how particle speed changes with temperature</li>
              <li>Verify the ideal gas law by adjusting parameters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatThermo;