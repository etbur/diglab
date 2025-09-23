import React, { useState, useEffect, useRef } from "react";

const Newton = () => {
  // States for Newton's Second Law
  const [mass, setMass] = useState(5); // kg
  const [force, setForce] = useState(10); // N
  const [acceleration, setAcceleration] = useState(force / mass); // m/s²

  // State for Newton's First Law simulation (object at rest / moving)
  const [isMoving, setIsMoving] = useState(false);

  // Animation states for First Law
  const [posFirstLaw, setPosFirstLaw] = useState(0);
  const firstLawRef = useRef();

  // Newton's Third Law simulation — simple force pair display
  const [actionForce, setActionForce] = useState(10);
  const [reactionForce, setReactionForce] = useState(-10);

  // Animate First Law ball movement if isMoving is true
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setPosFirstLaw((pos) => {
        if (!isMoving) return pos;
        let newPos = pos + 2;
        if (newPos > 300) newPos = 0;
        return newPos;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isMoving]);

  // Update acceleration if force or mass changes (Second Law)
  useEffect(() => {
    if (mass > 0) {
      setAcceleration(force / mass);
    } else {
      setAcceleration(0);
    }
  }, [force, mass]);

  // Newton's Third Law forces sync (force and reaction opposite)
  useEffect(() => {
    setReactionForce(-actionForce);
  }, [actionForce]);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0d47a1" }}>
        Newton Lab Ethiopia
      </h1>

      {/* Newton's First Law Section */}
      <section
        style={{
          marginBottom: 50,
          padding: 20,
          backgroundColor: "#e3f2fd",
          borderRadius: 12,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#1976d2" }}>Newton’s First Law (Inertia)</h2>
        <p>
          An object at rest stays at rest and an object in motion stays in motion
          with the same speed and direction unless acted upon by a net external
          force.
        </p>
        <button
          onClick={() => setIsMoving(!isMoving)}
          style={{
            padding: "10px 20px",
            backgroundColor: isMoving ? "#d32f2f" : "#388e3c",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "700",
            marginBottom: 20,
          }}
        >
          {isMoving ? "Stop Motion" : "Start Motion"}
        </button>

        <div
          style={{
            height: 60,
            border: "3px solid #1976d2",
            borderRadius: 30,
            position: "relative",
            backgroundColor: "#bbdefb",
            overflow: "hidden",
          }}
          aria-label="First law object track"
        >
          <div
            style={{
              position: "absolute",
              top: 7,
              left: posFirstLaw,
              width: 46,
              height: 46,
              backgroundColor: "#1565c0",
              borderRadius: "50%",
              boxShadow: "0 0 10px #0d47a1",
              transition: "left 0.05s linear",
            }}
            aria-label="Moving object demonstrating inertia"
          />
        </div>
      </section>

      {/* Newton's Second Law Section */}
      <section
        style={{
          marginBottom: 50,
          padding: 20,
          backgroundColor: "#e8f5e9",
          borderRadius: 12,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#388e3c" }}>Newton’s Second Law (F = m × a)</h2>
        <p>
          The acceleration of an object depends on the net force acting upon it
          and its mass.
        </p>

        <label>
          Mass (kg): {mass.toFixed(1)}
          <input
            type="range"
            min={0.1}
            max={50}
            step={0.1}
            value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            style={{ width: "100%", marginTop: 8 }}
          />
        </label>

        <label style={{ marginTop: 20, display: "block" }}>
          Force (N): {force.toFixed(1)}
          <input
            type="range"
            min={0}
            max={200}
            step={0.5}
            value={force}
            onChange={(e) => setForce(parseFloat(e.target.value))}
            style={{ width: "100%", marginTop: 8 }}
          />
        </label>

        <div
          style={{
            marginTop: 20,
            fontWeight: "700",
            fontSize: 22,
            color: "#2e7d32",
            textAlign: "center",
          }}
        >
          Calculated acceleration: {acceleration.toFixed(2)} m/s²
        </div>

        {/* Visual representation of acceleration */}
        <div
          style={{
            marginTop: 30,
            height: 50,
            width: "100%",
            backgroundColor: "#a5d6a7",
            borderRadius: 10,
            overflow: "hidden",
          }}
          aria-label="Acceleration bar"
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(acceleration * 10, 100)}%`,
              backgroundColor: "#388e3c",
              transition: "width 0.3s",
            }}
          />
        </div>
      </section>

      {/* Newton's Third Law Section */}
      <section
        style={{
          padding: 20,
          backgroundColor: "#fff3e0",
          borderRadius: 12,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#f57c00" }}>Newton’s Third Law (Action & Reaction)</h2>
        <p>
          For every action, there is an equal and opposite reaction.
        </p>

        <label>
          Action Force (N): {actionForce.toFixed(1)}
          <input
            type="range"
            min={-100}
            max={100}
            step={0.5}
            value={actionForce}
            onChange={(e) => setActionForce(parseFloat(e.target.value))}
            style={{ width: "100%", marginTop: 8 }}
          />
        </label>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffe0b2",
              padding: 15,
              borderRadius: 10,
              textAlign: "center",
              boxShadow: "inset 0 0 10px #f57c00",
            }}
          >
            <h4>Action Force</h4>
            <div
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#f57c00",
              }}
            >
              {actionForce.toFixed(1)} N
            </div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffe0b2",
              padding: 15,
              borderRadius: 10,
              textAlign: "center",
              boxShadow: "inset 0 0 10px #f57c00",
            }}
          >
            <h4>Reaction Force</h4>
            <div
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#f57c00",
              }}
            >
              {reactionForce.toFixed(1)} N
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section
        style={{
          marginTop: 40,
          backgroundColor: "#f5f5f5",
          borderRadius: 12,
          padding: 20,
          fontSize: 15,
          lineHeight: 1.6,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Lab Tips:</h3>
        <ul>
          <li>
            <strong>First Law:</strong> Toggle motion to see inertia in action.
          </li>
          <li>
            <strong>Second Law:</strong> Adjust mass and force to calculate acceleration.
          </li>
          <li>
            <strong>Third Law:</strong> Adjust action force to see equal and opposite reaction.
          </li>
          <li>
            Use sliders smoothly for best visual feedback.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Newton;
