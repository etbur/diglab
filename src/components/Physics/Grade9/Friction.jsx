import React, { useState, useRef, useEffect } from "react";

const Friction = () => {
  const canvasRef = useRef(null);
  const animationId = useRef(null);
  const lastTimeRef = useRef(null);
  const posXRef = useRef(50); // Start a bit right so arrows fit
  const velocityRef = useRef(0);

  const [material, setMaterial] = useState("wood");
  const [force, setForce] = useState(8);
  const [status, setStatus] = useState("Ready");
  const [velocity, setVelocity] = useState(0);
  const [step, setStep] = useState(1);

  const mass = 2; // kg
  const gravity = 9.8; // m/s²

  const staticMaterials = {
    wood: { static: 0.5, kinetic: 0.4 },
    rubber: { static: 0.9, kinetic: 0.8 },
    ice: { static: 0.1, kinetic: 0.05 },
    steel: { static: 0.7, kinetic: 0.6 },
  };

  // Reset canvas and variables
  const resetCanvas = () => {
    cancelAnimationFrame(animationId.current);
    lastTimeRef.current = null;
    posXRef.current = 50;
    velocityRef.current = 0;
    setVelocity(0);
    setStatus("Ready");
    setStep(1);

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 700, 200);
    // Draw ground
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 140, 700, 40);
    // Draw block
    ctx.fillStyle = "#007bff";
    ctx.fillRect(posXRef.current, 100, 80, 40);
    // Draw arrows base position (left side)
    drawArrow(ctx, 20, 120, 100, "green", "Applied Force");
  };

  // Utility function to draw arrows with labels
  const drawArrow = (ctx, x, y, length, color, label) => {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y);
    ctx.stroke();
    // Arrow head
    ctx.beginPath();
    ctx.moveTo(x + length, y);
    ctx.lineTo(x + length - 10, y - 7);
    ctx.lineTo(x + length - 10, y + 7);
    ctx.fill();
    // Label text
    ctx.font = "14px Arial";
    ctx.fillText(label, x, y - 15);
  };

  const startSimulation = () => {
    resetCanvas();
    const ctx = canvasRef.current.getContext("2d");

    const mu = staticMaterials[material];
    const normalForce = mass * gravity;
    const maxStaticFriction = mu.static * normalForce;
    const kineticFrictionForce = mu.kinetic * normalForce;

    setStatus("Checking if applied force can overcome static friction...");

    if (force <= maxStaticFriction) {
      // Static friction holds, no motion
      setStep(2);
      setStatus("Static friction holds the block in place. No motion.");
      // Draw applied force and friction equal and opposite
      drawArrow(ctx, 20, 120, force * 10, "green", "Applied Force");
      drawArrow(ctx, 20 + force * 10, 120, -force * 10, "red", "Static Friction");
      setVelocity(0);
      return;
    }

    // Motion starts - kinetic friction applies
    setStep(3);
    setStatus("Static friction overcome! Block starts sliding with kinetic friction.");

    const netForce = force - kineticFrictionForce;
    const acceleration = netForce / mass;
    velocityRef.current = 0;

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      velocityRef.current += acceleration * dt;
      posXRef.current += velocityRef.current * 60 * dt; // scale motion for visibility

      ctx.clearRect(0, 0, 700, 200);
      // Draw ground
      ctx.fillStyle = "#ccc";
      ctx.fillRect(0, 140, 700, 40);

      // Draw block
      ctx.fillStyle = "#007bff";
      ctx.fillRect(posXRef.current, 100, 80, 40);

      // Draw forces
      drawArrow(ctx, posXRef.current - 30, 120, force * 10, "green", "Applied Force");
      drawArrow(ctx, posXRef.current + 80, 120, -kineticFrictionForce * 10, "red", "Kinetic Friction");

      setVelocity(velocityRef.current);

      if (posXRef.current + 80 < 700) {
        animationId.current = requestAnimationFrame(animate);
      } else {
        setStatus("Block reached the edge.");
      }
    };

    animationId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    resetCanvas();
  }, [material]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 720, margin: "20px auto" }}>
      <h1>Friction Proof and Simulation</h1>

      <div style={{ marginBottom: 15 }}>
        <label>
          Material:{" "}
          <select value={material} onChange={(e) => setMaterial(e.target.value)}>
            {Object.keys(staticMaterials).map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </label>{" "}
        <label>
          Applied Force (N):{" "}
          <input
            type="number"
            min="0"
            max="20"
            step="0.1"
            value={force}
            onChange={(e) => setForce(Number(e.target.value))}
          />
        </label>{" "}
        <button onClick={startSimulation}>Start Simulation</button>{" "}
        <button onClick={resetCanvas}>Reset</button>
      </div>

      <canvas
        ref={canvasRef}
        width={700}
        height={200}
        style={{ border: "1px solid #333", background: "#f9f9f9" }}
      />

      <div style={{ marginTop: 20 }}>
        <h3>Status:</h3>
        <p>{status}</p>
        <h3>Velocity: {velocity.toFixed(2)} m/s</h3>

        {step === 1 && (
          <p>
            Step 1: Applied force tries to move the block. If force ≤ static friction, block stays still.
          </p>
        )}
        {step === 2 && (
          <p>
            Step 2: Static friction equals applied force and prevents movement. Block is stationary.
          </p>
        )}
        {step === 3 && (
          <p>
            Step 3: Applied force overcomes static friction. Block slides with kinetic friction opposing motion.
          </p>
        )}
      </div>
    </div>
  );
};

export default Friction;
