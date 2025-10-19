import React, { useState, useEffect, useRef } from 'react';
import './LeafStructure.css';

const LeafStructure = () => {
  // Microscope controls
  const [magnification, setMagnification] = useState(100); // 40x, 100x, 400x, 1000x
  const [stainType, setStainType] = useState('iodine'); // iodine, methylene blue, none
  const [lightIntensity, setLightIntensity] = useState(70); // %
  const [focus, setFocus] = useState(50); // %
  
  // Leaf type selection
  const [leafType, setLeafType] = useState('dicot'); // dicot, monocot, cactus, conifer
  const [sectionType, setSectionType] = useState('cross'); // cross, longitudinal
  
  // AI analysis
  const [aiInsights, setAiInsights] = useState('');
  const [measurements, setMeasurements] = useState({});
  const [diagnosis, setDiagnosis] = useState('');
  
  // Canvas ref for drawing
  const canvasRef = useRef(null);
  
  // Leaf structure data
  const leafStructures = {
    dicot: {
      layers: ['cuticle', 'upper epidermis', 'palisade mesophyll', 'spongy mesophyll', 'lower epidermis', 'stomata'],
      thickness: 180, // μm
      stomataDensity: 120, // per mm²
      vascularBundles: 'arranged in a ring'
    },
    monocot: {
      layers: ['cuticle', 'epidermis', 'mesophyll', 'vascular bundles', 'stomata'],
      thickness: 150, // μm
      stomataDensity: 90, // per mm²
      vascularBundles: 'scattered'
    },
    cactus: {
      layers: ['thick cuticle', 'epidermis', 'water-storing parenchyma', 'chlorophyllous parenchyma', 'stomata'],
      thickness: 800, // μm
      stomataDensity: 15, // per mm²
      vascularBundles: 'reduced'
    },
    conifer: {
      layers: ['cuticle', 'epidermis', 'hypodermis', 'mesophyll', 'resin ducts', 'stomata'],
      thickness: 250, // μm
      stomataDensity: 60, // per mm²
      vascularBundles: 'surrounded by transfusion tissue'
    }
  };

  // Draw leaf structure on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const leaf = leafStructures[leafType];
    const sectionHeight = sectionType === 'cross' ? 200 : 400;
    const scale = magnification / 100;
    
    // Draw leaf structure based on type and section
    drawLeafSection(ctx, leaf, sectionType, scale, stainType, focus, lightIntensity);
    
    // Generate AI analysis
    analyzeLeaf(leaf);
    
  }, [magnification, stainType, lightIntensity, focus, leafType, sectionType]);

  // Draw leaf section
  const drawLeafSection = (ctx, leaf, section, scale, stain, focus, light) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Apply focus effect
    ctx.save();
    const blur = (100 - focus) / 30;
    if (blur > 0) {
      ctx.filter = `blur(${blur}px)`;
    }
    
    // Apply lighting
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${light/100})`);
    gradient.addColorStop(1, `rgba(200, 200, 200, ${light/200})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw based on section type
    if (section === 'cross') {
      drawCrossSection(ctx, leaf, width, height, scale, stain);
    } else {
      drawLongitudinalSection(ctx, leaf, width, height, scale, stain);
    }
    
    ctx.restore();
  };

  // Draw cross-section
  const drawCrossSection = (ctx, leaf, width, height, scale, stain) => {
    const layers = leaf.layers;
    const layerHeight = (height * 0.8) / layers.length;
    const startY = height * 0.1;
    
    // Draw each layer
    layers.forEach((layer, i) => {
      const y = startY + i * layerHeight;
      const layerWidth = width * 0.8;
      const x = width * 0.1;
      
      // Set color based on stain
      let color;
      if (stain === 'iodine') {
        color = layer.includes('mesophyll') || layer.includes('parenchyma') ? 
                '#8BC34A' : layer.includes('stomata') ? '#4CAF50' : '#DCE775';
      } else if (stain === 'methylene blue') {
        color = layer.includes('epidermis') ? '#2196F3' : 
                layer.includes('cuticle') ? '#3F51B5' : '#00BCD4';
      } else {
        color = layer.includes('mesophyll') ? '#8BC34A' : 
                layer.includes('epidermis') ? '#CDDC39' : '#AFB42B';
      }
      
      // Draw layer
      ctx.fillStyle = color;
      ctx.fillRect(x, y, layerWidth, layerHeight);
      
      // Add layer label
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(layer, x + 5, y + 15);
      
      // Add special structures
      if (layer === 'stomata') {
        drawStomata(ctx, x + layerWidth/2, y + layerHeight/2, layerHeight * 0.8);
      }
    });
    
    // Add vascular bundles if present
    if (leaf.vascularBundles) {
      drawVascularBundles(ctx, width/2, startY + layers.length * layerHeight/2, 
                         layerHeight * 2, leaf.vascularBundles);
    }
  };

  // Draw longitudinal section
  const drawLongitudinalSection = (ctx, leaf, width, height, scale, stain) => {
    // Draw epidermis
    ctx.fillStyle = stain === 'methylene blue' ? '#2196F3' : '#CDDC39';
    ctx.fillRect(width * 0.1, height * 0.1, width * 0.8, height * 0.1);
    ctx.fillRect(width * 0.1, height * 0.8, width * 0.8, height * 0.1);
    
    // Draw mesophyll
    ctx.fillStyle = stain === 'iodine' ? '#8BC34A' : '#689F38';
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.2);
    ctx.bezierCurveTo(
      width * 0.3, height * 0.4,
      width * 0.7, height * 0.4,
      width * 0.9, height * 0.2
    );
    ctx.bezierCurveTo(
      width * 0.7, height * 0.7,
      width * 0.3, height * 0.7,
      width * 0.1, height * 0.8
    );
    ctx.closePath();
    ctx.fill();
    
    // Draw stomata
    for (let i = 0; i < 5; i++) {
      const x = width * 0.2 + i * (width * 0.6 / 4);
      drawStomata(ctx, x, height * 0.85, height * 0.05);
    }
    
    // Draw vascular bundles
    drawVascularBundles(ctx, width/2, height/2, height * 0.3, leaf.vascularBundles);
  };

  // Draw stomata
  const drawStomata = (ctx, x, y, size) => {
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.ellipse(x, y, size/2, size/4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, y, size/2, size/4, 0, Math.PI * 0.2, Math.PI * 0.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x, y, size/2, size/4, 0, Math.PI * 1.2, Math.PI * 1.8);
    ctx.stroke();
  };

  // Draw vascular bundles
  const drawVascularBundles = (ctx, x, y, size, arrangement) => {
    if (arrangement === 'arranged in a ring') {
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const bx = x + Math.cos(angle) * size/3;
        const by = y + Math.sin(angle) * size/3;
        drawVascularBundle(ctx, bx, by, size/5);
      }
    } else if (arrangement === 'scattered') {
      for (let i = 0; i < 8; i++) {
        const bx = x + (Math.random() - 0.5) * size;
        const by = y + (Math.random() - 0.5) * size;
        drawVascularBundle(ctx, bx, by, size/6);
      }
    } else {
      // Reduced or other arrangements
      drawVascularBundle(ctx, x, y, size/3);
    }
  };

  // Draw single vascular bundle
  const drawVascularBundle = (ctx, x, y, size) => {
    // Xylem
    ctx.fillStyle = '#795548';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Phloem
    ctx.fillStyle = '#FFC107';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
    ctx.fill();
  };

  // AI analysis of leaf
  const analyzeLeaf = (leaf) => {
    // Generate measurements
    const newMeasurements = {
      thickness: leaf.thickness,
      stomataDensity: leaf.stomataDensity,
      vascularArrangement: leaf.vascularBundles,
      layerCount: leaf.layers.length
    };
    setMeasurements(newMeasurements);
    
    // Generate insights
    const insights = [];
    
    // Leaf type specific features
    insights.push(`This is a ${leafType} leaf showing characteristic features:`);
    insights.push(`- ${leaf.layers.length} distinct tissue layers`);
    insights.push(`- Stomatal density: ${leaf.stomataDensity} per mm²`);
    insights.push(`- Vascular bundles: ${leaf.vascularBundles}`);
    
    // Adaptive features
    if (leafType === 'cactus') {
      insights.push('\nAdaptations for arid environments:');
      insights.push('- Thick cuticle to reduce water loss');
      insights.push('- Reduced stomata density to minimize transpiration');
      insights.push('- Water-storing parenchyma tissue');
    } else if (leafType === 'conifer') {
      insights.push('\nAdaptations for cold environments:');
      insights.push('- Hypodermis for extra protection');
      insights.push('- Resin ducts for defense against pests');
      insights.push('- Needle shape reduces surface area');
    }
    
    // Photosynthetic efficiency
    if (leaf.layers.includes('palisade mesophyll')) {
      insights.push('\nHigh photosynthetic efficiency with:');
      insights.push('- Palisade mesophyll for light absorption');
      insights.push('- Spongy mesophyll for gas exchange');
    }
    
    setAiInsights(insights.join('\n'));
    
    // Generate health diagnosis
    generateDiagnosis(leaf);
  };

  // Generate health diagnosis
  const generateDiagnosis = (leaf) => {
    let healthStatus = 'healthy';
    let issues = [];
    
    // Simulate some random issues for demonstration
    if (Math.random() > 0.7) {
      healthStatus = 'stressed';
      issues.push('Possible water stress (stomata density lower than typical)');
    }
    if (leafType === 'dicot' && Math.random() > 0.8) {
      healthStatus = 'infected';
      issues.push('Fungal hyphae detected in spongy mesophyll');
    }
    if (leafType === 'monocot' && Math.random() > 0.9) {
      healthStatus = 'nutrient deficient';
      issues.push('Chlorosis observed in mesophyll cells');
    }
    
    if (issues.length > 0) {
      setDiagnosis(`Diagnosis: ${healthStatus}\n\nPotential issues:\n${issues.join('\n')}`);
    } else {
      setDiagnosis(`Diagnosis: ${healthStatus}\n\nNo abnormalities detected`);
    }
  };

  return (
    <div className="leaf-lab">
      <header>
        <h1>Leaf Microscopy Lab</h1>
        <p className="subtitle">Digital Simulation with AI Analysis</p>
      </header>
      
      <div className="lab-container">
        <div className="microscope-controls">
          <h2>Microscope Controls</h2>
          
          <div className="control-group">
            <label>Magnification: {magnification}x</label>
            <select
              value={magnification}
              onChange={(e) => setMagnification(e.target.value)}
            >
              <option value="40">40x</option>
              <option value="100">100x</option>
              <option value="400">400x</option>
              <option value="1000">1000x</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Stain:</label>
            <select
              value={stainType}
              onChange={(e) => setStainType(e.target.value)}
            >
              <option value="none">None</option>
              <option value="iodine">Iodine</option>
              <option value="methylene blue">Methylene Blue</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Light Intensity: {lightIntensity}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(e.target.value)}
            />
          </div>
          
          <div className="control-group">
            <label>Focus: {focus}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
            />
          </div>
        </div>
        
        <div className="specimen-controls">
          <h2>Specimen Selection</h2>
          
          <div className="control-group">
            <label>Leaf Type:</label>
            <select
              value={leafType}
              onChange={(e) => setLeafType(e.target.value)}
            >
              <option value="dicot">Dicotyledon</option>
              <option value="monocot">Monocotyledon</option>
              <option value="cactus">Cactus</option>
              <option value="conifer">Conifer</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Section Type:</label>
            <select
              value={sectionType}
              onChange={(e) => setSectionType(e.target.value)}
            >
              <option value="cross">Cross Section</option>
              <option value="longitudinal">Longitudinal Section</option>
            </select>
          </div>
          
          <div className="leaf-features">
            <h3>Key Features:</h3>
            <ul>
              {leafStructures[leafType].layers.map((layer, i) => (
                <li key={i}>{layer}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="microscope-view">
          <div className="microscope-image">
            <canvas 
              ref={canvasRef} 
              width="500" 
              height="400"
            />
          </div>
          
          <div className="measurements">
            <h3>Measurements</h3>
            <table>
              <tbody>
                <tr>
                  <td>Leaf Thickness:</td>
                  <td>{measurements.thickness} μm</td>
                </tr>
                <tr>
                  <td>Stomata Density:</td>
                  <td>{measurements.stomataDensity} per mm²</td>
                </tr>
                <tr>
                  <td>Vascular Arrangement:</td>
                  <td>{measurements.vascularArrangement}</td>
                </tr>
                <tr>
                  <td>Tissue Layers:</td>
                  <td>{measurements.layerCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="analysis-panel">
          <h2>AI Analysis</h2>
          <div className="ai-insights">
            <pre>{aiInsights}</pre>
          </div>
          
          <div className="diagnosis">
            <h3>Health Diagnosis</h3>
            <pre>{diagnosis}</pre>
          </div>
        </div>
      </div>
      
      <div className="educational-content">
        <h3>Leaf Structure Guide</h3>
        
        <div className="structure-card">
          <h4>Epidermis</h4>
          <p>Outer protective layer with cuticle to prevent water loss</p>
        </div>
        
        <div className="structure-card">
          <h4>Mesophyll</h4>
          <p>Photosynthetic tissue with palisade (light absorption) and spongy (gas exchange) layers</p>
        </div>
        
        <div className="structure-card">
          <h4>Stomata</h4>
          <p>Pores regulated by guard cells for gas exchange and transpiration</p>
        </div>
        
        <div className="structure-card">
          <h4>Vascular Bundles</h4>
          <p>Contain xylem (water transport) and phloem (sugar transport) tissues</p>
        </div>
      </div>
    </div>
  );
};

export default LeafStructure;