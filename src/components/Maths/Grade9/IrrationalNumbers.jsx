import React, { useState } from "react";
import { evaluate } from "mathjs";
import { NavLink } from "react-router-dom";

const IrrationalNumbers = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState(null);

  // Known irrational constants for recognition
  const knownIrrationals = {
    pi: Math.PI,
    π: Math.PI,
    e: Math.E,
    sqrt2: Math.SQRT2,
    "√2": Math.SQRT2,
    phi: (1 + Math.sqrt(5)) / 2,
    φ: (1 + Math.sqrt(5)) / 2,
  };

  // Regex to check if input is a fraction string like "22/7"
  const isFraction = (str) => /^[+-]?\d+\/[1-9]\d*$/.test(str.trim());

  // Main function to check if input is rational/irrational/unknown
  const checkIrrational = (inputStr) => {
    const val = inputStr.trim().toLowerCase();

    // 1. Known irrational constants
    if (val in knownIrrationals) {
      return {
        status: "irrational",
        explanation: `'${inputStr}' is a known irrational number.`,
      };
    }

    // 2. Fraction string (like 22/7)
    if (isFraction(val)) {
      return {
        status: "rational",
        explanation: `'${inputStr}' is rational because it is a fraction of integers.`,
      };
    }

    // 3. Try to parse the input as a number (decimal)
    try {
      const num = evaluate(inputStr);

      if (typeof num !== "number" || !isFinite(num)) {
        return {
          status: "error",
          explanation: "Input is not a valid finite number.",
        };
      }

      // 4. Decimal numbers can't decisively be called irrational or rational here
      return {
        status: "unknown",
        explanation:
          `'${inputStr}' is a decimal number. ` +
          "Decimals alone cannot confirm irrationality. " +
          "Try entering a fraction or a known irrational constant (pi, sqrt2, e, phi).",
      };
    } catch {
      return {
        status: "error",
        explanation: "Invalid input. Please enter a valid number, fraction, or known irrational constant.",
      };
    }
  };

  const handleCheck = () => {
    if (!input.trim()) {
      setMessage({
        status: "error",
        explanation: "Please enter a number, fraction, or known irrational constant.",
      });
      return;
    }

    const result = checkIrrational(input);
    setMessage(result);
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
      }}
    >
      <h1>Irrational Numbers Lab Ethiopia</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>What is an Irrational Number?</h2>
        <p>
          An irrational number is a real number that <strong>cannot</strong> be written as a fraction of two
          integers. Its decimal representation goes on forever without repeating.
        </p>
        <p>
          <strong>Examples of irrational numbers:</strong>
        </p>
        <ul>
          <li>π (Pi) ≈ 3.1415926535...</li>
          <li>√2 (Square root of 2) ≈ 1.41421356...</li>
          <li>e (Euler’s number) ≈ 2.718281828...</li>
          <li>φ (Golden ratio) ≈ 1.6180339887...</li>
        </ul>
      </section>

      <section style={{ marginBottom: 30 }}>
        <label htmlFor="inputValue" style={{ fontWeight: "bold", display: "block", marginBottom: 8 }}>
          Enter a number, fraction (like 22/7), or known irrational constant (<em>pi</em>, <em>sqrt2</em>, <em>e</em>, <em>phi</em>):
        </label>
        <input
          id="inputValue"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 3.14159 or 22/7 or pi"
          style={{
            width: "100%",
            padding: 10,
            fontSize: 16,
            borderRadius: 4,
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleCheck}
          style={{
            marginTop: 15,
            padding: "10px 25px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Check Irrationality
        </button>
      </section>

      {message && (
        <div
          style={{
            padding: 15,
            borderRadius: 6,
            backgroundColor:
              message.status === "irrational"
                ? "#d4edda"
                : message.status === "rational"
                ? "#cce5ff"
                : message.status === "unknown"
                ? "#fff3cd"
                : "#f8d7da",
            color:
              message.status === "irrational"
                ? "#155724"
                : message.status === "rational"
                ? "#004085"
                : message.status === "unknown"
                ? "#856404"
                : "#721c24",
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          {message.explanation}
        </div>
      )}

      <section>
        <h2>Notes for Learners</h2>
        <ul>
          <li>
            Fractions like <code>22/7</code> or <code>1/3</code> are <strong>rational</strong> numbers.
          </li>
          <li>
            Known irrational constants such as <code>pi</code>, <code>sqrt2</code>, <code>e</code>, and <code>phi</code> cannot be expressed exactly as fractions.
          </li>
          <li>
            Decimal numbers like <code>3.14159</code> are only approximations and <em>cannot</em> be used alone to prove irrationality.
          </li>
          <li>
            This tool provides a practical way to understand and classify numbers based on input types.
          </li>
        </ul>
      </section>

      <nav style={{ marginTop: 30 }}>
        <NavLink to="/" style={{ marginRight: 15, color: "#007bff", textDecoration: "underline" }}>
          Home
        </NavLink>
        <NavLink to="/irrational-numbers" style={{ color: "#007bff", textDecoration: "underline" }}>
          Irrational Numbers Lab
        </NavLink>
      </nav>
    </div>
  );
};

export default IrrationalNumbers;
