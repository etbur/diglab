import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const baseLabels = {
  2: "Binary (Base 2)",
  8: "Octal (Base 8)",
  10: "Decimal (Base 10)",
  16: "Hexadecimal (Base 16)",
};

// Convert digit to char (for hexadecimal)
const digitToChar = (digit) =>
  digit < 10 ? digit.toString() : String.fromCharCode("A".charCodeAt(0) + digit - 10);

// Convert from any base to decimal (with steps)
const convertToDecimalWithSteps = (input, base) => {
  const clean = input.replace(/^0[bxo]/i, "").toUpperCase();
  const reversed = clean.split("").reverse();
  let decimal = 0;
  let steps = [];

  reversed.forEach((char, i) => {
    const value = isNaN(char) ? char.charCodeAt(0) - 55 : parseInt(char);
    const placeValue = value * Math.pow(base, i);
    steps.push(`${char} × ${base}^${i} = ${placeValue}`);
    decimal += placeValue;
  });

  return {
    decimal,
    steps: steps.reverse().join("\n") + `\nSum = ${decimal}`,
  };
};

// Convert decimal to any base (with division/remainder steps)
const convertFromDecimalWithSteps = (decimal, base) => {
  if (base === 10) return { converted: decimal.toString(), steps: "No conversion needed." };
  if (decimal === 0) return { converted: "0", steps: "0 divided by any base is 0." };

  let n = Math.abs(decimal);
  const steps = [];
  const remainders = [];

  while (n > 0) {
    const quotient = Math.floor(n / base);
    const remainder = n % base;
    steps.push(`${n} ÷ ${base} = ${quotient} remainder ${digitToChar(remainder)}`);
    remainders.push(digitToChar(remainder));
    n = quotient;
  }

  const converted = (decimal < 0 ? "-" : "") + remainders.reverse().join("");
  return { converted, steps: steps.join("\n") };
};

const NumberSystems = () => {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [result, setResult] = useState("");
  const [allSteps, setAllSteps] = useState("");
  const [error, setError] = useState(null);

  const handleConvert = () => {
    setResult("");
    setAllSteps("");
    setError(null);

    try {
      const from = parseInt(fromBase);
      const to = parseInt(toBase);
      const sanitized = input.trim();

      if (!sanitized) {
        setError("Please enter a number.");
        return;
      }

      const { decimal, steps: toDecimalSteps } =
        from === 10
          ? { decimal: parseInt(sanitized), steps: "Already in decimal.\n" }
          : convertToDecimalWithSteps(sanitized, from);

      if (isNaN(decimal)) throw new Error("Invalid number for selected base.");

      const { converted, steps: fromDecimalSteps } =
        to === 10
          ? { converted: decimal.toString(), steps: "No conversion from decimal needed." }
          : convertFromDecimalWithSteps(decimal, to);

      setResult(converted);
      setAllSteps(`Step 1: Convert from Base ${from} to Decimal:\n${toDecimalSteps}\n\nStep 2: Convert from Decimal to Base ${to}:\n${fromDecimalSteps}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "auto", padding: 20, fontFamily: "Segoe UI" }}>
      <h1 style={{ textAlign: "center" }}>Number Systems Lab Ethiopia</h1>

      <div>
        <label><strong>Enter Number:</strong></label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 25, 0x1F, 0b1101"
          style={{ width: "100%", padding: 10, fontSize: 16, marginTop: 6 }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label><strong>From Base:</strong></label>
        <select
          value={fromBase}
          onChange={(e) => setFromBase(e.target.value)}
          style={{ width: "100%", padding: 10, fontSize: 16, marginTop: 6 }}
        >
          {Object.entries(baseLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 20 }}>
        <label><strong>To Base:</strong></label>
        <select
          value={toBase}
          onChange={(e) => setToBase(e.target.value)}
          style={{ width: "100%", padding: 10, fontSize: 16, marginTop: 6 }}
        >
          {Object.entries(baseLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleConvert}
        style={{
          marginTop: 24,
          width: "100%",
          padding: 12,
          backgroundColor: "#007bff",
          color: "white",
          fontSize: 18,
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
        }}
      >
        Convert
      </button>

      {error && (
        <div style={{ marginTop: 20, color: "red", fontWeight: "bold" }}>{error}</div>
      )}

      {result && (
        <div style={{ backgroundColor: "#e6f4ea", padding: 16, borderRadius: 8, marginTop: 24 }}>
          <p><strong>Converted Result:</strong> {result}</p>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
            <strong>Conversion Steps:</strong>
            {"\n"}
            {allSteps}
          </pre>
        </div>
      )}

    </div>
  );
};

export default NumberSystems;
