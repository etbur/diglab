import React, { useState, useEffect } from "react";

const App = () => {
  // --- MASS CONSERVATION ---
  const [massReactant1, setMassReactant1] = useState(5);
  const [massReactant2, setMassReactant2] = useState(3);
  const [massSystemClosed, setMassSystemClosed] = useState(true);
  const [massReactionProgress, setMassReactionProgress] = useState(false);
  const [massTotal, setMassTotal] = useState(8);
  const [massTimeLeft, setMassTimeLeft] = useState(5);
  const [massDone, setMassDone] = useState(false);

  useEffect(() => {
    let interval;
    if (massReactionProgress && massTimeLeft > 0) {
      interval = setInterval(() => {
        setMassTimeLeft((t) => t - 1);
        if (!massSystemClosed) {
          setMassTotal((prev) => Math.max(prev - 0.4, 0));
        }
      }, 1000);
    } else if (massReactionProgress && massTimeLeft === 0) {
      setMassReactionProgress(false);
      setMassDone(true);
    }
    return () => clearInterval(interval);
  }, [massReactionProgress, massTimeLeft, massSystemClosed]);

  const startMassReaction = () => {
    setMassTotal(massReactant1 + massReactant2);
    setMassTimeLeft(5);
    setMassReactionProgress(true);
    setMassDone(false);
  };

  const resetMass = () => {
    setMassReactant1(5);
    setMassReactant2(3);
    setMassTotal(8);
    setMassSystemClosed(true);
    setMassTimeLeft(5);
    setMassReactionProgress(false);
    setMassDone(false);
  };

  // --- ENERGY CONVERSION ---
  const [energyPosition, setEnergyPosition] = useState(0);
  const [energyMoving, setEnergyMoving] = useState(false);

  useEffect(() => {
    let interval;
    if (energyMoving) {
      interval = setInterval(() => {
        setEnergyPosition((p) => (p >= 100 ? 0 : p + 2));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [energyMoving]);

  // --- MOMENTUM SIMULATION ---
  const [ball1Pos, setBall1Pos] = useState(0);
  const [ball2Pos, setBall2Pos] = useState(100);
  const [ball1Vel, setBall1Vel] = useState(2);
  const [ball2Vel, setBall2Vel] = useState(-1);
  const [momentumRunning, setMomentumRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (momentumRunning) {
      interval = setInterval(() => {
        setBall1Pos((p) => p + ball1Vel);
        setBall2Pos((p) => p + ball2Vel);

        if (ball1Pos + 20 >= ball2Pos) {
          const m1 = 1, m2 = 1;
          const u1 = ball1Vel, u2 = ball2Vel;

          const v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
          const v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);

          setBall1Vel(v1);
          setBall2Vel(v2);
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [momentumRunning, ball1Pos, ball2Pos, ball1Vel, ball2Vel]);

  // --- CHARGE ---
  const [charges, setCharges] = useState(0);

  // --- ANGULAR MOMENTUM ---
  const [armsIn, setArmsIn] = useState(false);

  return (
    <div style={{ fontFamily: "Arial", maxWidth: "900px", margin: "0 auto", padding: 20 }}>
      <h1>🔬 Fundamental Laws of Conservation</h1>

      {/* MASS */}
      <section style={styles.section}>
        <h2>⚖️ Law of Conservation of Mass</h2>
        <p>Total mass remains constant in a closed system during a chemical reaction.</p>
        {!massReactionProgress && !massDone && (
          <>
            <p>Reactant 1: {massReactant1}g</p>
            <p>Reactant 2: {massReactant2}g</p>
            <select value={massSystemClosed ? "closed" : "open"} onChange={(e) => setMassSystemClosed(e.target.value === "closed")}>
              <option value="closed">Closed System</option>
              <option value="open">Open System</option>
            </select>
            <br />
            <button onClick={startMassReaction} style={styles.button}>Start Reaction</button>
          </>
        )}
        {massReactionProgress && (
          <>
            <p>Time: {massTimeLeft}s</p>
            <p>Mass: {massTotal.toFixed(2)}g</p>
            <progress value={5 - massTimeLeft} max="5" />
          </>
        )}
        {massDone && (
          <>
            <p>Final Mass: {massTotal.toFixed(2)}g</p>
            <p>{massTotal.toFixed(2) === "8.00" ? "✅ Mass conserved" : "⚠️ Mass not conserved (open system)"}</p>
            <button onClick={resetMass} style={styles.button}>Reset</button>
          </>
        )}
      </section>

      {/* ENERGY */}
      <section style={styles.section}>
        <h2>🌟 Law of Conservation of Energy</h2>
        <p>Energy cannot be created or destroyed, only transformed.</p>
        <button onClick={() => setEnergyMoving(!energyMoving)} style={styles.button}>
          {energyMoving ? "Pause" : "Start"} Energy Transfer
        </button>
        <div style={styles.energyTrack}>
          <div style={{ ...styles.energyBall, left: `${energyPosition}%`, backgroundColor: energyPosition > 50 ? "orange" : "skyblue" }}>
            {energyPosition > 50 ? "Kinetic" : "Potential"}
          </div>
        </div>
      </section>

      {/* MOMENTUM */}
      <section style={styles.section}>
        <h2>🏃‍♂️ Law of Conservation of Momentum</h2>
        <p>In a closed system, momentum remains constant before and after collisions.</p>
        <button onClick={() => setMomentumRunning(!momentumRunning)} style={styles.button}>
          {momentumRunning ? "Stop" : "Start"} Collision
        </button>
        <div style={styles.momentumTrack}>
          <div style={{ ...styles.ball, left: ball1Pos }}>⚫</div>
          <div style={{ ...styles.ball, left: ball2Pos }}>🔴</div>
        </div>
      </section>

      {/* CHARGE */}
      <section style={styles.section}>
        <h2>⚡ Law of Conservation of Charge</h2>
        <p>Total electric charge remains unchanged in an isolated system.</p>
        <p>Net Charge: {charges}</p>
        <button onClick={() => setCharges((c) => c + 1)} style={styles.button}>+ Add Proton</button>
        <button onClick={() => setCharges((c) => c - 1)} style={styles.button}>- Add Electron</button>
      </section>

      {/* ANGULAR MOMENTUM */}
      <section style={styles.section}>
        <h2>🌀 Conservation of Angular Momentum</h2>
        <p>When arms are pulled in, rotation speed increases (moment of inertia decreases).</p>
        <button onClick={() => setArmsIn(!armsIn)} style={styles.button}>
          {armsIn ? "Extend Arms" : "Pull Arms In"}
        </button>
        <div style={{ ...styles.skater, transform: `rotate(${armsIn ? 30 : 5}deg) scale(${armsIn ? 1.5 : 1})` }}>
          🧍
        </div>
      </section>
    </div>
  );
};

const styles = {
  section: {
    background: "#fff",
    padding: 20,
    margin: "20px 0",
    borderRadius: 8,
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
  },
  button: {
    margin: "10px 5px",
    padding: "8px 16px",
    backgroundColor: "#1e88e5",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  energyTrack: {
    height: 40,
    background: "#e3f2fd",
    marginTop: 10,
    position: "relative",
    borderRadius: 10,
  },
  energyBall: {
    position: "absolute",
    top: 5,
    width: 80,
    height: 30,
    borderRadius: 15,
    textAlign: "center",
    lineHeight: "30px",
    color: "#fff",
    fontWeight: "bold",
  },
  momentumTrack: {
    height: 40,
    position: "relative",
    background: "#eee",
    marginTop: 10,
    borderRadius: 10,
  },
  ball: {
    position: "absolute",
    top: 5,
    width: 20,
    height: 20,
    fontSize: 20,
  },
  skater: {
    marginTop: 20,
    fontSize: 50,
    transition: "all 0.3s ease-in-out",
  },
};

export default App;
