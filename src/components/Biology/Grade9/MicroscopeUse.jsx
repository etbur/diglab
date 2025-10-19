import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

const cells = [
  { id: 1, type: "Red Blood Cell", x: 100, y: 120, size: 30, color: "#e74c3c" },
  { id: 2, type: "White Blood Cell", x: 200, y: 150, size: 40, color: "#3498db" },
  { id: 3, type: "Platelet", x: 150, y: 80, size: 15, color: "#f1c40f" },
  { id: 4, type: "Epithelial Cell", x: 250, y: 200, size: 50, color: "#2ecc71" },
  { id: 5, type: "Bacteria", x: 300, y: 100, size: 20, color: "#9b59b6" },
];

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const MicroscopeDevice = () => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const clampZoom = (z) => clamp(z, 0.5, 5);

  const startDrag = (x, y) => {
    dragging.current = true;
    lastPos.current = { x, y };
  };

  const dragMove = (x, y) => {
    if (!dragging.current) return;
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    setOffset((off) => ({
      x: clamp(off.x + dx, -600 * (zoom - 1), 0),
      y: clamp(off.y + dy, -400 * (zoom - 1), 0),
    }));
    lastPos.current = { x, y };
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((z) => {
      const newZoom = clampZoom(z + delta);
      setOffset((off) => ({
        x: clamp(off.x * (newZoom / z), -600 * (newZoom - 1), 0),
        y: clamp(off.y * (newZoom / z), -400 * (newZoom - 1), 0),
      }));
      return newZoom;
    });
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "20px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        Real-Time Microscope Device Simulation - Lab Ethiopia
      </h1>

      <div
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onMouseMove={(e) => dragMove(e.clientX, e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onWheel={onWheel}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            const t = e.touches[0];
            startDrag(t.clientX, t.clientY);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1) {
            const t = e.touches[0];
            dragMove(t.clientX, t.clientY);
          }
        }}
        onTouchEnd={endDrag}
        onTouchCancel={endDrag}
        style={{
          position: "relative",
          width: 600,
          height: 400,
          margin: "auto",
          background: "#222",
          borderRadius: "50%",   // make the whole container circular
          boxShadow:
            "0 0 15px rgba(0,0,0,0.8), inset 0 0 15px rgba(255,255,255,0.15)",
          overflow: "hidden",
          cursor: dragging.current ? "grabbing" : "grab",
          border: "10px solid #444",
        }}
      >
        {/* Slide viewport */}
        <div
          style={{
            position: "absolute",
            top: offset.y,
            left: offset.x,
            width: 600 * zoom,
            height: 400 * zoom,
            backgroundColor: "#fefefe",
            borderRadius: 8,
            boxShadow: "inset 0 0 15px #aaa",
            userSelect: "none",
          }}
        >
          {/* Cells */}
          {cells.map((cell) => (
            <div
              key={cell.id}
              title={cell.type}
              style={{
                position: "absolute",
                top: cell.y * zoom - (cell.size * zoom) / 2,
                left: cell.x * zoom - (cell.size * zoom) / 2,
                width: cell.size * zoom,
                height: cell.size * zoom,
                borderRadius: "50%",
                backgroundColor: cell.color,
                boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                border: "2px solid #555",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 12 * zoom,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {zoom > 2 ? cell.type[0] : ""}
            </div>
          ))}
        </div>

        {/* Lens highlight */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            border: "2px solid #77c",
            pointerEvents: "none",
            boxShadow: "0 0 20px 5px rgba(119, 119, 204, 0.6)",
          }}
        ></div>
      </div>

      {/* Controls */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => setZoom((z) => clampZoom(z - 0.5))}
          disabled={zoom <= 0.5}
          style={{
            padding: "8px 16px",
            fontSize: 16,
            borderRadius: 8,
            cursor: zoom <= 0.5 ? "not-allowed" : "pointer",
          }}
        >
          Zoom Out
        </button>

        <div
          style={{
            fontSize: 18,
            fontWeight: "bold",
            minWidth: 140,
            textAlign: "center",
          }}
        >
          Magnification: {zoom.toFixed(1)}×
        </div>

        <button
          onClick={() => setZoom((z) => clampZoom(z + 0.5))}
          disabled={zoom >= 5}
          style={{
            padding: "8px 16px",
            fontSize: 16,
            borderRadius: 8,
            cursor: zoom >= 5 ? "not-allowed" : "pointer",
          }}
        >
          Zoom In
        </button>
      </div>

      {/* Instructions */}
      <section style={{ marginTop: 32 }}>
        <h2>How to Use the Microscope Simulation</h2>
        <ul>
          <li>Drag inside the microscope lens to move the slide sample.</li>
          <li>Use mouse wheel or zoom buttons to change magnification.</li>
          <li>On touch devices, drag with one finger to move the slide.</li>
          <li>Zooming adjusts how close you see the sample cells.</li>
          <li>Cells show their first letter when zoomed beyond 2×.</li>
        </ul>
      </section>

    </div>
  );
};

export default MicroscopeDevice;
