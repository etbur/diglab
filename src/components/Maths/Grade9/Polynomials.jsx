import React, { useState } from "react";
import { simplify, evaluate } from "mathjs";
import { NavLink } from "react-router-dom";

const Polynomials = () => {
  const [expression, setExpression] = useState("(x + 2)(x - 3)");
  const [xValue, setXValue] = useState("");
  const [steps, setSteps] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleProcess = () => {
    setError("");
    setSteps("");
    setResult("");

    try {
      // Step 1: Simplify the input expression
      const simplified = simplify(expression);
      const expanded = simplified.toString();

      let explanation = `**Step 1: Expand the expression**\n   ${expression}\n   = ${expanded}\n`;

      // Step 2: Evaluate if x value is provided
      if (xValue.trim() !== "") {
        const x = parseFloat(xValue);
        if (isNaN(x)) throw new Error("Invalid numeric value for x.");

        const substituted = expanded.replace(/x/g, `(${x})`);
        const evaluated = evaluate(expanded, { x });

        explanation += `\n**Step 2: Substitute x = ${x}**\n   ${expanded} → ${substituted}\n`;
        explanation += `**Step 3: Evaluate**\n   ${substituted} = ${evaluated}`;

        setResult(evaluated.toString());
      }

      setSteps(explanation);
    } catch (err) {
      setError("⚠️ Invalid expression — please enter a valid polynomial expression using x.");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Polynomials Lab Ethiopia</h1>

      <label><strong>Enter any expression in x:</strong></label>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="e.g. (x + 2)(x - 3), (2x - 1)(x^2 + 3x + 4)"
        style={{
          width: "100%",
          padding: 10,
          fontSize: 16,
          margin: "8px 0 16px",
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <label><strong>Enter value for x (optional):</strong></label>
      <input
        type="text"
        value={xValue}
        onChange={(e) => setXValue(e.target.value)}
        placeholder="e.g. 1 or 3.5"
        style={{
          width: "100%",
          padding: 10,
          fontSize: 16,
          marginBottom: 16,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleProcess}
        style={{
          width: "100%",
          padding: 12,
          backgroundColor: "#007BFF",
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Expand & Evaluate
      </button>

      {/* Error Display */}
      {error && (
        <div style={{ color: "red", marginTop: 20 }}>
          {error}
        </div>
      )}

      {/* Steps Output */}
      {steps && (
        <pre
          style={{
            marginTop: 24,
            background: "#f0f0f0",
            padding: 16,
            borderRadius: 6,
            whiteSpace: "pre-wrap",
            fontSize: 16,
          }}
        >
          {steps}
        </pre>
      )}

      {/* Final Result Display */}
      {result !== "" && (
        <div
          style={{
            marginTop: 20,
            background: "#d4edda",
            padding: 12,
            borderRadius: 6,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Final Result: {result}
        </div>
      )}

      {/* Navigation */}
      <nav style={{ marginTop: 30, display: "flex", gap: 20 }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/number-systems">Number Systems</NavLink>
        <NavLink to="/linear-equations">Linear Equations</NavLink>
      </nav>
    </div>
  );
};

export default Polynomials;
