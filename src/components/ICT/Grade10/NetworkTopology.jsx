import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./NetworkTopology.css";

const NetworkTopology = () => {
  // Network devices and types
  const deviceTypes = [
    { id: "router", name: "Router", icon: "🖧", color: "#FF6B6B" },
    { id: "switch", name: "Switch", icon: "🔀", color: "#4ECDC4" },
    { id: "server", name: "Server", icon: "🖥️", color: "#45B7D1" },
    { id: "pc", name: "Workstation", icon: "💻", color: "#A5D8FF" },
    { id: "firewall", name: "Firewall", icon: "🔥", color: "#FFA07A" },
  ];

  // State for network elements
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [connectionStart, setConnectionStart] = useState(null);
  const [networkTraffic, setNetworkTraffic] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("disconnected");
  const [ipConfig, setIpConfig] = useState({});
  const [showIpConfig, setShowIpConfig] = useState(false);

  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Add a new device to the canvas
  const addDevice = (type, x, y) => {
    const newDevice = {
      id: `dev-${Date.now()}`,
      type,
      x,
      y,
      name: `${type}-${devices.length + 1}`,
      interfaces: Array(type === "router" ? 4 : type === "switch" ? 8 : 1).fill(null).map((_, i) => ({
        id: `eth${i}`,
        ip: `192.168.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`,
        connected: false
      }))
    };
    setDevices([...devices, newDevice]);
    
    // Update IP configuration
    setIpConfig(prev => ({
      ...prev,
      [newDevice.id]: newDevice.interfaces.reduce((acc, intf) => {
        acc[intf.id] = intf.ip;
        return acc;
      }, {})
    }));
  };

  // Start connection between devices
  const startConnection = (deviceId, interfaceId) => {
    setConnectionStart({ deviceId, interfaceId });
  };

  // Complete connection between devices
  const completeConnection = (endDeviceId, endInterfaceId) => {
    if (!connectionStart) return;
    
    const startDevice = devices.find(d => d.id === connectionStart.deviceId);
    const endDevice = devices.find(d => d.id === endDeviceId);
    
    if (!startDevice || !endDevice) return;
    
    const newConnection = {
      id: `conn-${Date.now()}`,
      from: connectionStart.deviceId,
      fromInterface: connectionStart.interfaceId,
      to: endDeviceId,
      toInterface: endInterfaceId,
      status: "connected",
      bandwidth: "1Gbps"
    };
    
    setConnections([...connections, newConnection]);
    
    // Update device interfaces
    setDevices(devices.map(device => {
      if (device.id === connectionStart.deviceId) {
        return {
          ...device,
          interfaces: device.interfaces.map(intf => 
            intf.id === connectionStart.interfaceId ? { ...intf, connected: true } : intf
          )
        };
      }
      if (device.id === endDeviceId) {
        return {
          ...device,
          interfaces: device.interfaces.map(intf => 
            intf.id === endInterfaceId ? { ...intf, connected: true } : intf
          )
        };
      }
      return device;
    }));
    
    setConnectionStart(null);
  };

  // Handle canvas click
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool && selectedTool.startsWith("device:")) {
      const deviceType = selectedTool.split(":")[1];
      addDevice(deviceType, x, y);
      return;
    }

    // Check if clicking on a device
    const clickedDevice = devices.find(device => {
      return Math.sqrt((device.x - x) ** 2 + (device.y - y) ** 2) < 30;
    });

    if (clickedDevice) {
      if (selectedTool === "select") {
        setSelectedDevice(clickedDevice);
      } else if (selectedTool === "connect") {
        if (!connectionStart) {
          // Find closest interface
          const interfaceId = clickedDevice.interfaces.find(intf => !intf.connected)?.id;
          if (interfaceId) {
            startConnection(clickedDevice.id, interfaceId);
          }
        } else {
          const interfaceId = clickedDevice.interfaces.find(intf => !intf.connected)?.id;
          if (interfaceId && connectionStart.deviceId !== clickedDevice.id) {
            completeConnection(clickedDevice.id, interfaceId);
          }
        }
      } else if (selectedTool === "delete") {
        setDevices(devices.filter(d => d.id !== clickedDevice.id));
        setConnections(connections.filter(conn => 
          conn.from !== clickedDevice.id && conn.to !== clickedDevice.id
        ));
      }
    } else {
      setSelectedDevice(null);
    }
  };

  // Handle mouse movement for connection drawing
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Simulate network traffic
  useEffect(() => {
    if (!isSimulating) return;

    const trafficInterval = setInterval(() => {
      if (connections.length === 0 || devices.length < 2) return;

      const activeDevices = devices.filter(d => 
        d.interfaces.some(intf => intf.connected)
      );
      if (activeDevices.length < 2) return;

      const fromDevice = activeDevices[Math.floor(Math.random() * activeDevices.length)];
      let toDevice;
      do {
        toDevice = activeDevices[Math.floor(Math.random() * activeDevices.length)];
      } while (toDevice.id === fromDevice.id);

      const newTraffic = {
        id: `traffic-${Date.now()}`,
        from: fromDevice.id,
        to: toDevice.id,
        timestamp: new Date().toLocaleTimeString(),
        protocol: ["HTTP", "HTTPS", "FTP", "SSH", "DNS"][Math.floor(Math.random() * 5)],
        size: `${Math.floor(Math.random() * 1500) + 100} bytes`,
        status: "transmitting"
      };

      setNetworkTraffic(prev => [newTraffic, ...prev.slice(0, 19)]);
    }, 1000);

    return () => clearInterval(trafficInterval);
  }, [isSimulating, devices, connections]);

  // Check network connectivity
  useEffect(() => {
    if (connections.length > 0) {
      setNetworkStatus("connected");
    } else {
      setNetworkStatus("disconnected");
    }
  }, [connections]);

  // Draw the network topology
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    connections.forEach(conn => {
      const fromDevice = devices.find(d => d.id === conn.from);
      const toDevice = devices.find(d => d.id === conn.to);
      
      if (!fromDevice || !toDevice) return;
      
      ctx.beginPath();
      ctx.moveTo(fromDevice.x, fromDevice.y);
      ctx.lineTo(toDevice.x, toDevice.y);
      ctx.strokeStyle = "#4CAF50";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw connection label
      ctx.fillStyle = "#333";
      ctx.font = "10px Arial";
      ctx.fillText(
        conn.bandwidth,
        (fromDevice.x + toDevice.x) / 2,
        (fromDevice.y + toDevice.y) / 2
      );
    });
    
    // Draw pending connection
    if (connectionStart) {
      const fromDevice = devices.find(d => d.id === connectionStart.deviceId);
      if (fromDevice) {
        ctx.beginPath();
        ctx.moveTo(fromDevice.x, fromDevice.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.strokeStyle = "#FF9800";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    
    // Draw devices
    devices.forEach(device => {
      const deviceType = deviceTypes.find(dt => dt.id === device.type);
      
      // Draw device circle
      ctx.beginPath();
      ctx.arc(device.x, device.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = deviceType ? deviceType.color : "#999";
      ctx.fill();
      ctx.strokeStyle = selectedDevice?.id === device.id ? "#FFD700" : "#333";
      ctx.lineWidth = selectedDevice?.id === device.id ? 3 : 1;
      ctx.stroke();
      
      // Draw device icon
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(deviceType?.icon || "?", device.x, device.y);
      
      // Draw device name
      ctx.font = "10px Arial";
      ctx.fillStyle = "#333";
      ctx.fillText(device.name, device.x, device.y + 40);
    });
  }, [devices, connections, connectionStart, selectedDevice, mousePos]);

  // Start/stop simulation
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
    if (!isSimulating) {
      setNetworkTraffic([]);
    }
  };

  // Clear the entire network
  const clearNetwork = () => {
    setDevices([]);
    setConnections([]);
    setNetworkTraffic([]);
    setIsSimulating(false);
    setSelectedDevice(null);
  };

  return (
    <div className="network-topology-builder">
      <h1>Network Topology Builder</h1>
      
      <div className="builder-container">
        <div className="toolbar">
          <h3>Tools</h3>
          <button
            className={selectedTool === "select" ? "active" : ""}
            onClick={() => setSelectedTool("select")}
          >
            Select
          </button>
          
          <button
            className={selectedTool === "connect" ? "active" : ""}
            onClick={() => setSelectedTool("connect")}
          >
            Connect
          </button>
          
          <button
            className={selectedTool === "delete" ? "active" : ""}
            onClick={() => setSelectedTool("delete")}
          >
            Delete
          </button>
          
          <div className="device-tools">
            <h4>Devices</h4>
            {deviceTypes.map(device => (
              <button
                key={device.id}
                className={selectedTool === `device:${device.id}` ? "active" : ""}
                onClick={() => setSelectedTool(`device:${device.id}`)}
                style={{ backgroundColor: device.color }}
              >
                {device.icon} {device.name}
              </button>
            ))}
          </div>
          
          <div className="simulation-controls">
            <h4>Simulation</h4>
            <button
              onClick={toggleSimulation}
              className={isSimulating ? "stop" : "start"}
            >
              {isSimulating ? "Stop Simulation" : "Start Simulation"}
            </button>
            <button onClick={clearNetwork}>Clear Network</button>
          </div>
          
          <div className="network-status">
            <h4>Network Status</h4>
            <div className={`status-indicator ${networkStatus}`}>
              {networkStatus.toUpperCase()}
            </div>
            <div>Devices: {devices.length}</div>
            <div>Connections: {connections.length}</div>
          </div>
        </div>
        
        <div className="workspace">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
          />
        </div>
        
        <div className="panels">
          <div className="device-panel">
            <h3>Device Details</h3>
            {selectedDevice ? (
              <div className="device-info">
                <h4>{selectedDevice.name}</h4>
                <p>Type: {selectedDevice.type}</p>
                
                <div className="interfaces">
                  <h5>Interfaces:</h5>
                  <ul>
                    {selectedDevice.interfaces.map(intf => (
                      <li key={intf.id} className={intf.connected ? "connected" : ""}>
                        {intf.id}: {intf.ip}
                        {intf.connected && " (Connected)"}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button onClick={() => setShowIpConfig(!showIpConfig)}>
                  {showIpConfig ? "Hide IP Config" : "Show Full IP Config"}
                </button>
                
                {showIpConfig && (
                  <div className="ip-config">
                    <h5>IP Configuration:</h5>
                    <pre>{JSON.stringify(ipConfig[selectedDevice.id], null, 2)}</pre>
                  </div>
                )}
              </div>
            ) : (
              <p>Select a device to view details</p>
            )}
          </div>
          
          <div className="traffic-panel">
            <h3>Network Traffic</h3>
            {isSimulating ? (
              networkTraffic.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Protocol</th>
                      <th>Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {networkTraffic.map(traffic => (
                      <tr key={traffic.id}>
                        <td>{traffic.timestamp}</td>
                        <td>{devices.find(d => d.id === traffic.from)?.name || traffic.from}</td>
                        <td>{devices.find(d => d.id === traffic.to)?.name || traffic.to}</td>
                        <td>{traffic.protocol}</td>
                        <td>{traffic.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No traffic yet. Waiting for network activity...</p>
              )
            ) : (
              <p>Simulation is not running. Start simulation to see traffic.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="learning-resources">
        <h3>Network Topology Learning Resources</h3>
        <ul>
          <li>
            <NavLink to="/network-basics">Network Fundamentals</NavLink>
          </li>
          <li>
            <NavLink to="/topology-types">Types of Network Topologies</NavLink>
          </li>
          <li>
            <NavLink to="/cisco-ccna">Cisco CCNA Study Materials</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkTopology;