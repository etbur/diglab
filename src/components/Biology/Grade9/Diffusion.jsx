import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Diffusion = () => {
  const [iodineConc, setIodineConc] = useState(5); // outside concentration mg/L
  const [bagConc, setBagConc] = useState(0);       // inside starch bag initial mg/L
  const [diffRate, setDiffRate] = useState(0.5);   // diffusion rate constant
  const [timeMax, setTimeMax] = useState(60);      // simulation duration in minutes
  const [data, setData] = useState([]);
  const [colorTime, setColorTime] = useState(null);

  useEffect(() => {
    // Simulate discrete time steps
    const dt = 1;
    let t = 0;
    let C_out = iodineConc;
    let C_in = bagConc;
    const arr = [];

    while (t <= timeMax) {
      arr.push({ t, C_in, C_out });
      const dC = diffRate * (C_out - C_in) * dt;
      C_in += dC;
      t += dt;
      if (!colorTime && C_in >= 1) {
        setColorTime(t); // threshold for visible starch–iodine coloration
      }
    }

    setData(arr);
  }, [iodineConc, bagConc, diffRate, timeMax]);

  return (
    <div style={{ maxWidth: 720, margin: "auto", padding: 20, fontFamily: "Segoe UI" }}>
      <h1 style={{ textAlign: "center" }}>Diffusion (Iodine‑Starch Test) Lab Ethiopia</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label>Outside Iodine Concentration (mg/L):</label>
          <input type="number" value={iodineConc} onChange={e => setIodineConc(+e.target.value)} />
        </div>
        <div>
          <label>Initial Inside Starch Bag (mg/L):</label>
          <input type="number" value={bagConc} onChange={e => setBagConc(+e.target.value)} />
        </div>
        <div>
          <label>Diffusion Rate Constant:</label>
          <input type="number" step="0.1" value={diffRate} onChange={e => setDiffRate(+e.target.value)} />
        </div>
        <div>
          <label>Simulation Duration (min):</label>
          <input type="number" value={timeMax} onChange={e => setTimeMax(+e.target.value)} />
        </div>
      </div>

      <button onClick={() => setData([])} style={{ marginTop: 18, padding: "10px 20px", fontSize: 16 }}>
        Run Simulation
      </button>

      {data.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2>Concentration over Time</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><th>Minute</th><th>Iodine in Bag (mg/L)</th></tr>
            </thead>
            <tbody>
              {data.map((pt, i) => (
                <tr key={i}>
                  <td>{pt.t}</td>
                  <td>{pt.C_in.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {colorTime && (
            <p style={{ marginTop: 16, fontWeight: "bold", color: "#2E7D32" }}>
              Visible blue-black color appears at minute ≈ {Math.round(colorTime)}
            </p>
          )}
        </div>
      )}

      <section style={{ marginTop: 24 }}>
        <h2>How it works</h2>
        <p>
          When iodine diffuses into a starch solution, it reacts to form a blue-black complex.
          This simulation models diffusion proportional to concentration difference using:
        </p>
        <pre>
{`dC_in/dt = k (C_out - C_in)`}
        </pre>
        <p>
          As C_in rises past a threshold (~1 mg/L), color becomes visible.
          The table displays iodine concentration inside the bag minute by minute.
        </p>
      </section>

    </div>
  );
};

export default Diffusion;
