import React, { useState, useEffect } from "react";
import "./CyberSecurity.css";

const CyberSecurity = () => {
  // Simulation state
  const [firewallStatus, setFirewallStatus] = useState("active");
  const [threatLevel, setThreatLevel] = useState(0);
  const [packets, setPackets] = useState([]);
  const [encryptionStatus, setEncryptionStatus] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [systems, setSystems] = useState([
    { id: 1, name: "Web Server", status: "secure" },
    { id: 2, name: "Database", status: "secure" },
    { id: 3, name: "Email Server", status: "secure" }
  ]);

  // Simulate network traffic and threats
  useEffect(() => {
    if (!simulationRunning) return;

    const packetInterval = setInterval(() => {
      const packetTypes = ["normal", "malicious", "suspicious"];
      const packetType = packetTypes[Math.floor(Math.random() * 3)];
      
      const newPacket = {
        id: Date.now(),
        type: packetType,
        source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        destination: `10.0.0.${Math.floor(Math.random() * 10)}`,
        blocked: firewallStatus === "active" && (packetType !== "normal" && Math.random() > 0.3),
        timestamp: new Date().toLocaleTimeString()
      };

      setPackets(prev => [newPacket, ...prev.slice(0, 14)]);
      
      // Handle threats
      if (newPacket.type !== "normal" && !newPacket.blocked) {
        const threatIncrease = newPacket.type === "malicious" ? 10 : 5;
        setThreatLevel(prev => Math.min(prev + threatIncrease, 100));
        
        // 30% chance of system compromise
        if (Math.random() > 0.7) {
          const randomSystem = Math.floor(Math.random() * systems.length);
          setSystems(prev => prev.map((sys, idx) => 
            idx === randomSystem ? {...sys, status: "compromised"} : sys
          ));
          
          setAlerts(prev => [{
            id: Date.now(),
            message: `ALERT: ${systems[randomSystem].name} potentially compromised!`,
            severity: "high"
          }, ...prev.slice(0, 4)]);
        }
      }
    }, 1500);

    // Random security events
    const eventInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const events = [
          "Brute force attempt detected",
          "Port scanning detected",
          "Suspicious login attempt",
          "Unusual data transfer detected"
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        setAlerts(prev => [{
          id: Date.now(),
          message: `WARNING: ${randomEvent}`,
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)]
        }, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => {
      clearInterval(packetInterval);
      clearInterval(eventInterval);
    };
  }, [simulationRunning, firewallStatus, systems]);

  // Auto-recover systems when firewall is active
  useEffect(() => {
    if (firewallStatus === "active" && simulationRunning) {
      const recoverInterval = setInterval(() => {
        setSystems(prev => prev.map(sys => 
          sys.status === "compromised" && Math.random() > 0.7 
            ? {...sys, status: "recovering"} 
            : sys
        ));
      }, 5000);

      return () => clearInterval(recoverInterval);
    }
  }, [firewallStatus, simulationRunning]);

  const toggleFirewall = () => {
    setFirewallStatus(prev => (prev === "active" ? "inactive" : "active"));
  };

  const toggleEncryption = () => {
    setEncryptionStatus(prev => !prev);
    if (!encryptionStatus) {
      setThreatLevel(prev => Math.max(prev - 10, 0));
    }
  };

  const startSimulation = () => {
    setSimulationRunning(true);
    setPackets([]);
    setAlerts([]);
    setThreatLevel(0);
    setSystems(systems.map(sys => ({...sys, status: "secure"})));
  };

  const stopSimulation = () => {
    setSimulationRunning(false);
  };

  const handleSystemAction = (id, action) => {
    setSystems(prev => prev.map(sys => 
      sys.id === id ? {...sys, status: action} : sys
    ));
  };

  return (
    <div className="cyber-security-simulation">
      <header>
        <h1>Real-Time Cyber Security Simulation</h1>
        <div className="controls">
          <button onClick={startSimulation} disabled={simulationRunning}>
            Start Simulation
          </button>
          <button onClick={stopSimulation} disabled={!simulationRunning}>
            Stop Simulation
          </button>
          <button onClick={toggleFirewall} className={firewallStatus}>
            Firewall: {firewallStatus.toUpperCase()}
          </button>
          <button onClick={toggleEncryption} className={encryptionStatus ? "active" : ""}>
            Encryption: {encryptionStatus ? "ON" : "OFF"}
          </button>
        </div>
      </header>

      <div className="dashboard">
        <div className="status-panel">
          <div className="status-item">
            <h3>Threat Level</h3>
            <div className={`threat-meter ${threatLevel > 70 ? "high" : threatLevel > 30 ? "medium" : "low"}`}>
              <div style={{ width: `${threatLevel}%` }}></div>
              <span>{threatLevel}%</span>
            </div>
          </div>

          <div className="status-item">
            <h3>System Status</h3>
            <div className="systems">
              {systems.map(sys => (
                <div key={sys.id} className={`system ${sys.status}`}>
                  <span>{sys.name}</span>
                  <span className="status">{sys.status}</span>
                  {sys.status === "compromised" && simulationRunning && (
                    <button onClick={() => handleSystemAction(sys.id, "isolated")}>
                      Isolate
                    </button>
                  )}
                  {sys.status === "isolated" && simulationRunning && (
                    <button onClick={() => handleSystemAction(sys.id, "recovering")}>
                      Recover
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="traffic-panel">
          <h2>Network Traffic Monitor</h2>
          <div className="packet-list">
            {packets.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {packets.map(pkt => (
                    <tr key={pkt.id} className={`${pkt.type} ${pkt.blocked ? "blocked" : ""}`}>
                      <td>{pkt.timestamp}</td>
                      <td>{pkt.source}</td>
                      <td>{pkt.destination}</td>
                      <td>{pkt.type}</td>
                      <td>{pkt.blocked ? "BLOCKED" : "ALLOWED"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <p>No network traffic detected</p>
                <p>Start the simulation to monitor traffic</p>
              </div>
            )}
          </div>
        </div>

        <div className="alert-panel">
          <h2>Security Alerts</h2>
          <div className="alerts">
            {alerts.length > 0 ? (
              <ul>
                {alerts.map(alert => (
                  <li key={alert.id} className={alert.severity}>
                    <span className="timestamp">{new Date(alert.id).toLocaleTimeString()}</span>
                    <span className="message">{alert.message}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <p>No security alerts</p>
                <p>All systems normal</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="stats-panel">
        <div className="stat">
          <h3>Packets Blocked</h3>
          <p>{packets.filter(p => p.blocked).length}</p>
        </div>
        <div className="stat">
          <h3>Threats Detected</h3>
          <p>{packets.filter(p => p.type !== "normal").length}</p>
        </div>
        <div className="stat">
          <h3>Systems Secured</h3>
          <p>{systems.filter(s => s.status === "secure").length}/{systems.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CyberSecurity;