import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const PlantCells = () => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [focus, setFocus] = useState(1); // 1 = sharp, 0 = blurry
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Animation state for cytoplasmic streaming
  const [streamOffset, setStreamOffset] = useState(0);

  // Cytoplasmic streaming animation
  useEffect(() => {
    let frameId;
    const animate = () => {
      setStreamOffset((prev) => (prev + 1) % 100);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Drag handlers
  const onMouseDown = (e) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };
  const onMouseMove = (e) => {
    if (dragging.current) {
      setOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    }
  };
  const onMouseUp = () => {
    dragging.current = false;
  };

  // Zoom with wheel
  const onWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY / 500;
    setZoom((z) => Math.min(Math.max(z + delta, 1), 5));
  };

  // Focus slider
  const onFocusChange = (e) => {
    setFocus(parseFloat(e.target.value));
  };

  // Calculate blur amount for focus simulation (more blur when focus < 1)
  const blurAmount = (1 - focus) * 8;

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Plant Cell Observation Lab Ethiopia</h1>

      <p style={{ textAlign: "center", marginBottom: 10 }}>
        Use mouse wheel to zoom, drag to pan, and adjust focus slider to simulate microscope focusing.
      </p>

      {/* Focus Control */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <label htmlFor="focusRange" style={{ fontWeight: "bold", marginRight: 10 }}>
          Focus:
        </label>
        <input
          id="focusRange"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={focus}
          onChange={onFocusChange}
          style={{ width: 200 }}
        />
      </div>

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
        style={{
          border: "2px solid #4CAF50",
          borderRadius: 10,
          width: "100%",
          height: 450,
          overflow: "hidden",
          cursor: dragging.current ? "grabbing" : "grab",
          userSelect: "none",
          backgroundColor: "#f0fff0",
          position: "relative",
        }}
      >
        <svg
          width={1000}
          height={600}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            transition: dragging.current ? "none" : "transform 0.2s ease-out",
            userSelect: "none",
          }}
          viewBox="0 0 1000 600"
        >
          {/* Cell wall */}
          <rect
            x={50}
            y={50}
            width={900}
            height={500}
            fill="#d0f0c0"
            stroke="#4CAF50"
            strokeWidth={8}
            rx={40}
            ry={40}
            filter={`blur(${blurAmount}px)`}
          />
          <text x={70} y={90} fill="#2e7d32" fontSize={24} fontWeight="bold" filter={`blur(${blurAmount}px)`}>
            Cell Wall
          </text>

          {/* Vacuole */}
          <ellipse
            cx={600}
            cy={300}
            rx={250}
            ry={190}
            fill="#a2d5a2"
            stroke="#4CAF50"
            strokeWidth={5}
            filter={`blur(${blurAmount}px)`}
          />
          <text x={550} y={290} fill="#2e7d32" fontSize={20} fontWeight="600" filter={`blur(${blurAmount}px)`}>
            Vacuole
          </text>

          {/* Chloroplasts */}
          {[{ cx: 300, cy: 180 }, { cx: 350, cy: 250 }, { cx: 400, cy: 200 }, { cx: 450, cy: 300 }].map((pos, i) => (
            <g key={i} filter={`blur(${blurAmount}px)`}>
              <ellipse cx={pos.cx} cy={pos.cy} rx={45} ry={25} fill="#4CAF50" stroke="#2e7d32" strokeWidth={3} />
              <text x={pos.cx - 40} y={pos.cy + 5} fill="#1b5e20" fontSize={14} fontWeight="600">
                Chloroplast
              </text>
            </g>
          ))}

          {/* Nucleus */}
          <circle
            cx={750}
            cy={200}
            r={70}
            fill="#ffcc80"
            stroke="#ffb300"
            strokeWidth={6}
            filter={`blur(${blurAmount}px)`}
          />
          <text x={700} y={200} fill="#bf360c" fontSize={22} fontWeight="700" filter={`blur(${blurAmount}px)`}>
            Nucleus
          </text>

          {/* Cytoplasm streaming animation */}
          <g>
            {[...Array(12)].map((_, i) => {
              const x = 150 + ((streamOffset + i * 25) % 900);
              const y = 350 + 30 * Math.sin((streamOffset + i * 25) / 15);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={10}
                  fill="#81c784"
                  opacity={0.6}
                  filter={`blur(${blurAmount * 0.6}px)`}
                />
              );
            })}
            <text x={520} y={380} fill="#2e7d32" fontSize={16} fontWeight="600" filter={`blur(${blurAmount}px)`}>
              Cytoplasm Streaming
            </text>
          </g>
        </svg>
      </div>

      <section style={{ marginTop: 30 }}>
        <h2>Microscope Simulation Controls</h2>
        <ul>
          <li>Use mouse wheel to zoom in and out.</li>
          <li>Click and drag to move (pan) around the plant cell.</li>
          <li>Use the Focus slider to simulate microscope focusing (sharpness changes).</li>
          <li>Observe labeled parts: cell wall, vacuole, chloroplasts, nucleus, cytoplasm.</li>
          <li>Watch cytoplasmic streaming as moving green circles inside the cell.</li>
        </ul>
      </section>

      <nav
        style={{
          marginTop: 30,
          display: "flex",
          gap: 20,
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/biology">Biology Labs</NavLink>
        <NavLink to="/plantcells">Plant Cells Lab</NavLink>
      </nav>
    </div>
  );
};

export default PlantCells;
