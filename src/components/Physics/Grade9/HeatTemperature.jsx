import React, { useState, useEffect, useRef } from "react";

const HeatTemperature = () => {
  const materials = {
    Water: 4186,
    Aluminum: 900,
    Copper: 385,
    Iron: 450,
  };

  const [material, setMaterial] = useState("Water");
  const [mass, setMass] = useState(1); // kg
  const [initialTemp, setInitialTemp] = useState(20); // °C
  const [temperature, setTemperature] = useState(20);
  const [heatPower, setHeatPower] = useState(50); // Watts (J/s)
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);
  const lastUpdateRef = useRef(null);

  useEffect(() => {
    setTemperature(initialTemp);
    setElapsedSeconds(0);
    setIsRunning(false);
  }, [initialTemp, material]);

  useEffect(() => {
    if (isRunning) {
      lastUpdateRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const dt = (now - lastUpdateRef.current) / 1000;
        lastUpdateRef.current = now;

        setElapsedSeconds((prev) => prev + dt);

        setTemperature((temp) => {
          const c = materials[material];
          const deltaT = (heatPower * dt) / (mass * c);
          const newTemp = temp + deltaT;
          return newTemp >= 100 ? 100 : newTemp;
        });
      }, 50);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, heatPower, mass, material]);

  const stopHeating = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTemperature(initialTemp);
    setElapsedSeconds(0);
  };

  // Format elapsed seconds into HH:MM:SS
  const formatTime = (secs) => {
    const total = Math.floor(secs);
    const h = Math.floor(total / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((total % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Thermometer height for 0-100°C mapped to 200px max height
  const thermometerHeight = Math.min(Math.max((temperature / 100) * 200, 0), 200);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 600,
        margin: "30px auto",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        backgroundColor: "#fefefe",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Heat and Temperature Lab Ethiopia
      </h1>

      <div
        style={{
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 25,
        }}
      >
        <label style={{ minWidth: 120 }}>
          Material:
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            style={{ width: "100%", padding: 6, marginTop: 6 }}
          >
            {Object.keys(materials).map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>
        </label>

        <label style={{ minWidth: 120 }}>
          Mass (kg):
          <input
            type="number"
            min="0.1"
            max="10"
            step="0.1"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            style={{ width: "100%", padding: 6, marginTop: 6 }}
          />
        </label>

        <label style={{ minWidth: 160 }}>
          Initial Temperature (°C):
          <input
            type="number"
            min="-50"
            max="100"
            step="1"
            value={initialTemp}
            onChange={(e) => setInitialTemp(Number(e.target.value))}
            style={{ width: "100%", padding: 6, marginTop: 6 }}
            disabled={isRunning}
          />
        </label>

        <label style={{ minWidth: 160 }}>
          Heating Power (Watts):
          <input
            type="number"
            min="10"
            max="500"
            step="10"
            value={heatPower}
            onChange={(e) => setHeatPower(Number(e.target.value))}
            style={{ width: "100%", padding: 6, marginTop: 6 }}
          />
        </label>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 40,
          marginBottom: 30,
          position: "relative",
          height: 240,
          width: 150,
          marginLeft: "auto",
          marginRight: "auto",
          border: "2px solid #444",
          borderRadius: 20,
          backgroundColor: "#e9f0f7",
          boxShadow: "inset 0 0 12px #a0b8d8",
          paddingBottom: 20,
        }}
      >
        {/* Thermometer mercury */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: thermometerHeight,
            background:
              "linear-gradient(180deg, #ff4e50 0%, #f9d423 100%)",
            borderRadius: 30,
            transition: "height 0.3s ease",
            boxShadow: "0 0 10px #ff6347",
          }}
        />
        {/* Bulb */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 80,
            background:
              "radial-gradient(circle at center, #ff4e50, #b22222)",
            borderRadius: "50%",
            boxShadow: "0 0 20px #ff6347",
          }}
        />

        {/* Temperature text */}
        <div
          style={{
            position: "absolute",
            bottom: 110,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 26,
            fontWeight: "bold",
            color: "#b22222",
            userSelect: "none",
            textShadow: "0 0 6px #ff6347",
          }}
        >
          {temperature.toFixed(2)} °C
        </div>

        {/* Scale ticks */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 10,
            height: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: 12,
            fontWeight: "600",
            color: "#555",
            userSelect: "none",
          }}
        >
          {[...Array(11)].map((_, i) => (
            <div key={i} style={{ position: "relative", left: 0 }}>
              {i * 10}°C
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 40,
                  width: 15,
                  height: 2,
                  backgroundColor: "#555",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 25 }}>
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            style={{
              padding: "12px 28px",
              fontSize: 16,
              marginRight: 15,
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,123,255,0.4)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Start Heating
          </button>
        ) : (
          <button
            onClick={stopHeating}
            style={{
              padding: "12px 28px",
              fontSize: 16,
              marginRight: 15,
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(220,53,69,0.4)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#a71d2a")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
          >
            Pause Heating
          </button>
        )}
        <button
          onClick={reset}
          style={{
            padding: "12px 28px",
            fontSize: 16,
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(108,117,125,0.4)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#565e64")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
        >
          Reset
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#f1f9ff",
          borderRadius: 10,
          padding: 18,
          color: "#333",
          fontSize: 15,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Elapsed Time: {formatTime(elapsedSeconds)}</h3>
        <h3>Tips:</h3>
        <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
          <li>Heat raises temperature based on material and mass.</li>
          <li>Materials with higher specific heat take longer to heat.</li>
          <li>Heating power controls how fast temperature increases.</li>
          <li>Temperature is limited here to 100°C (water boiling point).</li>
          <li>You can pause and resume heating anytime.</li>
        </ul>
      </div>
    </div>
  );
};

export default HeatTemperature;
