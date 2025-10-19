import React, { useState, useEffect, useRef } from "react";

const WEP = () => {
  const trackLengthPx = 400; // pixel length for full distance
  const frameRate = 60; // animation frames per second

  const [force, setForce] = useState(10);
  const [distance, setDistance] = useState(5);
  const [time, setTime] = useState(2);
  const [mass, setMass] = useState(2);

  const [workDone, setWorkDone] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [kineticEnergy, setKineticEnergy] = useState(0);
  const [power, setPower] = useState(0);

  const [animPos, setAnimPos] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const animRef = useRef();

  // Calculate physics each time inputs change
  useEffect(() => {
    const w = force * distance;
    const v = time > 0 ? distance / time : 0;
    const ke = 0.5 * mass * v * v;
    const p = time > 0 ? w / time : 0;

    setWorkDone(w);
    setVelocity(v);
    setKineticEnergy(ke);
    setPower(p);
    setAnimPos(0);
    setElapsed(0);
  }, [force, distance, time, mass]);

  // Animate block
  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    const startTime = performance.now();

    const animate = (now) => {
      const elapsedSec = (now - startTime) / 1000;
      const frac = Math.min(elapsedSec / time, 1);
      setElapsed(elapsedSec);
      setAnimPos(frac * trackLengthPx);

      if (frac < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [force, distance, time, mass]);

  const fmt = (v) => v.toFixed(2);

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Segoe UI", padding: 20 }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Work, Energy & Power Lab Ethiopia</h1>

      {/* Controls */}
      <div style={{ marginBottom: 30 }}>
        {[
          ["Force (N)", force, setForce, 0, 100],
          ["Distance (m)", distance, setDistance, 0, 20],
          ["Time (s)", time, setTime, 0.5, 10],
          ["Mass (kg)", mass, setMass, 0.1, 20],
        ].map(([label, val, setter, min, max]) => (
          <label key={label} style={{ display: "block", margin: "15px 0", fontWeight: "600" }}>
            {label}: {fmt(val)}
            <input
              type="range"
              min={min}
              max={max}
              step={(max - min) / 200}
              value={val}
              onChange={(e) => setter(parseFloat(e.target.value))}
              style={{ width: "100%", marginTop: 8 }}
            />
          </label>
        ))}
      </div>

      {/* Animation Track */}
      <div style={{ position: "relative", width: trackLengthPx, height: 60, margin: "auto", background: "#eee", borderRadius: 30, border: "2px solid #aaa" }}>
        <div style={{
          position: "absolute", top: 7, left: animPos,
          width: 46, height: 46,
          background: "#1976d2", borderRadius: 8,
          boxShadow: "0 0 6px #0d47a1"
        }} />
      </div>

      <div style={{ marginTop: 20, fontSize: 18, textAlign: "center" }}>
        Elapsed Time: {fmt(Math.min(elapsed, time))} / {fmt(time)} s
      </div>

      {/* Results */}
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <div style={{ margin: "15px 0" }}><strong>Work Done:</strong> {fmt(workDone)} J</div>
        <div style={{ margin: "15px 0" }}><strong>Velocity:</strong> {fmt(velocity)} m/s</div>
        <div style={{ margin: "15px 0" }}><strong>Kinetic Energy:</strong> {fmt(kineticEnergy)} J</div>
        <div style={{ margin: "15px 0" }}><strong>Power:</strong> {fmt(power)} W</div>
      </div>

      {/* Energy Bars */}
      <div style={{ marginTop: 30 }}>
        <div>
          Work
          <div style={{ height: 12, background: "#d0ecf8", width: `${Math.min(workDone*2, 100)}%` }} />
        </div>
        <div>
          KE
          <div style={{ height: 12, background: "#b8e0a5", width: `${Math.min(kineticEnergy*2, 100)}%` }} />
        </div>
        <div>
          Power
          <div style={{ height: 12, background: "#f9d18f", width: `${Math.min(power*2, 100)}%` }} />
        </div>
      </div>

      {/* Explanations */}
      <div style={{ background: "#f0f0f0", padding: 20, marginTop: 40, borderRadius: 8 }}>
        <h3>Concepts:</h3>
        <ul>
          <li>Work = Force × Distance</li>
          <li>Velocity = Distance ÷ Time</li>
          <li>Kinetic Energy = ½ × mass × velocity²</li>
          <li>Power = Work ÷ Time</li>
          <li>The cube moves under constant force—you see real-time position over time.</li>
        </ul>
      </div>
    </div>
  );
};

export default WEP;
