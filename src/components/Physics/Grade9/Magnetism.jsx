import React, { useState, useEffect, useRef } from "react";

const Magnetism = () => {
  const containerRef = useRef(null);

  // Positions: fixed magnet center (left), draggable magnet center (right)
  const fixedMagnetPos = { x: 150, y: 150 };
  const [dragMagnetPos, setDragMagnetPos] = useState({ x: 350, y: 150 });

  // Iron ball position - affected by forces
  const [ironPos, setIronPos] = useState({ x: 250, y: 150 });
  const ironVelocityRef = useRef({ x: 0, y: 0 });

  // Magnetic field on/off
  const [fieldOn, setFieldOn] = useState(true);

  // Drag state
  const draggingMagnet = useRef(false);

  // Constants
  const poleDistance = 40; // distance between N and S poles of a magnet
  const forceConstant = 20000; // tuning factor for force strength
  const ironMass = 1; // arbitrary unit for iron ball mass
  const damping = 0.85; // velocity damping for iron ball

  // Poles for fixed magnet
  const fixedNorth = { x: fixedMagnetPos.x, y: fixedMagnetPos.y - poleDistance / 2 };
  const fixedSouth = { x: fixedMagnetPos.x, y: fixedMagnetPos.y + poleDistance / 2 };

  // Poles for draggable magnet
  const dragNorth = { x: dragMagnetPos.x, y: dragMagnetPos.y - poleDistance / 2 };
  const dragSouth = { x: dragMagnetPos.x, y: dragMagnetPos.y + poleDistance / 2 };

  // Magnetic force between two poles using simplified inverse square law with polarity
  // Polarity: +1 for attraction, -1 for repulsion
  function poleForce(p1, p2, polarity) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distSq = dx * dx + dy * dy + 25; // add small term to avoid div by zero
    const forceMag = (forceConstant * polarity) / distSq;
    return { x: forceMag * dx, y: forceMag * dy };
  }

  // Calculate total magnetic force on iron ball from fixed magnet poles
  function forceFromMagnet(magnetPoles) {
    const [north, south] = magnetPoles;
    // Iron ball is attracted to both poles with positive polarity (iron is ferromagnetic)
    const forceN = poleForce(ironPos, north, 1);
    const forceS = poleForce(ironPos, south, 1);
    return { x: forceN.x + forceS.x, y: forceN.y + forceS.y };
  }

  // Calculate magnetic force between the two magnets (N repels N, S repels S; N attracts S)
  // We'll calculate force on drag magnet due to fixed magnet poles
  function forceBetweenMagnets() {
    const forces = [];
    // N-N repulsion
    forces.push(poleForce(dragNorth, fixedNorth, -1));
    // S-S repulsion
    forces.push(poleForce(dragSouth, fixedSouth, -1));
    // N-S attraction
    forces.push(poleForce(dragNorth, fixedSouth, 1));
    forces.push(poleForce(dragSouth, fixedNorth, 1));

    return forces.reduce(
      (acc, f) => ({ x: acc.x + f.x, y: acc.y + f.y }),
      { x: 0, y: 0 }
    );
  }

  // Iron ball physics: update position and velocity based on total forces
  useEffect(() => {
    if (!fieldOn) return;

    let animationFrameId;

    const update = () => {
      // Forces on iron ball from both magnets
      const forceFixed = forceFromMagnet([fixedNorth, fixedSouth]);
      const forceDrag = forceFromMagnet([dragNorth, dragSouth]);
      const totalForceIron = { x: forceFixed.x + forceDrag.x, y: forceFixed.y + forceDrag.y };

      // Update velocity (F = m*a; here a = F/m)
      ironVelocityRef.current.x = (ironVelocityRef.current.x + totalForceIron.x / ironMass) * damping;
      ironVelocityRef.current.y = (ironVelocityRef.current.y + totalForceIron.y / ironMass) * damping;

      // Update position
      setIronPos((pos) => {
        let newX = pos.x + ironVelocityRef.current.x;
        let newY = pos.y + ironVelocityRef.current.y;

        // Keep inside container bounds
        newX = Math.min(Math.max(newX, 20), 480);
        newY = Math.min(Math.max(newY, 20), 280);
        return { x: newX, y: newY };
      });

      // Update drag magnet position with forces from fixed magnet, only if not dragging
      if (!draggingMagnet.current) {
        const forceOnDragMagnet = forceBetweenMagnets();
        setDragMagnetPos((pos) => {
          let newX = pos.x + forceOnDragMagnet.x * 0.05;
          let newY = pos.y + forceOnDragMagnet.y * 0.05;

          newX = Math.min(Math.max(newX, 60), 440);
          newY = Math.min(Math.max(newY, 60), 240);
          return { x: newX, y: newY };
        });
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [fieldOn, fixedNorth, fixedSouth, dragNorth, dragSouth, ironPos]);

  // Drag handlers for draggable magnet
  const handleDragStart = () => {
    draggingMagnet.current = true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    if (!draggingMagnet.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    let newX = e.clientX - rect.left;
    let newY = e.clientY - rect.top;

    // Clamp within bounds
    newX = Math.min(Math.max(newX, 60), 440);
    newY = Math.min(Math.max(newY, 60), 240);

    setDragMagnetPos({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    draggingMagnet.current = false;
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 700,
        margin: "30px auto",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        backgroundColor: "#fafafa",
        userSelect: "none",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Realistic Magnetism Lab Ethiopia
      </h1>

      <div style={{ textAlign: "center", marginBottom: 15 }}>
        <label
          style={{
            cursor: "pointer",
            userSelect: "none",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          <input
            type="checkbox"
            checked={fieldOn}
            onChange={() => setFieldOn(!fieldOn)}
            style={{ marginRight: 8 }}
          />
          Magnetic Field {fieldOn ? "ON" : "OFF"}
        </label>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        style={{
          position: "relative",
          width: 500,
          height: 300,
          margin: "20px auto",
          border: "2px solid #555",
          borderRadius: 16,
          backgroundColor: "#e0f7fa",
          overflow: "hidden",
          cursor: draggingMagnet.current ? "grabbing" : "default",
        }}
      >
        {/* Fixed magnet */}
        <MagnetVisual x={fixedMagnetPos.x} y={fixedMagnetPos.y} />

        {/* Draggable magnet */}
        <MagnetVisual
          x={dragMagnetPos.x}
          y={dragMagnetPos.y}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />

        {/* Iron ball */}
        <div
          title="Iron ball attracted to magnets"
          style={{
            position: "absolute",
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: "#7f8c8d",
            boxShadow: "0 0 15px 3px rgba(127,140,141,0.7)",
            top: ironPos.y - 15,
            left: ironPos.x - 15,
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#d0f0fc",
          borderRadius: 10,
          padding: 18,
          color: "#333",
          fontSize: 15,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginTop: 25,
          maxWidth: 560,
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.6,
        }}
      >
        <h3>How this simulation works:</h3>
        <ul>
          <li>
            Two bar magnets: one fixed on left, one draggable on right.
          </li>
          <li>
            Each magnet has a North and South pole (red and blue ends).
          </li>
          <li>
            Poles with the same polarity repel each other, opposite poles attract.
          </li>
          <li>
            The iron ball moves in response to magnetic forces exerted by both magnets.
          </li>
          <li>
            Drag the right magnet to see real-time magnetic repulsion/attraction effects.
          </li>
          <li>
            The magnetic field can be toggled ON/OFF.
          </li>
        </ul>

        <h3>Tips for magnetism experiments:</h3>
        <ul>
          <li>Magnets exert forces on ferromagnetic materials like iron.</li>
          <li>Opposite poles attract; like poles repel.</li>
          <li>Force strength decreases with square of distance.</li>
          <li>Magnetic fields are invisible but can be visualized with iron filings or simulation.</li>
          <li>Magnetic materials can become temporarily magnetized.</li>
        </ul>
      </div>
    </div>
  );
};

// Component to render a bar magnet with N and S poles
const MagnetVisual = ({ x, y, draggable = false, onDragStart, onDragEnd }) => {
  const magnetRef = useRef(null);

  // Mouse event handlers for drag if draggable
  const handleMouseDown = (e) => {
    if (!draggable) return;
    e.preventDefault();
    onDragStart && onDragStart(e);
    window.addEventListener("mouseup", onDragEnd);
  };

  return (
    <div
      ref={magnetRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        top: y - 40,
        left: x - 20,
        width: 40,
        height: 80,
        background:
          "linear-gradient(90deg, #e74c3c 50%, #3498db 50%)",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        fontWeight: "700",
        fontSize: 18,
        padding: "0 6px",
        cursor: draggable ? "grab" : "default",
        userSelect: "none",
        zIndex: 10,
      }}
      draggable={false}
      title={draggable ? "Drag me!" : "Fixed Magnet"}
    >
      <span style={{ color: "#e74c3c" }}>N</span>
      <span style={{ color: "#3498db" }}>S</span>
    </div>
  );
};

export default Magnetism;
