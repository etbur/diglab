import React, { useState, useEffect, useRef } from 'react';
import './PlantHormones.css';

const PlantHormones = () => {
  // Experiment parameters
  const [auxin, setAuxin] = useState(50); // %
  const [cytokinin, setCytokinin] = useState(50); // %
  const [gibberellin, setGibberellin] = useState(50); // %
  const [abscisicAcid, setAbscisicAcid] = useState(50); // %
  const [ethylene, setEthylene] = useState(50); // %
  const [timeElapsed, setTimeElapsed] = useState(0); // hours
  const [isRunning, setIsRunning] = useState(false);
  
  // Simulation outputs
  const [rootGrowth, setRootGrowth] = useState(0);
  const [shootGrowth, setShootGrowth] = useState(0);
  const [fruitGrowth, setFruitGrowth] = useState(0);
  
  // AI analysis
  const [aiInsights, setAiInsights] = useState('');
  const [dominantProcess, setDominantProcess] = useState('');
  
  // Refs for animation
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const lastUpdateRef = useRef(0);
  const plantPartsRef = useRef({
    roots: [],
    stems: [],
    leaves: [],
    fruits: []
  });
  const plantHealthRef = useRef(100);

  // Growth rate calculations
  const calculateGrowthRates = () => {
    // Root growth primarily affected by auxin (positive) and cytokinin (negative)
    const rootRate = (auxin / 50) * (1 - (cytokinin / 150));
    
    // Shoot growth affected by cytokinin and gibberellin
    const shootRate = (cytokinin / 60) * (gibberellin / 70);
    
    // Fruit growth affected by gibberellin and ethylene
    const fruitRate = (gibberellin / 80) * (ethylene / 100);
    
    // Stress effects from abscisic acid and ethylene
    const stressEffect = 1 - (abscisicAcid / 200 + ethylene / 250);
    
    return {
      root: Math.max(0, rootRate * stressEffect * 0.1),
      shoot: Math.max(0, shootRate * stressEffect * 0.1),
      fruit: Math.max(0, fruitRate * stressEffect * 0.05)
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

      // Update simulation time (1 second = 1 hour in simulation)
      setTimeElapsed(prev => prev + deltaTime / 1000);

      // Calculate current growth rates
      const growthRates = calculateGrowthRates();
      
      // Update outputs
      setRootGrowth(prev => prev + growthRates.root * deltaTime / 1000);
      setShootGrowth(prev => prev + growthRates.shoot * deltaTime / 1000);
      setFruitGrowth(prev => prev + growthRates.fruit * deltaTime / 1000);
      
      // Update plant parts based on growth
      updatePlantParts(growthRates, deltaTime);

      // Update plant health
      plantHealthRef.current = Math.min(100, 
        (rootGrowth * 30) + 
        (shootGrowth * 40) + 
        (fruitGrowth * 30) -
        (abscisicAcid > 70 ? 20 : 0) -
        (ethylene > 60 ? 15 : 0)
      );

      // Draw plant
      drawPlant();

      // Generate AI insights periodically
      if (timeElapsed % 3 < 0.05) {
        generateAIInsights(growthRates);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, auxin, cytokinin, gibberellin, abscisicAcid, ethylene]);

  // Update plant parts
  const updatePlantParts = (growthRates, deltaTime) => {
    // Add new roots
    if (Math.random() < growthRates.root * deltaTime / 500) {
      plantPartsRef.current.roots.push({
        x: 150 + (Math.random() * 40 - 20),
        y: 180 + Math.random() * 10,
        length: 5 + Math.random() * 10,
        angle: Math.random() * Math.PI - Math.PI/2,
        width: 1 + Math.random() * 2
      });
    }
    
    // Add new stems/leaves
    if (Math.random() < growthRates.shoot * deltaTime / 800) {
      plantPartsRef.current.stems.push({
        x: 150,
        y: 120 - Math.random() * 30,
        length: 10 + Math.random() * 20,
        angle: Math.random() * Math.PI/3 - Math.PI/6,
        width: 2 + Math.random() * 3
      });
      
      plantPartsRef.current.leaves.push({
        x: 150,
        y: 120 - Math.random() * 40,
        size: 5 + Math.random() * 15,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    // Add fruits
    if (Math.random() < growthRates.fruit * deltaTime / 1000) {
      plantPartsRef.current.fruits.push({
        x: 150 + (Math.random() * 60 - 30),
        y: 100 + Math.random() * 60,
        size: 3 + Math.random() * 7,
        ripeness: 0
      });
    }
    
    // Increase fruit ripeness
    plantPartsRef.current.fruits.forEach(fruit => {
      fruit.ripeness = Math.min(1, fruit.ripeness + deltaTime / 10000);
    });
  };

  // Draw plant
  const drawPlant = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw soil background
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(0, 150, canvas.width, canvas.height - 150);

    // Draw roots
    ctx.strokeStyle = '#5D4037';
    plantPartsRef.current.roots.forEach(root => {
      ctx.lineWidth = root.width;
      ctx.beginPath();
      ctx.moveTo(root.x, root.y);
      ctx.lineTo(
        root.x + Math.sin(root.angle) * root.length,
        root.y + Math.cos(root.angle) * root.length
      );
      ctx.stroke();
    });

    // Draw main stem
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 5 + (plantHealthRef.current / 30);
    ctx.beginPath();
    ctx.moveTo(150, 180);
    ctx.lineTo(150, 120 - (shootGrowth / 2));
    ctx.stroke();

    // Draw stems
    ctx.strokeStyle = '#2E7D32';
    plantPartsRef.current.stems.forEach(stem => {
      ctx.lineWidth = stem.width;
      ctx.beginPath();
      ctx.moveTo(stem.x, stem.y);
      ctx.lineTo(
        stem.x + Math.sin(stem.angle) * stem.length,
        stem.y - Math.cos(stem.angle) * stem.length
      );
      ctx.stroke();
    });

    // Draw leaves
    const greenness = 80 + (plantHealthRef.current / 2);
    ctx.fillStyle = `hsl(${100 - greenness/3}, 70%, ${30 + greenness/3}%)`;
    plantPartsRef.current.leaves.forEach(leaf => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.angle);
      
      // Leaf shape
      ctx.beginPath();
      ctx.ellipse(10, 0, leaf.size, leaf.size/2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Leaf veins
      ctx.strokeStyle = `hsl(${100 - greenness/3}, 70%, ${10 + greenness/4}%)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(leaf.size, 0);
      ctx.stroke();
      
      ctx.restore();
    });

    // Draw fruits
    plantPartsRef.current.fruits.forEach(fruit => {
      const ripenessColor = `hsl(${30 - fruit.ripeness * 20}, 70%, 50%)`;
      ctx.fillStyle = ripenessColor;
      ctx.beginPath();
      ctx.arc(fruit.x, fruit.y, fruit.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Generate AI insights
  const generateAIInsights = (growthRates) => {
    const insights = [];
    let currentDominantProcess = '';

    // Determine dominant growth process
    const maxGrowth = Math.max(growthRates.root, growthRates.shoot, growthRates.fruit);
    
    if (maxGrowth === growthRates.root && maxGrowth > 0.01) {
      currentDominantProcess = 'Root Development';
      insights.push("Auxin dominance promoting root growth");
    } 
    if (maxGrowth === growthRates.shoot && maxGrowth > 0.01) {
      currentDominantProcess = 'Shoot Growth';
      insights.push("Cytokinin and gibberellin promoting shoot growth");
    }
    if (maxGrowth === growthRates.fruit && maxGrowth > 0.005) {
      currentDominantProcess = 'Fruit Development';
      insights.push("Gibberellin and ethylene promoting fruit growth");
    }

    // Hormone balance analysis
    const auxinCytokininRatio = auxin / (cytokinin + 1);
    if (auxinCytokininRatio > 2) {
      insights.push("High auxin to cytokinin ratio favors root over shoot growth");
    } else if (auxinCytokininRatio < 0.5) {
      insights.push("High cytokinin to auxin ratio favors shoot over root growth");
    }

    // Stress analysis
    if (abscisicAcid > 70) {
      insights.push("Elevated abscisic acid indicates plant stress (possibly drought)");
    }
    if (ethylene > 60) {
      insights.push("Elevated ethylene may indicate stress or fruit ripening");
    }

    // Overall health assessment
    if (plantHealthRef.current > 80) {
      insights.push("Plant health excellent - optimal growth conditions");
    } else if (plantHealthRef.current > 50) {
      insights.push("Plant health good - minor stress factors present");
    } else {
      insights.push("Plant health poor - significant stress factors affecting growth");
    }

    setAiInsights(insights.join('\n\n'));
    setDominantProcess(currentDominantProcess || 'No dominant process');
  };

  // Reset experiment
  const resetExperiment = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setRootGrowth(0);
    setShootGrowth(0);
    setFruitGrowth(0);
    plantPartsRef.current = {
      roots: [],
      stems: [],
      leaves: [],
      fruits: []
    };
    plantHealthRef.current = 100;
    setAiInsights('');
    setDominantProcess('');
  };

  return (
    <div className="plant-hormones-lab">
      <header>
        <h1>Plant Hormones & Growth Lab Ethiopia</h1>
        <p className="subtitle">Real-Time Digital Simulation with AI Analysis</p>
      </header>

      <div className="lab-container">
        <div className="control-panel">
          <h2>Hormone Controls</h2>
          
          <div className="control-group">
            <label>Auxin: {auxin}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={auxin}
              onChange={(e) => setAuxin(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Root development, apical dominance</small>
          </div>
          
          <div className="control-group">
            <label>Cytokinin: {cytokinin}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={cytokinin}
              onChange={(e) => setCytokinin(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Shoot growth, cell division</small>
          </div>
          
          <div className="control-group">
            <label>Gibberellin: {gibberellin}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={gibberellin}
              onChange={(e) => setGibberellin(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Stem elongation, fruit growth</small>
          </div>
          
          <div className="control-group">
            <label>Abscisic Acid: {abscisicAcid}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={abscisicAcid}
              onChange={(e) => setAbscisicAcid(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Stress response, dormancy</small>
          </div>
          
          <div className="control-group">
            <label>Ethylene: {ethylene}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={ethylene}
              onChange={(e) => setEthylene(parseInt(e.target.value))}
              disabled={isRunning}
            />
            <small>Fruit ripening, stress response</small>
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
          
          <div className="metrics">
            <div className="metric">
              <h3>Root Growth</h3>
              <p>{rootGrowth.toFixed(2)} cm</p>
            </div>
            <div className="metric">
              <h3>Shoot Growth</h3>
              <p>{shootGrowth.toFixed(2)} cm</p>
            </div>
            <div className="metric">
              <h3>Fruit Growth</h3>
              <p>{fruitGrowth.toFixed(2)} units</p>
            </div>
            <div className="metric">
              <h3>Time Elapsed</h3>
              <p>{Math.floor(timeElapsed)} hours</p>
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
          
          <div className="dominant-process">
            <h3>Dominant Growth Process</h3>
            <div className="process-display">
              {dominantProcess}
            </div>
          </div>
          
          <div className="hormone-functions">
            <h3>Key Hormone Functions</h3>
            <ul>
              <li>Auxin: Root development, apical dominance</li>
              <li>Cytokinin: Cell division, shoot growth</li>
              <li>Gibberellin: Stem elongation, seed germination</li>
              <li>Abscisic Acid: Stress response, dormancy</li>
              <li>Ethylene: Fruit ripening, senescence</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="educational-tips">
        <h3>Did You Know? (Ethiopian Context)</h3>
        <ul>
          <li>Teff plants respond strongly to gibberellins during stem elongation</li>
          <li>Ethylene is used commercially to ripen coffee cherries uniformly</li>
          <li>Understanding hormone interactions can help optimize yields in Ethiopia's diverse agroecologies</li>
        </ul>
      </div>
    </div>
  );
};

export default PlantHormones;