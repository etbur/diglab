import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './MotionForce.css';

const MotionForce = () => {
  // State for simulation parameters
  const [mass, setMass] = useState(5);
  const [initialVelocity, setInitialVelocity] = useState(10);
  const [force, setForce] = useState(20);
  const [angle, setAngle] = useState(30);
  const [gravity, setGravity] = useState(9.8);
  const [friction, setFriction] = useState(0.1);
  const [time, setTime] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  
  // Refs for animation and canvas
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const objectPosition = useRef({ x: 50, y: 350 });
  const objectVelocity = useRef({ x: initialVelocity * Math.cos(angle * Math.PI / 180), y: -initialVelocity * Math.sin(angle * Math.PI / 180) });

  // Physics calculations
  const calculateTrajectory = () => {
    const points = [];
    const timeStep = 0.1;
    let t = 0;
    let x = 0;
    let y = 0;
    let vx = initialVelocity * Math.cos(angle * Math.PI / 180);
    let vy = -initialVelocity * Math.sin(angle * Math.PI / 180);
    
    while (y <= 0 && t < 20) {
      x = vx * t;
      y = (vy * t) + (0.5 * gravity * t * t);
      
      // Apply force effect
      const fx = force * Math.cos(angle * Math.PI / 180) / mass;
      const fy = force * Math.sin(angle * Math.PI / 180) / mass;
      
      vx = vx + fx * timeStep - friction * vx * timeStep;
      vy = vy + fy * timeStep + gravity * timeStep - friction * vy * timeStep;
      
      points.push({ x, y });
      t += timeStep;
    }
    
    return points;
  };

  const trajectory = calculateTrajectory();
  const maxHeight = Math.max(...trajectory.map(p => -p.y), 0);
  const range = trajectory.length > 0 ? trajectory[trajectory.length - 1].x : 0;
  const duration = trajectory.length * 0.1;

  // Start/pause simulation
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  // Reset simulation
  const resetSimulation = () => {
    setIsSimulating(false);
    setTime(0);
    objectPosition.current = { x: 50, y: 350 };
    objectVelocity.current = { 
      x: initialVelocity * Math.cos(angle * Math.PI / 180), 
      y: -initialVelocity * Math.sin(angle * Math.PI / 180) 
    };
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
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
    
    // Draw sky
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, width, height);
    
    // Draw ground
    ctx.fillStyle = '#8a6642';
    ctx.fillRect(0, height - 50, width, 50);
    
    // Draw grass
    ctx.fillStyle = '#5a8c5a';
    ctx.fillRect(0, height - 50, width, 10);
    
    // Draw trajectory
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    
    const scaleX = (width - 100) / (range > 0 ? range : 100);
    const scaleY = (height - 100) / (maxHeight > 0 ? maxHeight * 2 : 200);
    
    trajectory.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(50, height - 50);
      } else {
        ctx.lineTo(50 + point.x * scaleX, height - 50 - point.y * scaleY);
      }
    });
    
    ctx.stroke();
    
    // Draw object
    const objectSize = 15 + mass;
    ctx.fillStyle = '#3366cc';
    ctx.beginPath();
    ctx.arc(objectPosition.current.x, objectPosition.current.y, objectSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw velocity vector
    if (isSimulating) {
      const arrowScale = 5;
      ctx.beginPath();
      ctx.strokeStyle = '#ff3333';
      ctx.lineWidth = 2;
      ctx.moveTo(objectPosition.current.x, objectPosition.current.y);
      ctx.lineTo(
        objectPosition.current.x + objectVelocity.current.x * arrowScale,
        objectPosition.current.y + objectVelocity.current.y * arrowScale
      );
      ctx.stroke();
      
      // Draw arrowhead
      const angle = Math.atan2(objectVelocity.current.y, objectVelocity.current.x);
      ctx.beginPath();
      ctx.fillStyle = '#ff3333';
      ctx.moveTo(
        objectPosition.current.x + objectVelocity.current.x * arrowScale,
        objectPosition.current.y + objectVelocity.current.y * arrowScale
      );
      ctx.lineTo(
        objectPosition.current.x + objectVelocity.current.x * arrowScale - 10 * Math.cos(angle - Math.PI/6),
        objectPosition.current.y + objectVelocity.current.y * arrowScale - 10 * Math.sin(angle - Math.PI/6)
      );
      ctx.lineTo(
        objectPosition.current.x + objectVelocity.current.x * arrowScale - 10 * Math.cos(angle + Math.PI/6),
        objectPosition.current.y + objectVelocity.current.y * arrowScale - 10 * Math.sin(angle + Math.PI/6)
      );
      ctx.closePath();
      ctx.fill();
    }
    
    // Draw force vector
    const forceAngle = angle * Math.PI / 180;
    const forceMagnitude = force / 5;
    ctx.beginPath();
    ctx.strokeStyle = '#33cc33';
    ctx.lineWidth = 3;
    ctx.moveTo(objectPosition.current.x, objectPosition.current.y);
    ctx.lineTo(
      objectPosition.current.x + forceMagnitude * Math.cos(forceAngle),
      objectPosition.current.y - forceMagnitude * Math.sin(forceAngle)
    );
    ctx.stroke();
    
    // Draw info
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.fillText(`Time: ${time.toFixed(2)}s`, 20, 30);
    ctx.fillText(`Velocity: X:${objectVelocity.current.x.toFixed(2)} Y:${objectVelocity.current.y.toFixed(2)}`, 20, 50);
    ctx.fillText(`Position: X:${((objectPosition.current.x - 50) / scaleX).toFixed(2)} Y:${((height - 50 - objectPosition.current.y) / scaleY).toFixed(2)}`, 20, 70);
  };

  // Animation loop
  useEffect(() => {
    if (!isSimulating) return;
    
    let lastTime = 0;
    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = (timestamp - lastTime) / 1000 * simulationSpeed;
      lastTime = timestamp;
      
      // Update physics
      setTime(prev => prev + deltaTime);
      
      // Calculate forces
      const fx = force * Math.cos(angle * Math.PI / 180) / mass;
      const fy = force * Math.sin(angle * Math.PI / 180) / mass;
      
      // Update velocity (with friction)
      objectVelocity.current.x = objectVelocity.current.x + fx * deltaTime - friction * objectVelocity.current.x * deltaTime;
      objectVelocity.current.y = objectVelocity.current.y + fy * deltaTime + gravity * deltaTime - friction * objectVelocity.current.y * deltaTime;
      
      // Update position
      objectPosition.current.x += objectVelocity.current.x * deltaTime * 20;
      objectPosition.current.y += objectVelocity.current.y * deltaTime * 20;
      
      // Check boundaries
      const canvas = canvasRef.current;
      if (canvas && objectPosition.current.y > canvas.height - 50) {
        objectPosition.current.y = canvas.height - 50;
        objectVelocity.current.y = -objectVelocity.current.y * 0.8; // Bounce with energy loss
        if (Math.abs(objectVelocity.current.y) < 2) {
          objectVelocity.current.y = 0;
        }
      }
      
      if (canvas && (objectPosition.current.x < 0 || objectPosition.current.x > canvas.width)) {
        objectVelocity.current.x = -objectVelocity.current.x * 0.8; // Bounce with energy loss
        if (objectPosition.current.x < 0) objectPosition.current.x = 0;
        if (objectPosition.current.x > canvas.width) objectPosition.current.x = canvas.width;
      }
      
      drawCanvas();
      
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
  }, [isSimulating, simulationSpeed, mass, force, angle, gravity, friction]);

  // Initial draw and parameter updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawCanvas();
    }
  }, [mass, initialVelocity, force, angle, gravity, friction]);

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
    <div className="motion-force-lab">
      <header className="lab-header">
        <h1>Motion & Force Lab Ethiopia</h1>
        <nav className="lab-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/motion" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Motion
          </NavLink>
          <NavLink to="/force" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Forces
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Projects
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
                max="20" 
                value={mass}
                onChange={(e) => setMass(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Initial Velocity (m/s): {initialVelocity}</label>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={initialVelocity}
                onChange={(e) => setInitialVelocity(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Force (N): {force}</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={force}
                onChange={(e) => setForce(parseInt(e.target.value))}
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
              <label>Gravity (m/s²): {gravity.toFixed(1)}</label>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="0.1"
                value={gravity}
                onChange={(e) => setGravity(parseFloat(e.target.value))}
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
            <h3>Projectile Motion</h3>
            <p>Initial Velocity: {initialVelocity} m/s at {angle}°</p>
            <p>Horizontal Velocity: {(initialVelocity * Math.cos(angle * Math.PI / 180)).toFixed(2)} m/s</p>
            <p>Vertical Velocity: {(initialVelocity * Math.sin(angle * Math.PI / 180)).toFixed(2)} m/s</p>
          </div>
          
          <div className="calculation">
            <h3>Trajectory</h3>
            <p>Max Height: {maxHeight.toFixed(2)} m</p>
            <p>Range: {range.toFixed(2)} m</p>
            <p>Duration: {duration.toFixed(2)} s</p>
          </div>
          
          <div className="calculation">
            <h3>Forces</h3>
            <p>Applied Force: {force} N at {angle}°</p>
            <p>Horizontal Force: {(force * Math.cos(angle * Math.PI / 180)).toFixed(2)} N</p>
            <p>Vertical Force: {(force * Math.sin(angle * Math.PI / 180)).toFixed(2)} N</p>
            <p>Gravity Force: {(mass * gravity).toFixed(2)} N</p>
          </div>
        </div>
        
        <div className="explanation-panel">
          <h2>Motion & Force Principles</h2>
          
          <div className="principle">
            <h3>Newton's Laws of Motion</h3>
            <p>
              Newton's laws describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.
            </p>
            <ul>
              <li>First Law: An object at rest remains at rest, and an object in motion remains in motion at constant speed unless acted upon by a force.</li>
              <li>Second Law: F = ma (Force equals mass times acceleration).</li>
              <li>Third Law: For every action, there is an equal and opposite reaction.</li>
            </ul>
          </div>
          
          <div className="principle">
            <h3>Projectile Motion</h3>
            <p>
              Projectile motion is the motion of an object thrown or projected into the air, subject to only the acceleration of gravity.
              The path of a projectile is parabolic.
            </p>
          </div>
          
          <div className="principle">
            <h3>Forces</h3>
            <p>
              A force is any interaction that, when unopposed, will change the motion of an object. Forces can be categorized as
              contact forces (e.g., friction, air resistance) or field forces (e.g., gravity, magnetism).
            </p>
          </div>
          
          <div className="experiment-tips">
            <h3>Experiment Tips</h3>
            <ul>
              <li>Adjust the angle to see how it affects the trajectory</li>
              <li>Change the force to see how it affects acceleration</li>
              <li>Modify gravity to simulate different planets</li>
              <li>Adjust friction to see how it affects motion</li>
              <li>Try different mass values to see how mass affects acceleration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotionForce;