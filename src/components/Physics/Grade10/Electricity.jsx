import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Electricity.css';

const Electricity = () => {
  // State for simulation parameters
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(100);
  const [capacitance, setCapacitance] = useState(100);
  const [inductance, setInductance] = useState(10);
  const [frequency, setFrequency] = useState(60);
  const [circuitType, setCircuitType] = useState('dc');
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [isSimulating, setIsSimulating] = useState(true);
  const [showField, setShowField] = useState(true);
  const [showElectrons, setShowElectrons] = useState(true);
  
  // Refs for animation and canvas
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const electrons = useRef([]);
  const fieldLines = useRef([]);
  const currentTime = useRef(0);

  // Circuit calculations
  const current = voltage / resistance;
  const power = voltage * current;
  const capacitiveReactance = 1 / (2 * Math.PI * frequency * capacitance * 1e-6);
  const inductiveReactance = 2 * Math.PI * frequency * inductance * 1e-3;
  const impedance = Math.sqrt(Math.pow(resistance, 2) + Math.pow(inductiveReactance - capacitiveReactance, 2));

  // Initialize simulation elements
  useEffect(() => {
    initializeSimulation();
  }, [circuitType, voltage, resistance]);

  // Initialize simulation elements
  const initializeSimulation = () => {
    electrons.current = [];
    fieldLines.current = [];
    currentTime.current = 0;
    
    // Create electrons
    if (showElectrons) {
      for (let i = 0; i < 50; i++) {
        electrons.current.push({
          x: 100 + Math.random() * 400,
          y: 200 + (Math.random() - 0.5) * 100,
          vx: (0.5 + Math.random() * 0.5) * (voltage / 12),
          radius: 2 + Math.random() * 1,
          charge: -1
        });
      }
    }
    
    // Create positive charges
    for (let i = 0; i < 20; i++) {
      electrons.current.push({
        x: 100 + Math.random() * 400,
        y: 200 + (Math.random() - 0.5) * 100,
        vx: 0,
        radius: 3 + Math.random() * 1,
        charge: 1
      });
    }
    
    // Create field lines
    if (showField) {
      for (let i = 0; i < 150; i++) {
        const y = 100 + Math.random() * 200;
        fieldLines.current.push({
          x: 100,
          y: y,
          length: 0,
          targetLength: 300 + Math.random() * 100
        });
      }
    }
  };

  // Start/pause simulation
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  // Reset simulation
  const resetSimulation = () => {
    setIsSimulating(true);
    initializeSimulation();
    
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
    
    // Draw background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw circuit based on type
    if (circuitType === 'dc') {
      drawDCCircuit(ctx, width, height);
    } else if (circuitType === 'ac') {
      drawACCircuit(ctx, width, height);
    } else if (circuitType === 'rc') {
      drawRCCircuit(ctx, width, height);
    } else if (circuitType === 'rl') {
      drawRLCircuit(ctx, width, height);
    } else if (circuitType === 'rlc') {
      drawRLCircuit(ctx, width, height, true);
    }
    
    // Draw electric field if enabled
    if (showField) {
      drawElectricField(ctx, width, height);
    }
    
    // Draw electrons if enabled
    if (showElectrons) {
      drawElectrons(ctx, width, height);
    }
    
    // Draw info panel
    drawInfoPanel(ctx, width, height);
  };

  // Draw DC circuit
  const drawDCCircuit = (ctx, width, height) => {
    const centerY = height / 2;
    
    // Draw battery
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(50, centerY - 30, 20, 60);
    ctx.fillStyle = '#3333ff';
    ctx.fillRect(50, centerY - 30, 20, 20);
    
    // Draw wires
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(70, centerY);
    ctx.lineTo(150, centerY);
    ctx.stroke();
    
    // Draw resistor
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, centerY);
    for (let i = 0; i < 8; i++) {
      ctx.lineTo(170 + i * 10, centerY + (i % 2 === 0 ? 10 : -10));
    }
    ctx.lineTo(250, centerY);
    ctx.stroke();
    
    // Draw remaining wires
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, centerY);
    ctx.lineTo(350, centerY);
    ctx.lineTo(350, centerY - 100);
    ctx.lineTo(70, centerY - 100);
    ctx.lineTo(70, centerY);
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText(`${voltage}V`, 30, centerY - 40);
    ctx.fillText(`${resistance}Ω`, 180, centerY - 20);
    ctx.fillText(`I = ${current.toFixed(2)}A`, 180, centerY + 30);
  };

  // Draw AC circuit
  const drawACCircuit = (ctx, width, height) => {
    const centerY = height / 2;
    
    // Draw AC source
    ctx.strokeStyle = '#ff33ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(70, centerY, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillText('AC', 65, centerY + 5);
    
    // Draw sine wave inside source
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 20; i++) {
      const x = 60 + i;
      const y = centerY + Math.sin(i / 20 * Math.PI * 2) * 10;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Draw wires
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(90, centerY);
    ctx.lineTo(150, centerY);
    ctx.stroke();
    
    // Draw resistor
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, centerY);
    for (let i = 0; i < 8; i++) {
      ctx.lineTo(170 + i * 10, centerY + (i % 2 === 0 ? 10 : -10));
    }
    ctx.lineTo(250, centerY);
    ctx.stroke();
    
    // Draw remaining wires
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, centerY);
    ctx.lineTo(350, centerY);
    ctx.lineTo(350, centerY - 100);
    ctx.lineTo(70, centerY - 100);
    ctx.lineTo(70, centerY);
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText(`${voltage}V AC`, 30, centerY - 40);
    ctx.fillText(`${resistance}Ω`, 180, centerY - 20);
    ctx.fillText(`I = ${(voltage / impedance).toFixed(2)}A`, 180, centerY + 30);
  };

  // Draw RC circuit
  const drawRCCircuit = (ctx, width, height) => {
    const centerY = height / 2;
    
    // Draw battery
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(50, centerY - 30, 20, 60);
    ctx.fillStyle = '#3333ff';
    ctx.fillRect(50, centerY - 30, 20, 20);
    
    // Draw wires
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(70, centerY);
    ctx.lineTo(150, centerY);
    ctx.stroke();
    
    // Draw resistor
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, centerY);
    for (let i = 0; i < 8; i++) {
      ctx.lineTo(170 + i * 10, centerY + (i % 2 === 0 ? 10 : -10));
    }
    ctx.lineTo(250, centerY);
    ctx.stroke();
    
    // Draw capacitor
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, centerY - 15);
    ctx.lineTo(250, centerY + 15);
    ctx.moveTo(270, centerY - 15);
    ctx.lineTo(270, centerY + 15);
    ctx.stroke();
    
    // Draw remaining wires
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(270, centerY);
    ctx.lineTo(350, centerY);
    ctx.lineTo(350, centerY - 100);
    ctx.lineTo(70, centerY - 100);
    ctx.lineTo(70, centerY);
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText(`${voltage}V`, 30, centerY - 40);
    ctx.fillText(`${resistance}Ω`, 180, centerY - 20);
    ctx.fillText(`${capacitance}μF`, 250, centerY - 30);
  };

  // Draw RL circuit
  const drawRLCircuit = (ctx, width, height, withCapacitor = false) => {
    const centerY = height / 2;
    
    // Draw battery
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(50, centerY - 30, 20, 60);
    ctx.fillStyle = '#3333ff';
    ctx.fillRect(50, centerY - 30, 20, 20);
    
    // Draw wires
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(70, centerY);
    ctx.lineTo(150, centerY);
    ctx.stroke();
    
    // Draw resistor
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, centerY);
    for (let i = 0; i < 8; i++) {
      ctx.lineTo(170 + i * 10, centerY + (i % 2 === 0 ? 10 : -10));
    }
    ctx.lineTo(250, centerY);
    ctx.stroke();
    
    // Draw inductor
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, centerY);
    for (let i = 0; i < 5; i++) {
      ctx.arc(260 + i * 10, centerY, 10, Math.PI, 0, i % 2 === 0);
    }
    ctx.stroke();
    
    // Draw capacitor if RLC circuit
    if (withCapacitor) {
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(300, centerY - 15);
      ctx.lineTo(300, centerY + 15);
      ctx.moveTo(320, centerY - 15);
      ctx.lineTo(320, centerY + 15);
      ctx.stroke();
    }
    
    // Draw remaining wires
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(withCapacitor ? 320 : 300, centerY);
    ctx.lineTo(350, centerY);
    ctx.lineTo(350, centerY - 100);
    ctx.lineTo(70, centerY - 100);
    ctx.lineTo(70, centerY);
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText(`${voltage}V`, 30, centerY - 40);
    ctx.fillText(`${resistance}Ω`, 180, centerY - 20);
    ctx.fillText(`${inductance}mH`, 250, centerY - 30);
    if (withCapacitor) {
      ctx.fillText(`${capacitance}μF`, 300, centerY - 30);
    }
  };

  // Draw electric field
  const drawElectricField = (ctx, width, height) => {
    fieldLines.current.forEach(line => {
      const progress = Math.min(1, line.length / line.targetLength);
      const x = line.x + progress * 300;
      
      ctx.strokeStyle = `rgba(255, 50, 50, ${0.2 + progress * 0.6})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(x, line.y);
      ctx.stroke();
      
      // Draw arrowhead
      if (progress > 0.1) {
        ctx.fillStyle = `rgba(255, 50, 50, ${0.2 + progress * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(x, line.y);
        ctx.lineTo(x - 8, line.y - 4);
        ctx.lineTo(x - 8, line.y + 4);
        ctx.closePath();
        ctx.fill();
      }
    });
  };

  // Draw electrons
  const drawElectrons = (ctx, width, height) => {
    electrons.current.forEach(electron => {
      if (electron.charge < 0) {
        // Draw electron
        ctx.fillStyle = '#3366ff';
        ctx.beginPath();
        ctx.arc(electron.x, electron.y, electron.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw movement trail
        ctx.strokeStyle = 'rgba(51, 102, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(electron.x - electron.vx * 5, electron.y);
        ctx.lineTo(electron.x, electron.y);
        ctx.stroke();
      } else {
        // Draw positive charge
        ctx.fillStyle = '#ff3333';
        ctx.beginPath();
        ctx.arc(electron.x, electron.y, electron.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  // Draw info panel
  const drawInfoPanel = (ctx, width, height) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(width - 250, 20, 230, circuitType === 'rlc' ? 180 : 150);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText('Circuit Parameters', width - 240, 40);
    ctx.fillText(`Voltage: ${voltage} V`, width - 240, 60);
    ctx.fillText(`Resistance: ${resistance} Ω`, width - 240, 80);
    
    if (circuitType === 'rc' || circuitType === 'rlc') {
      ctx.fillText(`Capacitance: ${capacitance} μF`, width - 240, 100);
    }
    
    if (circuitType === 'rl' || circuitType === 'rlc') {
      ctx.fillText(`Inductance: ${inductance} mH`, width - 240, circuitType === 'rlc' ? 120 : 100);
    }
    
    if (circuitType === 'ac' || circuitType === 'rlc') {
      ctx.fillText(`Frequency: ${frequency} Hz`, width - 240, circuitType === 'rlc' ? 140 : (circuitType === 'ac' ? 100 : 120));
    }
    
    ctx.fillText(`Current: ${circuitType === 'ac' || circuitType === 'rlc' ? (voltage / impedance).toFixed(2) : current.toFixed(2)} A`, width - 240, circuitType === 'rlc' ? 160 : (circuitType === 'ac' ? 120 : (circuitType === 'rc' || circuitType === 'rl' ? 120 : 100)));
    
    if (circuitType === 'rlc') {
      ctx.fillText(`Resonance: ${(1 / (2 * Math.PI * Math.sqrt(inductance * 1e-3 * capacitance * 1e-6))).toFixed(2)} Hz`, width - 240, 180);
    }
  };

  // Animation loop
  useEffect(() => {
    if (!isSimulating) {
      drawCanvas();
      return;
    }
    
    const animate = () => {
      currentTime.current += 0.01 * simulationSpeed;
      
      // Update field lines
      fieldLines.current.forEach(line => {
        line.length += 0.5 * simulationSpeed;
        if (line.length > line.targetLength * 1.2) {
          line.length = 0;
        }
      });
      
      // Update electrons
      electrons.current.forEach(electron => {
        if (electron.charge < 0) {
          // Move electrons (negative charges)
          electron.x += electron.vx * simulationSpeed;
          
          // Wrap around screen
          if (electron.x > 500) {
            electron.x = 100;
          }
        }
      });
      
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
  }, [isSimulating, simulationSpeed, circuitType, voltage, resistance, capacitance, inductance, frequency, showField, showElectrons]);

  // Initial draw and parameter updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawCanvas();
    }
  }, [circuitType, voltage, resistance, capacitance, inductance, frequency, showField, showElectrons]);

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
    <div className="electricity-lab">
      <header className="lab-header">
        <h1>Electricity Lab Ethiopia</h1>
        <nav className="lab-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/circuits" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Circuits
          </NavLink>
          <NavLink to="/fields" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Fields
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
              <label>Circuit Type</label>
              <select 
                value={circuitType}
                onChange={(e) => setCircuitType(e.target.value)}
              >
                <option value="dc">DC Circuit</option>
                <option value="ac">AC Circuit</option>
                <option value="rc">RC Circuit</option>
                <option value="rl">RL Circuit</option>
                <option value="rlc">RLC Circuit</option>
              </select>
            </div>
            
            <div className="control-group">
              <label>Voltage: {voltage} V</label>
              <input 
                type="range" 
                min="1" 
                max="24" 
                step="1"
                value={voltage}
                onChange={(e) => setVoltage(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Resistance: {resistance} Ω</label>
              <input 
                type="range" 
                min="10" 
                max="1000" 
                step="10"
                value={resistance}
                onChange={(e) => setResistance(parseInt(e.target.value))}
              />
            </div>
            
            {(circuitType === 'rc' || circuitType === 'rlc') && (
              <div className="control-group">
                <label>Capacitance: {capacitance} μF</label>
                <input 
                  type="range" 
                  min="1" 
                  max="1000" 
                  step="1"
                  value={capacitance}
                  onChange={(e) => setCapacitance(parseInt(e.target.value))}
                />
              </div>
            )}
            
            {(circuitType === 'rl' || circuitType === 'rlc') && (
              <div className="control-group">
                <label>Inductance: {inductance} mH</label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  step="1"
                  value={inductance}
                  onChange={(e) => setInductance(parseInt(e.target.value))}
                />
              </div>
            )}
            
            {(circuitType === 'ac' || circuitType === 'rlc') && (
              <div className="control-group">
                <label>Frequency: {frequency} Hz</label>
                <input 
                  type="range" 
                  min="1" 
                  max="1000" 
                  step="1"
                  value={frequency}
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                />
              </div>
            )}
            
            <div className="control-group">
              <label>Visualization</label>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={showField}
                    onChange={() => setShowField(!showField)}
                  />
                  Show Electric Field
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={showElectrons}
                    onChange={() => setShowElectrons(!showElectrons)}
                  />
                  Show Electrons
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="calculations-panel">
          <h2>Electrical Calculations</h2>
          
          <div className="calculation">
            <h3>Ohm's Law</h3>
            <p>V = I × R</p>
            <p>{voltage} = I × {resistance}</p>
            <p>I = {current.toFixed(2)} A</p>
            <p>P = V × I = {power.toFixed(2)} W</p>
          </div>
          
          {(circuitType === 'ac' || circuitType === 'rlc') && (
            <div className="calculation">
              <h3>AC Circuit Properties</h3>
              <p>X_C = 1/(2πfC) = {capacitiveReactance.toFixed(2)} Ω</p>
              <p>X_L = 2πfL = {inductiveReactance.toFixed(2)} Ω</p>
              <p>Z = √(R² + (X_L - X_C)²) = {impedance.toFixed(2)} Ω</p>
              <p>I = V/Z = {(voltage / impedance).toFixed(2)} A</p>
            </div>
          )}
          
          {circuitType === 'rlc' && (
            <div className="calculation">
              <h3>Resonance</h3>
              <p>f_r = 1/(2π√(LC))</p>
              <p>f_r = 1/(2π√({inductance}×10⁻³ × {capacitance}×10⁻⁶))</p>
              <p>f_r = {(1 / (2 * Math.PI * Math.sqrt(inductance * 1e-3 * capacitance * 1e-6))).toFixed(2)} Hz</p>
            </div>
          )}
        </div>
        
        <div className="explanation-panel">
          <h2>Electricity Principles</h2>
          
          <div className="principle">
            <h3>Ohm's Law</h3>
            <p>
              Ohm's Law states that the current through a conductor between two points is directly
              proportional to the voltage across the two points and inversely proportional to the
              resistance between them. Mathematically: V = I × R.
            </p>
          </div>
          
          <div className="principle">
            <h3>Circuit Elements</h3>
            <ul>
              <li><strong>Resistor</strong>: Opposes the flow of electric current, converting electrical energy to heat.</li>
              <li><strong>Capacitor</strong>: Stores energy in an electric field, resisting changes in voltage.</li>
              <li><strong>Inductor</strong>: Stores energy in a magnetic field, resisting changes in current.</li>
            </ul>
          </div>
          
          <div className="principle">
            <h3>AC vs DC</h3>
            <p>
              <strong>Direct Current (DC)</strong>: Flows in one direction with constant voltage.
              Batteries and solar cells produce DC electricity.
            </p>
            <p>
              <strong>Alternating Current (AC)</strong>: Periodically reverses direction, typically
              following a sinusoidal pattern. AC is used for power transmission because its voltage
              can be easily transformed.
            </p>
          </div>
          
          <div className="experiment-tips">
            <h3>Experiment Tips</h3>
            <ul>
              <li>Adjust voltage and resistance to see how they affect current (Ohm's Law)</li>
              <li>Switch between circuit types to compare their behavior</li>
              <li>In AC mode, change frequency to see its effect on current</li>
              <li>In RLC mode, find the resonance frequency where current is maximized</li>
              <li>Observe how electrons move differently in various circuit types</li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Electricity;