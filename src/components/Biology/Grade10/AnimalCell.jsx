import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./AnimalCell.css";

const CELL_COMPONENTS = [
  {
    id: "nucleus",
    name: "Nucleus",
    description: "Control center of the cell containing DNA",
    color: "#ff6b6b",
    size: 30,
    position: { x: 50, y: 50 },
    animation: "pulse",
    facts: [
      "Contains the cell's genetic material",
      "Directs protein synthesis",
      "Surrounded by nuclear envelope"
    ]
  },
  {
    id: "mitochondria",
    name: "Mitochondria",
    description: "Powerhouse of the cell, produces ATP",
    color: "#4ecdc4",
    size: 15,
    position: { x: 30, y: 70 },
    animation: "float",
    facts: [
      "Has its own DNA",
      "Site of cellular respiration",
      "Number varies by cell type"
    ]
  },
  {
    id: "golgi",
    name: "Golgi Apparatus",
    description: "Processes and packages proteins",
    color: "#ffe66d",
    size: 20,
    position: { x: 70, y: 60 },
    animation: "rotate",
    facts: [
      "Modifies proteins from ER",
      "Creates lysosomes",
      "Works like a post office"
    ]
  },
  {
    id: "er",
    name: "Endoplasmic Reticulum",
    description: "Transport network in the cell",
    color: "#ff9ff3",
    size: 25,
    position: { x: 40, y: 40 },
    animation: "wave",
    facts: [
      "Rough ER has ribosomes",
      "Smooth ER makes lipids",
      "Connected to nuclear envelope"
    ]
  },
  {
    id: "lysosome",
    name: "Lysosome",
    description: "Digests waste and foreign material",
    color: "#1dd1a1",
    size: 10,
    position: { x: 60, y: 80 },
    animation: "bounce",
    facts: [
      "Contains digestive enzymes",
      "Breaks down cellular waste",
      "Protects against bacteria"
    ]
  }
];

const MICROSCOPE_SETTINGS = {
  magnification: ["40x", "100x", "400x", "1000x"],
  staining: ["None", "Methylene Blue", "Iodine", "Eosin"],
  lighting: ["Brightfield", "Phase Contrast", "Darkfield", "Fluorescence"]
};

const AnimalCell = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [magnification, setMagnification] = useState("400x");
  const [staining, setStaining] = useState("Methylene Blue");
  const [lighting, setLighting] = useState("Brightfield");
  const [focus, setFocus] = useState(50);
  const [aiExplanation, setAiExplanation] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [cellHealth, setCellHealth] = useState(100);
  const [time, setTime] = useState(0);
  const canvasRef = useRef(null);

  // Animation frame reference
  const animationRef = useRef();
  const lastTimeRef = useRef(0);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const animate = (timestamp) => {
      // Calculate delta time
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw cell membrane
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 150, 0, Math.PI * 2);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw cytoplasm
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 149, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200, 230, 255, 0.3)';
      ctx.fill();
      
      // Draw cell components
      CELL_COMPONENTS.forEach(component => {
        const x = canvas.width/2 + component.position.x - 50;
        const y = canvas.height/2 + component.position.y - 50;
        
        // Animation effects
        let offsetX = 0, offsetY = 0;
        const animSpeed = time * 0.001;
        
        switch(component.animation) {
          case 'pulse':
            const pulseScale = 1 + Math.sin(animSpeed * 2) * 0.1;
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(pulseScale, pulseScale);
            ctx.translate(-x, -y);
            break;
          case 'float':
            offsetY = Math.sin(animSpeed * 3) * 5;
            break;
          case 'rotate':
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(animSpeed);
            ctx.translate(-x, -y);
            break;
          case 'wave':
            offsetX = Math.sin(animSpeed * 1.5) * 8;
            break;
          case 'bounce':
            offsetY = Math.abs(Math.sin(animSpeed * 4)) * 5;
            break;
        }
        
        // Draw component
        ctx.beginPath();
        
        // Different shapes for different components
        switch(component.id) {
          case 'nucleus':
            ctx.arc(x + offsetX, y + offsetY, component.size, 0, Math.PI * 2);
            // Nucleolus
            ctx.moveTo(x + offsetX + component.size/3, y + offsetY);
            ctx.arc(x + offsetX, y + offsetY, component.size/3, 0, Math.PI * 2);
            break;
          case 'mitochondria':
            ctx.ellipse(x + offsetX, y + offsetY, component.size, component.size/2, 0, 0, Math.PI * 2);
            // Cristae
            for(let i = 0; i < 5; i++) {
              const angle = i * Math.PI/2.5;
              ctx.moveTo(x + offsetX + Math.cos(angle) * component.size/2, 
                         y + offsetY + Math.sin(angle) * component.size/4);
              ctx.lineTo(x + offsetX - Math.cos(angle) * component.size/2, 
                         y + offsetY - Math.sin(angle) * component.size/4);
            }
            break;
          case 'golgi':
            // Stack of cisternae
            for(let i = 0; i < 4; i++) {
              ctx.moveTo(x + offsetX - component.size, y + offsetY - component.size/2 + i*5);
              ctx.lineTo(x + offsetX + component.size, y + offsetY - component.size/2 + i*5);
              ctx.lineTo(x + offsetX + component.size/2, y + offsetY + component.size/2 + i*5);
              ctx.lineTo(x + offsetX - component.size/2, y + offsetY + component.size/2 + i*5);
              ctx.closePath();
            }
            break;
          case 'er':
            // Wavy ER structure
            ctx.moveTo(x + offsetX - component.size, y + offsetY);
            for(let i = 0; i < 10; i++) {
              const px = x + offsetX - component.size + i * (component.size*2)/9;
              const py = y + offsetY + Math.sin(i) * 10;
              ctx.lineTo(px, py);
            }
            // Add ribosomes if rough ER
            if(Math.random() > 0.7) {
              ctx.moveTo(x + offsetX - component.size/2, y + offsetY + 5);
              ctx.arc(x + offsetX - component.size/2, y + offsetY + 5, 2, 0, Math.PI * 2);
            }
            break;
          case 'lysosome':
            ctx.arc(x + offsetX, y + offsetY, component.size, 0, Math.PI * 2);
            // Internal dots
            for(let i = 0; i < 3; i++) {
              ctx.moveTo(x + offsetX + Math.cos(i) * component.size/2, 
                         y + offsetY + Math.sin(i) * component.size/2);
              ctx.arc(x + offsetX + Math.cos(i) * component.size/2, 
                      y + offsetY + Math.sin(i) * component.size/2, 
                      1, 0, Math.PI * 2);
            }
            break;
        }
        
        ctx.fillStyle = component.color;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        if(component.animation === 'pulse' || component.animation === 'rotate') {
          ctx.restore();
        }
        
        // Highlight if active
        if(activeComponent === component.id) {
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, component.size + 5, 0, Math.PI * 2);
          ctx.strokeStyle = 'yellow';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      
      // Update time for animations
      setTime(prev => prev + deltaTime);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [activeComponent, time]);

  const handleComponentClick = (componentId) => {
    setActiveComponent(componentId === activeComponent ? null : componentId);
    
    const component = CELL_COMPONENTS.find(c => c.id === componentId);
    if (component) {
      generateAIExplanation(component);
    }
  };

  const generateAIExplanation = (component) => {
    // Simulate AI generating an explanation
    const explanations = [
      `The ${component.name} is ${component.description}. Under ${magnification} magnification with ${staining} staining, ` +
      `you can observe its distinct ${component.color} coloration.`,

      `As an AI lab assistant, I can tell you the ${component.name} appears particularly active right now. ` +
      `${component.description}. Did you know: ${component.facts[Math.floor(Math.random() * component.facts.length)]}`,

      `Microscopy analysis reveals the ${component.name} is functioning normally. ${component.description}. ` +
      `At ${magnification} magnification with ${lighting} lighting, we can observe its characteristic structure.`,

      `AI-enhanced microscopy detects the ${component.name}. Interesting fact: ${component.facts[Math.floor(Math.random() * component.facts.length)]} ` +
      `This organelle is crucial for cell survival. Current health metrics: ${cellHealth}% viability.`
    ];

    setAiExplanation(explanations[Math.floor(Math.random() * explanations.length)]);
  };

  const generateQuizQuestion = () => {
    const component = CELL_COMPONENTS[Math.floor(Math.random() * CELL_COMPONENTS.length)];
    const questions = [
      {
        question: `What is the primary function of the ${component.name}?`,
        answer: component.description.replace(/.*?\./, '').trim()
      },
      {
        question: `Which cellular component is described as: "${component.description}"?`,
        answer: component.name
      },
      {
        question: `True or False: The ${component.name} ${component.facts[0]}`,
        answer: "True"
      },
      {
        question: `What color does the ${component.name} typically appear with ${staining} staining?`,
        answer: component.color
      }
    ];

    const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuizQuestion(selectedQuestion);
    setUserAnswer("");
    setFeedback("");
    setShowQuiz(true);
  };

  const checkAnswer = () => {
    if (!quizQuestion) return;
    
    const isCorrect = userAnswer.toLowerCase().includes(quizQuestion.answer.toLowerCase());
    setFeedback(isCorrect ? "✅ Correct! Great job!" : `❌ Incorrect. The answer was: ${quizQuestion.answer}`);
    setCellHealth(prev => Math.min(100, prev + (isCorrect ? 5 : -10)));
  };

  const adjustFocus = (e) => {
    const rect = e.target.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const focusValue = Math.min(100, Math.max(0, 100 - (y / rect.height) * 100));
    setFocus(focusValue);
  };

  return (
    <div className="microscopy-lab">
      <header>
        <h1>Animal Cell Microscopy Lab</h1>
        <p className="subtitle">Interactive Digital Simulation with AI Assistant</p>
      </header>

      <div className="lab-container">
        <div className="microscope-controls">
          <h2>Microscope Controls</h2>
          
          <div className="control-group">
            <label>Magnification:</label>
            <select value={magnification} onChange={(e) => setMagnification(e.target.value)}>
              {MICROSCOPE_SETTINGS.magnification.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label>Staining:</label>
            <select value={staining} onChange={(e) => setStaining(e.target.value)}>
              {MICROSCOPE_SETTINGS.staining.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label>Lighting:</label>
            <select value={lighting} onChange={(e) => setLighting(e.target.value)}>
              {MICROSCOPE_SETTINGS.lighting.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          
          <div className="control-group focus-control" onClick={adjustFocus}>
            <label>Focus: {focus}%</label>
            <div className="focus-slider">
              <div className="focus-indicator" style={{ top: `${100 - focus}%` }}></div>
            </div>
          </div>
          
          <div className="cell-health">
            <label>Cell Viability: {cellHealth}%</label>
            <div className="health-bar">
              <div 
                className="health-level" 
                style={{ 
                  width: `${cellHealth}%`,
                  backgroundColor: cellHealth > 70 ? '#4CAF50' : cellHealth > 30 ? '#FFC107' : '#F44336'
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="microscope-view">
          <div className={`microscope-eyepiece ${lighting.toLowerCase()}`}>
            <canvas 
              ref={canvasRef} 
              width="400" 
              height="400"
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Check if clicked on a component
                CELL_COMPONENTS.forEach(component => {
                  const compX = rect.width/2 + component.position.x - 50;
                  const compY = rect.height/2 + component.position.y - 50;
                  const distance = Math.sqrt((x - compX)**2 + (y - compY)**2);
                  
                  if(distance < component.size + 5) {
                    handleComponentClick(component.id);
                  }
                });
              }}
            ></canvas>
            <div className="focus-overlay" style={{ opacity: (100 - focus)/100 }}></div>
            <div className="magnification-badge">{magnification}</div>
            <div className="staining-badge">{staining}</div>
          </div>
          
          <div className="microscope-base">
            <button className="quiz-button" onClick={generateQuizQuestion}>
              {showQuiz ? "Hide Quiz" : "Start Cell Quiz"}
            </button>
          </div>
        </div>

        <div className="lab-info">
          {activeComponent ? (
            <div className="component-info">
              <h2>
                {CELL_COMPONENTS.find(c => c.id === activeComponent)?.name}
                <span className="close-btn" onClick={() => setActiveComponent(null)}>×</span>
              </h2>
              <p>{CELL_COMPONENTS.find(c => c.id === activeComponent)?.description}</p>
              
              <h3>Key Facts:</h3>
              <ul>
                {CELL_COMPONENTS.find(c => c.id === activeComponent)?.facts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
              
              <div className="ai-explanation">
                <h3>AI Analysis:</h3>
                <p>{aiExplanation || "Analyzing cellular structure..."}</p>
              </div>
            </div>
          ) : (
            <div className="welcome-message">
              <h2>Welcome to the Virtual Microscopy Lab</h2>
              <p>Click on any cell component to examine it under the microscope. Adjust settings to see how they affect your view.</p>
              <p>Current settings: {magnification}, {staining} staining, {lighting} illumination.</p>
              
              <div className="ai-tip">
                <h3>AI Tip of the Day:</h3>
                <p>Did you know? The nucleus was the first organelle to be discovered, observed by Antonie van Leeuwenhoek in the 17th century.</p>
              </div>
            </div>
          )}
          
          {showQuiz && quizQuestion && (
            <div className="quiz-panel">
              <h3>Cell Biology Quiz</h3>
              <p>{quizQuestion.question}</p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer..."
              />
              <button onClick={checkAnswer}>Submit</button>
              {feedback && <div className="quiz-feedback">{feedback}</div>}
            </div>
          )}
        </div>
      </div>
      
      <footer>
        <p>Educational Virtual Lab - Animal Cell Microscopy Simulation with AI Assistant</p>
        <p>© {new Date().getFullYear()} Ethiopia Digital Biology Labs</p>
      </footer>
    </div>
  );
};

export default AnimalCell;