import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Scene, Mesh, BoxGeometry, MeshStandardMaterial } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const MagnetismElectromagnetism = () => {
  // State for simulation parameters
  const [current, setCurrent] = useState(1);
  const [coilTurns, setCoilTurns] = useState(10);
  const [magneticField, setMagneticField] = useState(0);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [experimentData, setExperimentData] = useState([]);
  
  // Refs for Three.js scene
  const simulationRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const solenoidRef = useRef(null);
  const compassRefs = useRef([]);
  const fieldLinesRef = useRef([]);

  // Initialize simulation
  useEffect(() => {
    // Set up Three.js scene
    const width = simulationRef.current.clientWidth;
    const height = simulationRef.current.clientHeight;
    
    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current.position.z = 5;
    
    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(width, height);
    simulationRef.current.appendChild(rendererRef.current.domElement);
    
    // Controls
    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    sceneRef.current.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    sceneRef.current.add(directionalLight);
    
    // Create initial solenoid
    createSolenoid();
    
    // Create compass needles
    createCompassNeedles();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      controlsRef.current.update();
      
      // Update compass needles based on magnetic field
      updateCompassNeedles();
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (rendererRef.current) {
        simulationRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  // Update simulation when parameters change
  useEffect(() => {
    if (solenoidRef.current) {
      updateSolenoid();
      calculateMagneticField();
      updateFieldLines();
    }
  }, [current, coilTurns]);
  
  // Create solenoid visualization
  const createSolenoid = () => {
    // Remove existing solenoid if any
    if (solenoidRef.current) {
      sceneRef.current.remove(solenoidRef.current);
    }
    
    const solenoidGroup = new THREE.Group();
    
    // Create coil turns
    const coilGeometry = new THREE.TorusGeometry(1, 0.05, 16, 100);
    const coilMaterial = new THREE.MeshPhongMaterial({ 
      color: current > 0 ? 0xff0000 : 0x0000ff,
      emissive: current > 0 ? 0xff3333 : 0x3333ff,
      emissiveIntensity: Math.abs(current) / 2
    });
    
    for (let i = 0; i < coilTurns; i++) {
      const coil = new THREE.Mesh(coilGeometry, coilMaterial);
      coil.position.y = i * 0.2 - (coilTurns * 0.2) / 2;
      coil.rotation.x = Math.PI / 2;
      solenoidGroup.add(coil);
    }
    
    // Add core (optional - can be toggled)
    const coreGeometry = new THREE.CylinderGeometry(0.3, 0.3, coilTurns * 0.2, 32);
    const coreMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xaaaaaa,
      transparent: true,
      opacity: 0.7
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.rotation.x = Math.PI / 2;
    solenoidGroup.add(core);
    
    sceneRef.current.add(solenoidGroup);
    solenoidRef.current = solenoidGroup;
  };
  
  // Create compass needles around the solenoid
  const createCompassNeedles = () => {
    // Clear existing compass needles
    compassRefs.current.forEach(needle => sceneRef.current.remove(needle));
    compassRefs.current = [];
    
    // Create a grid of compass needles
    const gridSize = 5;
    const spacing = 1.5;
    
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        // Skip positions too close to the solenoid
        if (Math.abs(x) < 1.5 && Math.abs(z) < 1.5) continue;
        
        // Create compass needle
        const needleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
        const needleMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x00ff00,
          emissive: 0x00aa00,
          emissiveIntensity: 0.3
        });
        
        const needle = new THREE.Mesh(needleGeometry, needleMaterial);
        needle.position.set(x * spacing, 0, z * spacing);
        
        // Add red tip (north)
        const tipGeometry = new THREE.ConeGeometry(0.05, 0.1, 8);
        const tipMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const tip = new THREE.Mesh(tipGeometry, tipMaterial);
        tip.position.y = 0.25;
        needle.add(tip);
        
        sceneRef.current.add(needle);
        compassRefs.current.push(needle);
      }
    }
  };
  
  // Update compass needles based on magnetic field
  const updateCompassNeedles = () => {
    const center = new THREE.Vector3(0, 0, 0);
    
    compassRefs.current.forEach(needle => {
      // Calculate direction of magnetic field at needle position
      const position = new THREE.Vector3();
      needle.getWorldPosition(position);
      
      // Simplified magnetic field calculation (solenoid along y-axis)
      const r = new THREE.Vector3(position.x, 0, position.z).length();
      const theta = Math.atan2(position.z, position.x);
      
      // B-field direction around a current-carrying wire (simplified)
      const bDirection = new THREE.Vector3(
        -Math.sin(theta),
        0,
        Math.cos(theta)
      ).normalize();
      
      // Add some vertical component if we're close to the solenoid
      if (r < 3) {
        bDirection.y = (position.y < 0 ? -1 : 1) * (3 - r) / 3;
        bDirection.normalize();
      }
      
      // Rotate needle to align with field
      needle.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        bDirection
      );
    });
  };
  
  // Update solenoid when parameters change
  const updateSolenoid = () => {
    if (!solenoidRef.current) return;
    
    // Update coil color based on current direction
    const coilMaterial = new THREE.MeshPhongMaterial({ 
      color: current > 0 ? 0xff0000 : 0x0000ff,
      emissive: current > 0 ? 0xff3333 : 0x3333ff,
      emissiveIntensity: Math.abs(current) / 2
    });
    
    solenoidRef.current.children.forEach((child, index) => {
      if (index < coilTurns) {
        child.material = coilMaterial;
        child.visible = true;
      } else if (index >= coilTurns && index < solenoidRef.current.children.length - 1) {
        child.visible = false;
      }
    });
  };
  
  // Calculate magnetic field strength (simplified)
  const calculateMagneticField = () => {
    // B = μ₀ * n * I (ideal solenoid formula)
    // μ₀ = 4π × 10^-7 N/A²
    const mu0 = 4 * Math.PI * 1e-7;
    const n = coilTurns / 0.2; // turns per meter (assuming 0.2m spacing between turns)
    const B = mu0 * n * current;
    
    setMagneticField(B);
    
    // Record data point
    const newDataPoint = {
      timestamp: new Date().toISOString(),
      current,
      coilTurns,
      magneticField: B
    };
    
    setExperimentData(prev => [...prev, newDataPoint]);
    
    // Generate AI feedback
    generateAIFeedback(newDataPoint);
  };
  
  // Update magnetic field lines visualization
  const updateFieldLines = () => {
    // Clear existing field lines
    fieldLinesRef.current.forEach(line => sceneRef.current.remove(line));
    fieldLinesRef.current = [];
    
    // Create new field lines (simplified visualization)
    const lineCount = 20;
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffff00,
      transparent: true,
      opacity: 0.7
    });
    
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const radius = 1.5;
      
      // Create a circular field line around the solenoid
      const points = [];
      for (let j = 0; j <= 100; j++) {
        const theta = (j / 100) * Math.PI * 2;
        points.push(new THREE.Vector3(
          radius * Math.cos(theta),
          Math.sin(angle) * 0.5,
          radius * Math.sin(theta)
        ));
      }
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      sceneRef.current.add(line);
      fieldLinesRef.current.push(line);
    }
  };
  
  // Generate AI feedback based on experiment data
  const generateAIFeedback = (dataPoint) => {
    // This would typically call an actual AI API, but we'll simulate it
    const feedbacks = [
      `Observation: With ${dataPoint.coilTurns} turns and ${dataPoint.current}A current, the magnetic field measures ${dataPoint.magneticField.toExponential(2)} T.`,
      `Analysis: The field strength is ${dataPoint.magneticField > 1e-4 ? 'stronger' : 'weaker'} than typical classroom experiments.`,
      `Suggestion: ${dataPoint.current < 2 ? 'Try increasing the current' : 'Try adding more coil turns'} to strengthen the magnetic field.`,
      `Did you know? The direction of the magnetic field follows the right-hand rule - point your thumb in the current direction and your fingers curl in the field direction.`,
      `Safety Note: ${Math.abs(dataPoint.current) > 5 ? 'High current detected! Ensure your power supply can handle this load.' : 'Current levels are within safe range.'}`
    ];
    
    // Simulate AI thinking
    setTimeout(() => {
      setAiFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
    }, 1000);
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (rendererRef.current && cameraRef.current && simulationRef.current) {
        const width = simulationRef.current.clientWidth;
        const height = simulationRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Start/stop simulation
  const toggleSimulation = () => {
    setSimulationRunning(!simulationRunning);
    
    if (!simulationRunning) {
      // Start data collection
      const interval = setInterval(() => {
        calculateMagneticField();
      }, 2000);
      
      return () => clearInterval(interval);
    }
  };
  
  // Export experiment data
  const exportData = () => {
    const blob = new Blob([JSON.stringify(experimentData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'magnetism-experiment-data.json';
    a.click();
  };

  return (
    <div className="lab-container">
      <h1>Magnetism and Electromagnetism Lab</h1>
      <p className="subtitle">Interactive Digital Simulation with AI Analysis</p>
      
      <div className="lab-content">
        <div className="simulation-container" ref={simulationRef}>
          {/* 3D simulation rendered here */}
        </div>
        
        <div className="control-panel">
          <h2>Experiment Controls</h2>
          
          <div className="control-group">
            <label>
              Current (A): 
              <input 
                type="range" 
                min="-5" 
                max="5" 
                step="0.1" 
                value={current}
                onChange={(e) => setCurrent(parseFloat(e.target.value))}
              />
              <span>{current.toFixed(1)} A</span>
            </label>
          </div>
          
          <div className="control-group">
            <label>
              Coil Turns: 
              <input 
                type="range" 
                min="5" 
                max="20" 
                step="1" 
                value={coilTurns}
                onChange={(e) => setCoilTurns(parseInt(e.target.value))}
              />
              <span>{coilTurns}</span>
            </label>
          </div>
          
          <div className="control-group">
            <button onClick={toggleSimulation}>
              {simulationRunning ? 'Stop Experiment' : 'Start Experiment'}
            </button>
          </div>
          
          <div className="readings">
            <h3>Measurements</h3>
            <p>Magnetic Field: <strong>{magneticField.toExponential(2)} Tesla</strong></p>
          </div>
          
          <div className="ai-feedback">
            <h3>AI Lab Assistant</h3>
            <div className="feedback-message">
              {aiFeedback || "Adjust the parameters and start the experiment to receive feedback."}
            </div>
          </div>
          
          {experimentData.length > 0 && (
            <div className="data-export">
              <button onClick={exportData}>Export Experiment Data</button>
              <p>Recorded {experimentData.length} data points</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="theory-section">
        <h2>Physics Theory</h2>
        <p>
          This simulation demonstrates the relationship between electric current and magnetic fields,
          known as electromagnetism. According to Ampère's law, a current-carrying conductor produces
          a magnetic field around it. For a solenoid, the magnetic field inside is approximately
          uniform and can be calculated by: B = μ₀nI, where μ₀ is the permeability of free space,
          n is the number of turns per unit length, and I is the current.
        </p>
      </div>
      
      <style jsx>{`
        .lab-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        h1 {
          color: #2c3e50;
          text-align: center;
        }
        
        .subtitle {
          text-align: center;
          color: #7f8c8d;
          margin-bottom: 30px;
        }
        
        .lab-content {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .simulation-container {
          flex: 2;
          height: 500px;
          background: #f5f5f5;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .control-panel {
          flex: 1;
          padding: 20px;
          background: #ecf0f1;
          border-radius: 8px;
        }
        
        .control-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
        }
        
        input[type="range"] {
          width: 100%;
        }
        
        .readings {
          padding: 15px;
          background: white;
          border-radius: 5px;
          margin: 20px 0;
        }
        
        .ai-feedback {
          padding: 15px;
          background: #e8f4f8;
          border-radius: 5px;
          margin: 20px 0;
        }
        
        .feedback-message {
          min-height: 100px;
          padding: 10px;
          background: white;
          border-radius: 3px;
        }
        
        .theory-section {
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
        }
        
        button {
          background: #3498db;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        button:hover {
          background: #2980b9;
        }
      `}</style>
    </div>
  );
};

export default MagnetismElectromagnetism;