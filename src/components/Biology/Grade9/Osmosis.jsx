import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Osmosis = () => {
  // States for simulation inputs
  const [externalConcentration, setExternalConcentration] = useState(0.3); // % salt outside (0 = pure water)
  const [initialVolume, setInitialVolume] = useState(100); // initial potato cell volume (arbitrary units)
  const [speed, setSpeed] = useState(1); // simulation speed multiplier

  // States for simulation
  const [volume, setVolume] = useState(initialVolume);
  const [isRunning, setIsRunning] = useState(false);
  const volumeRef = useRef(volume);

  // Update ref for useEffect closure
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Reset volume if initialVolume changes
  useEffect(() => {
    setVolume(initialVolume);
  }, [initialVolume]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Osmosis simplified model:
      // Water moves from low solute concentration to high solute concentration, trying to equalize
      // Here: Water moves OUT if external concentration is higher than internal, else IN
      // Let's assume potato internal concentration fixed at 0.2 (20%)
      const internalConcentration = 0.2;

      const diff = internalConcentration - externalConcentration;

      // Rate of water volume change proportional to concentration difference
      // Positive diff => water moves out, volume decreases
      // Negative diff => water moves in, volume increases

      // scale factor for rate, adjustable by speed
      const rateConstant = 0.5 * speed;

      const deltaV = -rateConstant * diff * 1; // 1 second time step

      let newVolume = volumeRef.current + deltaV;

      // Clamp volume to positive values (no negative volume)
      if (newVolume < 10) newVolume = 10;
      if (newVolume > 200) newVolume = 200;

      setVolume(newVolume);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, externalConcentration, speed]);

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "20px auto",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
        backgroundColor: "#f0f8ff",
        borderRadius: 12,
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Osmosis in Potatoes Lab Ethiopia
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div>
          <label>
            External Solution Concentration (salt %) :
            <input
              type="number"
              min="0"
              max="1"
              step="0.05"
              value={externalConcentration}
              onChange={(e) =>
                setExternalConcentration(Math.min(Math.max(+e.target.value, 0), 1))
              }
              style={{ marginLeft: 10, width: 80 }}
            />
          </label>
          <p style={{ fontSize: 12, color: "#555" }}>
            0 = pure water, 1 = very salty water
          </p>
        </div>

        <div>
          <label>
            Initial Potato Cell Volume:
            <input
              type="number"
              min="10"
              max="200"
              step="1"
              value={initialVolume}
              onChange={(e) =>
                setInitialVolume(Math.min(Math.max(+e.target.value, 10), 200))
              }
              style={{ marginLeft: 10, width: 80 }}
              disabled={isRunning}
            />
          </label>
          <p style={{ fontSize: 12, color: "#555" }}>
            Units arbitrary, represents water volume inside potato cells
          </p>
        </div>

        <div>
          <label>
            Simulation Speed:
            <input
              type="number"
              min="0.1"
              max="5"
              step="0.1"
              value={speed}
              onChange={(e) =>
                setSpeed(Math.min(Math.max(+e.target.value, 0.1), 5))
              }
              style={{ marginLeft: 10, width: 80 }}
            />
          </label>
          <p style={{ fontSize: 12, color: "#555" }}>
            1 = real time, higher = faster simulation
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            padding: "10px 25px",
            fontSize: 18,
            backgroundColor: isRunning ? "#c0392b" : "#27ae60",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {isRunning ? "Pause Simulation" : "Start Simulation"}
        </button>
      </div>

      <div
        style={{
          margin: "30px auto",
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: "#a3d9ff",
          border: "6px solid #2980b9",
          boxShadow: "0 0 20px rgba(41, 128, 185, 0.6) inset",
          position: "relative",
        }}
      >
        {/* Water volume circle inside */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 150,
            height: volume, // height proportional to volume
            backgroundColor: "#3498db",
            borderRadius: "0 0 75px 75px",
            transition: "height 1s ease-out",
          }}
          title={`Potato cell water volume: ${volume.toFixed(1)}`}
        />
      </div>

      <section style={{ marginTop: 40 }}>
        <h2>How the Simulation Works</h2>
        <p>
          Osmosis causes water to move across the potato cell membrane from areas
          of low solute concentration to high solute concentration.
        </p>
        <p>
          Here, the simulation models water volume changes inside potato cells based
          on the difference between internal and external solution concentrations.
        </p>
        <p>
          When external concentration is higher (saltier), water leaves the potato cells,
          shrinking their volume.
          When external concentration is lower, water enters the cells, increasing volume.
        </p>
      </section>

    </div>
  );
};

export default Osmosis;
