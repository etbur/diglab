import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './LightOptics.css';

const LightOptics = () => {
  // State for simulation parameters
  const [lightSource, setLightSource] = useState('point');
  const [wavelength, setWavelength] = useState(550);
  const [intensity, setIntensity] = useState(100);
  const [angle, setAngle] = useState(0);
  const [environment, setEnvironment] = useState('air');
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [isSimulating, setIsSimulating] = useState(true);
  const [showWavefronts, setShowWavefronts] = useState(true);
  const [showRays, setShowRays] = useState(true);
  
  // Refs for animation and canvas
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lightRays = useRef([]);
  const lightParticles = useRef([]);

  // Refractive indices of different materials
  const refractiveIndices = {
    air: 1.0003,
    water: 1.333,
    glass: 1.52,
    diamond: 2.42,
    vacuum: 1.0
  };

  // Initialize light rays
  useEffect(() => {
    initializeLight();
  }, [lightSource, wavelength, intensity, angle]);

  // Initialize light based on selected source
  const initializeLight = () => {
    lightRays.current = [];
    lightParticles.current = [];
    
    if (lightSource === 'point') {
      // Create point source rays
      for (let i = 0; i < intensity / 10; i++) {
        const angle = (i / (intensity / 10)) * Math.PI * 2;
        lightRays.current.push({
          x: 150,
          y: 200,
          angle: angle,
          wavelength: wavelength,
          intensity: intensity,
          length: 0
        });
      }
    } else if (lightSource === 'parallel') {
      // Create parallel rays
      for (let i = 0; i < intensity / 5; i++) {
        lightRays.current.push({
          x: 50,
          y: 100 + i * 10,
          angle: angle * Math.PI / 180,
          wavelength: wavelength,
          intensity: intensity,
          length: 0
        });
      }
    } else if (lightSource === 'laser') {
      // Create laser beam
      lightRays.current.push({
        x: 50,
        y: 200,
        angle: angle * Math.PI / 180,
        wavelength: wavelength,
        intensity: intensity,
        length: 0
      });
    }
    
    // Initialize light particles
    for (let i = 0; i < intensity; i++) {
      lightParticles.current.push({
        x: 50,
        y: Math.random() * 400,
        vx: 3 + Math.random() * 2,
        vy: (Math.random() - 0.5) * 2,
        wavelength: wavelength,
        size: 2 + Math.random() * 2
      });
    }
  };

  // Get color from wavelength (approximation)
  const wavelengthToColor = (wavelength) => {
    if (wavelength >= 380 && wavelength < 440) {
      return `rgb(${-(wavelength - 440) * (255 / 60)}, 0, 255)`;
    } else if (wavelength >= 440 && wavelength < 490) {
      return `rgb(0, ${(wavelength - 440) * (255 / 50)}, 255)`;
    } else if (wavelength >= 490 && wavelength < 510) {
      return `rgb(0, 255, ${-(wavelength - 510) * (255 / 20)})`;
    } else if (wavelength >= 510 && wavelength < 580) {
      return `rgb(${(wavelength - 510) * (255 / 70)}, 255, 0)`;
    } else if (wavelength >= 580 && wavelength < 645) {
      return `rgb(255, ${-(wavelength - 645) * (255 / 65)}, 0)`;
    } else if (wavelength >= 645 && wavelength <= 780) {
      return `rgb(255, 0, 0)`;
    } else {
      return 'rgb(255, 255, 255)';
    }
  };

  // Start/pause simulation
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  // Reset simulation
  const resetSimulation = () => {
    setIsSimulating(true);
    initializeLight();
    
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
    
    // Draw background based on environment
    let bgColor = '#101010';
    if (environment === 'air') bgColor = '#101030';
    else if (environment === 'water') bgColor = '#102050';
    else if (environment === 'glass') bgColor = '#203060';
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw lenses and prisms
    drawOpticalElements(ctx, width, height);
    
    // Draw light rays
    if (showRays) {
      lightRays.current.forEach(ray => {
        drawLightRay(ctx, ray);
      });
    }
    
    // Draw light particles
    if (lightSource === 'particle') {
      lightParticles.current.forEach(particle => {
        drawLightParticle(ctx, particle);
      });
    }
    
    // Draw control info
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText(`Wavelength: ${wavelength} nm (${wavelengthToName(wavelength)})`, 20, 30);
    ctx.fillText(`Intensity: ${intensity}%`, 20, 50);
    ctx.fillText(`Environment: ${environment} (n=${refractiveIndices[environment].toFixed(3)})`, 20, 70);
    ctx.fillText(`Angle: ${angle}°`, 20, 90);
  };

  // Draw optical elements (lenses, prisms, etc.)
  const drawOpticalElements = (ctx, width, height) => {
    // Draw convex lens
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(300, 200, 60, Math.PI * 0.6, Math.PI * 1.4, false);
    ctx.arc(300, 200, 60, Math.PI * 1.6, Math.PI * 0.4, true);
    ctx.stroke();
    
    // Draw prism
    ctx.beginPath();
    ctx.moveTo(450, 150);
    ctx.lineTo(500, 250);
    ctx.lineTo(400, 250);
    ctx.closePath();
    ctx.strokeStyle = '#88aaff';
    ctx.fillStyle = 'rgba(136, 170, 255, 0.3)';
    ctx.fill();
    ctx.stroke();
    
    // Draw screen
    ctx.strokeStyle = '#ccc';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(600, 50);
    ctx.lineTo(600, 350);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw labels
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.fillText('Convex Lens', 270, 280);
    ctx.fillText('Prism', 430, 280);
    ctx.fillText('Screen', 610, 200);
  };

  // Draw a light ray
  const drawLightRay = (ctx, ray) => {
    const color = wavelengthToColor(ray.wavelength);
    const alpha = ray.intensity / 100;
    
    ctx.strokeStyle = `rgba(${color.replace('rgb(', '').replace(')', '')}, ${alpha})`;
    ctx.lineWidth = 1 + (ray.intensity / 50);
    
    ctx.beginPath();
    ctx.moveTo(ray.x, ray.y);
    
    const length = Math.min(ray.length, 550);
    const endX = ray.x + Math.cos(ray.angle) * length;
    const endY = ray.y + Math.sin(ray.angle) * length;
    
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Draw wavefronts if enabled
    if (showWavefronts && length > 0) {
      const waveCount = Math.floor(length / 30);
      for (let i = 1; i <= waveCount; i++) {
        const waveX = ray.x + Math.cos(ray.angle) * i * 30;
        const waveY = ray.y + Math.sin(ray.angle) * i * 30;
        
        ctx.beginPath();
        ctx.arc(waveX, waveY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.replace('rgb(', '').replace(')', '')}, ${alpha * 0.7})`;
        ctx.fill();
      }
    }
  };

  // Draw a light particle
  const drawLightParticle = (ctx, particle) => {
    const color = wavelengthToColor(particle.wavelength);
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw trail
    ctx.strokeStyle = `rgba(${color.replace('rgb(', '').replace(')', '')}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
    ctx.lineTo(particle.x, particle.y);
    ctx.stroke();
  };

  // Convert wavelength to color name
  const wavelengthToName = (wavelength) => {
    if (wavelength < 450) return 'Violet';
    if (wavelength < 485) return 'Blue';
    if (wavelength < 500) return 'Cyan';
    if (wavelength < 565) return 'Green';
    if (wavelength < 590) return 'Yellow';
    if (wavelength < 625) return 'Orange';
    return 'Red';
  };

  // Animation loop
  useEffect(() => {
    if (!isSimulating) {
      drawCanvas();
      return;
    }
    
    const animate = () => {
      // Update light rays
      lightRays.current.forEach(ray => {
        ray.length += 2 * simulationSpeed;
        
        // Handle interaction with optical elements
        if (ray.x > 250 && ray.x < 350 && Math.abs(ray.y - 200) < 60) {
          // Lens interaction - converge light
          const focusX = 400;
          const focusY = 200;
          const dx = focusX - ray.x;
          const dy = focusY - ray.y;
          ray.angle = Math.atan2(dy, dx);
        }
        
        if (ray.x > 400 && ray.x < 500 && ray.y > 150 && ray.y < 250) {
          // Prism interaction - disperse light based on wavelength
          const dispersion = (ray.wavelength - 550) * 0.001;
          ray.angle += dispersion;
        }
        
        // Reset rays that go off screen
        if (ray.x > 650 || ray.x < 0 || ray.y > 400 || ray.y < 0) {
          ray.length = 0;
          ray.x = lightSource === 'parallel' ? 50 : 150;
          ray.y = lightSource === 'parallel' ? 100 + Math.random() * 200 : 200;
        }
      });
      
      // Update light particles
      lightParticles.current.forEach(particle => {
        particle.x += particle.vx * simulationSpeed;
        particle.y += particle.vy * simulationSpeed;
        
        // Handle interaction with optical elements
        if (particle.x > 250 && particle.x < 350 && Math.abs(particle.y - 200) < 60) {
          // Lens interaction - converge particles
          const focusX = 400;
          const focusY = 200;
          const dx = focusX - particle.x;
          const dy = focusY - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          particle.vx = (dx / dist) * 5;
          particle.vy = (dy / dist) * 5;
        }
        
        if (particle.x > 400 && particle.x < 500 && particle.y > 150 && particle.y < 250) {
          // Prism interaction - disperse particles based on wavelength
          const dispersion = (particle.wavelength - 550) * 0.01;
          particle.vx += dispersion;
        }
        
        // Reset particles that go off screen
        if (particle.x > 650 || particle.x < 0 || particle.y > 400 || particle.y < 0) {
          particle.x = 50;
          particle.y = Math.random() * 400;
          particle.vx = 3 + Math.random() * 2;
          particle.vy = (Math.random() - 0.5) * 2;
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
  }, [isSimulating, simulationSpeed, lightSource, wavelength, intensity, angle, environment, showWavefronts, showRays]);

  // Initial draw and parameter updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawCanvas();
    }
  }, [lightSource, wavelength, intensity, angle, environment, showWavefronts, showRays]);

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
    <div className="light-optics-lab">
      <header className="lab-header">
        <h1>Light & Optics Lab Ethiopia</h1>
        <nav className="lab-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/optics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Optics
          </NavLink>
          <NavLink to="/waves" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Waves
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
              <label>Light Source</label>
              <div className="button-group">
                <button 
                  className={lightSource === 'point' ? 'btn active' : 'btn'}
                  onClick={() => setLightSource('point')}
                >
                  Point Source
                </button>
                <button 
                  className={lightSource === 'parallel' ? 'btn active' : 'btn'}
                  onClick={() => setLightSource('parallel')}
                >
                  Parallel Rays
                </button>
                <button 
                  className={lightSource === 'laser' ? 'btn active' : 'btn'}
                  onClick={() => setLightSource('laser')}
                >
                  Laser
                </button>
                <button 
                  className={lightSource === 'particle' ? 'btn active' : 'btn'}
                  onClick={() => setLightSource('particle')}
                >
                  Particles
                </button>
              </div>
            </div>
            
            <div className="control-group">
              <label>Wavelength: {wavelength} nm ({wavelengthToName(wavelength)})</label>
              <input 
                type="range" 
                min="380" 
                max="780" 
                step="1"
                value={wavelength}
                onChange={(e) => setWavelength(parseInt(e.target.value))}
              />
              <div className="color-spectrum">
                <div className="color-bar" style={{background: 'linear-gradient(to right, violet, blue, cyan, green, yellow, orange, red)'}}></div>
              </div>
            </div>
            
            <div className="control-group">
              <label>Intensity: {intensity}%</label>
              <input 
                type="range" 
                min="10" 
                max="100" 
                step="1"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Angle: {angle}°</label>
              <input 
                type="range" 
                min="-90" 
                max="90" 
                step="1"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
              />
            </div>
            
            <div className="control-group">
              <label>Environment</label>
              <select 
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
              >
                <option value="air">Air (n=1.0003)</option>
                <option value="water">Water (n=1.333)</option>
                <option value="glass">Glass (n=1.52)</option>
                <option value="diamond">Diamond (n=2.42)</option>
                <option value="vacuum">Vacuum (n=1.0)</option>
              </select>
            </div>
            
            <div className="control-group">
              <label>Visualization</label>
              <div className="checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={showWavefronts}
                    onChange={() => setShowWavefronts(!showWavefronts)}
                  />
                  Show Wavefronts
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={showRays}
                    onChange={() => setShowRays(!showRays)}
                  />
                  Show Rays
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="calculations-panel">
          <h2>Optics Calculations</h2>
          
          <div className="calculation">
            <h3>Wavelength & Color</h3>
            <p>Wavelength: {wavelength} nm = {(wavelength * 1e-9).toExponential(2)} m</p>
            <p>Frequency: {(3e8 / (wavelength * 1e-9) / 1e12).toFixed(2)} THz</p>
            <p>Energy: {(6.626e-34 * 3e8 / (wavelength * 1e-9) * 1e19).toFixed(2)} × 10⁻¹⁹ J</p>
            <p>Color: {wavelengthToName(wavelength)}</p>
          </div>
          
          <div className="calculation">
            <h3>Refraction</h3>
            <p>Snell's Law: n₁sin(θ₁) = n₂sin(θ₂)</p>
            <p>Critical Angle: θ_c = sin⁻¹(n₂/n₁)</p>
            <p>Refractive Index: {refractiveIndices[environment]}</p>
          </div>
          
          <div className="calculation">
            <h3>Lens Formula</h3>
            <p>1/f = 1/v + 1/u</p>
            <p>Where f is focal length, v is image distance, u is object distance</p>
            <p>Magnification: M = -v/u</p>
          </div>
        </div>
        
        <div className="explanation-panel">
          <h2>Light & Optics Principles</h2>
          
          <div className="principle">
            <h3>Nature of Light</h3>
            <p>
              Light exhibits both wave-like and particle-like properties (wave-particle duality).
              As a wave, it undergoes reflection, refraction, interference, and diffraction.
              As a particle (photon), it carries energy proportional to its frequency.
            </p>
          </div>
          
          <div className="principle">
            <h3>Reflection & Refraction</h3>
            <p>
              When light encounters a boundary between two different media, it can be reflected
              or refracted. The angle of reflection equals the angle of incidence. Refraction
              follows Snell's Law: n₁sin(θ₁) = n₂sin(θ₂), where n is the refractive index.
            </p>
          </div>
          
          <div className="principle">
            <h3>Dispersion</h3>
            <p>
              Dispersion is the phenomenon where light is separated into its different colors
              (wavelengths) when passing through a refractive medium. This occurs because the
              refractive index of a material varies with the wavelength of light.
            </p>
          </div>
          
          <div className="experiment-tips">
            <h3>Experiment Tips</h3>
            <ul>
              <li>Change the wavelength to see how different colors behave differently in the prism</li>
              <li>Adjust the angle to observe how it affects reflection and refraction</li>
              <li>Switch between different environments to see how refractive index affects light</li>
              <li>Try different light sources to compare their properties</li>
              <li>Observe how the lens focuses different wavelengths at slightly different points</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightOptics;