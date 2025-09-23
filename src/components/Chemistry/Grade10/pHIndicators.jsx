import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const pHIndicators = () => {
  // Available indicators with their pH ranges and colors
  const indicators = [
    { name: "Universal Indicator", ranges: [
      { pH: 0, color: "red" }, { pH: 1, color: "red" }, { pH: 2, color: "red" },
      { pH: 3, color: "orange" }, { pH: 4, color: "orange" },
      { pH: 5, color: "yellow" }, { pH: 6, color: "yellow" },
      { pH: 7, color: "green" },
      { pH: 8, color: "blue" }, { pH: 9, color: "blue" },
      { pH: 10, color: "indigo" }, { pH: 11, color: "indigo" },
      { pH: 12, color: "violet" }, { pH: 13, color: "violet" }, { pH: 14, color: "violet" }
    ]},
    { name: "Litmus", ranges: [
      { pH: 0, color: "red" }, { pH: 6, color: "red" },
      { pH: 7, color: "purple" },
      { pH: 8, color: "blue" }, { pH: 14, color: "blue" }
    ]},
    { name: "Phenolphthalein", ranges: [
      { pH: 0, color: "colorless" }, { pH: 8, color: "colorless" },
      { pH: 8.3, color: "pink" }, { pH: 14, color: "pink" }
    ]},
    { name: "Methyl Orange", ranges: [
      { pH: 0, color: "red" }, { pH: 3.1, color: "red" },
      { pH: 3.2, color: "orange" }, { pH: 4.4, color: "orange" },
      { pH: 4.5, color: "yellow" }, { pH: 14, color: "yellow" }
    ]},
    { name: "Bromothymol Blue", ranges: [
      { pH: 0, color: "yellow" }, { pH: 6, color: "yellow" },
      { pH: 6.1, color: "green" }, { pH: 7.6, color: "green" },
      { pH: 7.7, color: "blue" }, { pH: 14, color: "blue" }
    ]}
  ];

  // Common substances with their pH values
  const substances = [
    { name: "Hydrochloric Acid", pH: 0, concentration: "1M" },
    { name: "Lemon Juice", pH: 2, concentration: "natural" },
    { name: "Vinegar", pH: 3, concentration: "5%" },
    { name: "Orange Juice", pH: 3.5, concentration: "natural" },
    { name: "Tomato Juice", pH: 4.5, concentration: "natural" },
    { name: "Black Coffee", pH: 5, concentration: "brewed" },
    { name: "Milk", pH: 6.5, concentration: "whole" },
    { name: "Pure Water", pH: 7, concentration: "distilled" },
    { name: "Blood", pH: 7.4, concentration: "human" },
    { name: "Baking Soda", pH: 8.5, concentration: "1M" },
    { name: "Ammonia", pH: 11, concentration: "household" },
    { name: "Sodium Hydroxide", pH: 14, concentration: "1M" }
  ];

  // State variables
  const [selectedIndicator, setSelectedIndicator] = useState(indicators[0]);
  const [selectedSubstance, setSelectedSubstance] = useState(null);
  const [customPH, setCustomPH] = useState(7);
  const [showColor, setShowColor] = useState(false);
  const [resultColor, setResultColor] = useState("white");
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [showTheory, setShowTheory] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");

  // Determine the color based on pH and selected indicator
  const getColorForPH = (pH, indicator) => {
    const ranges = indicator.ranges;
    for (let i = 0; i < ranges.length - 1; i++) {
      if (pH >= ranges[i].pH && pH <= ranges[i + 1].pH) {
        // If we're at the transition point, blend the colors
        if (i < ranges.length - 1 && pH === ranges[i + 1].pH) {
          return ranges[i + 1].color;
        }
        return ranges[i].color;
      }
    }
    return ranges[ranges.length - 1].color;
  };

  // Test the selected substance or custom pH
  const testPH = () => {
    const pH = selectedSubstance ? selectedSubstance.pH : customPH;
    const color = getColorForPH(pH, selectedIndicator);
    setResultColor(color);
    setShowColor(true);
    
    // Generate AI explanation
    generateAiExplanation(pH, color);
  };

  // AI-generated explanation
  const generateAiExplanation = (pH, color) => {
    let explanation = `The ${selectedIndicator.name} indicator turns ${color} at pH ${pH}. `;
    
    if (pH < 7) {
      explanation += `This indicates an acidic solution. `;
      if (pH <= 3) explanation += `The solution is strongly acidic. `;
      else explanation += `The solution is weakly acidic. `;
    } else if (pH > 7) {
      explanation += `This indicates a basic (alkaline) solution. `;
      if (pH >= 11) explanation += `The solution is strongly basic. `;
      else explanation += `The solution is weakly basic. `;
    } else {
      explanation += `This indicates a neutral solution. `;
    }
    
    explanation += `In chemistry, pH indicators like ${selectedIndicator.name} are used to visually determine the pH of a solution based on color changes. `;
    
    if (selectedSubstance) {
      explanation += `${selectedSubstance.name} (${selectedSubstance.concentration}) typically has a pH of ${selectedSubstance.pH}.`;
    }
    
    setAiExplanation(explanation);
  };

  // Generate a quiz question
  const generateQuizQuestion = () => {
    const questionTypes = ["indicator-color", "substance-pH", "indicator-range"];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question, answer;
    
    switch (type) {
      case "indicator-color":
        const indicator = indicators[Math.floor(Math.random() * indicators.length)];
        const pH = Math.floor(Math.random() * 15); // 0-14
        question = `What color does ${indicator.name} turn at pH ${pH}?`;
        answer = getColorForPH(pH, indicator);
        break;
        
      case "substance-pH":
        const substance = substances[Math.floor(Math.random() * substances.length)];
        question = `What is the approximate pH of ${substance.name}?`;
        answer = substance.pH.toString();
        break;
        
      case "indicator-range":
        const indicator2 = indicators[Math.floor(Math.random() * indicators.length)];
        const isAcidic = Math.random() > 0.5;
        question = `At what pH range does ${indicator2.name} change color in ${isAcidic ? "acidic" : "basic"} solutions?`;
        
        // Find transition points
        const transitions = [];
        for (let i = 1; i < indicator2.ranges.length; i++) {
          if (indicator2.ranges[i].color !== indicator2.ranges[i-1].color) {
            transitions.push(indicator2.ranges[i].pH);
          }
        }
        
        if (isAcidic) {
          answer = `Below pH ${transitions[0]}`;
        } else {
          answer = `Above pH ${transitions[transitions.length - 1]}`;
        }
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

  // Reset the experiment
  const resetExperiment = () => {
    setSelectedSubstance(null);
    setCustomPH(7);
    setShowColor(false);
    setAiExplanation("");
  };

  return (
    <div className="ph-lab">
      <header>
        <h1>pH and Indicators Laboratory</h1>
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
          <h2>pH and Indicators Theory</h2>
          <p>
            pH is a measure of how acidic or basic a solution is, ranging from 0 (very acidic) to 14 (very basic), 
            with 7 being neutral. pH indicators are substances that change color depending on the pH of the solution 
            they're in, allowing us to visually determine the approximate pH.
          </p>
          <p>
            Different indicators have different pH ranges where they change color. For example:
          </p>
          <ul>
            <li><strong>Litmus</strong>: Red in acid (pH &lt; 7), purple at neutral (pH = 7), blue in base (pH &gt; 7)</li>
            <li><strong>Phenolphthalein</strong>: Colorless in acid (pH &lt; 8.3), pink in base (pH ≥ 8.3)</li>
            <li><strong>Universal Indicator</strong>: Shows a range of colors across the entire pH scale</li>
          </ul>
        </div>
      )}

      <div className="experiment-area">
        <div className="controls">
          <div className="control-group">
            <h3>Select Indicator</h3>
            <div className="indicator-buttons">
              {indicators.map(indicator => (
                <button
                  key={indicator.name}
                  className={selectedIndicator.name === indicator.name ? "active" : ""}
                  onClick={() => {
                    setSelectedIndicator(indicator);
                    resetExperiment();
                  }}
                >
                  {indicator.name}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>Test Substance</h3>
            <div className="substance-buttons">
              {substances.map(substance => (
                <button
                  key={substance.name}
                  className={selectedSubstance?.name === substance.name ? "active" : ""}
                  onClick={() => {
                    setSelectedSubstance(substance);
                    setShowColor(false);
                  }}
                >
                  {substance.name} (pH {substance.pH})
                </button>
              ))}
            </div>
            <div className="custom-ph">
              <h4>Or set custom pH:</h4>
              <input
                type="range"
                min="0"
                max="14"
                step="0.1"
                value={customPH}
                onChange={(e) => {
                  setCustomPH(parseFloat(e.target.value));
                  setSelectedSubstance(null);
                  setShowColor(false);
                }}
              />
              <span>pH: {customPH}</span>
            </div>
          </div>

          <button className="test-button" onClick={testPH}>
            Test pH
          </button>
          <button className="reset-button" onClick={resetExperiment}>
            Reset
          </button>
        </div>

        <div className="results">
          <div className="color-display" style={{ backgroundColor: showColor ? resultColor : "white" }}>
            {showColor ? (
              <div className="color-info">
                <p>Color: {resultColor}</p>
                <p>pH: {selectedSubstance ? selectedSubstance.pH : customPH}</p>
                <p>Indicator: {selectedIndicator.name}</p>
              </div>
            ) : (
              <p>Click "Test pH" to see results</p>
            )}
          </div>

          {aiExplanation && (
            <div className="ai-explanation">
              <h3>AI Explanation</h3>
              <p>{aiExplanation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="quiz-section">
        <h2>pH Knowledge Quiz</h2>
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
        .ph-lab {
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
        
        .indicator-buttons, .substance-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }
        
        .indicator-buttons button, .substance-buttons button {
          padding: 8px 12px;
          background: #e9ecef;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .indicator-buttons button:hover, .substance-buttons button:hover {
          background: #dee2e6;
        }
        
        .indicator-buttons button.active, .substance-buttons button.active {
          background: #3498db;
          color: white;
          border-color: #2980b9;
        }
        
        .custom-ph {
          margin-top: 15px;
        }
        
        .custom-ph input[type="range"] {
          width: 100%;
          margin: 10px 0;
        }
        
        .test-button, .reset-button, .quiz-button {
          padding: 10px 15px;
          margin-right: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        
        .test-button {
          background: #2ecc71;
          color: white;
        }
        
        .test-button:hover {
          background: #27ae60;
        }
        
        .reset-button {
          background: #e74c3c;
          color: white;
        }
        
        .reset-button:hover {
          background: #c0392b;
        }
        
        .quiz-button {
          background: #9b59b6;
          color: white;
          margin-bottom: 15px;
        }
        
        .quiz-button:hover {
          background: #8e44ad;
        }
        
        .results {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .color-display {
          height: 200px;
          border: 2px solid #ddd;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.5s;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .color-info {
          background: rgba(255,255,255,0.8);
          padding: 10px;
          border-radius: 4px;
          text-align: center;
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
          
          .indicator-buttons, .substance-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default pHIndicators;