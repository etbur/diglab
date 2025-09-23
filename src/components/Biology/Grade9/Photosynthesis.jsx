import React, { useState, useEffect, useRef } from "react";

const Photosynthesis = () => {
  const [lightIntensity, setLightIntensity] = useState(50); // 0-100
  const [oxygen, setOxygen] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [floating, setFloating] = useState(false);
  const intervalRef = useRef(null);

  // Oxygen threshold when disk starts floating
  const FLOAT_THRESHOLD = 100;

  useEffect(() => {
    // Reset simulation on light intensity change
    setOxygen(0);
    setElapsed(0);
    setFloating(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start simulation timer - updates every 100ms
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 0.1);
      setOxygen((prev) => {
        // Oxygen increases proportionally to light intensity
        const increase = (lightIntensity / 100) * 5 * 0.1; // rate per 0.1s
        const newOxygen = prev + increase;
        if (newOxygen >= FLOAT_THRESHOLD) {
          setFloating(true);
          clearInterval(intervalRef.current);
        }
        return Math.min(newOxygen, FLOAT_THRESHOLD);
      });
    }, 100);

    // Cleanup
    return () => clearInterval(intervalRef.current);
  }, [lightIntensity]);

  // Calculate disk position - floats up when oxygen reaches threshold
  const diskPosition = floating
    ? 300 - ((oxygen / FLOAT_THRESHOLD) * 300) // moves from bottom 300px up to 0
    : 300;

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 500,
        margin: "auto",
        padding: 20,
        textAlign: "center",
      }}
    >
      <h1>Photosynthesis (Leaf Disk Experiment) Lab Ethiopia</h1>

      <label htmlFor="lightRange" style={{ fontWeight: "bold" }}>
        Light Intensity: {lightIntensity}%
      </label>
      <input
        id="lightRange"
        type="range"
        min={0}
        max={100}
        value={lightIntensity}
        onChange={(e) => setLightIntensity(+e.target.value)}
        style={{ width: "100%", margin: "10px 0 20px" }}
      />

      <div
        style={{
          position: "relative",
          width: 150,
          height: 350,
          margin: "auto",
          border: "3px solid #0b3d91",
          borderRadius: 20,
          background:
            "linear-gradient(to top, #cceeff 0%, #99ccff 60%, #66aaff 100%)",
          overflow: "hidden",
        }}
      >
        {/* Leaf disk */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#2e8b57",
            border: "3px solid #1f5c38",
            boxShadow: "0 0 15px 5px rgba(46,139,87,0.4)",
            transform: `translateX(-50%) translateY(${diskPosition}px)`,
            transition: "transform 0.3s ease-out",
          }}
          title="Leaf Disk"
        ></div>
      </div>

      <p style={{ marginTop: 20 }}>
        <strong>Elapsed time:</strong> {elapsed.toFixed(1)} seconds
      </p>
      <p>
        <strong>Oxygen concentration:</strong> {oxygen.toFixed(1)} units
      </p>

      {floating && (
        <p
          style={{
            marginTop: 20,
            fontWeight: "bold",
            fontSize: 18,
            color: "#2e8b57",
          }}
        >
          Leaf disk is floating! Photosynthesis producing oxygen bubbles.
        </p>
      )}

      <section style={{ marginTop: 40, textAlign: "left" }}>
        <h2>How This Works</h2>
        <ul>
          <li>
            Increasing <b>light intensity</b> speeds up photosynthesis.
          </li>
          <li>
            Oxygen accumulates in leaf disks causing them to become buoyant and
            float.
          </li>
          <li>
            This simulates the oxygen bubble production and buoyancy observed in
            real leaf disk experiments.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Photosynthesis;
