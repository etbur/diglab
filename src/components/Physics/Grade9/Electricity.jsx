import React, { useState, useRef, useEffect } from "react";

const COMPONENTS = [
  {
    id: "battery",
    label: "Battery",
    terminals: 2,
    voltage: 12,
    icon: (
      <rect x={-20} y={-10} width={40} height={20} fill="#ff7043" stroke="#bf360c" strokeWidth="2" rx="3" ry="3" />
    ),
  },
  {
    id: "resistor",
    label: "Resistor",
    terminals: 2,
    resistance: 10,
    icon: (
      <rect x={-20} y={-10} width={40} height={20} fill="#789262" stroke="#4a6225" strokeWidth="2" rx="3" ry="3" />
    ),
  },
  {
    id: "bulb",
    label: "Bulb",
    terminals: 2,
    icon: (
      <circle cx="0" cy="0" r="15" fill="#ffd600" stroke="#ffa000" strokeWidth="3" />
    ),
  },
  {
    id: "switch",
    label: "Switch",
    terminals: 2,
    icon: (
      <g>
        <rect x={-20} y={-5} width={40} height={10} fill="#bdbdbd" stroke="#757575" strokeWidth="2" rx="3" ry="3" />
        <line x1={-20} y1={0} x2={20} y2={0} stroke="#424242" strokeWidth="4" />
      </g>
    ),
  },
];

const TERMINAL_RADIUS = 8;
const TERMINAL_OFFSET = 30;

const Terminal = ({
  x,
  y,
  terminalId,
  onConnectStart,
  onConnectEnd,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => (
  <circle
    cx={x}
    cy={y}
    r={TERMINAL_RADIUS}
    fill={isHovered ? "#fdd835" : "#33691e"}
    stroke="#1b5e20"
    strokeWidth={2}
    style={{ cursor: "pointer" }}
    onMouseDown={(e) => {
      e.stopPropagation();
      onConnectStart(terminalId, e);
    }}
    onMouseUp={(e) => {
      e.stopPropagation();
      onConnectEnd(terminalId, e);
    }}
    onMouseEnter={() => onMouseEnter(terminalId)}
    onMouseLeave={onMouseLeave}
  />
);

const ComponentIcon = ({ component, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, component)}
    title={component.label}
    style={{
      border: "2px solid #33691e",
      borderRadius: 6,
      padding: 8,
      marginBottom: 14,
      backgroundColor: "#aed581",
      cursor: "grab",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      userSelect: "none",
      width: 60,
      height: 60,
      boxShadow: "2px 2px 6px rgba(0,0,0,0.15)",
    }}
  >
    <svg width="40" height="40" viewBox="-30 -30 60 60">
      {component.icon}
    </svg>
  </div>
);

const ElectricityLab = () => {
  const [placedComponents, setPlacedComponents] = useState([]);
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [connections, setConnections] = useState([]); // pairs of terminal IDs
  const [connectingTerminal, setConnectingTerminal] = useState(null);
  const [hoveredTerminal, setHoveredTerminal] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [electricityOn, setElectricityOn] = useState(false);
  const [current, setCurrent] = useState(0);
  const [switchStates, setSwitchStates] = useState({}); // id -> boolean (true=closed)

  const svgRef = useRef();

  // Drag handlers for sidebar components
  const onDragStart = (e, component) => {
    setDraggedComponent(component);
  };

  // Drop component on canvas
  const onDrop = (e) => {
    e.preventDefault();
    if (!draggedComponent) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;

    const id = `${draggedComponent.id}-${Date.now()}`;

    // Initialize switch state if switch
    if (draggedComponent.id === "switch") {
      setSwitchStates((s) => ({ ...s, [id]: false }));
    }

    setPlacedComponents((pcs) => [...pcs, { ...draggedComponent, id, x, y }]);
    setDraggedComponent(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  // Terminal connect start
  const onTerminalMouseDown = (terminalId, e) => {
    setConnectingTerminal(terminalId);
  };

  // Terminal connect end
  const onTerminalMouseUp = (terminalId, e) => {
    if (
      connectingTerminal &&
      connectingTerminal !== terminalId &&
      !connections.some(
        ([a, b]) =>
          (a === connectingTerminal && b === terminalId) ||
          (a === terminalId && b === connectingTerminal)
      )
    ) {
      setConnections((conns) => [...conns, [connectingTerminal, terminalId]]);
    }
    setConnectingTerminal(null);
  };

  // Cancel connection on mouse up outside terminals
  const onSVGMouseUp = () => {
    setConnectingTerminal(null);
  };

  // Hover handlers
  const onTerminalMouseEnter = (terminalId) => {
    setHoveredTerminal(terminalId);
  };
  const onTerminalMouseLeave = () => {
    setHoveredTerminal(null);
  };

  // Track mouse for wire preview
  const onMouseMove = (e) => {
    const svgRect = svgRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - svgRect.left,
      y: e.clientY - svgRect.top,
    });
  };

  // Helpers to get terminals of component
  const getTerminals = (comp) =>
    comp.terminals === 2
      ? [`${comp.id}-0`, `${comp.id}-1`]
      : [];

  // Helper to get component by terminal id
  const getComponentByTerminal = (terminalId) => {
    const baseId = terminalId.split("-").slice(0, -1).join("-");
    return placedComponents.find((c) => c.id === baseId);
  };

  // Find connected terminal to given terminal
  const findConnectedTerminal = (terminalId) => {
    for (const conn of connections) {
      if (conn[0] === terminalId) return conn[1];
      if (conn[1] === terminalId) return conn[0];
    }
    return null;
  };

  // Get all connected terminals to terminalId (recursive) — used to find full path
  const getAllConnectedTerminals = (startTerminal, visited = new Set()) => {
    visited.add(startTerminal);
    const connected = connections
      .filter(([a, b]) => a === startTerminal || b === startTerminal)
      .map(([a, b]) => (a === startTerminal ? b : a))
      .filter((t) => !visited.has(t));
    connected.forEach((t) => getAllConnectedTerminals(t, visited));
    return visited;
  };

  // Check if circuit is complete with battery → bulbs and resistors, and switches all closed in path
  // Simplified: If all placed bulbs connected in circuit loop with battery and switches closed, current flows
  const calculateCurrent = () => {
    if (!electricityOn) return 0;

    const battery = placedComponents.find((c) => c.id.startsWith("battery"));
    if (!battery) return 0;

    // Find all bulbs in circuit connected to battery terminals
    const batteryTerms = getTerminals(battery);

    // Find all terminals connected to battery terminal0 (start terminal)
    const connectedTerminals = getAllConnectedTerminals(batteryTerms[0]);

    // Check if all bulbs are connected somewhere in that set
    const bulbs = placedComponents.filter((c) => c.id.startsWith("bulb"));
    if (bulbs.length === 0) return 0;

    // Check switches on path: if any switch in path is open, no current flows
    // Collect all components connected to battery terminal0
    const connectedComponents = new Set();
    connectedTerminals.forEach((termId) => {
      const comp = getComponentByTerminal(termId);
      if (comp) connectedComponents.add(comp.id);
    });

    // All switches in connected components must be closed
    const switches = placedComponents.filter((c) => c.id.startsWith("switch"));
    for (const sw of switches) {
      if (connectedComponents.has(sw.id) && !switchStates[sw.id]) {
        // Switch in path is open
        return 0;
      }
    }

    // Calculate total resistance of resistors in connected path
    const resistors = placedComponents.filter((c) => c.id.startsWith("resistor"));
    const connectedResistors = resistors.filter((r) => connectedComponents.has(r.id));
    const totalResistance = connectedResistors.reduce((acc, r) => acc + (r.resistance || 10), 0);

    // Avoid div by zero
    if (totalResistance === 0) return battery.voltage;

    // Current = Voltage / Resistance
    return battery.voltage / totalResistance;
  };

  useEffect(() => {
    setCurrent(calculateCurrent());
  }, [connections, placedComponents, electricityOn, switchStates]);

  // Animated dots on wire to show current
  const [animOffset, setAnimOffset] = useState(0);
  useEffect(() => {
    if (electricityOn && current > 0) {
      const id = setInterval(() => {
        setAnimOffset((o) => (o + 3) % 30);
      }, 100);
      return () => clearInterval(id);
    } else {
      setAnimOffset(0);
    }
  }, [electricityOn, current]);

  // Draw wire with moving dots to show current
  const drawWire = (x1, y1, x2, y2, key) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const dotsCount = Math.floor(length / 15);

    const dots = [];
    for (let i = 0; i < dotsCount; i++) {
      const pos = (i * 15 + animOffset) % length;
      const dxDot = x1 + Math.cos(angle) * pos;
      const dyDot = y1 + Math.sin(angle) * pos;
      dots.push(
        <circle
          key={i}
          cx={dxDot}
          cy={dyDot}
          r={4}
          fill="yellow"
          opacity={Math.min(current, 1)}
        />
      );
    }

    return (
      <g key={key}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#1b5e20"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {dots}
      </g>
    );
  };

  // Toggle switch open/close on click
  const onSwitchClick = (id) => {
    setSwitchStates((s) => ({ ...s, [id]: !s[id] }));
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
        backgroundColor: "#e8f5e9",
      }}
    >
      {/* Sidebar with components */}
      <aside
        style={{
          width: 140,
          backgroundColor: "#2e7d32",
          color: "white",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "3px 0 8px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginBottom: 20, fontWeight: "700" }}>
          Components
        </h3>
        {COMPONENTS.map((comp) => (
          <ComponentIcon
            key={comp.id}
            component={comp}
            onDragStart={onDragStart}
          />
        ))}
        <button
          onClick={() => setElectricityOn((on) => !on)}
          style={{
            marginTop: "auto",
            backgroundColor: electricityOn ? "#fbc02d" : "#9e9e9e",
            color: electricityOn ? "#1b5e20" : "#444",
            padding: "10px 14px",
            border: "none",
            borderRadius: 6,
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          }}
          title="Toggle Power"
        >
          {electricityOn ? "Power OFF" : "Power ON"}
        </button>

        <div style={{ marginTop: 12, fontSize: 14, color: "#c5e1a5", textAlign: "center" }}>
          <strong>Instructions:</strong><br />
          Drag components onto canvas.<br />
          Connect terminals by dragging between green dots.<br />
          Click switches to toggle ON/OFF.<br />
          Power ON to test circuit.<br />
          Bulbs glow if circuit complete & switches closed.
        </div>
      </aside>

      {/* Circuit canvas */}
      <main
        style={{ flex: 1, position: "relative" }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onMouseMove={onMouseMove}
        onMouseUp={onSVGMouseUp}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ backgroundColor: "#a5d6a7" }}
        >
          {/* Draw wires */}
          {connections.map(([t1, t2], idx) => {
            const c1 = getComponentByTerminal(t1);
            const c2 = getComponentByTerminal(t2);
            if (!c1 || !c2) return null;

            const t1Idx = parseInt(t1.split("-").pop());
            const t2Idx = parseInt(t2.split("-").pop());

            const x1 = c1.x + (t1Idx === 0 ? -TERMINAL_OFFSET : TERMINAL_OFFSET);
            const y1 = c1.y;
            const x2 = c2.x + (t2Idx === 0 ? -TERMINAL_OFFSET : TERMINAL_OFFSET);
            const y2 = c2.y;

            return drawWire(x1, y1, x2, y2, idx);
          })}

          {/* Draw placed components */}
          {placedComponents.map((comp) => {
            const terminals = getTerminals(comp);
            const isSwitch = comp.id.startsWith("switch");
            return (
              <g
                key={comp.id}
                transform={`translate(${comp.x},${comp.y})`}
                style={{ userSelect: "none", cursor: isSwitch ? "pointer" : "default" }}
                onClick={() => {
                  if (isSwitch) onSwitchClick(comp.id);
                }}
              >
                {/* Component body */}
                {comp.icon}

                {/* Label */}
                <text
                  x="0"
                  y="35"
                  fontWeight="700"
                  fontSize="14"
                  fill="#1b5e20"
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {comp.label}
                </text>

                {/* Terminals */}
                {terminals.map((termId, idx) => (
                  <Terminal
                    key={termId}
                    x={idx === 0 ? -TERMINAL_OFFSET : TERMINAL_OFFSET}
                    y={0}
                    terminalId={termId}
                    onConnectStart={onTerminalMouseDown}
                    onConnectEnd={onTerminalMouseUp}
                    isHovered={hoveredTerminal === termId}
                    onMouseEnter={onTerminalMouseEnter}
                    onMouseLeave={onTerminalMouseLeave}
                  />
                ))}

                {/* Bulb glow if current flowing */}
                {comp.id.startsWith("bulb") && current > 0 && (
                  <circle
                    cx="0"
                    cy="0"
                    r="22"
                    fill="yellow"
                    opacity={Math.min(current, 1)}
                    style={{ filter: "blur(6px)" }}
                  />
                )}

                {/* Switch visual state */}
                {isSwitch && (
                  <text
                    x="0"
                    y="-20"
                    fontWeight="700"
                    fontSize="12"
                    fill={switchStates[comp.id] ? "#2e7d32" : "#b71c1c"}
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {switchStates[comp.id] ? "ON" : "OFF"}
                  </text>
                )}
              </g>
            );
          })}

          {/* Temporary wire line while connecting */}
          {connectingTerminal && (() => {
            const parts = connectingTerminal.split("-");
            const compId = parts.slice(0, -1).join("-");
            const termIdx = parseInt(parts[parts.length - 1]);
            const comp = placedComponents.find((c) => c.id === compId);
            if (!comp) return null;
            const x1 = comp.x + (termIdx === 0 ? -TERMINAL_OFFSET : TERMINAL_OFFSET);
            const y1 = comp.y;
            const x2 = mousePos.x;
            const y2 = mousePos.y;

            return (
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#1b5e20"
                strokeWidth={3}
                strokeDasharray="8 4"
                pointerEvents="none"
              />
            );
          })()}
        </svg>
      </main>
    </div>
  );
};

export default ElectricityLab;
