import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CoordinateGeometry = () => {
  // Coordinates input states
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [x3, setX3] = useState("");
  const [y3, setY3] = useState("");

  // Selected experiment state
  const [experiment, setExperiment] = useState("distance");

  // Result and steps states
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  // Helper to parse inputs and check validity
  const parseCoords = (coords) => {
    return coords.map((val) => {
      const num = Number(val);
      return isNaN(num) ? null : num;
    });
  };

  // Distance formula
  const calcDistance = (X1, Y1, X2, Y2) => {
    const step1 = `Points A(${X1}, ${Y1}) and B(${X2}, ${Y2})`;
    const dx = X2 - X1;
    const dy = Y2 - Y1;
    const step2 = `Δx = ${X2} - ${X1} = ${dx}, Δy = ${Y2} - ${Y1} = ${dy}`;
    const dx2 = dx * dx;
    const dy2 = dy * dy;
    const step3 = `(Δx)² = ${dx}² = ${dx2}, (Δy)² = ${dy}² = ${dy2}`;
    const sum = dx2 + dy2;
    const step4 = `Sum = ${dx2} + ${dy2} = ${sum}`;
    const dist = Math.sqrt(sum);
    const step5 = `Distance = √${sum} = ${dist.toFixed(4)}`;

    return {
      res: dist.toFixed(4),
      steps: [step1, step2, step3, step4, step5],
    };
  };

  // Midpoint formula
  const calcMidpoint = (X1, Y1, X2, Y2) => {
    const step1 = `Points A(${X1}, ${Y1}) and B(${X2}, ${Y2})`;
    const mx = (X1 + X2) / 2;
    const my = (Y1 + Y2) / 2;
    const step2 = `Midpoint M = ((x₁ + x₂)/2, (y₁ + y₂)/2)`;
    const step3 = `M = ((${X1} + ${X2})/2, (${Y1} + ${Y2})/2) = (${mx.toFixed(
      2
    )}, ${my.toFixed(2)})`;

    return {
      res: `(${mx.toFixed(2)}, ${my.toFixed(2)})`,
      steps: [step1, step2, step3],
    };
  };

  // Slope formula
  const calcSlope = (X1, Y1, X2, Y2) => {
    const step1 = `Points A(${X1}, ${Y1}) and B(${X2}, ${Y2})`;
    const dx = X2 - X1;
    const dy = Y2 - Y1;
    if (dx === 0) {
      return {
        res: "undefined (vertical line)",
        steps: [
          step1,
          "Since Δx = 0, the slope is undefined (vertical line).",
        ],
      };
    }
    const slope = dy / dx;
    const step2 = `Δy = ${Y2} - ${Y1} = ${dy}, Δx = ${X2} - ${X1} = ${dx}`;
    const step3 = `Slope m = Δy / Δx = ${dy} / ${dx} = ${slope.toFixed(4)}`;
    return {
      res: slope.toFixed(4),
      steps: [step1, step2, step3],
    };
  };

  // Equation of line y = mx + c
  const calcLineEquation = (X1, Y1, X2, Y2) => {
    const slopeCalc = calcSlope(X1, Y1, X2, Y2);
    if (slopeCalc.res === "undefined (vertical line)") {
      return {
        res: `x = ${X1}`,
        steps: [
          ...slopeCalc.steps,
          `Since slope is undefined, line equation is vertical: x = ${X1}`,
        ],
      };
    }
    const m = Number(slopeCalc.res);
    const c = Y1 - m * X1;
    const step1 = slopeCalc.steps[0];
    const step2 = slopeCalc.steps[1];
    const step3 = slopeCalc.steps[2];
    const step4 = `Using y = mx + c and point A: c = y₁ - m*x₁ = ${Y1} - ${m.toFixed(
      4
    )} * ${X1} = ${c.toFixed(4)}`;
    const step5 = `Equation of line: y = ${m.toFixed(4)}x + ${c.toFixed(4)}`;

    return {
      res: `y = ${m.toFixed(4)}x + ${c.toFixed(4)}`,
      steps: [step1, step2, step3, step4, step5],
    };
  };

  // Area of triangle given three points
  const calcTriangleArea = (X1, Y1, X2, Y2, X3, Y3) => {
    const step1 = `Points A(${X1}, ${Y1}), B(${X2}, ${Y2}), C(${X3}, ${Y3})`;
    const formula = `Area = |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)| / 2`;
    const val =
      X1 * (Y2 - Y3) + X2 * (Y3 - Y1) + X3 * (Y1 - Y2);
    const area = Math.abs(val) / 2;
    const step2 = `${formula}`;
    const step3 = `Area = |${X1}(${Y2} - ${Y3}) + ${X2}(${Y3} - ${Y1}) + ${X3}(${Y1} - ${Y2})| / 2 = |${val}| / 2`;
    const step4 = `Area = ${area.toFixed(4)}`;

    return {
      res: area.toFixed(4),
      steps: [step1, step2, step3, step4],
    };
  };

  // Check if three points are collinear
  const checkCollinearity = (X1, Y1, X2, Y2, X3, Y3) => {
    const step1 = `Points A(${X1}, ${Y1}), B(${X2}, ${Y2}), C(${X3}, ${Y3})`;
    const areaData = calcTriangleArea(X1, Y1, X2, Y2, X3, Y3);
    const step2 = `Calculate area of triangle formed by points`;
    const step3 = areaData.steps.join(", ");
    const step4 = `If area = 0, points are collinear. Area = ${areaData.res}`;
    const collinear = Number(areaData.res) === 0;
    const step5 = collinear
      ? "Since area is 0, points are collinear."
      : "Since area is not 0, points are NOT collinear.";

    return {
      res: collinear ? "Collinear" : "Not collinear",
      steps: [step1, step2, step3, step4, step5],
    };
  };

  // Handle calculation based on selected experiment
  const handleCalculate = () => {
    setError(null);
    setResult(null);
    setSteps([]);

    // Parse inputs as numbers or null if invalid
    const coords = parseCoords([x1, y1, x2, y2, x3, y3]);

    // Validate inputs based on experiment
    switch (experiment) {
      case "distance":
      case "midpoint":
      case "slope":
      case "line":
        if (coords.slice(0, 4).some((v) => v === null)) {
          setError("Please enter valid numbers for points A(x₁,y₁) and B(x₂,y₂).");
          return;
        }
        break;
      case "triangleArea":
      case "collinearity":
        if (coords.some((v) => v === null)) {
          setError("Please enter valid numbers for points A(x₁,y₁), B(x₂,y₂), and C(x₃,y₃).");
          return;
        }
        break;
      default:
        setError("Please select a valid experiment.");
        return;
    }

    // Destructure parsed coords
    const [X1, Y1, X2, Y2, X3, Y3] = coords;

    // Perform calculation based on experiment
    let calcResult;
    switch (experiment) {
      case "distance":
        calcResult = calcDistance(X1, Y1, X2, Y2);
        break;
      case "midpoint":
        calcResult = calcMidpoint(X1, Y1, X2, Y2);
        break;
      case "slope":
        calcResult = calcSlope(X1, Y1, X2, Y2);
        break;
      case "line":
        calcResult = calcLineEquation(X1, Y1, X2, Y2);
        break;
      case "triangleArea":
        calcResult = calcTriangleArea(X1, Y1, X2, Y2, X3, Y3);
        break;
      case "collinearity":
        calcResult = checkCollinearity(X1, Y1, X2, Y2, X3, Y3);
        break;
      default:
        calcResult = { res: null, steps: [] };
    }

    setResult(calcResult.res);
    setSteps(calcResult.steps);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Coordinate Geometry Lab Ethiopia</h1>

      <p>Select an experiment and enter the required points:</p>

      <select
        value={experiment}
        onChange={(e) => {
          setExperiment(e.target.value);
          setResult(null);
          setSteps([]);
          setError(null);
        }}
        style={{ padding: 8, fontSize: 16, marginBottom: 20 }}
      >
        <option value="distance">Distance between two points</option>
        <option value="midpoint">Midpoint of a line segment</option>
        <option value="slope">Slope of a line</option>
        <option value="line">Equation of a line</option>
        <option value="triangleArea">Area of triangle</option>
        <option value="collinearity">Check if points are collinear</option>
      </select>

      <div style={{ marginBottom: 20 }}>
        <label>
          x₁:
          <input
            type="text"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
            style={{ marginLeft: 10, width: 80 }}
            placeholder="e.g. 1"
          />
        </label>
        <label style={{ marginLeft: 20 }}>
          y₁:
          <input
            type="text"
            value={y1}
            onChange={(e) => setY1(e.target.value)}
            style={{ marginLeft: 10, width: 80 }}
            placeholder="e.g. 2"
          />
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>
          x₂:
          <input
            type="text"
            value={x2}
            onChange={(e) => setX2(e.target.value)}
            style={{ marginLeft: 10, width: 80 }}
            placeholder="e.g. 3"
          />
        </label>
        <label style={{ marginLeft: 20 }}>
          y₂:
          <input
            type="text"
            value={y2}
            onChange={(e) => setY2(e.target.value)}
            style={{ marginLeft: 10, width: 80 }}
            placeholder="e.g. 4"
          />
        </label>
      </div>

      {(experiment === "triangleArea" || experiment === "collinearity") && (
        <div style={{ marginBottom: 20 }}>
          <label>
            x₃:
            <input
              type="text"
              value={x3}
              onChange={(e) => setX3(e.target.value)}
              style={{ marginLeft: 10, width: 80 }}
              placeholder="e.g. 5"
            />
          </label>
          <label style={{ marginLeft: 20 }}>
            y₃:
            <input
              type="text"
              value={y3}
              onChange={(e) => setY3(e.target.value)}
              style={{ marginLeft: 10, width: 80 }}
              placeholder="e.g. 6"
            />
          </label>
        </div>
      )}

      <button
        onClick={handleCalculate}
        style={{
          padding: "10px 25px",
          fontSize: 16,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: 4,
          marginBottom: 20,
        }}
      >
        Calculate
      </button>

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      )}

      {result !== null && !error && (
        <div>
          <h2>Result:</h2>
          <p style={{ fontSize: 18 }}>
            <strong>{result}</strong>
          </p>

          {steps.length > 0 && (
            <>
              <h3>Calculation Steps:</h3>
              <ol>
                {steps.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>
                    {step}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CoordinateGeometry;
