import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const RustingCorrosion = () => {
  // Experiment states
  const [environment, setEnvironment] = useState("normal"); // normal, salty, acidic
  const [metalType, setMetalType] = useState("iron"); // iron, steel, aluminum, copper
  const [protectionMethod, setProtectionMethod] = useState("none"); // none, paint, galvanize, oil
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [corrosionLevel, setCorrosionLevel] = useState(0);
  const [showTheory, setShowTheory] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");

  // Metal properties
  const metals = {
    iron: { name: "Iron", corrosionRate: 1.0, color: "#b7410e", rustColor: "#8B0000" },
    steel: { name: "Steel", corrosionRate: 0.8, color: "#71797E", rustColor: "#654321" },
    aluminum: { name: "Aluminum", corrosionRate: 0.2, color: "#A9A9A9", rustColor: "#E6D690" },
    copper: { name: "Copper", corrosionRate: 0.3, color: "#B87333", rustColor: "#33B87C" }
  };

  // Environment factors
  const environments = {
    normal: { name: "Normal Air", factor: 1.0 },
    salty: { name: "Salt Water", factor: 3.0 },
    acidic: { name: "Acid Rain", factor: 2.5 }
  };

  // Protection methods
  const protections = {
    none: { name: "No Protection", factor: 1.0 },
    paint: { name: "Painted", factor: 0.3 },
    galvanize: { name: "Galvanized", factor: 0.1 },
    oil: { name: "Oiled", factor: 0.4 }
  };

  // Calculate corrosion rate based on conditions
  const calculateCorrosionRate = () => {
    const baseRate = metals[metalType].corrosionRate;
    const envFactor = environments[environment].factor;
    const protFactor = protections[protectionMethod].factor;
    
    return baseRate * envFactor * protFactor;
  };

  // Run the simulation
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        setCorrosionLevel(prev => {
          const newLevel = prev + calculateCorrosionRate() * 0.1;
          return Math.min(newLevel, 100); // Cap at 100%
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, metalType, environment, protectionMethod]);

  // Generate AI explanation
  const generateAiExplanation = () => {
    const metal = metals[metalType];
    const env = environments[environment];
    const prot = protections[protectionMethod];
    
    let explanation = `The ${metal.name} sample is exposed to ${env.name.toLowerCase()} conditions `;
    explanation += `with ${prot.name.toLowerCase()} protection. `;
    
    if (corrosionLevel < 20) {
      explanation += `Currently showing minimal corrosion (${corrosionLevel.toFixed(1)}%). `;
    } else if (corrosionLevel < 50) {
      explanation += `Moderate corrosion is visible (${corrosionLevel.toFixed(1)}%). `;
    } else {
      explanation += `Severe corrosion has occurred (${corrosionLevel.toFixed(1)}%). `;
    }
    
    explanation += `Corrosion rate is ${calculateCorrosionRate().toFixed(2)} units per second. `;
    
    // Explain factors
    explanation += `This rate is influenced by: `;
    explanation += `${metal.name}'s natural corrosion resistance (${metal.corrosionRate.toFixed(1)}), `;
    explanation += `${env.name} environment (x${env.factor.toFixed(1)}), `;
    explanation += `and ${prot.name} protection (x${prot.factor.toFixed(1)}).`;
    
    // Prevention tips
    if (corrosionLevel > 30) {
      explanation += ` To reduce corrosion, consider better protection methods like `;
      if (protectionMethod === "none") {
        explanation += `painting, galvanizing, or applying protective oils.`;
      } else if (protectionMethod === "oil") {
        explanation += `galvanizing or using more durable coatings.`;
      } else if (protectionMethod === "paint") {
        explanation += `galvanizing for longer-term protection.`;
      }
    }
    
    setAiExplanation(explanation);
  };

  // Reset the experiment
  const resetExperiment = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setCorrosionLevel(0);
    setAiExplanation("");
  };

  // Generate quiz question
  const generateQuizQuestion = () => {
    const questionTypes = ["metal-corrosion", "environment-effect", "protection-method"];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question, answer;
    
    switch (type) {
      case "metal-corrosion":
        const metalKeys = Object.keys(metals);
        const metal1 = metals[metalKeys[Math.floor(Math.random() * metalKeys.length)]];
        const metal2 = metals[metalKeys[Math.floor(Math.random() * metalKeys.length)]];
        question = `Which metal is more resistant to corrosion: ${metal1.name} or ${metal2.name}?`;
        answer = metal1.corrosionRate < metal2.corrosionRate ? metal1.name : metal2.name;
        break;
        
      case "environment-effect":
        const envKeys = Object.keys(environments);
        const env = environments[envKeys[Math.floor(Math.random() * envKeys.length)]];
        question = `How does ${env.name.toLowerCase()} affect corrosion compared to normal air?`;
        answer = `Increases corrosion by ${env.factor.toFixed(1)}x`;
        break;
        
      case "protection-method":
        const protKeys = Object.keys(protections);
        const prot1 = protections[protKeys[Math.floor(Math.random() * protKeys.length)]];
        const prot2 = protections[protKeys[Math.floor(Math.random() * protKeys.length)]];
        question = `Which protection method is more effective: ${prot1.name.toLowerCase()} or ${prot2.name.toLowerCase()}?`;
        answer = prot1.factor < prot2.factor ? prot1.name : prot2.name;
        break;
    }
    
    setQuizQuestion({ type, question, answer });
    setQuizAnswer("");
    setQuizFeedback("");
  };

  // Check quiz answer
  const checkQuizAnswer = () => {
    if (!quizQuestion) return;
    
    const normalizedAnswer = quizAnswer.trim().toLowerCase();
    const normalizedCorrect = quizQuestion.answer.toLowerCase();
    
    if (normalizedAnswer === normalizedCorrect || 
        normalizedAnswer.includes(normalizedCorrect) ||
        normalizedCorrect.includes(normalizedAnswer)) {
      setQuizFeedback("Correct! Well done!");
    } else {
      setQuizFeedback(`Incorrect. The correct answer is: ${quizQuestion.answer}`);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="corrosion-lab">
      <header>
        <h1>Rusting and Corrosion Laboratory</h1>
        <p className="subtitle">Interactive Digital Simulation • Ethiopian Science Academy</p>
      </header>

      <div className="tabs">
        <NavLink to="/chemistry" className="tab">Back to Chemistry</NavLink>
        <button className="tab" onClick={() => setShowTheory(!showTheory)}>
          {showTheory ? "Hide Theory" : "Show Theory"}
        </button>
      </div>

      {showTheory && (
        <div className="theory-section">
          <h2>Rusting and Corrosion Theory</h2>
          <p>
            Corrosion is the gradual destruction of materials (usually metals) by chemical reaction with their environment.
            Rusting is a specific type of corrosion that occurs with iron and its alloys when exposed to oxygen and moisture.
          </p>
          <p>
            The rusting process involves oxidation of iron: 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ (hydrated iron(III) oxide).
            This reaction is accelerated by:
          </p>
          <ul>
            <li>Presence of salts (electrolytes)</li>
            <li>Acidic conditions</li>
            <li>Higher temperatures</li>
            <li>Mechanical stress on the metal</li>
          </ul>
          <p>
            Common prevention methods include:
          </p>
          <ul>
            <li><strong>Galvanizing:</strong> Coating with zinc which corrodes first (sacrificial protection)</li>
            <li><strong>Painting:</strong> Creating a barrier between metal and environment</li>
            <li><strong>Oiling/Greasing:</strong> Preventing moisture contact</li>
            <li><strong>Alloying:</strong> Creating corrosion-resistant metals like stainless steel</li>
          </ul>
        </div>
      )}

      <div className="experiment-area">
        <div className="controls">
          <div className="control-group">
            <h3>Metal Type</h3>
            <div className="option-buttons">
              {Object.entries(metals).map(([key, metal]) => (
                <button
                  key={key}
                  className={metalType === key ? "active" : ""}
                  onClick={() => {
                    setMetalType(key);
                    resetExperiment();
                  }}
                >
                  {metal.name}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>Environment</h3>
            <div className="option-buttons">
              {Object.entries(environments).map(([key, env]) => (
                <button
                  key={key}
                  className={environment === key ? "active" : ""}
                  onClick={() => {
                    setEnvironment(key);
                    resetExperiment();
                  }}
                >
                  {env.name}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>Protection Method</h3>
            <div className="option-buttons">
              {Object.entries(protections).map(([key, prot]) => (
                <button
                  key={key}
                  className={protectionMethod === key ? "active" : ""}
                  onClick={() => {
                    setProtectionMethod(key);
                    resetExperiment();
                  }}
                >
                  {prot.name}
                </button>
              ))}
            </div>
          </div>

          <div className="experiment-controls">
            <button 
              className={isRunning ? "stop-button" : "start-button"} 
              onClick={() => {
                setIsRunning(!isRunning);
                generateAiExplanation();
              }}
            >
              {isRunning ? "Stop Experiment" : "Start Experiment"}
            </button>
            <button className="reset-button" onClick={resetExperiment}>
              Reset
            </button>
          </div>
        </div>

        <div className="simulation-area">
          <div className="metal-sample">
            <div 
              className="metal" 
              style={{
                backgroundColor: metals[metalType].color,
                backgroundImage: `
                  linear-gradient(45deg, 
                    ${metals[metalType].rustColor} ${corrosionLevel * 0.7}%, 
                    transparent ${corrosionLevel * 0.7}%)
                `,
                boxShadow: `0 0 ${corrosionLevel * 0.2}px ${metals[metalType].rustColor}`
              }}
            >
              <div className="corrosion-level">
                Corrosion: {corrosionLevel.toFixed(1)}%
              </div>
              <div className="time-elapsed">
                Time: {formatTime(timeElapsed)}
              </div>
            </div>
            <div className="environment-label">
              {environments[environment].name}
            </div>
          </div>

          {aiExplanation && (
            <div className="ai-explanation">
              <h3>AI Analysis</h3>
              <p>{aiExplanation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="quiz-section">
        <h2>Corrosion Knowledge Quiz</h2>
        <button className="quiz-button" onClick={generateQuizQuestion}>
          Generate Quiz Question
        </button>

        {quizQuestion && (
          <div className="quiz-area">
            <div className="question">{quizQuestion.question}</div>
            <div className="answer-input">
              <input
                type="text"
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Your answer..."
                onKeyPress={(e) => e.key === 'Enter' && checkQuizAnswer()}
              />
              <button onClick={checkQuizAnswer}>Submit</button>
            </div>
            {quizFeedback && (
              <div className={`feedback ${quizFeedback.startsWith("Correct") ? "correct" : "incorrect"}`}>
                {quizFeedback}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .corrosion-lab {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        
        header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        h1 {
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .subtitle {
          color: #7f8c8d;
          font-style: italic;
          margin-top: 0;
        }
        
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .tab {
          padding: 10px 15px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          font-size: 14px;
        }
        
        .tab:hover {
          background: #2980b9;
        }
        
        .theory-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .theory-section h2 {
          color: #2c3e50;
          margin-top: 0;
        }
        
        .experiment-area {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .controls {
          flex: 1;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .control-group {
          margin-bottom: 20px;
        }
        
        .control-group h3 {
          margin-top: 0;
          color: #2c3e50;
        }
        
        .option-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .option-buttons button {
          padding: 8px 12px;
          background: #e9ecef;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .option-buttons button:hover {
          background: #dee2e6;
        }
        
        .option-buttons button.active {
          background: #3498db;
          color: white;
          border-color: #2980b9;
        }
        
        .experiment-controls {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        
        .start-button, .stop-button, .reset-button, .quiz-button {
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        
        .start-button {
          background: #2ecc71;
          color: white;
        }
        
        .start-button:hover {
          background: #27ae60;
        }
        
        .stop-button {
          background: #e74c3c;
          color: white;
        }
        
        .stop-button:hover {
          background: #c0392b;
        }
        
        .reset-button {
          background: #f39c12;
          color: white;
        }
        
        .reset-button:hover {
          background: #d35400;
        }
        
        .quiz-button {
          background: #9b59b6;
          color: white;
          margin-bottom: 15px;
        }
        
        .quiz-button:hover {
          background: #8e44ad;
        }
        
        .simulation-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .metal-sample {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .metal {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-shadow: 0 0 3px rgba(0,0,0,0.8);
          font-weight: bold;
          transition: all 1s ease;
          position: relative;
          overflow: hidden;
        }
        
        .corrosion-level, .time-elapsed {
          background: rgba(0,0,0,0.6);
          padding: 5px 10px;
          border-radius: 4px;
          margin: 5px;
        }
        
        .environment-label {
          margin-top: 15px;
          font-size: 18px;
          font-weight: bold;
          color: #2c3e50;
        }
        
        .ai-explanation {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .ai-explanation h3 {
          margin-top: 0;
          color: #2c3e50;
        }
        
        .quiz-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .quiz-area {
          margin-top: 15px;
        }
        
        .question {
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        
        .answer-input {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        
        .answer-input input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .answer-input button {
          padding: 8px 15px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .answer-input button:hover {
          background: #2980b9;
        }
        
        .feedback {
          padding: 10px;
          border-radius: 4px;
        }
        
        .feedback.correct {
          background: #d4edda;
          color: #155724;
        }
        
        .feedback.incorrect {
          background: #f8d7da;
          color: #721c24;
        }
        
        @media (max-width: 768px) {
          .experiment-area {
            flex-direction: column;
          }
          
          .option-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default RustingCorrosion;