import React, { useState } from "react";

const NetworkingLab = () => {
  // Initial 2 PCs
  const [pcs, setPcs] = useState([
    { id: 1, name: "Computer 1", ip: "192.168.1.10", x: 100, y: 70 },
    { id: 2, name: "Computer 2", ip: "192.168.1.20", x: 500, y: 70 },
  ]);

  const [sourceId, setSourceId] = useState(1);
  const [destId, setDestId] = useState(2);

  const [pinging, setPinging] = useState(false);
  const [log, setLog] = useState([]);
  const [packetPosition, setPacketPosition] = useState(null);
  const [pingResult, setPingResult] = useState(null);

  // Add PC increments by 1 in x coordinate, places next to last PC
  const addPc = () => {
    const newId = pcs.length + 1;
    const lastPc = pcs[pcs.length - 1];
    const newX = lastPc.x + 160;
    setPcs([
      ...pcs,
      {
        id: newId,
        name: `Computer ${newId}`,
        ip: `192.168.1.${newId * 10}`,
        x: newX,
        y: 70,
      },
    ]);
  };

  // Validate IP address format
  const validateIp = (ip) =>
    /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) &&
    ip.split(".").every((n) => +n >= 0 && +n <= 255);

  // Find source and dest PC
  const sourcePc = pcs.find((p) => p.id === Number(sourceId));
  const destPc = pcs.find((p) => p.id === Number(destId));

  // Links between consecutive PCs (like a chain)
  const links = [];
  for (let i = 0; i < pcs.length - 1; i++) {
    links.push({ from: pcs[i].id, to: pcs[i + 1].id });
  }

  // Find path (sequence of PCs) from source to dest for animation
  // For simplicity, assume linear chain and source < dest or vice versa
  const getPathNodes = () => {
    if (!sourcePc || !destPc) return [];
    const sortedPcs = pcs.slice().sort((a, b) => a.x - b.x);
    const sourceIndex = sortedPcs.findIndex((p) => p.id === sourcePc.id);
    const destIndex = sortedPcs.findIndex((p) => p.id === destPc.id);

    if (sourceIndex === -1 || destIndex === -1) return [];

    if (sourceIndex <= destIndex)
      return sortedPcs.slice(sourceIndex, destIndex + 1);
    else return sortedPcs.slice(destIndex, sourceIndex + 1).reverse();
  };

  const pathNodes = getPathNodes();

  // Calculate link distances
  const distances = [];
  let totalLength = 0;
  for (let i = 0; i < pathNodes.length - 1; i++) {
    const dx = pathNodes[i + 1].x - pathNodes[i].x;
    const dy = pathNodes[i + 1].y - pathNodes[i].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    distances.push(dist);
    totalLength += dist;
  }

  // Compute packet (x,y) position along path at given progress (0 to 100)
  const getPacketCoords = (progress) => {
    if (progress === null || pathNodes.length < 2) return null;
    const progressLength = (progress / 100) * totalLength;

    let covered = 0;
    for (let i = 0; i < distances.length; i++) {
      if (covered + distances[i] >= progressLength) {
        const segProgress = (progressLength - covered) / distances[i];
        const x =
          pathNodes[i].x + (pathNodes[i + 1].x - pathNodes[i].x) * segProgress;
        const y =
          pathNodes[i].y + (pathNodes[i + 1].y - pathNodes[i].y) * segProgress;
        return { x, y };
      }
      covered += distances[i];
    }
    // If somehow progress beyond, put at last node
    return { x: pathNodes[pathNodes.length - 1].x, y: pathNodes[pathNodes.length - 1].y };
  };

  const startPing = () => {
    if (!sourcePc || !destPc) {
      alert("Please select both source and destination computers.");
      return;
    }
    if (sourceId === destId) {
      alert("Source and destination must be different computers.");
      return;
    }
    if (!validateIp(sourcePc.ip) || !validateIp(destPc.ip)) {
      alert("Please enter valid IP addresses for selected computers.");
      return;
    }

    setLog((prev) => [
      ...prev,
      `Pinging ${destPc.ip} from ${sourcePc.ip}...`,
    ]);
    setPinging(true);
    setPingResult(null);
    setPacketPosition(0);

    let position = 0;
    const interval = setInterval(() => {
      position += 5;
      setPacketPosition(position);

      if (position >= 100) {
        clearInterval(interval);
        const success = Math.random() > 0.2;
        if (success) {
          setLog((prev) => [
            ...prev,
            `Reply from ${destPc.ip}: bytes=32 time=${Math.floor(
              Math.random() * 100 + 10
            )}ms TTL=64`,
          ]);
          setPingResult("success");
        } else {
          setLog((prev) => [...prev, `Request timed out.`]);
          setPingResult("fail");
        }
        setPinging(false);
        setPacketPosition(null);
      }
    }, 200);
  };

  return (
    <div style={styles.container}>
      <h1>Networking Basics Simulation Lab Ethiopia</h1>
      <p>
        This lab simulates a basic <b>ping</b> between computers on a network.
      </p>

      {/* Controls */}
      <div style={{ display: "flex", gap: 15, marginBottom: 25, flexWrap: "wrap" }}>
        {/* List of PCs with editable IPs */}
        {pcs.map((pc) => (
          <div key={pc.id} style={styles.computerBox}>
            <div style={styles.computerIcon}>🖥️</div>
            <input
              type="text"
              value={pc.ip}
              onChange={(e) => {
                const newIp = e.target.value;
                setPcs((oldPcs) =>
                  oldPcs.map((p) =>
                    p.id === pc.id ? { ...p, ip: newIp } : p
                  )
                );
              }}
              placeholder={`IP for ${pc.name}`}
              style={styles.ipInput}
              disabled={pinging}
            />
            <div>{pc.name}</div>
          </div>
        ))}

        {/* Add PC Button */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <button
            onClick={addPc}
            disabled={pinging}
            style={{ ...styles.button, marginBottom: 10 }}
            title="Add new computer to network"
          >
            + Add PC
          </button>
        </div>
      </div>

      {/* Ping Source/Dest selectors */}
      <div
        style={{
          display: "flex",
          gap: 15,
          marginBottom: 25,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <label>
          Source:
          <select
            value={sourceId}
            onChange={(e) => setSourceId(Number(e.target.value))}
            disabled={pinging}
            style={styles.select}
          >
            {pcs.map((pc) => (
              <option key={pc.id} value={pc.id}>
                {pc.name} ({pc.ip})
              </option>
            ))}
          </select>
        </label>

        <label>
          Destination:
          <select
            value={destId}
            onChange={(e) => setDestId(Number(e.target.value))}
            disabled={pinging}
            style={styles.select}
          >
            {pcs.map((pc) => (
              <option key={pc.id} value={pc.id}>
                {pc.name} ({pc.ip})
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={startPing}
          disabled={pinging}
          style={{
            ...styles.button,
            backgroundColor: pinging ? "#999" : "#2196f3",
            cursor: pinging ? "not-allowed" : "pointer",
            height: 40,
            marginTop: 20,
          }}
        >
          {pinging ? "Pinging..." : "Start Ping"}
        </button>
      </div>

      {/* Log Output */}
      <div style={styles.logBox}>
        <h3>Ping Output:</h3>
        {log.length === 0 && (
          <p style={{ fontStyle: "italic" }}>No logs yet.</p>
        )}
        <ul>
          {log.map((line, i) => (
            <li
              key={i}
              style={{ color: line.includes("timed out") ? "red" : "black" }}
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* Network Topology */}
      <h2>Network Topology</h2>
      <svg
        width={Math.max(620, pcs[pcs.length - 1].x + 80)}  // <-- Fixed here to show all PCs
        height="160"
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          backgroundColor: "#fff",
          display: "block",
          marginBottom: 20,
        }}
      >
        {/* Links */}
        {links.map(({ from, to }, idx) => {
          const fromNode = pcs.find((n) => n.id === from);
          const toNode = pcs.find((n) => n.id === to);
          if (!fromNode || !toNode) return null;

          const isPathLink =
            pathNodes.some((p) => p.id === from) &&
            pathNodes.some((p) => p.id === to);

          return (
            <line
              key={idx}
              x1={fromNode.x + 30}
              y1={fromNode.y + 30}
              x2={toNode.x + 30}
              y2={toNode.y + 30}
              stroke={isPathLink ? "#4caf50" : "#777"}
              strokeWidth={isPathLink ? 6 : 4}
              strokeLinecap="round"
            />
          );
        })}

        {/* Nodes */}
        {pcs.map(({ id, name, ip, x, y }) => (
          <g key={id} transform={`translate(${x},${y})`}>
            <circle
              r="30"
              fill={
                id === sourceId
                  ? "#1e88e5"
                  : id === destId
                  ? "#43a047"
                  : "#2196f3"
              }
              stroke="#222"
              strokeWidth={id === sourceId || id === destId ? 3 : 1}
            />
            <text
              x="0"
              y="10"
              fontSize="30"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ userSelect: "none" }}
            >
              🖥️
            </text>
            <text
              x="0"
              y="70"
              fontSize="14"
              fill="#333"
              textAnchor="middle"
              style={{ userSelect: "none" }}
            >
              {name}
            </text>
            <text
              x="0"
              y="90"
              fontSize="12"
              fill="#555"
              textAnchor="middle"
              style={{ userSelect: "none" }}
            >
              {ip}
            </text>
          </g>
        ))}

        {/* Packet */}
        {packetPosition !== null && (() => {
          const coords = getPacketCoords(packetPosition);
          if (!coords) return null;
          return (
            <text
              x={coords.x + 30}
              y={coords.y + 15}
              fontSize="30"
              style={{ userSelect: "none", pointerEvents: "none" }}
              fill={pingResult === "fail" ? "red" : "#4caf50"}
              title={pingResult === "fail" ? "Packet lost" : "Packet sent"}
            >
              📦
            </text>
          );
        })()}
      </svg>

      {/* Explanation */}
      <div style={styles.explanation}>
        <h3>Explanation:</h3>
        <p>
          <b>Ping</b> is a network utility used to test the reachability of a device on a
          network. It sends ICMP packets to the target IP address and waits for a reply.
        </p>
        <p>
          Here, you can add multiple computers with their IP addresses.
          Select a source and destination computer and press <i>Start Ping</i> to simulate.
        </p>
        <p>
          The packet will move along the network topology path between the selected computers.
          You will see if the ping succeeds or fails (timeout).
        </p>
        <p>
          The network topology below visually shows all the computers and their connections.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: "20px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
  },
  computerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 140,
    marginBottom: 10,
  },
  computerIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  ipInput: {
    width: "100%",
    padding: 6,
    fontSize: 14,
    marginBottom: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    textAlign: "center",
  },
  button: {
    padding: "10px 25px",
    fontSize: 16,
    borderRadius: 8,
    color: "white",
    border: "none",
    userSelect: "none",
  },
  logBox: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    maxHeight: 150,
    overflowY: "auto",
    boxShadow: "inset 0 0 5px #ccc",
    marginBottom: 30,
  },
  select: {
    marginLeft: 8,
    padding: 5,
    fontSize: 16,
    borderRadius: 6,
  },
  explanation: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
  },
};

export default NetworkingLab;
