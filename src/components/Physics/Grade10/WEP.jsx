import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './WEP.css';

const WEP = () => {
  const [mass, setMass] = useState(10);
  const [force, setForce] = useState(50);
  const [distance, setDistance] = useState(20);
  const [time, setTime] = useState(5);
  const [angle, setAngle] = useState(0);
  const [friction, setFriction] = useState(0.1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [objectPosition, setObjectPosition] = useState(0);
  const [objectVelocity, setObjectVelocity] = useState(0);
  const [simulationTime, setSimulationTime] = useState(0);
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Calculate physics values
  const angleRad = angle * Math.PI / 180;
  const work = force * distance * Math.cos(angleRad);
  const acceleration = force / mass;
  const finalVelocity = Math.sqrt(2 * acceleration * distance);
  const power = work / time;
  const kineticEnergy = 0.5 * mass * finalVelocity * finalVelocity;

  // Start/pause simulation
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  // Reset simulation
  const resetSimulation = () => {
    setIsSimulating(false);
    setObjectPosition(0);
    setObjectVelocity(0);
    setSimulationTime(0);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    drawSimulation();
  };

  // Draw simulation
  const drawSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);
    
    // Draw ground
    ctx.fillStyle = '#8a6642';
    ctx.fillRect(0, height - 50, width, 50);
    
    // Draw grass
    ctx.fillStyle = '#5a8c5a';
    ctx.fillRect(0, height - 50, width, 10);
    
    // Draw object
    const objectSize = 30 + mass / 2;
    const maxDistance = distance;
    const objectX = 100 + (objectPosition / maxDistance) * (width - 200);
    const objectY = height - 50 - objectSize;
    
    ctx.fillStyle = '#3366cc';
    ctx.fillRect(objectX, objectY, objectSize, objectSize);
    
    // Draw force arrow if not moving
    if (!isSimulating || objectPosition >= maxDistance) {
      const arrowLength = force / 2;
      
      ctx.beginPath();
      ctx.moveTo(objectX + objectSize/2, objectY + objectSize/2);
      ctx.lineTo(
        objectX + objectSize/2 + arrowLength * Math.cos(angleRad),
        objectY + objectSize/2 - arrowLength * Math.sin(angleRad)
      );
      ctx.strokeStyle = '#ff3333';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw arrowhead
      ctx.beginPath();
      ctx.fillStyle = '#ff3333';
      ctx.moveTo(
        objectX + objectSize/2 + arrowLength * Math.cos(angleRad),
        objectY + objectSize/2 - arrowLength * Math.sin(angleRad)
      );
      ctx.lineTo(
        objectX + objectSize/2 + (arrowLength - 10) * Math.cos(angleRad) - 5 * Math.sin(angleRad),
        objectY + objectSize/2 - (arrowLength - 10) * Math.sin(angleRad) - 5 * Math.cos(angleRad)
      );
      ctx.lineTo(
        objectX + objectSize/2 + (arrowLength - 10) * Math.cos(angleRad) + 5 * Math.sin(angleRad),
        objectY + objectSize/2 - (arrowLength - 10) * Math.sin(angleRad) + 5 * Math.cos(angleRad)
      );
      ctx.closePath();
      ctx.fill();
    }
    
    // Draw distance marker
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(100 + objectSize, objectY + objectSize/2);
    ctx.lineTo(100 + (width - 200) + objectSize, objectY + objectSize/2);
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw distance label
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText(`${maxDistance}m`, 100 + (width - 200)/2, objectY + objectSize/2 - 10);
    
    // Draw angle arc if angle > 0
    if (angle > 0 && angle < 90) {
      ctx.beginPath();
      ctx.arc(objectX + objectSize/2, objectY + objectSize/2, 20, -angleRad, 0);
      ctx.strokeStyle = '#33cc33';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw angle label
      ctx.fillStyle = '#33cc33';
      ctx.fillText(`${angle}°`, objectX + objectSize/2 + 15, objectY + objectSize/2 - 10);
    }
    
    // Draw values
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.fillText(`Position: ${objectPosition.toFixed(2)}m`, 20, 30);
    ctx.fillText(`Velocity: ${objectVelocity.toFixed(2)}m/s`, 20, 50);
    ctx.fillText(`Time: ${simulationTime.toFixed(2)}s`, 20, 70);
  };

  // Animation loop
  useEffect(() => {
    if (!isSimulating) return;
    
    const animate = () => {
      // Calculate acceleration (F = ma)
      const effectiveForce = force * Math.cos(angleRad) - friction * mass * 9.8;
      const acceleration = effectiveForce / mass;
      
      // Update velocity and position
      const timeStep = 0.05 * simulationSpeed;
      setObjectVelocity(prev => prev + acceleration * timeStep);
      setObjectPosition(prev => prev + objectVelocity * timeStep);
      setSimulationTime(prev => prev + timeStep);
      
      // Stop if reached max distance
      if (objectPosition >= distance) {
        setObjectPosition(distance);
        setObjectVelocity(0);
        setIsSimulating(false);
      }
      
      drawSimulation();
      
      if (isSimulating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSimulating, simulationSpeed, mass, force, distance, angle, friction, objectVelocity, objectPosition]);

  // Initial draw and redraw when parameters change
  useEffect(() => {
    drawSimulation();
  }, [mass, force, distance, time, angle, friction]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawSimulation();
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="wep-lab">
      <header className="lab-header">
        <h1>Work, Energy, and Power Lab Ethiopia</h1>
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
              className="simulation-canvas"
            />
            
            <div className="simulation-controls">
              <button 
                className={isSimulating ? 'btn pause-btn' : 'btn play-btn'}
                onClick={toggleSimulation}
              >
                {isSimulating ? 'Pause' : 'Play'}
              </button>
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
          
          <div className="controls-panel">
            <h2>Simulation Parameters</h2>
            
            <div className="control-group">
              <label>Mass (kg): {mass}</label>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={mass}
                onChange={(e) => setMass(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Force (N): {force}</label>
              <input 
                type="range" 
                min="1" 
                max="200" 
                value={force}
                onChange={(e) => setForce(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Distance (m): {distance}</label>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Time (s): {time}</label>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={time}
                onChange={(e) => setTime(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Angle (degrees): {angle}</label>
              <input 
                type="range" 
                min="0" 
                max="90" 
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Friction: {friction.toFixed(2)}</label>
              <input 
                type="range" 
                min="0" 
                max="0.5" 
                step="0.01" 
                value={friction}
                onChange={(e) => setFriction(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
        
        <div className="calculations-panel">
          <h2>Physics Calculations</h2>
          
          <div className="calculation">
            <h3>Work</h3>
            <p>W = F × d × cos(θ) = {force} × {distance} × cos({angle}°) = {work.toFixed(2)} J</p>
          </div>
          
          <div className="calculation">
            <h3>Power</h3>
            <p>P = W / t = {work.toFixed(2)} / {time} = {power.toFixed(2)} W</p>
          </div>
          
          <div className="calculation">
            <h3>Kinetic Energy</h3>
            <p>KE = ½ × m × v² = ½ × {mass} × ({finalVelocity.toFixed(2)})² = {kineticEnergy.toFixed(2)} J</p>
          </div>
          
          <div className="calculation">
            <h3>Final Velocity</h3>
            <p>v = √(2 × a × d) = √(2 × {(force/mass).toFixed(2)} × {distance}) = {finalVelocity.toFixed(2)} m/s</p>
          </div>
        </div>
        
        <div className="explanation-panel">
          <h2>Work, Energy, and Power Principles</h2>
          
          <div className="principle">
            <h3>Work</h3>
            <p>
              Work is done when a force causes an object to move in the direction of the force.
              It is calculated as the product of force and displacement, with consideration for the angle between them.
            </p>
          </div>
          
          <div className="principle">
            <h3>Energy</h3>
            <p>
              Energy is the capacity to do work. Kinetic energy is the energy of motion, while potential energy is stored energy.
              The work-energy theorem states that the net work done on an object equals its change in kinetic energy.
            </p>
          </div>
          
          <div className="principle">
            <h3>Power</h3>
            <p>
              Power is the rate at which work is done or energy is transferred. It measures how quickly work is being performed.
              Higher power means the same amount of work is done in less time.
            </p>
          </div>
          
          <div className="experiment-tips">
            <h3>Experiment Tips</h3>
            <ul>
              <li>Try different angles to see how it affects the work done</li>
              <li>Increase mass while keeping force constant to observe changes in acceleration</li>
              <li>Adjust time to see how it affects power calculations</li>
              <li>Change friction to see how it impacts the final velocity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WEP;