import React, { useState } from "react";
import { parse, simplify } from "mathjs";
import { NavLink } from "react-router-dom";

const LinearEquations = () => {
  const [equation, setEquation] = useState("2*x + 3 = 7"); // default example
  const [steps, setSteps] = useState([]);
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);

  // Utility: Extract lhs and rhs from equation string "lhs = rhs"
  const splitEquation = (eq) => {
    const parts = eq.split("=");
    if (parts.length !== 2) return null;
    return { lhs: parts[0].trim(), rhs: parts[1].trim() };
  };

  // Solve linear equation ax + b = c for x
  // Returns { solution, steps }
  const solveLinearEquation = (lhs, rhs) => {
    try {
      // Parse expressions
      const lhsExpr = parse(lhs);
      const rhsExpr = parse(rhs);

      // Simplify both sides
      const simpleLhs = simplify(lhsExpr);
      const simpleRhs = simplify(rhsExpr);

      // Convert to string for display
      const simpleLhsStr = simpleLhs.toString();
      const simpleRhsStr = simpleRhs.toString();

      // Move all terms to lhs: lhs - rhs = 0
      const zeroExpr = simplify(`${simpleLhsStr} - (${simpleRhsStr})`);

      // zeroExpr is of form ax + b = 0
      // Extract coefficients a and b for x
      // mathjs has a method to get coefficients, but we can manually do this for x:

      // Extract coefficient of x
      const a = zeroExpr.coefficients
        ? zeroExpr.coefficients['x']
        : zeroExpr.filter(node => node.isSymbolNode && node.name === 'x').length ? 1 : 0;

      // But mathjs node does not provide direct coefficients.
      // So instead, we try to evaluate zeroExpr as function of x to get coefficients:
      // We evaluate zeroExpr at x=0 and x=1 to find a and b

      const valAt0 = zeroExpr.evaluate({ x: 0 });
      const valAt1 = zeroExpr.evaluate({ x: 1 });

      // From ax + b = 0,
      // at x=0 => b = valAt0
      // at x=1 => a + b = valAt1
      // => a = valAt1 - valAt0

      const b = valAt0;
      const aCoeff = valAt1 - valAt0;

      if (aCoeff === 0) {
        if (b === 0) {
          return {
            steps: [
              `Equation reduces to 0 = 0, so infinite solutions.`,
            ],
            solution: "Infinite solutions",
          };
        } else {
          return {
            steps: [
              `Equation reduces to ${b} = 0, which is false, so no solution.`,
            ],
            solution: "No solution",
          };
        }
      }

      // Solve for x: x = -b / a
      const xValue = -b / aCoeff;

      // Steps for explanation:
      const stepList = [
        `Given equation: ${lhs} = ${rhs}`,
        `Simplify both sides: ${simpleLhsStr} = ${simpleRhsStr}`,
        `Rewrite as: (${simpleLhsStr}) - (${simpleRhsStr}) = 0`,
        `Simplified to: ${zeroExpr.toString()} = 0`,
        `Coefficients identified: a = ${aCoeff.toFixed(4)}, b = ${b.toFixed(4)}`,
        `Solve for x: x = -b / a = -(${b.toFixed(4)}) / (${aCoeff.toFixed(4)})`,
        `Solution: x = ${xValue.toFixed(4)}`,
      ];

      return {
        steps: stepList,
        solution: xValue,
      };
    } catch (err) {
      return {
        steps: [],
        solution: null,
        error: "Failed to parse or solve the equation. Please ensure it is a valid linear equation in x.",
      };
    }
  };

  const handleSolve = () => {
    setError(null);
    setSteps([]);
    setSolution(null);

    const eqParts = splitEquation(equation);

    if (!eqParts) {
      setError("Please enter a valid equation in the format 'expression = expression'.");
      return;
    }

    const { lhs, rhs } = eqParts;

    const result = solveLinearEquation(lhs, rhs);

    if (result.error) {
      setError(result.error);
    } else {
      setSteps(result.steps);
      setSolution(result.solution);
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        padding: 20,
      }}
    >
      <h1>Linear Equations Lab Ethiopia</h1>

      <section style={{ marginBottom: 20 }}>
        <label htmlFor="equationInput" style={{ fontWeight: "bold" }}>
          Enter a linear equation in one variable <em>x</em> (e.g. 2*x + 3 = 7):
        </label>
        <input
          id="equationInput"
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 8,
            fontSize: 16,
            borderRadius: 4,
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
          placeholder="2*x + 3 = 7"
        />
      </section>

      <button
        onClick={handleSolve}
        style={{
          padding: "10px 25px",
          fontSize: 16,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Solve Equation
      </button>

      {error && (
        <p
          style={{
            marginTop: 20,
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}

      {steps.length > 0 && (
        <div style={{ marginTop: 25 }}>
          <h3>Step-by-step solution:</h3>
          <ol>
            {steps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                {step}
              </li>
            ))}
          </ol>
          <h2>
            Solution:{" "}
            {typeof solution === "number"
              ? `x = ${solution.toFixed(4)}`
              : solution}
          </h2>
        </div>
      )}

      <nav style={{ marginTop: 40 }}>
        <NavLink to="/" style={{ marginRight: 15 }}>
          Home
        </NavLink>
        <NavLink to="/linear-equations" style={{ marginRight: 15 }}>
          Linear Equations Lab
        </NavLink>
        <NavLink to="/algebraic-expressions">Algebraic Expressions</NavLink>
      </nav>
    </div>
  );
};

export default LinearEquations;
