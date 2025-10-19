import React, { useState, useEffect, useRef } from "react";

// Unit definitions for length, mass, volume
const lengthUnits = {
  meter: { label: "Meter (m)", factor: 1 },
  centimeter: { label: "Centimeter (cm)", factor: 100 },
  inch: { label: "Inch (in)", factor: 39.3701 },
  foot: { label: "Foot (ft)", factor: 3.28084 },
};

const massUnits = {
  kilogram: { label: "Kilogram (kg)", factor: 1 },
  gram: { label: "Gram (g)", factor: 1000 },
  pound: { label: "Pound (lb)", factor: 2.20462 },
  ounce: { label: "Ounce (oz)", factor: 35.274 },
};

const volumeUnits = {
  liter: { label: "Liter (L)", factor: 1 },
  milliliter: { label: "Milliliter (mL)", factor: 1000 },
  gallon: { label: "Gallon (gal)", factor: 0.264172 },
  pint: { label: "Pint (pt)", factor: 2.11338 },
};

const TABS = {
  LENGTH: "Length Measurement",
  MASS: "Mass Measurement",
  FLUID: "Fluid Volume",
  CIRCLE: "Circle Measurement",
};

const MeasurementUnits = () => {
  const [activeTab, setActiveTab] = useState(TABS.LENGTH);

  // =========== LENGTH MEASUREMENT ===========
  const lengthRef = useRef(null);
  const [lengthMeters, setLengthMeters] = useState(1);
  const [lengthUnit, setLengthUnit] = useState("meter");
  const [lengthDragging, setLengthDragging] = useState(false);

  const lengthConverted = (lengthMeters * lengthUnits[lengthUnit].factor).toFixed(2);

  // Length drag handlers
  const onLengthMouseDown = (e) => {
    e.preventDefault();
    setLengthDragging(true);
  };
  const onLengthMouseUp = (e) => {
    e.preventDefault();
    setLengthDragging(false);
  };
  const onLengthMouseMove = (e) => {
    if (!lengthDragging) return;
    if (!lengthRef.current) return;

    const rect = lengthRef.current.getBoundingClientRect();
    let newWidthPx = e.clientX - rect.left;
    if (newWidthPx < 20) newWidthPx = 20;
    if (newWidthPx > rect.width) newWidthPx = rect.width;

    const meterPerPixel = 2 / rect.width; // max 2 meters mapped to container width
    const newLength = newWidthPx * meterPerPixel;

    setLengthMeters(newLength);
  };

  useEffect(() => {
    if (lengthDragging) {
      document.addEventListener("mouseup", onLengthMouseUp);
      document.addEventListener("mousemove", onLengthMouseMove);
    } else {
      document.removeEventListener("mouseup", onLengthMouseUp);
      document.removeEventListener("mousemove", onLengthMouseMove);
    }
    return () => {
      document.removeEventListener("mouseup", onLengthMouseUp);
      document.removeEventListener("mousemove", onLengthMouseMove);
    };
  }, [lengthDragging]);

  // =========== MASS MEASUREMENT ===========
  // Simulate a weight scale with slider for weight in kg (0-150 kg)
  const [massKg, setMassKg] = useState(50);
  const [massUnit, setMassUnit] = useState("kilogram");
  const massConverted = (massKg * massUnits[massUnit].factor).toFixed(2);

  // =========== FLUID VOLUME ===========
  // Adjustable fluid level in container from 0 to 2 liters
  const [volumeLiters, setVolumeLiters] = useState(1);
  const [volumeUnit, setVolumeUnit] = useState("liter");
  const volumeConverted = (volumeLiters * volumeUnits[volumeUnit].factor).toFixed(2);

  // =========== CIRCLE MEASUREMENT ===========
  // Adjustable circle radius in meters (0.1 to 1.5m)
  const [radiusMeters, setRadiusMeters] = useState(0.5);
  const [circleUnit, setCircleUnit] = useState("meter");
  const radiusConverted = (radiusMeters * lengthUnits[circleUnit].factor).toFixed(2);

  const circumference = (2 * Math.PI * radiusMeters);
  const area = (Math.PI * radiusMeters * radiusMeters);

  const circumferenceConverted = (circumference * lengthUnits[circleUnit].factor).toFixed(2);
  const areaConverted = (area * Math.pow(lengthUnits[circleUnit].factor, 2)).toFixed(2);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "30px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        Measurement and Units Lab Ethiopia
      </h1>

      {/* Tabs to select demo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginBottom: 40,
          flexWrap: "wrap",
        }}
      >
        {Object.values(TABS).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              fontWeight: activeTab === tab ? "700" : "500",
              backgroundColor: activeTab === tab ? "#1976d2" : "#e0e0e0",
              color: activeTab === tab ? "white" : "#333",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              minWidth: 160,
              transition: "background-color 0.3s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- LENGTH MEASUREMENT --- */}
      {activeTab === TABS.LENGTH && (
        <div>
          <h2>Length Measurement</h2>
          <div
            ref={lengthRef}
            style={{
              position: "relative",
              height: 150,
              border: "2px solid #333",
              borderRadius: 12,
              backgroundColor: "#e3f2fd",
              marginBottom: 40,
              overflow: "hidden",
              userSelect: lengthDragging ? "none" : "auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 20,
                top: 50,
                height: 40,
                width: `${(lengthMeters / 2) * 100}%`,
                maxWidth: "calc(100% - 40px)",
                backgroundColor: "#1976d2",
                borderRadius: 8,
                cursor: "ew-resize",
                boxShadow: "0 0 12px rgba(25, 118, 210, 0.6)",
                userSelect: "none",
              }}
              onMouseDown={onLengthMouseDown}
              title="Drag to resize length"
            ></div>

            {/* Ruler */}
            <div
              style={{
                position: "absolute",
                bottom: 15,
                left: 20,
                right: 20,
                height: 30,
                borderTop: "2px solid #555",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "#333",
                fontWeight: "600",
                userSelect: "none",
              }}
            >
              {[...Array(11)].map((_, i) => {
                const leftPercent = i * 10;
                return (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      width: 1,
                      height: 15,
                      backgroundColor: "#555",
                      left: `${leftPercent}%`,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 18,
                        left: "-10px",
                        width: 40,
                        textAlign: "center",
                        userSelect: "none",
                      }}
                    >
                      {(i * 0.2).toFixed(1)}m
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <label style={{ fontWeight: 600, fontSize: 16 }}>
            Display Length in:{" "}
            <select
              value={lengthUnit}
              onChange={(e) => setLengthUnit(e.target.value)}
              style={{
                marginLeft: 12,
                padding: 8,
                fontSize: 16,
                borderRadius: 6,
                border: "1.5px solid #333",
                cursor: "pointer",
              }}
            >
              {Object.entries(lengthUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </label>

          <div
            style={{
              marginTop: 30,
              fontSize: 24,
              fontWeight: "700",
              color: "#0d47a1",
            }}
          >
            Length: {lengthConverted} {lengthUnits[lengthUnit].label.split(" ")[1]}
          </div>
        </div>
      )}

      {/* --- MASS MEASUREMENT --- */}
      {activeTab === TABS.MASS && (
        <div>
          <h2>Mass Measurement (Weight Scale)</h2>

          <div
            style={{
              marginBottom: 40,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Scale platform */}
            <div
              style={{
                width: 300,
                height: 150,
                border: "4px solid #555",
                borderRadius: 12,
                position: "relative",
                backgroundColor: "#e0e0e0",
                boxShadow: "inset 0 0 20px #bbb",
              }}
            >
              {/* Needle */}
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  width: 4,
                  height: 80,
                  backgroundColor: "#1976d2",
                  transformOrigin: "bottom center",
                  transform: `rotate(${(massKg / 150) * 180 - 90}deg)`,
                  transition: "transform 0.2s ease-out",
                  borderRadius: 2,
                }}
              ></div>

              {/* Scale marks */}
              {[...Array(7)].map((_, i) => {
                const leftPercent = (i / 6) * 100;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: `${leftPercent}%`,
                      width: 2,
                      height: 15,
                      backgroundColor: "#333",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      {(i * 25).toString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={150}
            step={0.1}
            value={massKg}
            onChange={(e) => setMassKg(parseFloat(e.target.value))}
            style={{ width: "100%", maxWidth: 400, marginBottom: 20 }}
          />

          <label style={{ fontWeight: 600, fontSize: 16 }}>
            Display Mass in:{" "}
            <select
              value={massUnit}
              onChange={(e) => setMassUnit(e.target.value)}
              style={{
                marginLeft: 12,
                padding: 8,
                fontSize: 16,
                borderRadius: 6,
                border: "1.5px solid #333",
                cursor: "pointer",
              }}
            >
              {Object.entries(massUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </label>

          <div
            style={{
              marginTop: 20,
              fontSize: 24,
              fontWeight: "700",
              color: "#0d47a1",
              textAlign: "center",
            }}
          >
            Mass: {massConverted} {massUnits[massUnit].label.split(" ")[1]}
          </div>
        </div>
      )}

      {/* --- FLUID VOLUME --- */}
      {/* --- FLUID VOLUME --- */}
{activeTab === TABS.FLUID && (
  <div>
    <h2>Fluid Volume Measurement</h2>

    <div
      style={{
        width: 200,
        height: 300,
        border: "3px solid #1976d2",
        borderRadius: 20,
        margin: "auto",
        position: "relative",
        backgroundColor: "#cfe8fc",
        boxShadow: "inset 0 0 10px #82b1ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: 12,
        fontWeight: "700",
        fontSize: 20,
        color: "white",
        userSelect: "none",
      }}
      title={`${volumeConverted} ${volumeUnits[volumeUnit].label.split(" ")[1]}`}
    >
      {/* Fluid level */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: `${(volumeLiters / 2) * 100}%`, // max 2 liters container
          backgroundColor: "#1565c0",
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          transition: "height 0.3s ease",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 24,
          color: "#bbdefb",
          fontWeight: "700",
          textShadow: "0 0 4px #0d47a1",
        }}
      >
        {volumeConverted} {volumeUnits[volumeUnit].label.split(" ")[1]}
      </div>
    </div>

    <input
      type="range"
      min={0}
      max={2}
      step={0.01}
      value={volumeLiters}
      onChange={(e) => setVolumeLiters(parseFloat(e.target.value))}
      style={{ width: "100%", maxWidth: 400, marginTop: 20, marginBottom: 20 }}
    />

    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <span style={{ fontWeight: 600, marginRight: 12 }}>Display Volume in:</span>
      {Object.entries(volumeUnits).map(([key, val]) => (
        <button
          key={key}
          onClick={() => setVolumeUnit(key)}
          style={{
            margin: "0 6px",
            padding: "8px 14px",
            fontSize: 16,
            borderRadius: 6,
            border: volumeUnit === key ? "2.5px solid #1976d2" : "1.5px solid #999",
            backgroundColor: volumeUnit === key ? "#1976d2" : "#f0f0f0",
            color: volumeUnit === key ? "white" : "#333",
            cursor: "pointer",
            fontWeight: volumeUnit === key ? "700" : "500",
            transition: "all 0.3s",
          }}
        >
          {val.label}
        </button>
      ))}
    </div>
  </div>
)}


      {/* --- CIRCLE MEASUREMENT --- */}
      {activeTab === TABS.CIRCLE && (
        <div>
          <h2>Circle Measurement</h2>

          <div
            style={{
              width: 300,
              height: 300,
              margin: "auto",
              position: "relative",
            }}
          >
            <svg width="300" height="300">
              <circle
                cx="150"
                cy="150"
                r={(radiusMeters / 1.5) * 140} // max radius 1.5m maps to 140px radius
                stroke="#1976d2"
                strokeWidth="6"
                fill="#90caf9"
              />
              <line
                x1="150"
                y1="150"
                x2={150 + (radiusMeters / 1.5) * 140}
                y2="150"
                stroke="#0d47a1"
                strokeWidth="4"
              />
            </svg>

            <input
              type="range"
              min={0.1}
              max={1.5}
              step={0.01}
              value={radiusMeters}
              onChange={(e) => setRadiusMeters(parseFloat(e.target.value))}
              style={{ width: "100%", maxWidth: 300, marginTop: 20 }}
            />
          </div>

          <label style={{ fontWeight: 600, fontSize: 16 }}>
            Display Radius in:{" "}
            <select
              value={circleUnit}
              onChange={(e) => setCircleUnit(e.target.value)}
              style={{
                marginLeft: 12,
                padding: 8,
                fontSize: 16,
                borderRadius: 6,
                border: "1.5px solid #333",
                cursor: "pointer",
              }}
            >
              {Object.entries(lengthUnits).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </label>

          <div
            style={{
              marginTop: 20,
              fontSize: 20,
              color: "#0d47a1",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            <div>
              Radius: {radiusConverted} {lengthUnits[circleUnit].label.split(" ")[1]}
            </div>
            <div>
              Circumference: {circumferenceConverted} {lengthUnits[circleUnit].label.split(" ")[1]}
            </div>
            <div>
              Area: {areaConverted} {lengthUnits[circleUnit].label.split(" ")[1]}²
            </div>
          </div>
        </div>
      )}

      {/* --- TIPS COMMON FOR ALL --- */}
      <div
        style={{
          maxWidth: 700,
          margin: "40px auto",
          backgroundColor: "#dbe9fc",
          borderRadius: 12,
          padding: 20,
          fontSize: 15,
          lineHeight: 1.6,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginTop: 60,
        }}
      >
        <h3>General Measurement Lab Tips:</h3>
        <ul>
          <li>Use the tabs above to switch between different measurement demos.</li>
          <li>Interact with the objects by dragging sliders or bars to change measurement values.</li>
          <li>Unit selectors instantly convert measurements for better understanding.</li>
          <li>Visual feedback helps you relate abstract numbers to real-world scales.</li>
          <li>Maximum ranges are simulated for demonstration, not exact physical devices.</li>
        </ul>
      </div>
    </div>
  );
};

export default MeasurementUnits;
