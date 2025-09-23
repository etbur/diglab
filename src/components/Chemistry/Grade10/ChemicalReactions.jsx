import React, { useState, useEffect } from "react";
import "./ChemicalReactions.css";

const reactionsData = [
  {
    id: 1,
    name: "Zinc with Hydrochloric Acid",
    reactants: ["Zn", "HCl"],
    products: ["ZnCl₂", "H₂"],
    type: ["Single Displacement", "Redox", "Gas-Evolving"],
    description: "Zinc displaces hydrogen from hydrochloric acid, producing zinc chloride and hydrogen gas."
  },
  {
    id: 2,
    name: "Combustion of Methane",
    reactants: ["CH₄", "O₂"],
    products: ["CO₂", "H₂O"],
    type: ["Combustion", "Redox"],
    description: "Methane burns in oxygen to produce carbon dioxide and water vapor."
  },
  {
    id: 3,
    name: "Lead Nitrate with Potassium Iodide",
    reactants: ["Pb(NO₃)₂", "KI"],
    products: ["PbI₂", "KNO₃"],
    type: ["Double Displacement", "Precipitation"],
    description: "Forms bright yellow lead iodide precipitate."
  },
  {
    id: 4,
    name: "Sodium with Water",
    reactants: ["Na", "H₂O"],
    products: ["NaOH", "H₂"],
    type: ["Single Displacement", "Redox", "Gas-Evolving"],
    description: "Violent reaction producing sodium hydroxide and hydrogen gas."
  },
  {
    id: 5,
    name: "Hydrogen Peroxide Decomposition",
    reactants: ["H₂O₂"],
    products: ["H₂O", "O₂"],
    type: ["Decomposition", "Gas-Evolving"],
    description: "Catalytic decomposition of hydrogen peroxide into water and oxygen gas."
  }
];

const ChemicalReactions = () => {
  const [userReactants, setUserReactants] = useState(["", ""]);
  const [matchedReaction, setMatchedReaction] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [reactionProgress, setReactionProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [showAllReactions, setShowAllReactions] = useState(false);
  const [particles, setParticles] = useState([]);
  const [temperature, setTemperature] = useState(25); // in °C
  const [concentration, setConcentration] = useState(1); // in Molar
  const [reactionRate, setReactionRate] = useState(1);

  useEffect(() => {
    if (isSimulating) {
      const timer = setInterval(() => {
        setReactionProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsSimulating(false);
            return 100;
          }
          return prev + reactionRate;
        });

        // Add particles based on reaction type
        if (matchedReaction) {
          if (matchedReaction.type.includes("Gas-Evolving")) {
            addGasParticles();
          }
          if (matchedReaction.type.includes("Precipitation")) {
            if (reactionProgress > 30 && reactionProgress < 80) {
              addPrecipitateParticles();
            }
          }
          if (matchedReaction.type.includes("Combustion")) {
            addFlameParticles();
          }
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isSimulating, reactionProgress, matchedReaction, reactionRate]);

  const addGasParticles = () => {
    const newParticles = [...particles];
    for (let i = 0; i < 2; i++) {
      newParticles.push({
        id: Date.now() + Math.random(),
        type: 'bubble',
        x: Math.random() * 60 + 20,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 0.5 + 0.3
      });
    }
    setParticles(newParticles.slice(-30)); // Limit to 30 particles
  };

  const addPrecipitateParticles = () => {
    const newParticles = [...particles];
    newParticles.push({
      id: Date.now() + Math.random(),
      type: 'precipitate',
      x: Math.random() * 80 + 10,
      y: 70 + Math.random() * 20,
      size: Math.random() * 8 + 4
    });
    setParticles(newParticles.slice(-50)); // Limit to 50 particles
  };

  const addFlameParticles = () => {
    const newParticles = [...particles];
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: Date.now() + Math.random(),
        type: 'flame',
        x: Math.random() * 40 + 30,
        y: 20 + Math.random() * 10,
        size: Math.random() * 15 + 10,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    setParticles(newParticles.slice(-20)); // Limit to 20 particles
  };

  const handleInputChange = (index, value) => {
    const updatedReactants = [...userReactants];
    updatedReactants[index] = value.trim();
    setUserReactants(updatedReactants);
  };

  const generateAiExplanation = (reaction) => {
    let explanation = `The reaction between ${reaction.reactants.join(" and ")} is a ${reaction.type[0].toLowerCase()} reaction. `;
    
    if (reaction.type.includes("Combustion")) {
      explanation += "This is an exothermic reaction that releases heat and light energy. ";
      setTemperature(prev => prev + 150); // Big temperature increase for combustion
    }
    if (reaction.type.includes("Redox")) {
      explanation += "It involves electron transfer between species (oxidation-reduction). ";
    }
    if (reaction.type.includes("Gas-Evolving")) {
      explanation += "You would observe gas bubbles forming during this reaction. ";
    }
    if (reaction.type.includes("Precipitation")) {
      explanation += "This produces an insoluble solid (precipitate) in the solution. ";
    }

    explanation += `In this reaction, ${reaction.reactants.join(" and ")} combine to form ${reaction.products.join(" and ")}. `;
    explanation += reaction.description;

    return explanation;
  };

  const simulateReaction = () => {
    setIsSimulating(true);
    setReactionProgress(0);
    setMatchedReaction(null);
    setErrorMessage("");
    setAiExplanation("");
    setParticles([]);
    setTemperature(25); // Reset temperature

    // Calculate reaction rate based on concentration and temperature
    const calculatedRate = Math.min(5, Math.max(1, concentration * (1 + temperature / 100)));
    setReactionRate(calculatedRate);

    // At least one reactant must be entered
    const inputFilled = userReactants.filter(r => r).length >= 1;

    if (!inputFilled) {
      setErrorMessage("⚠️ Please enter at least one or two valid reactants.");
      setIsSimulating(false);
      return;
    }

    const sortedInput = userReactants
      .map(r => r.toUpperCase())
      .filter(r => r !== "")
      .sort();

    const match = reactionsData.find(reaction => {
      const sortedReactionReactants = reaction.reactants
        .map(r => r.toUpperCase())
        .sort();
      return JSON.stringify(sortedInput) === JSON.stringify(sortedReactionReactants);
    });

    if (match) {
      setMatchedReaction(match);
      // Temperature changes based on reaction type
      if (match.type.includes("Combustion")) {
        setTemperature(500);
      } else if (match.type.includes("Exothermic")) {
        setTemperature(prev => prev + 50);
      } else if (match.type.includes("Endothermic")) {
        setTemperature(prev => prev - 20);
      }
    } else {
      const suggestion = reactionsData.find(reaction =>
        reaction.reactants.some(r =>
          sortedInput.includes(r.toUpperCase())
        )
      );

      setErrorMessage(`❌ No exact match found.
${suggestion ? `💡 Did you mean: "${suggestion.name}"? Try reactants like ${suggestion.reactants.join(" + ")}` : "🔍 Check for typos or try other common reactants."}`);
      setIsSimulating(false);
    }
  };

  const formatChemicalFormula = (formula) => {
    return formula
      .replace(/(\d+)/g, '<sub>$1</sub>')
      .replace(/->/g, '→')
      .replace(/\+/g, ' + ');
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setMatchedReaction(null);
    setReactionProgress(0);
    setParticles([]);
    setTemperature(25);
  };

  return (
    <div className="lab-container">
      <h1>Interactive Chemical Reactions Lab</h1>

      <div className="controls-section">
        <div className="input-section">
          <h2>🧪 Enter Reactants:</h2>
          <div className="reactant-inputs">
            <input
              type="text"
              placeholder="Reactant 1 (e.g., Zn)"
              value={userReactants[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
            />
            <span>+</span>
            <input
              type="text"
              placeholder="Reactant 2 (e.g., HCl)"
              value={userReactants[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
            />
          </div>
          
          <div className="reaction-conditions">
            <div>
              <label>Concentration (M):</label>
              <input 
                type="range" 
                min="0.1" 
                max="5" 
                step="0.1" 
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
              />
              <span>{concentration}M</span>
            </div>
            <div>
              <label>Temperature: {temperature}°C</label>
              <div className="temperature-indicator" style={{
                background: `linear-gradient(to right, blue, ${temperature > 100 ? 'red' : 'orange'})`,
                width: `${Math.min(100, temperature)}%`
              }}></div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              onClick={simulateReaction}
              disabled={isSimulating}
            >
              {isSimulating ? "Reacting..." : "Start Reaction"}
            </button>
            <button onClick={resetSimulation}>Reset</button>
          </div>
        </div>

        {isSimulating && (
          <div className="reaction-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${reactionProgress}%` }}
              ></div>
            </div>
            <p>Reaction progress: {reactionProgress}%</p>
            <p>Reaction rate: {reactionRate.toFixed(1)}x</p>
          </div>
        )}
      </div>

      <div className="simulation-area">
        <div className="reaction-visualization">
          <div className="beaker">
            {particles.map(particle => (
              <div
                key={particle.id}
                className={`particle ${particle.type}`}
                style={{
                  left: `${particle.x}%`,
                  bottom: particle.type === 'bubble' ? '0%' : `${particle.y || 0}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDuration: particle.type === 'bubble' ? `${particle.speed}s` : undefined,
                  opacity: particle.opacity
                }}
              />
            ))}
            <div className="beaker-neck"></div>
            <div className="beaker-top"></div>
          </div>
          
          {matchedReaction && reactionProgress >= 100 && (
            <div className="reaction-products">
              <h3>Products Formed:</h3>
              <ul>
                {matchedReaction.products.map((product, index) => (
                  <li key={index}>
                    <span dangerouslySetInnerHTML={{ __html: formatChemicalFormula(product) }} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {matchedReaction && (
          <div className="reaction-details">
            <h3>✅ {matchedReaction.name}</h3>
            <div className="reaction-equation">
              <div dangerouslySetInnerHTML={{ 
                __html: formatChemicalFormula(
                  `${matchedReaction.reactants.join(" + ")} → ${matchedReaction.products.join(" + ")}`
                )
              }} />
            </div>
            <p><strong>Type:</strong> {matchedReaction.type.join(", ")}</p>
            <p><strong>Description:</strong> {matchedReaction.description}</p>
            
            {aiExplanation && (
              <div className="ai-explanation">
                <h4>🧠 AI Explanation</h4>
                <p>{aiExplanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <button 
        className="toggle-reactions"
        onClick={() => setShowAllReactions(!showAllReactions)}
      >
        {showAllReactions ? "Hide All Reactions" : "Show All Reactions"}
      </button>

      {showAllReactions && (
        <div className="all-reactions">
          <h2>📘 All Available Reactions</h2>
          <div className="reaction-grid">
            {reactionsData.map((reaction) => (
              <div key={reaction.id} className="reaction-card">
                <h4>{reaction.name}</h4>
                <p><strong>Type:</strong> {reaction.type.join(", ")}</p>
                <div className="reaction-equation" dangerouslySetInnerHTML={{ 
                  __html: formatChemicalFormula(
                    `${reaction.reactants.join(" + ")} → ${reaction.products.join(" + ")}`
                  )
                }} />
                <p><em>{reaction.description}</em></p>
                <button 
                  className="quick-try"
                  onClick={() => {
                    setUserReactants([...reaction.reactants].concat(["", ""]).slice(0, 2));
                    resetSimulation();
                  }}
                >
                  Try this reaction
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemicalReactions;