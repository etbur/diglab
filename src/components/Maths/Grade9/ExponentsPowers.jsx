import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ExponentsPowers = () => {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);
    setSteps([]);

    const baseNum = Number(base);
    const expNum = Number(exponent);

    if (isNaN(baseNum) || isNaN(expNum)) {
      setError("Please enter valid numeric values for base and exponent.");
      return;
    }

    if (!Number.isInteger(expNum)) {
      setError("Exponent must be an integer.");
      return;
    }

    const powerResult = Math.pow(baseNum, expNum);

    const stepList = [`Base = ${baseNum}`, `Exponent = ${expNum}`];

    if (expNum === 0) {
      stepList.push("Any number raised to the power 0 is 1 by definition.");
      stepList.push("Result = 1");
    } else if (expNum > 0) {
      // Show base^exponent with superscript, and expanded multiplication
      stepList.push(`Multiply base by itself exponent times: ${baseNum}^${expNum}`);

      let multiplication = `${baseNum}`;
      for (let i = 1; i < expNum; i++) {
        multiplication += ` × ${baseNum}`;
      }
      stepList.push(`Which is: ${multiplication}`);

      stepList.push(`Result = ${powerResult}`);
    } else {
      // Negative exponent case
      const positiveExp = Math.abs(expNum);
      stepList.push(
        `Negative exponent means reciprocal: ${baseNum}^${expNum} = 1 / (${baseNum}^${positiveExp})`
      );

      stepList.push(`Calculate denominator: ${baseNum}^${positiveExp} = ${Math.pow(baseNum, positiveExp)}`);

      stepList.push(`Result = 1 / ${Math.pow(baseNum, positiveExp)} = ${powerResult}`);
    }

    setResult(powerResult);
    setSteps(stepList);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Exponents and Powers Lab Ethiopia</h1>

      <label style={{ fontWeight: "bold" }} htmlFor="baseInput">
        Enter Base:
      </label>
      <input
        id="baseInput"
        type="text"
        value={base}
        onChange={(e) => setBase(e.target.value)}
        placeholder="e.g. 2"
        style={{ width: "100%", padding: 8, margin: "8px 0 20px", fontSize: 16 }}
      />

      <label style={{ fontWeight: "bold" }} htmlFor="expInput">
        Enter Exponent (integer):
      </label>
      <input
        id="expInput"
        type="text"
        value={exponent}
        onChange={(e) => setExponent(e.target.value)}
        placeholder="e.g. 3 or -2"
        style={{ width: "100%", padding: 8, margin: "8px 0 20px", fontSize: 16 }}
      />

      <button
        onClick={handleCalculate}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 25px",
          fontSize: 16,
          border: "none",
          cursor: "pointer",
          borderRadius: 4,
        }}
      >
        Calculate Power
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 20, fontWeight: "bold" }}>{error}</p>
      )}

      {result !== null && !error && (
        <div style={{ marginTop: 30 }}>
          <h2>
            Result: <strong>{result}</strong>
          </h2>
          <h3>Step-by-step explanation:</h3>
          <ol>
            {steps.map((step, idx) => {
              // Regex to find base^exponent patterns (e.g. 2^3, 5^-2)
              const regex = /(\d+)\^(-?\d+)/g;

              const parts = [];
              let lastIndex = 0;
              let match;

              while ((match = regex.exec(step)) !== null) {
                const [fullMatch, baseStr, expStr] = match;
                const start = match.index;

                if (start > lastIndex) {
                  parts.push(step.substring(lastIndex, start));
                }

                parts.push(
                  <span key={`${idx}-${start}`}>
                    {baseStr}
                    <sup>{expStr}</sup>
                  </span>
                );

                lastIndex = start + fullMatch.length;
              }

              if (lastIndex < step.length) {
                parts.push(step.substring(lastIndex));
              }

              if (parts.length === 0) {
                return <li key={idx}>{step}</li>;
              }

              return <li key={idx}>{parts}</li>;
            })}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ExponentsPowers;
