import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";

const OhmsLaw = () => {
  const sketchRef = useRef();
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(10);
  const [current, setCurrent] = useState(0.5);

  useEffect(() => {
    const sketch = (p) => {
      let currentArrowPos = 0;
      let electrons = [];
      let voltageSlider, resistanceSlider;
      let showElectrons = true;
      let showCurrent = true;
      let showHeat = false;
      let resistorHeat = 0;

      p.setup = () => {
        const canvas = p.createCanvas(800, 600);
        canvas.parent(sketchRef.current);
        
        // Create sliders with better styling
        voltageSlider = p.createSlider(0, 20, voltage, 0.1);
        voltageSlider.position(150, 550);
        voltageSlider.style('width', '200px');
        voltageSlider.input(() => {
          const newVoltage = voltageSlider.value();
          setVoltage(newVoltage);
          setCurrent(newVoltage / resistance);
        });
        
        resistanceSlider = p.createSlider(1, 50, resistance, 1);
        resistanceSlider.position(150, 580);
        resistanceSlider.style('width', '200px');
        resistanceSlider.input(() => {
          const newResistance = resistanceSlider.value();
          setResistance(newResistance);
          setCurrent(voltage / newResistance);
        });

        // Create toggle buttons
        const electronButton = p.createButton('Toggle Electrons');
        electronButton.position(450, 550);
        electronButton.mousePressed(() => showElectrons = !showElectrons);
        
        const currentButton = p.createButton('Toggle Current');
        currentButton.position(450, 580);
        currentButton.mousePressed(() => showCurrent = !showCurrent);
        
        const heatButton = p.createButton('Toggle Heat Effect');
        heatButton.position(600, 550);
        heatButton.mousePressed(() => showHeat = !showHeat);

        // Initialize electrons
        for (let i = 0; i < 50; i++) {
          electrons.push({
            x: p.random(160, 780),
            y: 200,
            speed: p.map(current, 0, 5, 0.5, 5),
            offset: p.random(0, 100)
          });
        }
      };

      p.draw = () => {
        p.background(245);
        
        // Update current based on voltage and resistance
        const calculatedCurrent = voltage / resistance;
        setCurrent(calculatedCurrent);
        
        // Smooth animation for current arrow
        currentArrowPos = p.lerp(currentArrowPos, p.map(calculatedCurrent, 0, 5, 0, 300), 0.1);
        
        // Update resistor heat effect
        resistorHeat = p.lerp(resistorHeat, calculatedCurrent * resistance / 2, 0.1);

        // Draw circuit
        p.stroke(0);
        p.strokeWeight(2);
        p.noFill();
        
        // Battery with better representation
        p.push();
        p.translate(100, 200);
        // Battery body
        p.fill(220);
        p.rect(-30, -50, 60, 100, 5);
        // Positive terminal
        p.fill(255, 50, 50);
        p.rect(-20, -60, 40, 10, 3);
        // Negative terminal
        p.fill(50, 50, 255);
        p.rect(-20, 50, 40, 10, 3);
        // Plus sign
        p.stroke(255);
        p.strokeWeight(3);
        p.line(-10, -45, -10, -35);
        p.line(-15, -40, -5, -40);
        // Minus sign
        p.line(-15, 45, -5, 45);
        p.pop();
        
        // Battery labels
        p.fill(0);
        p.noStroke();
        p.textSize(14);
        p.text("+", 85, 185);
        p.text("-", 85, 235);
        
        // Wires
        p.stroke(50);
        p.strokeWeight(3);
        p.noFill();
        p.line(130, 200, 350, 200); // From battery to resistor
        p.line(470, 200, 600, 200); // From resistor to bulb
        p.line(700, 200, 750, 200); // From bulb to end
        p.line(750, 200, 750, 400); // Vertical down
        p.line(750, 400, 100, 400); // Horizontal left
        p.line(100, 400, 100, 250); // Vertical up to battery
        
        // Resistor with color bands
        p.push();
        p.translate(350, 200);
        // Resistor body
        p.fill(210, 180, 140);
        p.rect(0, -20, 120, 40, 5);
        // Leads
        p.stroke(150);
        p.strokeWeight(2);
        p.line(-10, 0, 0, 0);
        p.line(120, 0, 130, 0);
        // Color bands based on resistance value
        const bandColors = getResistorColors(resistance);
        for (let i = 0; i < 4; i++) {
          p.fill(bandColors[i]);
          p.noStroke();
          p.rect(25 + i * 20, -22, 10, 44);
        }
        p.pop();
        
        // Resistor label
        p.fill(0);
        p.text("R", 405, 190);
        
        // Light bulb (as a load)
        p.push();
        p.translate(600, 200);
        // Bulb base
        p.fill(120);
        p.rect(-15, -10, 30, 20, 3);
        // Bulb glass
        p.fill(220, 220, 255, 200);
        p.ellipse(0, -25, 40, 40);
        // Filament - brightness based on current
        const brightness = p.map(calculatedCurrent, 0, 5, 50, 255);
        p.stroke(255, 255, 0, brightness);
        p.strokeWeight(2);
        p.line(-10, -15, -5, -25);
        p.line(-5, -25, 5, -25);
        p.line(5, -25, 10, -15);
        p.pop();
        
        // Heat effect on resistor
        if (showHeat && calculatedCurrent > 0.1) {
          p.push();
          p.translate(410, 200);
          const heatAlpha = p.map(resistorHeat, 0, 50, 0, 150);
          for (let i = 0; i < 5; i++) {
            const wave = p.sin(p.frameCount * 0.05 + i) * 5;
            p.noFill();
            p.stroke(255, 100, 0, heatAlpha);
            p.strokeWeight(2);
            p.ellipse(0, 0, 60 + i * 8 + wave, 40 + i * 8 + wave);
          }
          p.pop();
        }
        
        // Current arrow
        if (showCurrent && calculatedCurrent > 0.1) {
          p.fill(0, 100, 255);
          p.noStroke();
          const arrowX = 200 + currentArrowPos;
          p.triangle(arrowX, 190, arrowX - 10, 185, arrowX - 10, 195);
          p.textSize(14);
          p.text("I", arrowX - 5, 180);
        }
        
        // Electrons animation
        if (showElectrons) {
          const electronSpeed = p.map(calculatedCurrent, 0, 5, 0.5, 5);
          
          for (let electron of electrons) {
            electron.speed = p.lerp(electron.speed, electronSpeed, 0.1);
            electron.x += electron.speed;
            
            // Wrap around when reaching the end
            if (electron.x > 750) electron.x = 160;
            
            // Draw electron
            p.fill(0, 100, 255);
            p.noStroke();
            p.ellipse(electron.x, electron.y + p.sin(p.frameCount * 0.1 + electron.offset) * 3, 5);
          }
        }
        
        // Display values with better styling
        p.fill(40);
        p.textSize(20);
        p.text("Ohm's Law Simulation: V = I × R", 20, 30);
        
        p.textSize(16);
        p.text(`Voltage (V): ${voltage.toFixed(1)} V`, 20, 560);
        p.text(`Resistance (R): ${resistance} Ω`, 20, 590);
        p.text(`Current (I = V/R): ${calculatedCurrent.toFixed(2)} A`, 400, 590);
        
        // Draw formula with highlights
        p.textSize(24);
        p.fill(200, 50, 50);
        p.text("V", 400, 100);
        p.fill(0);
        p.text(" = ", 415, 100);
        p.fill(0, 100, 255);
        p.text("I", 440, 100);
        p.fill(0);
        p.text(" × ", 450, 100);
        p.fill(50, 150, 50);
        p.text("R", 480, 100);
        
        p.textSize(18);
        p.fill(0);
        p.text(`Calculation: ${voltage.toFixed(1)}V = ${calculatedCurrent.toFixed(2)}A × ${resistance}Ω`, 400, 130);
        
        // Power calculation
        const power = voltage * calculatedCurrent;
        p.text(`Power (P = V×I): ${power.toFixed(2)} W`, 400, 520);
      };
      
      // Helper function to get resistor color bands based on resistance value
      function getResistorColors(value) {
        const digits = value.toString().split('').map(Number);
        const multiplier = value < 10 ? 0 : value < 100 ? 1 : 2;
        
        // If value is less than 10, we need to adjust the bands
        if (value < 10) {
          return [
            p.color(digits[0] * 25, digits[0] * 25, digits[0] * 25), // First digit
            p.color(0, 0, 0), // Black for second digit (0)
            p.color(multiplier * 50, multiplier * 25, 0), // Multiplier
            p.color(200, 200, 0) // Gold tolerance
          ];
        }
        
        return [
          p.color(digits[0] * 25, digits[0] * 25, digits[0] * 25), // First digit
          p.color(digits[1] * 25, digits[1] * 25, digits[1] * 25), // Second digit
          p.color(multiplier * 50, multiplier * 25, 0), // Multiplier
          p.color(200, 200, 0) // Gold tolerance
        ];
      }
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [voltage, resistance, current]);

  return (
    <div className="simulation-container">
      <div ref={sketchRef}></div>
      <div className="simulation-instructions">
        <h2>Ohm's Law Simulation</h2>
        <p>Adjust the sliders to change voltage and resistance.</p>
        <p>Observe how the current changes according to Ohm's Law: V = I × R</p>
        <p>Use the toggle buttons to show/hide different visualization elements.</p>
        <div className="values-display">
          <p>Voltage: <strong>{voltage.toFixed(1)} V</strong></p>
          <p>Resistance: <strong>{resistance} Ω</strong></p>
          <p>Current: <strong>{(voltage / resistance).toFixed(2)} A</strong></p>
          <p>Power: <strong>{(voltage * (voltage / resistance)).toFixed(2)} W</strong></p>
        </div>
      </div>
    </div>
  );
};

export default OhmsLaw;