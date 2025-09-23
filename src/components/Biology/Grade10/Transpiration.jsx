import React, { useState, useEffect, useRef } from 'react';
import './Transpiration.css';

const Transpiration = () => {
  // Experiment parameters
  const [lightIntensity, setLightIntensity] = useState(50); // %
  const [temperature, setTemperature] = useState(25); // °C
  const [humidity, setHumidity] = useState(60); // %
  const [windSpeed, setWindSpeed] = useState(0); // m/s
  const [soilMoisture, setSoilMoisture] = useState(70); // %
  const [timeElapsed, setTimeElapsed] = useState(0); // minutes
  const [isRunning, setIsRunning] = useState(false);
  
  // Simulation outputs
  const [transpirationRate, setTranspirationRate] = useState(0); // mmol/m²/s
  const [waterUptake, setWaterUptake] = useState(0); // ml
  const [stomatalConductance, setStomatalConductance] = useState(0); // mol/m²/s
  
  // AI analysis
  const [aiInsights, setAiInsights] = useState('');
  const [limitingFactor, setLimitingFactor] = useState('');
  
  // Refs for animation
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const lastUpdateRef = useRef(0);
  const waterParticles = useRef([]);
  const plantHealthRef = useRef(100);
  const leafAngleRef = useRef(0);

  // Transpiration rate calculation
  const calculateTranspiration = () => {
    // Light effect (stomatal opening)
    const lightEffect = 0.5 + (lightIntensity / 200);
    
    // Temperature effect (bell curve peaking at 25°C)
    const tempEffect = Math.exp(-Math.pow((temperature - 25)/15, 2));
    
    // Humidity effect (inverse relationship)
    const humidityEffect = 1.5 - (humidity / 100);
    
    // Wind effect (increases transpiration up to a point)
    const windEffect = Math.min(1.5, 1 + (windSpeed / 5));
    
    // Soil moisture effect (threshold response)
    const soilEffect = soilMoisture < 30 ? 0.2 : 
                      soilMoisture < 50 ? 0.5 : 1;
    
    // Combine all factors
    const rate = lightEffect * tempEffect * humidityEffect * windEffect * soilEffect;
    
    // Stomatal conductance (similar but with different weights)
    const conductance = (lightEffect * 1.5 + tempEffect * 0.8 + 
                        (1 - humidity/150) + windEffect * 0.5) * soilEffect;
    
    return {
      rate: Math.max(0, rate * 0.1), // Scale to reasonable values
      conductance: Math.max(0, conductance * 0.05)
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

      // Calculate current transpiration rates
      const { rate, conductance } = calculateTranspiration();
      
      // Update outputs
      setTranspirationRate(rate);
      setWaterUptake(prev => prev + rate * deltaTime / 600);
      setStomatalConductance(conductance);
      
      // Generate water vapor particles based on transpiration rate
      const newParticles = Math.floor(rate * deltaTime / 20);
      if (newParticles > 0) {
        for (let i = 0; i < newParticles; i++) {
          waterParticles.current.push({
            x: 150 + (Math.random() * 60 - 30),
            y: 80 + Math.random() * 40,
            size: 1 + Math.random() * 3,
            speedX: (Math.random() * windSpeed) - (windSpeed / 2),
            speedY: -0.5 - Math.random() * rate,
            opacity: 0.5 + Math.random() * 0.3,
            life: 100 + Math.random() * 50
          });
        }
      }

      // Update plant health
      plantHealthRef.current = Math.min(100, 
        (soilMoisture * 0.8) + 
        (rate * 150) - 
        (temperature > 30 ? (temperature - 30) * 2 : 0)
      );

      // Update leaf angle (nyctinasty/hygronasty)
      leafAngleRef.current = Math.max(-0.3, 
        Math.min(0.3, 
          leafAngleRef.current + 
          ((lightIntensity < 20 ? 0.001 : -0.001) * deltaTime)
        )
      );

      // Update and draw particles
      updateParticles(deltaTime);
      drawPlant();

      // Generate AI insights periodically
      if (timeElapsed % 5 < 0.05) {
        generateAIInsights(rate);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, lightIntensity, temperature, humidity, windSpeed, soilMoisture]);

  // Update water vapor particles
  const updateParticles = (deltaTime) => {
    waterParticles.current = waterParticles.current
      .map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        life: particle.life - 1,
        opacity: particle.opacity * 0.99
      }))
      .filter(particle => 
        particle.life > 0 && 
        particle.y > -10 && 
        particle.x > -10 && 
        particle.x < 310
      );
  };

  // Draw plant
  const drawPlant = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pot and soil
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(120, 160, 60, 40);
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(100, 150, 100, 10);
    
    // Draw soil moisture level
    ctx.fillStyle = `rgba(121, 85, 72, ${0.3 + (soilMoisture / 150)})`;
    ctx.fillRect(120, 160, 60, 40 * (soilMoisture / 100));

    // Draw stem (health affects thickness)
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 3 + (plantHealthRef.current / 30);
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 100);
    ctx.stroke();

    // Draw leaves (angle affected by light and health)
    const leafCount = 4;
    const greenness = 80 + (plantHealthRef.current / 2);
    
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2 + leafAngleRef.current;
      const size = 20 + (plantHealthRef.current / 5);
      
      ctx.save();
      ctx.translate(150, 110);
      ctx.rotate(angle);
      
      // Leaf shape
      ctx.fillStyle = `hsl(${100 - greenness/3}, 70%, ${30 + greenness/3}%)`;
      ctx.beginPath();
      ctx.ellipse(30, 0, size, size/2, 0, 0, Math.PI * 2);
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

    // Draw water vapor particles
    waterParticles.current.forEach(particle => {
      ctx.fillStyle = `rgba(200, 240, 255, ${particle.opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw wind indicator if wind > 0
    if (windSpeed > 0) {
      ctx.strokeStyle = `rgba(200, 200, 255, ${Math.min(0.8, windSpeed / 5)})`;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, 50);
      ctx.lineTo(300, 50);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  // Generate AI insights
  const generateAIInsights = (rate) => {
    const insights = [];
    let currentLimitingFactor = '';

    // Light analysis
    if (lightIntensity < 20) {
      insights.push("Low light intensity - stomata may be partially closed");
      currentLimitingFactor = 'Light Intensity';
    } else if (lightIntensity > 80) {
      insights.push("High light intensity - potential for photoinhibition");
    }

    // Temperature analysis
    if (temperature < 15) {
      insights.push("Low temperature reducing metabolic activity");
      currentLimitingFactor = 'Temperature';
    } else if (temperature > 35) {
      insights.push("High temperature increasing water loss risk");
      currentLimitingFactor = 'Temperature';
    }

    // Humidity analysis
    if (humidity > 80) {
      insights.push("High humidity reducing transpiration drive");
      currentLimitingFactor = 'Humidity';
    } else if (humidity < 30) {
      insights.push("Low humidity creating strong vapor pressure deficit");
    }

    // Wind analysis
    if (windSpeed > 3) {
      insights.push("High wind speed increasing boundary layer conductance");
    }

    // Soil moisture analysis
    if (soilMoisture < 30) {
      insights.push("Low soil moisture - plant under water stress");
      currentLimitingFactor = 'Soil Moisture';
      insights.push("Stomatal closure likely occurring to conserve water");
    }

    // Efficiency calculation
    const optimalRate = 0.15; // mmol/m²/s for typical conditions
    const efficiency = (rate / optimalRate) * 100;
    insights.push(`Current transpiration efficiency: ${efficiency.toFixed(1)}% of maximum`);

    setAiInsights(insights.join('\n\n'));
    setLimitingFactor(currentLimitingFactor || 'None - optimal conditions');
  };

  // Reset experiment
  const resetExperiment = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setTranspirationRate(0);
    setWaterUptake(0);
    setStomatalConductance(0);
    waterParticles.current = [];
    plantHealthRef.current = 100;
    leafAngleRef.current = 0;
    setAiInsights('');
    setLimitingFactor('');
  };

  return (
    <div className="transpiration-lab">
      <header>
        <h1>Transpiration Rate Experiment Lab Ethiopia</h1>
        <p className="subtitle">Real-Time Digital Simulation with AI Analysis</p>
      </header>

      <div className="lab-container">
        <div className="control-panel">
          <h2>Environmental Controls</h2>
          
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
            <small>Affects stomatal opening</small>
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
            <small>Affects metabolic rate</small>
          </div>
          
          <div className="control-group">
            <label>Humidity: {humidity}%</label>
            <input
              type="range"
              min="10"
              max="90"
              value={humidity}
              onChange={(e) => setHumidity(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Vapor pressure deficit</small>
          </div>
          
          <div className="control-group">
            <label>Wind Speed: {windSpeed} m/s</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={windSpeed}
              onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
            />
            <small>Boundary layer effects</small>
          </div>
          
          <div className="control-group">
            <label>Soil Moisture: {soilMoisture}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Water availability</small>
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
              <h3>Transpiration Rate</h3>
              <p>{transpirationRate.toFixed(2)} mmol/m²/s</p>
            </div>
            <div className="metric">
              <h3>Water Uptake</h3>
              <p>{waterUptake.toFixed(2)} ml</p>
            </div>
            <div className="metric">
              <h3>Stomatal Conductance</h3>
              <p>{stomatalConductance.toFixed(3)} mol/m²/s</p>
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
          
          <div className="transpiration-factors">
            <h3>Transpiration Drivers</h3>
            <ul>
              <li>Light: Opens stomata for photosynthesis</li>
              <li>Temperature: Increases water vapor pressure</li>
              <li>Humidity: Creates vapor pressure deficit</li>
              <li>Wind: Removes boundary layer</li>
              <li>Soil Water: Source for transpiration stream</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="educational-tips">
        <h3>Did You Know? (Ethiopian Context)</h3>
        <ul>
          <li>Ethiopian crops like teff have adapted transpiration rates for arid conditions</li>
          <li>Understanding transpiration helps optimize irrigation in Ethiopian agriculture</li>
          <li>Traditional Ethiopian farming uses mulching to reduce soil water loss</li>
        </ul>
      </div>
    </div>
  );
};

export default Transpiration;