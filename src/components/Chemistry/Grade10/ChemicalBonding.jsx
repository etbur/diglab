import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './ChemicalBonding.css';

const ChemicalBonding = () => {
  // Types of chemical bonds
  const bondTypes = [
    { 
      name: 'Ionic', 
      amharic: 'አዮኒክ', 
      description: 'Transfer of electrons between metals and non-metals',
      example: 'NaCl (Table Salt)',
      ethiopianExample: 'ማር (NaCl in Ethiopian diet)'
    },
    { 
      name: 'Covalent', 
      amharic: 'ኮቫለንት', 
      description: 'Sharing of electrons between non-metals',
      example: 'H₂O (Water)',
      ethiopianExample: 'ውሃ (Essential for Ethiopian coffee ceremony)'
    },
    { 
      name: 'Metallic', 
      amharic: 'ሜታሊክ', 
      description: 'Sea of electrons among metal atoms',
      example: 'Fe (Iron)',
      ethiopianExample: 'ማጥኛ (Traditional iron tools)'
    },
    { 
      name: 'Hydrogen', 
      amharic: 'ሃይድሮጅን', 
      description: 'Weak bond between H and electronegative atoms',
      example: 'H₂O molecules',
      ethiopianExample: 'ተጭኖ (In tej honey wine structure)'
    }
  ];

  // Common Ethiopian compounds
  const ethiopianCompounds = [
    { 
      name: 'Sodium Chloride', 
      formula: 'NaCl', 
      bondType: 'Ionic', 
      uses: 'Seasoning, food preservation', 
      ethiopianUse: 'በማር ውስጥ የተገኘ'
    },
    { 
      name: 'Water', 
      formula: 'H₂O', 
      bondType: 'Covalent', 
      uses: 'Drinking, cooking, coffee ceremony', 
      ethiopianUse: 'ቡና ማፍላት'
    },
    { 
      name: 'Ethanol', 
      formula: 'C₂H₅OH', 
      bondType: 'Covalent', 
      uses: 'Alcoholic beverages, fuel', 
      ethiopianUse: 'ተጭ (Tej ingredient)'
    },
    { 
      name: 'Calcium Carbonate', 
      formula: 'CaCO₃', 
      bondType: 'Ionic', 
      uses: 'Construction, traditional paint', 
      ethiopianUse: 'አልጋ ማድረጊያ (Traditional wall coating)'
    }
  ];

  // State management
  const [selectedBond, setSelectedBond] = useState(bondTypes[0]);
  const [selectedCompound, setSelectedCompound] = useState(ethiopianCompounds[0]);
  const [showElectrons, setShowElectrons] = useState(true);
  const [showBonding, setShowBonding] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [simulationMode, setSimulationMode] = useState('orbitals');
  const [userQuizAnswer, setUserQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  // Canvas ref for bonding visualization
  const canvasRef = useRef(null);

  // Draw bonding visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw based on selected bond type
    switch(selectedBond.name) {
      case 'Ionic':
        drawIonicBond(ctx);
        break;
      case 'Covalent':
        drawCovalentBond(ctx);
        break;
      case 'Metallic':
        drawMetallicBond(ctx);
        break;
      case 'Hydrogen':
        drawHydrogenBond(ctx);
        break;
      default:
        break;
    }
  }, [selectedBond, showElectrons, showBonding, animationSpeed, simulationMode]);

  // Drawing functions
  const drawIonicBond = (ctx) => {
    // Sodium ion (Na+)
    ctx.beginPath();
    ctx.arc(150, 150, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Na⁺', 150, 155);

    // Chloride ion (Cl-)
    ctx.beginPath();
    ctx.arc(250, 150, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#4ECDC4';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.fillText('Cl⁻', 250, 155);

    // Electron transfer animation
    if (showElectrons) {
      const time = Date.now() * 0.001 * animationSpeed;
      const x = 150 + (100 * (time % 1));
      const y = 150 + 30 * Math.sin(time * 2);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700';
      ctx.fill();
    }

    // Bond representation
    if (showBonding) {
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(180, 150);
      ctx.lineTo(220, 150);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const drawCovalentBond = (ctx) => {
    // Oxygen atom
    ctx.beginPath();
    ctx.arc(150, 150, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6347';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.fillText('O', 150, 155);

    // Hydrogen atoms
    ctx.beginPath();
    ctx.arc(100, 150, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#A5D8FF';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.fillText('H', 100, 155);

    ctx.beginPath();
    ctx.arc(200, 150, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#A5D8FF';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.fillText('H', 200, 155);

    // Electron pairs
    if (showElectrons) {
      drawElectronPair(ctx, 150, 100, animationSpeed);
      drawElectronPair(ctx, 150, 200, animationSpeed);
      drawElectronPair(ctx, 70, 150, animationSpeed);
      drawElectronPair(ctx, 230, 150, animationSpeed);
    }

    // Covalent bonds
    if (showBonding) {
      ctx.beginPath();
      ctx.moveTo(120, 150);
      ctx.lineTo(130, 150);
      ctx.moveTo(170, 150);
      ctx.lineTo(180, 150);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Shared electrons
      ctx.beginPath();
      ctx.arc(125, 150, 3, 0, Math.PI * 2);
      ctx.arc(175, 150, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700';
      ctx.fill();
    }
  };

  // Helper function to draw electron pairs
  const drawElectronPair = (ctx, x, y, speed) => {
    const time = Date.now() * 0.001 * speed;
    const angle = time % (Math.PI * 2);
    
    ctx.beginPath();
    ctx.arc(x + 10 * Math.cos(angle), y + 10 * Math.sin(angle), 3, 0, Math.PI * 2);
    ctx.arc(x + 10 * Math.cos(angle + Math.PI), y + 10 * Math.sin(angle + Math.PI), 3, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
  };

  // Simplified drawing functions for other bond types
  const drawMetallicBond = (ctx) => {
    // Draw metal atoms in grid
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        const x = 100 + i * 70;
        const y = 100 + j * 70;
        
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#B0B0B0';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.fillText('Fe', x, y + 5);
      }
    }

    // Draw delocalized electrons
    if (showElectrons) {
      for (let i = 0; i < 10; i++) {
        const time = Date.now() * 0.001 * animationSpeed;
        const x = 80 + (i * 30 + time * 20) % 280;
        const y = 80 + (i * 25 + time * 15) % 220;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
      }
    }
  };

  const drawHydrogenBond = (ctx) => {
    // Water molecule 1
    ctx.beginPath();
    ctx.arc(100, 150, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 99, 71, 0.7)';
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.fillText('H₂O', 100, 155);

    // Water molecule 2
    ctx.beginPath();
    ctx.arc(250, 150, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 99, 71, 0.7)';
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.fillText('H₂O', 250, 155);

    // Hydrogen bond
    if (showBonding) {
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(130, 150);
      ctx.lineTo(220, 150);
      ctx.strokeStyle = '#8888FF';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  // Quiz question check
  const checkQuizAnswer = () => {
    const correctAnswer = selectedCompound.bondType;
    if (userQuizAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setQuizFeedback('Correct! Well done!');
    } else {
      setQuizFeedback(`Incorrect. The correct answer is ${correctAnswer}. Try again!`);
    }
  };

  return (
    <div className="chemical-bonding-lab">
      <header>
        <h1>Chemical Bonding Lab Ethiopia</h1>
        <p>Interactive simulation of molecular bonds in Ethiopian context</p>
      </header>

      <div className="lab-container">
        <div className="bond-selector">
          <h2>Types of Chemical Bonds</h2>
          <div className="bond-buttons">
            {bondTypes.map((bond, index) => (
              <button
                key={index}
                onClick={() => setSelectedBond(bond)}
                className={selectedBond.name === bond.name ? 'active' : ''}
              >
                {bond.name} ({bond.amharic})
              </button>
            ))}
          </div>

          <div className="bond-info">
            <h3>{selectedBond.name} Bond</h3>
            <p><strong>Description:</strong> {selectedBond.description}</p>
            <p><strong>Example:</strong> {selectedBond.example}</p>
            <p><strong>Ethiopian Context:</strong> {selectedBond.ethiopianExample}</p>
          </div>
        </div>

        <div className="simulation-area">
          <div className="simulation-controls">
            <label>
              <input
                type="checkbox"
                checked={showElectrons}
                onChange={() => setShowElectrons(!showElectrons)}
              />
              Show Electrons
            </label>
            <label>
              <input
                type="checkbox"
                checked={showBonding}
                onChange={() => setShowBonding(!showBonding)}
              />
              Show Bonds
            </label>
            <label>
              Animation Speed:
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              />
              {animationSpeed.toFixed(1)}x
            </label>
            <select
              value={simulationMode}
              onChange={(e) => setSimulationMode(e.target.value)}
            >
              <option value="orbitals">Electron Orbitals</option>
              <option value="lewis">Lewis Structures</option>
              <option value="energy">Energy Levels</option>
            </select>
          </div>

          <div className="bonding-visualization">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>

        <div className="ethiopian-compounds">
          <h2>Common Ethiopian Compounds</h2>
          <div className="compound-grid">
            {ethiopianCompounds.map((compound, index) => (
              <div
                key={index}
                className={`compound-card ${selectedCompound.name === compound.name ? 'active' : ''}`}
                onClick={() => setSelectedCompound(compound)}
              >
                <h3>{compound.name}</h3>
                <div className="formula">{compound.formula}</div>
                <p><strong>Bond Type:</strong> {compound.bondType}</p>
                <p><strong>Uses:</strong> {compound.uses}</p>
                <p><strong>Ethiopian Use:</strong> {compound.ethiopianUse}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="quiz-section">
          <h2>Bonding Quiz</h2>
          <div className="quiz-question">
            <p>What type of bond is present in {selectedCompound.name} ({selectedCompound.formula})?</p>
            <input
              type="text"
              value={userQuizAnswer}
              onChange={(e) => setUserQuizAnswer(e.target.value)}
              placeholder="Enter bond type..."
            />
            <button onClick={checkQuizAnswer}>Check Answer</button>
            {quizFeedback && (
              <div className={`quiz-feedback ${quizFeedback.startsWith('Correct') ? 'correct' : 'incorrect'}`}>
                {quizFeedback}
              </div>
            )}
          </div>
        </div>

        <div className="learning-resources">
          <h2>Learning Resources</h2>
          <div className="resource-grid">
            <NavLink to="/bonding-basics" className="resource-card">
              <h3>Chemical Bonding Basics</h3>
              <p>Fundamental concepts of molecular bonding</p>
            </NavLink>
            <NavLink to="/ethiopian-chemistry" className="resource-card">
              <h3>Ethiopian Chemical Compounds</h3>
              <p>Common substances in Ethiopian daily life</p>
            </NavLink>
            <NavLink to="/molecular-structures" className="resource-card">
              <h3>3D Molecular Structures</h3>
              <p>Interactive 3D models of common compounds</p>
            </NavLink>
            <NavLink to="/bonding-quiz" className="resource-card">
              <h3>Practice Quizzes</h3>
              <p>Test your knowledge of chemical bonding</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemicalBonding;