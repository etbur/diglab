import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ThermalDecomposition = () => {
  // Available compounds for decomposition
  const compounds = {
    caco3: {
      name: "Calcium Carbonate",
      formula: "CaCO3",
      products: ["CaO", "CO2"],
      equation: "CaCO3 → CaO + CO2",
      tempRange: [800, 900], // °C
      color: "#F5F5F5",
      productColors: { CaO: "#E6E6E6", CO2: "transparent" }
    },
    cuco3: {
      name: "Copper Carbonate",
      formula: "CuCO3",
      products: ["CuO", "CO2"],
      equation: "CuCO3 → CuO + CO2",
      tempRange: [200, 300],
      color: "#00A86B",
      productColors: { CuO: "#6B8E23", CO2: "transparent" }
    },
    znco3: {
      name: "Zinc Carbonate",
      formula: "ZnCO3",
      products: ["ZnO", "CO2"],
      equation: "ZnCO3 → ZnO + CO2",
      tempRange: [140, 300],
      color: "#F0F8FF",
      productColors: { ZnO: "#F5F5DC", CO2: "transparent" }
    },
    kclo3: {
      name: "Potassium Chlorate",
      formula: "KClO3",
      products: ["KCl", "O2"],
      equation: "2KClO3 → 2KCl + 3O2",
      tempRange: [400, 500],
      color: "#E6E6FA",
      productColors: { KCl: "#F0FFFF", O2: "transparent" }
    }
  };

  // Format equation with subscripts
  const formatEquation = (equation) => {
    return equation
      .replace(/CO2/g, 'CO₂')
      .replace(/O2/g, 'O₂')
      .replace(/CaCO3/g, 'CaCO₃')
      .replace(/CuCO3/g, 'CuCO₃')
      .replace(/ZnCO3/g, 'ZnCO₃')
      .replace(/KClO3/g, 'KClO₃');
  };

  // Experiment states
  const [selectedCompound, setSelectedCompound] = useState("caco3");
  const [temperature, setTemperature] = useState(25);
  const [isHeating, setIsHeating] = useState(false);
  const [reactionProgress, setReactionProgress] = useState(0);
  const [showEquation, setShowEquation] = useState(false);
  const [gasBubbles, setGasBubbles] = useState([]);
  const [aiExplanation, setAiExplanation] = useState("");
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [showTheory, setShowTheory] = useState(false);

  // Current compound data
  const currentCompound = compounds[selectedCompound];

  // Run the decomposition simulation
  useEffect(() => {
    let interval;
    let bubbleInterval;

    if (isHeating) {
      // Temperature increase
      interval = setInterval(() => {
        setTemperature(prev => {
          const newTemp = prev + 5;
          if (newTemp >= 1000) {
            setIsHeating(false);
            return 1000;
          }
          return newTemp;
        });
      }, 200);

      // Reaction progress
      const decompositionTemp = currentCompound.tempRange[0];
      if (temperature >= decompositionTemp && reactionProgress < 100) {
        setReactionProgress(prev => {
          const newProgress = prev + (temperature / decompositionTemp) * 0.5;
          return Math.min(newProgress, 100);
        });

        // Generate gas bubbles
        bubbleInterval = setInterval(() => {
          if (reactionProgress > 0 && reactionProgress < 100) {
            setGasBubbles(prev => [
              ...prev,
              {
                id: Date.now(),
                left: Math.random() * 60 + 20,
                size: Math.random() * 15 + 5
              }
            ]);
          }
        }, 500);
      }
    }

    return () => {
      clearInterval(interval);
      clearInterval(bubbleInterval);
    };
  }, [isHeating, temperature, reactionProgress, currentCompound]);

  // Remove bubbles that have floated away
  useEffect(() => {
    const bubbleTimer = setInterval(() => {
      setGasBubbles(prev => prev.filter(bubble => bubble.size < 30));
    }, 1000);

    return () => clearInterval(bubbleTimer);
  }, []);

  // Generate AI explanation
  const generateAiExplanation = () => {
    const compound = currentCompound;
    const isDecomposing = temperature >= compound.tempRange[0] && temperature <= compound.tempRange[1];
    const isComplete = reactionProgress >= 100;

    let explanation = `Current temperature: ${temperature}°C. `;
    
    if (temperature < compound.tempRange[0]) {
      explanation += `${compound.name} (${formatEquation(compound.formula)}) is stable at this temperature. `;
      explanation += `Decomposition will begin around ${compound.tempRange[0]}°C. `;
    } else if (isDecomposing && !isComplete) {
      explanation += `${compound.name} is actively decomposing (${reactionProgress.toFixed(0)}% complete). `;
      explanation += `The reaction follows: ${formatEquation(compound.equation)}. `;
      explanation += `You can observe ${compound.products.map(p => formatEquation(p)).join(" and ")} being produced. `;
    } else if (isComplete) {
      explanation += `Decomposition of ${compound.name} is complete! `;
      explanation += `The test tube now contains ${compound.products.map(p => formatEquation(p)).join(" and ")}. `;
    } else {
      explanation += `The decomposition temperature range (${compound.tempRange[0]}-${compound.tempRange[1]}°C) has been exceeded. `;
    }

    explanation += "Note: Thermal decomposition reactions should always be performed with proper safety equipment.";

    setAiExplanation(explanation);
  };

  // Reset the experiment
  const resetExperiment = () => {
    setIsHeating(false);
    setTemperature(25);
    setReactionProgress(0);
    setGasBubbles([]);
    setAiExplanation("");
  };

  // Generate quiz question
  const generateQuizQuestion = () => {
    const compoundKeys = Object.keys(compounds);
    const randomCompound = compounds[compoundKeys[Math.floor(Math.random() * compoundKeys.length)]];
    
    const questionTypes = ["products", "temperature", "equation"];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question, answer;
    
    switch (type) {
      case "products":
        question = `What are the products when ${randomCompound.name} decomposes?`;
        answer = randomCompound.products.map(p => formatEquation(p)).join(" and ");
        break;
        
      case "temperature":
        question = `At what temperature range does ${randomCompound.name} decompose?`;
        answer = `${randomCompound.tempRange[0]}°C to ${randomCompound.tempRange[1]}°C`;
        break;
        
      case "equation":
        question = `What is the balanced equation for ${randomCompound.name} decomposition?`;
        answer = formatEquation(randomCompound.equation);
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

  return (
    <div className="decomposition-lab">
      <header>
        <h1>Thermal Decomposition Laboratory</h1>
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
          <h2>Thermal Decomposition Theory</h2>
          <p>
            Thermal decomposition is a chemical reaction where a compound breaks down into simpler substances when heated.
            These reactions are typically endothermic, requiring energy input to break chemical bonds.
          </p>
          <p>
            General form: AB → A + B (when heated)
          </p>
          <p>
            Common examples include:
          </p>
          <ul>
            <li>Metal carbonates decomposing to metal oxides and carbon dioxide</li>
            <li>Metal hydroxides decomposing to metal oxides and water</li>
            <li>Metal nitrates decomposing to metal nitrites and oxygen</li>
          </ul>
          <p>
            Factors affecting decomposition:
          </p>
          <ul>
            <li><strong>Temperature:</strong> Each compound has a specific decomposition temperature range</li>
            <li><strong>Surface area:</strong> Finely powdered substances decompose faster</li>
            <li><strong>Catalysts:</strong> Some substances can lower the decomposition temperature</li>
          </ul>
        </div>
      )}

      <div className="experiment-area">
        <div className="controls">
          <div className="control-group">
            <h3>Select Compound</h3>
            <div className="compound-buttons">
              {Object.entries(compounds).map(([key, compound]) => (
                <button
                  key={key}
                  className={selectedCompound === key ? "active" : ""}
                  onClick={() => {
                    setSelectedCompound(key);
                    resetExperiment();
                  }}
                >
                  {compound.name} ({formatEquation(compound.formula)})
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>Temperature Control</h3>
            <div className="temperature-display">
              Current Temperature: {temperature}°C
              <div className="temp-range">
                Decomposition Range: {currentCompound.tempRange[0]}°C - {currentCompound.tempRange[1]}°C
              </div>
            </div>
            <input
              type="range"
              min="25"
              max="1000"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              disabled={isHeating}
            />
            <div className="heating-controls">
              <button
                className={isHeating ? "stop-button" : "start-button"}
                onClick={() => {
                  setIsHeating(!isHeating);
                  generateAiExplanation();
                }}
                disabled={temperature >= 1000 && isHeating}
              >
                {isHeating ? "Stop Heating" : "Start Heating"}
              </button>
              <button className="reset-button" onClick={resetExperiment}>
                Reset
              </button>
            </div>
          </div>

          <div className="reaction-info">
            <h3>Reaction Information</h3>
            <button onClick={() => setShowEquation(!showEquation)}>
              {showEquation ? "Hide Equation" : "Show Equation"}
            </button>
            {showEquation && (
              <div className="equation">
                {formatEquation(currentCompound.equation)}
              </div>
            )}
            <div className="progress-bar-container">
              Reaction Progress:
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${reactionProgress}%` }}
                ></div>
              </div>
              <span>{reactionProgress.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div className="simulation-area">
          <div className="bunsen-burner">
            <div className="flame" style={{ opacity: isHeating ? 1 : 0.3 }}></div>
          </div>
          <div className="test-tube">
            <div
              className="compound"
              style={{
                backgroundColor: currentCompound.color,
                opacity: 1 - (reactionProgress / 100) * 0.7
              }}
            ></div>
            {currentCompound.products.map(product => (
              <div
                key={product}
                className="product"
                style={{
                  backgroundColor: currentCompound.productColors[product],
                  opacity: reactionProgress / 100
                }}
              ></div>
            ))}
            {gasBubbles.map(bubble => (
              <div
                key={bubble.id}
                className="gas-bubble"
                style={{
                  left: `${bubble.left}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  bottom: `${bubble.size * 0.5}px`
                }}
              ></div>
            ))}
          </div>
          <div className="temperature-indicator">
            <div className="temp-value">{temperature}°C</div>
            <div className="thermometer">
              <div
                className="mercury"
                style={{ height: `${(temperature / 1000) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {aiExplanation && (
        <div className="ai-explanation">
          <h3>AI Analysis</h3>
          <p>{aiExplanation}</p>
        </div>
      )}

      <div className="quiz-section">
        <h2>Decomposition Knowledge Quiz</h2>
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
        .decomposition-lab {
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
        
        .compound-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .compound-buttons button {
          padding: 8px 12px;
          background: #e9ecef;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          text-align: left;
          transition: all 0.2s;
        }
        
        .compound-buttons button:hover {
          background: #dee2e6;
        }
        
        .compound-buttons button.active {
          background: #3498db;
          color: white;
          border-color: #2980b9;
        }
        
        .temperature-display {
          margin-bottom: 10px;
          font-weight: bold;
        }
        
        .temp-range {
          font-size: 14px;
          color: #666;
          margin-top: 5px;
        }
        
        input[type="range"] {
          width: 100%;
          margin: 10px 0;
        }
        
        .heating-controls {
          display: flex;
          gap: 10px;
          margin-top: 15px;
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
        
        .reaction-info {
          margin-top: 20px;
        }
        
        .equation {
          background: #e9ecef;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
          font-family: monospace;
          font-size: 18px;
          text-align: center;
        }
        
        .progress-bar-container {
          margin-top: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .progress-bar {
          flex-grow: 1;
          height: 20px;
          background: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: #3498db;
          transition: width 0.5s;
        }
        
        .simulation-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          height: 400px;
        }
        
        .bunsen-burner {
          width: 60px;
          height: 100px;
          background: #333;
          position: relative;
          z-index: 1;
        }
        
        .flame {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 80px;
          background: linear-gradient(to top, #ff7800, #ffdc00);
          border-radius: 50% 50% 20% 20%;
          filter: blur(5px);
          transition: opacity 0.3s;
        }
        
        .test-tube {
          width: 80px;
          height: 200px;
          background: rgba(255,255,255,0.5);
          border-radius: 0 0 10px 10px;
          position: relative;
          border: 2px solid #ccc;
          border-bottom: none;
          margin-bottom: 20px;
          overflow: hidden;
        }
        
        .compound, .product {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          transition: all 0.5s;
        }
        
        .product {
          height: 80%;
          bottom: 10%;
        }
        
        .gas-bubble {
          position: absolute;
          background: rgba(255,255,255,0.7);
          border-radius: 50%;
          animation: float-up 3s linear forwards;
        }
        
        @keyframes float-up {
          to {
            transform: translateY(-300px);
            opacity: 0;
          }
        }
        
        .temperature-indicator {
          position: absolute;
          right: 20px;
          bottom: 0;
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }
        
        .temp-value {
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .thermometer {
          width: 20px;
          height: 200px;
          background: #f0f0f0;
          border-radius: 10px;
          border: 2px solid #ccc;
          position: relative;
          overflow: hidden;
        }
        
        .mercury {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, #3498db, #e74c3c);
          transition: height 0.5s;
        }
        
        .ai-explanation {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
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
        
        .quiz-button {
          background: #9b59b6;
          color: white;
          margin-bottom: 15px;
        }
        
        .quiz-button:hover {
          background: #8e44ad;
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
          
          .simulation-area {
            height: 300px;
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ThermalDecomposition;