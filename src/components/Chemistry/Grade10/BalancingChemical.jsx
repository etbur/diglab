import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./BalancingChemical.css";

const BalancingChemical = () => {
  // Common Ethiopian chemical reactions
  const ethiopianReactions = [
    {
      name: "Photosynthesis",
      unbalanced: "CO₂ + H₂O → C₆H₁₂O₆ + O₂",
      balanced: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
      description: "Process in Ethiopian coffee plants"
    },
    {
      name: "Fermentation",
      unbalanced: "C₆H₁₂O₆ → C₂H₅OH + CO₂",
      balanced: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂",
      description: "Tej (honey wine) production"
    },
    {
      name: "Combustion",
      unbalanced: "CH₄ + O₂ → CO₂ + H₂O",
      balanced: "CH₄ + 2O₂ → CO₂ + 2H₂O",
      description: "Burning of biogas in rural households"
    },
    {
      name: "Lime Production",
      unbalanced: "CaCO₃ → CaO + CO₂",
      balanced: "CaCO₃ → CaO + CO₂",
      description: "Traditional lime production for injera baking"
    },
    {
      name: "Neutralization",
      unbalanced: "HCl + NaOH → NaCl + H₂O",
      balanced: "HCl + NaOH → NaCl + H₂O",
      description: "Acid-base reaction in soil treatment"
    }
  ];

  // State for the lab
  const [currentReaction, setCurrentReaction] = useState(ethiopianReactions[0]);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [reactionSteps, setReactionSteps] = useState([]);
  const [atomCounts, setAtomCounts] = useState({ left: {}, right: {} });
  const [showTutorial, setShowTutorial] = useState(true);

  // Parse reaction and count atoms
  useEffect(() => {
    const parseReaction = (reaction) => {
      const [leftSide, rightSide] = reaction.split("→").map(side => side.trim());
      const leftCompounds = leftSide.split("+").map(comp => comp.trim());
      const rightCompounds = rightSide.split("+").map(comp => comp.trim());

      const countAtoms = (compounds) => {
        const counts = {};
        compounds.forEach(compound => {
          const matches = compound.match(/([A-Z][a-z]*)(\d*)/g);
          matches.forEach(match => {
            const elementMatch = match.match(/([A-Z][a-z]*)(\d*)/);
            const element = elementMatch[1];
            const count = elementMatch[2] ? parseInt(elementMatch[2]) : 1;
            counts[element] = (counts[element] || 0) + count;
          });
        });
        return counts;
      };

      setAtomCounts({
        left: countAtoms(leftCompounds),
        right: countAtoms(rightCompounds)
      });
    };

    parseReaction(currentReaction.unbalanced);
    setUserInput("");
    setIsCorrect(null);
    setShowHint(false);
    setReactionSteps([]);
  }, [currentReaction]);

  // Check if user's answer is correct
  const checkBalance = () => {
    const normalizedInput = userInput.replace(/\s+/g, '');
    const normalizedAnswer = currentReaction.balanced.replace(/\s+/g, '');

    if (normalizedInput === normalizedAnswer) {
      setIsCorrect(true);
      setReactionSteps([...reactionSteps, "Correct! Equation is balanced"]);
    } else {
      setIsCorrect(false);
      setReactionSteps([...reactionSteps, `Attempt: ${userInput}`]);
    }
  };

  // Auto-balance the equation
  const autoBalance = () => {
    setUserInput(currentReaction.balanced);
    setIsCorrect(true);
    setReactionSteps([...reactionSteps, "System balanced the equation"]);
  };

  // Show step-by-step solution
  const showSolution = () => {
    const steps = [];
    switch(currentReaction.name) {
      case "Photosynthesis":
        steps.push("1. Count atoms on both sides");
        steps.push("2. Start with Carbon: 1 on left, 6 on right");
        steps.push("3. Add coefficient 6 to CO₂");
        steps.push("4. Now count Oxygen: 6*2 + 6 = 18 on left");
        steps.push("5. Balance Oxygen on right: C₆H₁₂O₆ has 6, so need 12 more");
        steps.push("6. Add coefficient 6 to O₂ (6*2=12)");
        steps.push("Final: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂");
        break;
      case "Fermentation":
        steps.push("1. Count atoms on both sides");
        steps.push("2. Carbon balanced (6 each side)");
        steps.push("3. Hydrogen balanced (12 each side)");
        steps.push("4. Oxygen: 6 on left, 2+2=4 on right");
        steps.push("5. Add coefficient 2 to C₂H₅OH and CO₂");
        steps.push("Final: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂");
        break;
      default:
        steps.push("1. Count atoms on each side");
        steps.push("2. Adjust coefficients to balance each element");
        steps.push(`3. Final balanced equation: ${currentReaction.balanced}`);
    }
    setReactionSteps([...reactionSteps, ...steps.map(s => "Solution: " + s)]);
  };

  // Reset current reaction
  const resetReaction = () => {
    setUserInput("");
    setIsCorrect(null);
    setShowHint(false);
    setReactionSteps([]);
  };

  return (
    <div className="balancing-lab">
      <header>
        <h1>Balancing Chemical Equations Lab Ethiopia</h1>
        <p>Interactive practice for mastering stoichiometry</p>
      </header>

      {showTutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-content">
            <h2>How to Balance Equations</h2>
            <ol>
              <li>Count atoms of each element on both sides</li>
              <li>Start balancing elements that appear in only one compound on each side</li>
              <li>Use coefficients (whole numbers) to balance atoms</li>
              <li>Never change subscripts in chemical formulas</li>
              <li>Check that all atoms balance on both sides</li>
            </ol>
            <button onClick={() => setShowTutorial(false)}>Start Practicing</button>
          </div>
        </div>
      )}

      <div className="lab-container">
        <div className="reaction-selector">
          <h3>Ethiopian Chemical Reactions</h3>
          <div className="reaction-buttons">
            {ethiopianReactions.map((reaction, index) => (
              <button
                key={index}
                onClick={() => setCurrentReaction(reaction)}
                className={currentReaction.name === reaction.name ? "active" : ""}
              >
                {reaction.name}
              </button>
            ))}
          </div>
        </div>

        <div className="workspace">
          <div className="reaction-display">
            <h3>{currentReaction.name}</h3>
            <p className="reaction-description">{currentReaction.description}</p>
            
            <div className="equation-container">
              <div className="equation-side">
                <h4>Unbalanced Equation:</h4>
                <div className="chemical-equation">{currentReaction.unbalanced}</div>
              </div>
              
              <div className="equation-side">
                <h4>Your Balanced Equation:</h4>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter balanced equation..."
                  className={isCorrect ? "correct" : isCorrect === false ? "incorrect" : ""}
                />
              </div>
            </div>

            <div className="atom-counter">
              <div className="atom-side">
                <h4>Reactants Atom Count:</h4>
                <ul>
                  {Object.entries(atomCounts.left).map(([element, count]) => (
                    <li key={`left-${element}`}>
                      {element}: {count}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="atom-side">
                <h4>Products Atom Count:</h4>
                <ul>
                  {Object.entries(atomCounts.right).map(([element, count]) => (
                    <li key={`right-${element}`}>
                      {element}: {count}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="controls">
            <button onClick={checkBalance}>Check Balance</button>
            <button onClick={resetReaction}>Reset</button>
            <button onClick={() => setShowHint(!showHint)}>
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            <button onClick={showSolution}>Show Solution</button>
            <button onClick={autoBalance}>Auto Balance</button>
          </div>

          {showHint && (
            <div className="hint-box">
              <h4>Hint:</h4>
              <p>
                {currentReaction.name === "Photosynthesis" 
                  ? "Start by balancing carbon atoms first, then hydrogen, then oxygen"
                  : currentReaction.name === "Fermentation"
                  ? "The glucose molecule splits into two ethanol and two CO₂ molecules"
                  : "Try balancing elements that appear in only one compound on each side first"}
              </p>
            </div>
          )}

          {isCorrect && (
            <div className="success-message">
              Correct! The equation is properly balanced.
            </div>
          )}

          {isCorrect === false && (
            <div className="error-message">
              Not quite right. Try again or use the hint button for help.
            </div>
          )}
        </div>

        <div className="reaction-steps">
          <h3>Reaction Steps</h3>
          {reactionSteps.length > 0 ? (
            <ul>
              {reactionSteps.map((step, index) => (
                <li key={index} className={
                  step.startsWith("Correct") ? "success" : 
                  step.startsWith("Attempt") ? "attempt" :
                  step.startsWith("Solution") ? "solution" : ""
                }>
                  {step}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your balancing steps will appear here</p>
          )}
        </div>
      </div>

      <div className="learning-resources">
        <h3>Learning Resources</h3>
        <div className="resource-grid">
          <NavLink to="/balancing-basics" className="resource-card">
            <h4>Balancing Basics</h4>
            <p>Fundamental techniques for beginners</p>
          </NavLink>
          <NavLink to="/ethiopian-chemistry" className="resource-card">
            <h4>Ethiopian Chemical Processes</h4>
            <p>Local industrial and biological reactions</p>
          </NavLink>
          <NavLink to="/stoichiometry" className="resource-card">
            <h4>Stoichiometry</h4>
            <p>Calculating quantities in reactions</p>
          </NavLink>
          <NavLink to="/practice-problems" className="resource-card">
            <h4>Practice Problems</h4>
            <p>Additional equations to balance</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BalancingChemical;