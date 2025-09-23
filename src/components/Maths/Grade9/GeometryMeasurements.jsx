import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const GeometryMeasurements = () => {
  const [shape, setShape] = useState("square");
  const [dimensions, setDimensions] = useState({});
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const handleDimensionChange = (e) => {
    setDimensions({ ...dimensions, [e.target.name]: e.target.value });
  };

  const toNum = (val) => Number(val);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    setSteps([]);

    try {
      switch (shape) {
        case "square": {
          const side = toNum(dimensions.side);
          if (isNaN(side) || side <= 0) throw "Enter positive side length.";
          const area = side * side;
          const perimeter = 4 * side;
          setResult({ area, perimeter });
          setSteps([
            `Square with side = ${side}`,
            `Area = side × side = ${side} × ${side} = ${area}`,
            `Perimeter = 4 × side = 4 × ${side} = ${perimeter}`,
          ]);
          break;
        }
        case "rectangle": {
          const length = toNum(dimensions.length);
          const width = toNum(dimensions.width);
          if (
            isNaN(length) ||
            length <= 0 ||
            isNaN(width) ||
            width <= 0
          )
            throw "Enter positive length and width.";
          const area = length * width;
          const perimeter = 2 * (length + width);
          setResult({ area, perimeter });
          setSteps([
            `Rectangle with length = ${length}, width = ${width}`,
            `Area = length × width = ${length} × ${width} = ${area}`,
            `Perimeter = 2 × (length + width) = 2 × (${length} + ${width}) = ${perimeter}`,
          ]);
          break;
        }
        case "triangle": {
          const a = toNum(dimensions.a);
          const b = toNum(dimensions.b);
          const c = toNum(dimensions.c);
          if (
            [a, b, c].some((v) => isNaN(v) || v <= 0)
          )
            throw "Enter positive lengths for all sides.";
          const s = (a + b + c) / 2;
          const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
          if (isNaN(area)) throw "Invalid triangle sides.";
          const perimeter = a + b + c;
          setResult({ area: area.toFixed(4), perimeter });
          setSteps([
            `Triangle with sides a=${a}, b=${b}, c=${c}`,
            `Perimeter = a + b + c = ${a} + ${b} + ${c} = ${perimeter}`,
            `Semi-perimeter s = Perimeter/2 = ${perimeter} / 2 = ${s}`,
            `Area = √[s(s-a)(s-b)(s-c)] = √[${s}(${s}-${a})(${s}-${b})(${s}-${c})] = ${area.toFixed(4)}`,
          ]);
          break;
        }
        case "circle": {
          const radius = toNum(dimensions.radius);
          if (isNaN(radius) || radius <= 0)
            throw "Enter positive radius.";
          const pi = Math.PI;
          const area = pi * radius * radius;
          const circumference = 2 * pi * radius;
          setResult({ area: area.toFixed(4), perimeter: circumference.toFixed(4) });
          setSteps([
            `Circle with radius = ${radius}`,
            `Area = π × r² = π × ${radius}² = ${area.toFixed(4)}`,
            `Circumference = 2 × π × r = 2 × π × ${radius} = ${circumference.toFixed(4)}`,
          ]);
          break;
        }
        case "parallelogram": {
          const base = toNum(dimensions.base);
          const height = toNum(dimensions.height);
          const side = toNum(dimensions.side);
          if (
            isNaN(base) ||
            base <= 0 ||
            isNaN(height) ||
            height <= 0 ||
            isNaN(side) ||
            side <= 0
          )
            throw "Enter positive base, height, and side.";
          const area = base * height;
          const perimeter = 2 * (base + side);
          setResult({ area, perimeter });
          setSteps([
            `Parallelogram with base = ${base}, height = ${height}, side = ${side}`,
            `Area = base × height = ${base} × ${height} = ${area}`,
            `Perimeter = 2 × (base + side) = 2 × (${base} + ${side}) = ${perimeter}`,
          ]);
          break;
        }
        case "trapezium": {
          const a = toNum(dimensions.a);
          const b = toNum(dimensions.b);
          const c = toNum(dimensions.c);
          const d = toNum(dimensions.d);
          const height = toNum(dimensions.height);
          if (
            [a, b, c, d, height].some(
              (v) => isNaN(v) || v <= 0
            )
          )
            throw "Enter positive side lengths and height.";
          const area = ((a + b) / 2) * height;
          const perimeter = a + b + c + d;
          setResult({ area, perimeter });
          setSteps([
            `Trapezium with sides a=${a}, b=${b}, c=${c}, d=${d}, height=${height}`,
            `Area = ((a + b)/2) × height = ((${a} + ${b}) / 2) × ${height} = ${area}`,
            `Perimeter = a + b + c + d = ${a} + ${b} + ${c} + ${d} = ${perimeter}`,
          ]);
          break;
        }
        case "rhombus": {
          const d1 = toNum(dimensions.d1);
          const d2 = toNum(dimensions.d2);
          const side = toNum(dimensions.side);
          if (
            isNaN(d1) ||
            d1 <= 0 ||
            isNaN(d2) ||
            d2 <= 0 ||
            isNaN(side) ||
            side <= 0
          )
            throw "Enter positive diagonals and side length.";
          const area = (d1 * d2) / 2;
          const perimeter = 4 * side;
          setResult({ area, perimeter });
          setSteps([
            `Rhombus with diagonals d1=${d1}, d2=${d2} and side=${side}`,
            `Area = (d1 × d2) / 2 = (${d1} × ${d2}) / 2 = ${area}`,
            `Perimeter = 4 × side = 4 × ${side} = ${perimeter}`,
          ]);
          break;
        }
        default:
          throw "Select a valid shape.";
      }
    } catch (err) {
      setError(err.toString());
    }
  };

  const scaleDimension = (value) => {
    if (!value) return 0;
    const num = Number(value);
    if (isNaN(num) || num <= 0) return 0;
    return Math.min(num * 10, 200);
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Geometry & Measurements Lab Ethiopia</h1>

      <label htmlFor="shapeSelect" style={{ fontWeight: "bold" }}>
        Select Shape:
      </label>
      <select
        id="shapeSelect"
        value={shape}
        onChange={(e) => {
          setShape(e.target.value);
          setDimensions({});
          setResult(null);
          setSteps([]);
          setError(null);
        }}
        style={{ width: "100%", padding: 8, margin: "8px 0 20px", fontSize: 16 }}
      >
        <option value="square">Square</option>
        <option value="rectangle">Rectangle</option>
        <option value="triangle">Triangle</option>
        <option value="circle">Circle</option>
        <option value="parallelogram">Parallelogram</option>
        <option value="trapezium">Trapezium (Trapezoid)</option>
        <option value="rhombus">Rhombus</option>
      </select>

      {/* Dynamic inputs per shape */}
      {shape === "square" && (
        <>
          <label>Side length:</label>
          <input
            type="number"
            name="side"
            value={dimensions.side || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 5"
            style={{ width: "100%", padding: 8, margin: "8px 0 20px" }}
          />
        </>
      )}

      {shape === "rectangle" && (
        <>
          <label>Length:</label>
          <input
            type="number"
            name="length"
            value={dimensions.length || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 8"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Width:</label>
          <input
            type="number"
            name="width"
            value={dimensions.width || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 4"
            style={{ width: "100%", padding: 8, margin: "8px 0 20px" }}
          />
        </>
      )}

      {shape === "triangle" && (
        <>
          <label>Side a:</label>
          <input
            type="number"
            name="a"
            value={dimensions.a || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 3"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Side b:</label>
          <input
            type="number"
            name="b"
            value={dimensions.b || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 4"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Side c:</label>
          <input
            type="number"
            name="c"
            value={dimensions.c || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 5"
            style={{ width: "100%", padding: 8, margin: "8px 0 20px" }}
          />
        </>
      )}

      {shape === "circle" && (
        <>
          <label>Radius:</label>
          <input
            type="number"
            name="radius"
            value={dimensions.radius || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 7"
            style={{ width: "100%", padding: 8, margin: "8px 0 20px" }}
          />
        </>
      )}

      {shape === "parallelogram" && (
        <>
          <label>Base:</label>
          <input
            type="number"
            name="base"
            value={dimensions.base || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 10"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Height:</label>
          <input
            type="number"
            name="height"
            value={dimensions.height || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 6"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Side length:</label>
          <input
            type="number"
            name="side"
            value={dimensions.side || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 8"
            style={{ width: "100%", padding: 8, margin: "8px 0 20px" }}
          />
        </>
      )}

      {shape === "trapezium" && (
        <>
          <label>Side a (parallel):</label>
          <input
            type="number"
            name="a"
            value={dimensions.a || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 8"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Side b (parallel):</label>
          <input
            type="number"
            name="b"
            value={dimensions.b || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 5"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Side c:</label>
          <input
            type="number"
            name="c"
            value={dimensions.c || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 4"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Side d:</label>
          <input
            type="number"
            name="d"
            value={dimensions.d || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 4"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Height:</label>
          <input
            type="number"
            name="height"
            value={dimensions.height || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 6"
            style={{ width: "100%", padding: 8, margin: "8px 0 20px" }}
          />
        </>
      )}

      {shape === "rhombus" && (
        <>
          <label>Diagonal 1:</label>
          <input
            type="number"
            name="d1"
            value={dimensions.d1 || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 10"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Diagonal 2:</label>
          <input
            type="number"
            name="d2"
            value={dimensions.d2 || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 8"
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
          <label>Side length:</label>
          <input
            type="number"
            name="side"
            value={dimensions.side || ""}
            onChange={handleDimensionChange}
            placeholder="e.g. 7"
            style={{ width: "100%", padding: 8, margin: "8px 0 20px" }}
          />
        </>
      )}

      <button
        onClick={handleCalculate}
        style={{
          backgroundColor: "#0077ff",
          color: "white",
          padding: "10px 20px",
          fontSize: 16,
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          marginBottom: 20,
          width: "100%",
        }}
      >
        Calculate
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div
          style={{
            backgroundColor: "#f0f8ff",
            borderRadius: 8,
            padding: 15,
            marginBottom: 20,
          }}
        >
          <h3>Results:</h3>
          <p>
            <strong>Area:</strong> {result.area}
          </p>
          <p>
            <strong>Perimeter / Circumference:</strong> {result.perimeter}
          </p>
          <h4>Steps:</h4>
          <ol>
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Shape visualization */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 220,
          border: "1px solid #ddd",
          borderRadius: 8,
          backgroundColor: "#fff",
        }}
      >
        {/* Render shapes scaled by input */}

        {shape === "square" && (
          <div
            style={{
              width: scaleDimension(dimensions.side),
              height: scaleDimension(dimensions.side),
              backgroundColor: "#0077ff",
              borderRadius: 4,
            }}
            title="Square"
          />
        )}

        {shape === "rectangle" && (
          <div
            style={{
              width: scaleDimension(dimensions.length),
              height: scaleDimension(dimensions.width),
              backgroundColor: "#28a745",
              borderRadius: 4,
            }}
            title="Rectangle"
          />
        )}

        {shape === "triangle" && (
          <svg width="200" height="200" viewBox="0 0 200 200" title="Triangle">
            <polygon
              points="10,190 190,190 100,10"
              fill="#dc3545"
              stroke="#a71d2a"
              strokeWidth="3"
            />
          </svg>
        )}

        {shape === "circle" && (
          <svg width="200" height="200" viewBox="0 0 200 200" title="Circle">
            <circle
              cx="100"
              cy="100"
              r={Math.min(scaleDimension(dimensions.radius), 90)}
              fill="#ffc107"
              stroke="#cc9a06"
              strokeWidth="3"
            />
          </svg>
        )}

        {shape === "parallelogram" && (
          <svg width="220" height="200" viewBox="0 0 220 200" title="Parallelogram">
            <polygon
              points="40,10 180,10 140,150 0,150"
              fill="#6f42c1"
              stroke="#4e318d"
              strokeWidth="3"
            />
          </svg>
        )}

        {shape === "trapezium" && (
          <svg width="220" height="200" viewBox="0 0 220 200" title="Trapezium">
            <polygon
              points="50,30 170,30 140,170 80,170"
              fill="#20c997"
              stroke="#137757"
              strokeWidth="3"
            />
          </svg>
        )}

        {shape === "rhombus" && (
          <svg width="200" height="200" viewBox="0 0 200 200" title="Rhombus">
            <polygon
              points="100,10 180,100 100,190 20,100"
              fill="#fd7e14"
              stroke="#b55c03"
              strokeWidth="3"
            />
          </svg>
        )}
      </div>

      <NavLink
        to="/"
        style={{
          display: "inline-block",
          marginTop: 30,
          color: "#0077ff",
          textDecoration: "underline",
        }}
      >
        Back to Home
      </NavLink>
    </div>
  );
};

export default GeometryMeasurements;
