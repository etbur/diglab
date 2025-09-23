import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const StarchTest = () => {
  const [time, setTime] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [colorVisible, setColorVisible] = useState(false);

  // Iodine reacts with starch to turn blue-black after some time
  // We simulate reaction time of about 10 seconds

  useEffect(() => {
    let timer;
    if (isRunning && time < 15) {
      timer = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    if (time >= 10 && !colorVisible) {
      setColorVisible(true);
    }
    if (time >= 15) {
      setIsRunning(false);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time, colorVisible]);

  // Reset function
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setColorVisible(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Starch Test in Plants Lab Ethiopia</h1>

      <section style={{ textAlign: "center", margin: "30px 0" }}>
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          style={{
            padding: "10px 20px",
            marginRight: 10,
            fontSize: 16,
            cursor: isRunning ? "not-allowed" : "pointer",
          }}
        >
          Start Test
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          style={{
            padding: "10px 20px",
            marginRight: 10,
            fontSize: 16,
            cursor: !isRunning ? "not-allowed" : "pointer",
          }}
        >
          Pause
        </button>
        <button onClick={reset} style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer" }}>
          Reset
        </button>
      </section>

      <section style={{ textAlign: "center" }}>
        <div
          style={{
            width: 200,
            height: 200,
            margin: "auto",
            borderRadius: 20,
            backgroundColor: colorVisible ? "#1a237e" : "#f0e68c",
            boxShadow: colorVisible ? "0 0 20px 5px #283593" : "0 0 5px 2px #cdb380",
            transition: "background-color 1s ease, box-shadow 1s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colorVisible ? "#fff" : "#555",
            fontSize: 24,
            fontWeight: "bold",
            userSelect: "none",
          }}
        >
          {colorVisible ? "Blue-Black Color (Positive)" : "Yellowish (Negative)"}
        </div>
        <p style={{ marginTop: 16, fontSize: 18, color: "#444" }}>
          Time elapsed: {time} sec
        </p>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>How It Works</h2>
        <p>
          When iodine solution contacts starch in plant tissues, a blue-black coloration appears.
          This simulation shows the gradual color change representing starch presence.
        </p>
        <ul>
          <li>Press <b>Start Test</b> to begin the iodine-starch reaction.</li>
          <li>Color changes from yellowish to blue-black as starch reacts.</li>
          <li>Pause and Reset controls allow you to manage the simulation.</li>
        </ul>
      </section>

      
    </div>
  );
};

export default StarchTest;
