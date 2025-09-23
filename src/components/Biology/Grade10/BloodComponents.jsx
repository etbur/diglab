import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./BloodComponents.css";

const BLOOD_COMPONENTS = [
  {
    id: "rbc",
    name: "Red Blood Cells",
    description: "Carry oxygen from lungs to body tissues",
    color: "#e53935",
    shape: "biconcave",
    count: 45, // % of blood volume
    size: 7, // microns
    animation: "flow",
    facts: [
      "Contain hemoglobin which binds oxygen",
      "Lack a nucleus in mammals",
      "Life span of about 120 days"
    ],
    normalRange: "4.5-5.9 million/μL"
  },
  {
    id: "wbc",
    name: "White Blood Cells",
    description: "Part of the immune system defending against infection",
    color: "#ffffff",
    shape: "spherical",
    count: 1,
    size: 12,
    animation: "patrol",
    types: [
      { name: "Neutrophil", percent: 60 },
      { name: "Lymphocyte", percent: 30 },
      { name: "Monocyte", percent: 6 },
      { name: "Eosinophil", percent: 3 },
      { name: "Basophil", percent: 1 }
    ],
    normalRange: "4,000-11,000/μL"
  },
  {
    id: "platelets",
    name: "Platelets",
    description: "Small cell fragments important for blood clotting",
    color: "#ffcc80",
    shape: "irregular",
    count: 1,
    size: 2,
    animation: "float",
    facts: [
      "Form clots to stop bleeding",
      "Produced in bone marrow",
      "Life span of 5-9 days"
    ],
    normalRange: "150,000-450,000/μL"
  },
  {
    id: "plasma",
    name: "Plasma",
    description: "Liquid portion of blood carrying cells and proteins",
    color: "#e3f2fd",
    shape: "liquid",
    count: 55,
    size: 0,
    animation: "background",
    composition: [
      { name: "Water", percent: 92 },
      { name: "Proteins", percent: 7 },
      { name: "Other", percent: 1 }
    ],
    normalRange: "3-3.5 L in adults"
  }
];

const TEST_OPTIONS = [
  { id: "cbc", name: "Complete Blood Count", description: "Measures all major blood components" },
  { id: "hct", name: "Hematocrit", description: "Percentage of RBCs in blood" },
  { id: "wbc_diff", name: "WBC Differential", description: "Breakdown of white blood cell types" },
  { id: "pt", name: "Prothrombin Time", description: "Measures blood clotting ability" }
];

const BloodComponents = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [bloodSample, setBloodSample] = useState({
    rbc: 4.8,
    wbc: 7000,
    platelets: 250000,
    plasma: 3.2,
    hct: 42
  });
  const [currentTest, setCurrentTest] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [aiMessage, setAiMessage] = useState("");
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [viewMode, setViewMode] = useState("normal");
  const [diagnosis, setDiagnosis] = useState("");
  const [showMicroscope, setShowMicroscope] = useState(false);
  const [time, setTime] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef();

  // Initialize and animate canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Create blood cells based on current blood sample
    const createBloodCells = () => {
      particles.length = 0;
      
      // RBCs (most numerous)
      const rbcCount = Math.floor((bloodSample.rbc / 5) * 100);
      for (let i = 0; i < rbcCount; i++) {
        particles.push(createCell("rbc"));
      }
      
      // WBCs (less numerous)
      const wbcCount = Math.floor((bloodSample.wbc / 10000) * 10);
      for (let i = 0; i < wbcCount; i++) {
        particles.push(createCell("wbc"));
      }
      
      // Platelets (very numerous)
      const plateletCount = Math.floor((bloodSample.platelets / 300000) * 150);
      for (let i = 0; i < plateletCount; i++) {
        particles.push(createCell("platelets"));
      }
    };
    
    const createCell = (type) => {
      const comp = BLOOD_COMPONENTS.find(c => c.id === type);
      return {
        type,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: comp.size * (0.8 + Math.random() * 0.4),
        speed: (0.2 + Math.random() * 0.3) * simulationSpeed,
        direction: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        color: comp.color,
        shape: comp.shape,
        animation: comp.animation,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03
      };
    };
    
    const animate = (timestamp) => {
      if (!time) setTime(timestamp);
      const deltaTime = timestamp - time;
      setTime(timestamp);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw plasma background
      if (viewMode !== "microscope") {
        ctx.fillStyle = BLOOD_COMPONENTS.find(c => c.id === "plasma").color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Create initial cells if none exist
      if (particles.length === 0) createBloodCells();
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position based on animation type
        switch(particle.animation) {
          case "flow":
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed * 0.3;
            particle.wobble += particle.wobbleSpeed;
            break;
          case "patrol":
            particle.x += Math.cos(time * 0.001) * 0.2;
            particle.y += Math.sin(time * 0.002) * 0.3;
            break;
          case "float":
            particle.x += (Math.random() - 0.5) * 0.3;
            particle.y += (Math.random() - 0.5) * 0.3;
            break;
        }
        
        // Wrap around edges
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        
        // Draw the cell
        ctx.save();
        ctx.translate(particle.x, particle.y);
        
        if (particle.animation === "flow") {
          ctx.rotate(Math.sin(particle.wobble) * 0.2);
        }
        
        // Different shapes for different cells
        switch(particle.type) {
          case "rbc":
            drawRBC(ctx, particle);
            break;
          case "wbc":
            drawWBC(ctx, particle);
            break;
          case "platelets":
            drawPlatelet(ctx, particle);
            break;
        }
        
        // Highlight if active
        if (activeComponent === particle.type) {
          ctx.strokeStyle = "yellow";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const drawRBC = (ctx, particle) => {
      // Biconcave disc shape
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      
      const radius = particle.size;
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const r = radius * (0.9 + Math.cos(angle * 2) * 0.1);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#c62828";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };
    
    const drawWBC = (ctx, particle) => {
      // Spherical with nucleus
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#bdbdbd";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Nucleus (different shapes for different WBC types)
      ctx.fillStyle = "#9e9e9e";
      ctx.beginPath();
      
      // Simplified nucleus (actual shape varies by WBC type)
      if (Math.random() > 0.7) { // Lymphocyte-like
        ctx.arc(0, 0, particle.size * 0.7, 0, Math.PI * 2);
      } else { // Neutrophil-like (lobed)
        for (let i = 0; i < 3; i++) {
          const angle = i * (Math.PI * 2 / 3);
          ctx.moveTo(0, 0);
          ctx.arc(
            Math.cos(angle) * particle.size * 0.2,
            Math.sin(angle) * particle.size * 0.2,
            particle.size * 0.4,
            angle - 0.5,
            angle + 0.5
          );
        }
      }
      
      ctx.fill();
    };
    
    const drawPlatelet = (ctx, particle) => {
      // Small irregular fragments
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      
      // Irregular shape
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        const r = particle.size * (0.7 + Math.random() * 0.3);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#fb8c00";
      ctx.lineWidth = 0.3;
      ctx.stroke();
    };
    
    createBloodCells();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [activeComponent, bloodSample, simulationSpeed, viewMode, time]);

  const runBloodTest = (testId) => {
    setCurrentTest(testId);
    setTestResults(null);
    setAiMessage("Running test...");
    
    // Simulate test processing time
    setTimeout(() => {
      const test = TEST_OPTIONS.find(t => t.id === testId);
      let results = {};
      let message = "";
      
      switch(testId) {
        case "cbc":
          results = {
            rbc: bloodSample.rbc.toFixed(2),
            wbc: bloodSample.wbc,
            platelets: bloodSample.platelets,
            hct: bloodSample.hct,
            hemoglobin: (bloodSample.rbc * 3).toFixed(1)
          };
          message = generateAIAnalysis(results);
          break;
          
        case "hct":
          results = { hct: bloodSample.hct };
          message = `The hematocrit level is ${bloodSample.hct}%. `;
          message += bloodSample.hct < 38 ? 
            "This suggests possible anemia." : 
            "This is within normal range.";
          break;
          
        case "wbc_diff":
          const wbcComp = BLOOD_COMPONENTS.find(c => c.id === "wbc");
          results = {};
          wbcComp.types.forEach(type => {
            results[type.name] = {
              percent: type.percent,
              absolute: Math.round((type.percent / 100) * bloodSample.wbc)
            };
          });
          message = "White blood cell differential analysis complete. ";
          message += results.Neutrophil.absolute > 7000 ? 
            "Neutrophilia detected, suggesting possible infection." : 
            "WBC distribution appears normal.";
          break;
          
        case "pt":
          const ptValue = 12 + (Math.random() * 4);
          results = { pt: ptValue.toFixed(1), inr: (ptValue / 12).toFixed(2) };
          message = `Prothrombin time is ${results.pt} seconds (INR ${results.inr}). `;
          message += ptValue > 14 ? 
            "Prolonged PT suggests possible clotting disorder." : 
            "Within normal range.";
          break;
      }
      
      setTestResults(results);
      setAiMessage(message);
      generateDiagnosis(results, testId);
    }, 1500);
  };
  
  const generateAIAnalysis = (results) => {
    let analysis = "AI Analysis of Complete Blood Count:\n\n";
    
    // RBC analysis
    analysis += `Red Blood Cells: ${results.rbc} million/μL `;
    if (results.rbc < 4.5) analysis += "(Low - Possible anemia)";
    else if (results.rbc > 5.9) analysis += "(High - Possible polycythemia)";
    else analysis += "(Normal)";
    
    // WBC analysis
    analysis += `\nWhite Blood Cells: ${results.wbc}/μL `;
    if (results.wbc < 4000) analysis += "(Low - Possible leukopenia)";
    else if (results.wbc > 11000) analysis += "(High - Possible infection or inflammation)";
    else analysis += "(Normal)";
    
    // Platelet analysis
    analysis += `\nPlatelets: ${results.platelets}/μL `;
    if (results.platelets < 150000) analysis += "(Low - Possible thrombocytopenia)";
    else if (results.platelets > 450000) analysis += "(High - Possible thrombocytosis)";
    else analysis += "(Normal)";
    
    // Hematocrit
    analysis += `\nHematocrit: ${results.hct}% `;
    if (results.hct < 38) analysis += "(Low)";
    else if (results.hct > 50) analysis += "(High)";
    else analysis += "(Normal)";
    
    // Hemoglobin
    if (results.hemoglobin) {
      analysis += `\nHemoglobin: ${results.hemoglobin} g/dL `;
      if (results.hemoglobin < 12) analysis += "(Low)";
      else if (results.hemoglobin > 16) analysis += "(High)";
      else analysis += "(Normal)";
    }
    
    return analysis;
  };
  
  const generateDiagnosis = (results, testId) => {
    let possibleDiagnoses = [];
    
    if (testId === "cbc") {
      if (results.rbc < 4.5 || results.hct < 38) {
        possibleDiagnoses.push("Iron Deficiency Anemia");
        possibleDiagnoses.push("Vitamin B12 Deficiency");
      }
      if (results.wbc > 11000) {
        possibleDiagnoses.push("Bacterial Infection");
        possibleDiagnoses.push("Inflammatory Condition");
      }
      if (results.platelets < 150000) {
        possibleDiagnoses.push("Immune Thrombocytopenia");
      }
    }
    
    if (testId === "pt" && results.pt > 14) {
      possibleDiagnoses.push("Vitamin K Deficiency");
      possibleDiagnoses.push("Liver Disease");
      possibleDiagnoses.push("Warfarin Therapy");
    }
    
    if (possibleDiagnoses.length > 0) {
      setDiagnosis(`Possible conditions: ${possibleDiagnoses.join(", ")}`);
    } else {
      setDiagnosis("No significant abnormalities detected");
    }
  };
  
  const adjustBloodSample = (component, value) => {
    setBloodSample(prev => {
      const newSample = {...prev};
      
      switch(component) {
        case "rbc":
          newSample.rbc = parseFloat(value);
          newSample.hct = Math.round(newSample.rbc * 8.7);
          break;
        case "wbc":
          newSample.wbc = parseInt(value);
          break;
        case "platelets":
          newSample.platelets = parseInt(value);
          break;
        case "plasma":
          newSample.plasma = parseFloat(value);
          break;
      }
      
      return newSample;
    });
  };
  
  const simulateCondition = (condition) => {
    setAiMessage(`Simulating ${condition}...`);
    
    setTimeout(() => {
      let newSample = {...bloodSample};
      
      switch(condition) {
        case "anemia":
          newSample.rbc = 3.8;
          newSample.hct = 33;
          break;
        case "infection":
          newSample.wbc = 15000;
          break;
        case "leukemia":
          newSample.wbc = 50000;
          newSample.rbc = 3.5;
          newSample.platelets = 80000;
          break;
        case "thrombocytopenia":
          newSample.platelets = 50000;
          break;
        case "normal":
          newSample = {
            rbc: 4.8,
            wbc: 7000,
            platelets: 250000,
            plasma: 3.2,
            hct: 42
          };
          break;
      }
      
      setBloodSample(newSample);
      setAiMessage(`Successfully simulated ${condition}. Run tests to analyze.`);
    }, 1000);
  };

  return (
    <div className="blood-lab">
      <header>
        <h1>Blood Components Lab</h1>
        <p className="subtitle">Interactive Hematology Simulation with AI Diagnostics</p>
      </header>
      
      <div className="lab-container">
        <div className="control-panel">
          <h2>Lab Controls</h2>
          
          <div className="blood-sample-controls">
            <h3>Blood Sample Parameters</h3>
            
            <div className="control-group">
              <label>RBC Count (million/μL):</label>
              <input 
                type="range" 
                min="2" 
                max="7" 
                step="0.1" 
                value={bloodSample.rbc}
                onChange={(e) => adjustBloodSample("rbc", e.target.value)}
              />
              <span>{bloodSample.rbc.toFixed(1)}</span>
            </div>
            
            <div className="control-group">
              <label>WBC Count (/μL):</label>
              <input 
                type="range" 
                min="2000" 
                max="30000" 
                step="100" 
                value={bloodSample.wbc}
                onChange={(e) => adjustBloodSample("wbc", e.target.value)}
              />
              <span>{bloodSample.wbc.toLocaleString()}</span>
            </div>
            
            <div className="control-group">
              <label>Platelets (/μL):</label>
              <input 
                type="range" 
                min="50000" 
                max="600000" 
                step="1000" 
                value={bloodSample.platelets}
                onChange={(e) => adjustBloodSample("platelets", e.target.value)}
              />
              <span>{bloodSample.platelets.toLocaleString()}</span>
            </div>
            
            <div className="control-group">
              <label>Plasma Volume (L):</label>
              <input 
                type="range" 
                min="2" 
                max="4" 
                step="0.1" 
                value={bloodSample.plasma}
                onChange={(e) => adjustBloodSample("plasma", e.target.value)}
              />
              <span>{bloodSample.plasma.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="simulation-controls">
            <h3>Simulation Settings</h3>
            
            <div className="control-group">
              <label>Simulation Speed:</label>
              <input 
                type="range" 
                min="0.5" 
                max="3" 
                step="0.1" 
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
              />
              <span>{simulationSpeed.toFixed(1)}x</span>
            </div>
            
            <div className="control-group">
              <label>View Mode:</label>
              <select 
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
              >
                <option value="normal">Normal View</option>
                <option value="microscope">Microscope View</option>
                <option value="flow">Flow View</option>
              </select>
            </div>
            
            <button onClick={() => setShowMicroscope(!showMicroscope)}>
              {showMicroscope ? "Hide Microscope" : "Show Microscope"}
            </button>
          </div>
          
          <div className="condition-simulator">
            <h3>Simulate Conditions</h3>
            <div className="condition-buttons">
              <button onClick={() => simulateCondition("anemia")}>Anemia</button>
              <button onClick={() => simulateCondition("infection")}>Infection</button>
              <button onClick={() => simulateCondition("leukemia")}>Leukemia</button>
              <button onClick={() => simulateCondition("thrombocytopenia")}>Low Platelets</button>
              <button onClick={() => simulateCondition("normal")}>Normal Blood</button>
            </div>
          </div>
        </div>
        
        <div className="visualization-area">
          <div className={`blood-view ${viewMode}`}>
            <canvas 
              ref={canvasRef} 
              width={600} 
              height={400}
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // For demo purposes, we'll just cycle through components
                const components = ["rbc", "wbc", "platelets", "plasma", null];
                const currentIndex = components.indexOf(activeComponent);
                const nextIndex = (currentIndex + 1) % components.length;
                setActiveComponent(components[nextIndex]);
              }}
            ></canvas>
          </div>
          
          {showMicroscope && (
            <div className="microscope-view">
              <div className="microscope-image">
                {activeComponent && (
                  <img 
                    src={`https://medlineplus.gov/images/${activeComponent}_microscope.jpg`} 
                    alt={`Microscopic view of ${activeComponent}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Microscope+Image+Not+Available';
                    }}
                  />
                )}
              </div>
              <div className="microscope-controls">
                <select
                  value={activeComponent || ""}
                  onChange={(e) => setActiveComponent(e.target.value || null)}
                >
                  <option value="">Select Component</option>
                  {BLOOD_COMPONENTS.map(comp => (
                    <option key={comp.id} value={comp.id}>{comp.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        <div className="info-panel">
          <div className="component-info">
            {activeComponent ? (
              <>
                <h2>
                  {BLOOD_COMPONENTS.find(c => c.id === activeComponent)?.name}
                  <button 
                    className="close-btn"
                    onClick={() => setActiveComponent(null)}
                  >
                    ×
                  </button>
                </h2>
                
                <p>{BLOOD_COMPONENTS.find(c => c.id === activeComponent)?.description}</p>
                
                <div className="component-details">
                  <h3>Details:</h3>
                  <ul>
                    <li>Shape: {BLOOD_COMPONENTS.find(c => c.id === activeComponent)?.shape}</li>
                    <li>Size: {BLOOD_COMPONENTS.find(c => c.id === activeComponent)?.size} μm</li>
                    <li>Normal range: {BLOOD_COMPONENTS.find(c => c.id === activeComponent)?.normalRange}</li>
                  </ul>
                  
                  {activeComponent === "wbc" && (
                    <>
                      <h4>WBC Types:</h4>
                      <ul>
                        {BLOOD_COMPONENTS.find(c => c.id === "wbc")?.types.map((type, i) => (
                          <li key={i}>{type.name}: {type.percent}%</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {activeComponent === "plasma" && (
                    <>
                      <h4>Plasma Composition:</h4>
                      <ul>
                        {BLOOD_COMPONENTS.find(c => c.id === "plasma")?.composition.map((comp, i) => (
                          <li key={i}>{comp.name}: {comp.percent}%</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="welcome-message">
                <h2>Welcome to the Blood Lab</h2>
                <p>Click on blood components in the visualization or select from the menu to learn more about them.</p>
                <p>Adjust the blood parameters to see how it affects the composition.</p>
                
                <div className="blood-composition">
                  <h3>Current Blood Composition:</h3>
                  <ul>
                    <li>Red Blood Cells: {((bloodSample.rbc / 5) * 100).toFixed(1)}%</li>
                    <li>White Blood Cells: {((bloodSample.wbc / 10000) * 10).toFixed(1)}%</li>
                    <li>Platelets: {((bloodSample.platelets / 300000) * 150).toFixed(1)}%</li>
                    <li>Plasma: {bloodSample.plasma}L</li>
                    <li>Hematocrit: {bloodSample.hct}%</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          <div className="testing-panel">
            <h2>Blood Tests</h2>
            
            <div className="test-options">
              {TEST_OPTIONS.map(test => (
                <button
                  key={test.id}
                  onClick={() => runBloodTest(test.id)}
                  disabled={currentTest === test.id}
                >
                  {test.name}
                </button>
              ))}
            </div>
            
            {currentTest && (
              <div className="test-results">
                <h3>{TEST_OPTIONS.find(t => t.id === currentTest)?.name} Results</h3>
                
                {testResults ? (
                  <>
                    <pre>{JSON.stringify(testResults, null, 2)}</pre>
                    <div className="ai-analysis">
                      <h4>AI Analysis:</h4>
                      <p>{aiMessage}</p>
                    </div>
                    
                    {diagnosis && (
                      <div className="diagnosis">
                        <h4>Preliminary Diagnosis:</h4>
                        <p>{diagnosis}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p>Processing test... <span className="loading"></span></p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <footer>
        <p>Educational Virtual Lab - Blood Components Simulation with AI Diagnostics</p>
        <p>© {new Date().getFullYear()} Ethiopia Digital Medical Labs</p>
      </footer>
    </div>
  );
};

export default BloodComponents;