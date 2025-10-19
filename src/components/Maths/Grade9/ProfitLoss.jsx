import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ProfitLoss = () => {
  const [cp, setCp] = useState("");
  const [sp, setSp] = useState("");
  const [mp, setMp] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState("");

  const handleCalculate = () => {
    setResult("");
    setSteps("");

    const cost = parseFloat(cp);
    let selling = parseFloat(sp);
    const marked = parseFloat(mp);
    const discountPercent = parseFloat(discount);

    let explanation = "";

    if (!isNaN(marked) && !isNaN(discountPercent)) {
      const discountAmount = (marked * discountPercent) / 100;
      selling = marked - discountAmount;
      explanation += `1. Discount = ${discountPercent}% of ${marked} = ${discountAmount.toFixed(2)}\n`;
      explanation += `2. Selling Price = Marked Price - Discount = ${marked} - ${discountAmount.toFixed(2)} = ${selling.toFixed(2)}\n`;
    }

    if (isNaN(cost) || isNaN(selling)) {
      setResult("Please enter valid cost and selling price.");
      return;
    }

    const diff = selling - cost;
    const absDiff = Math.abs(diff);
    const percent = ((absDiff / cost) * 100).toFixed(2);

    if (diff > 0) {
      explanation += `3. Profit = SP - CP = ${selling} - ${cost} = ${absDiff}\n`;
      explanation += `4. Profit% = (Profit / CP) × 100 = (${absDiff} / ${cost}) × 100 = ${percent}%`;
      setResult(`Profit of ${absDiff} (${percent}%)`);
    } else if (diff < 0) {
      explanation += `3. Loss = CP - SP = ${cost} - ${selling} = ${absDiff}\n`;
      explanation += `4. Loss% = (Loss / CP) × 100 = (${absDiff} / ${cost}) × 100 = ${percent}%`;
      setResult(`Loss of ${absDiff} (${percent}%)`);
    } else {
      explanation += `3. No Profit, No Loss.`;
      setResult("No Profit, No Loss");
    }

    setSteps(explanation);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <h1>Profit, Loss & Discount Lab Ethiopia</h1>

      <div style={{ marginBottom: 16 }}>
        <label><strong>Cost Price (CP):</strong></label>
        <input
          type="number"
          value={cp}
          onChange={(e) => setCp(e.target.value)}
          placeholder="e.g. 100"
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label><strong>Selling Price (SP):</strong> <span style={{ fontStyle: "italic" }}>(or leave blank if using discount)</span></label>
        <input
          type="number"
          value={sp}
          onChange={(e) => setSp(e.target.value)}
          placeholder="e.g. 120"
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label><strong>Marked Price (MP):</strong> <span style={{ fontStyle: "italic" }}>(optional)</span></label>
        <input
          type="number"
          value={mp}
          onChange={(e) => setMp(e.target.value)}
          placeholder="e.g. 150"
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label><strong>Discount (%):</strong> <span style={{ fontStyle: "italic" }}>(optional)</span></label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="e.g. 10"
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        />
      </div>

      <button
        onClick={handleCalculate}
        style={{
          width: "100%",
          padding: 14,
          fontSize: 18,
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Calculate
      </button>

      {result && (
        <div
          style={{
            background: "#e9f7ef",
            color: "#155724",
            padding: 16,
            marginTop: 20,
            borderRadius: 6,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {result}
        </div>
      )}

      {steps && (
        <pre style={{ background: "#f1f1f1", padding: 16, marginTop: 16, borderRadius: 6, whiteSpace: "pre-wrap" }}>
          {steps}
        </pre>
      )}

      {/* Navigation */}
      <nav style={{ marginTop: 30, display: "flex", gap: 20, justifyContent: "center" }}>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#007BFF" : "#333", textDecoration: "none" })}>
          Home
        </NavLink>
        <NavLink to="/profit-loss" style={({ isActive }) => ({ color: isActive ? "#007BFF" : "#333", textDecoration: "none" })}>
          Profit & Loss Lab
        </NavLink>
        <NavLink to="/number-systems" style={({ isActive }) => ({ color: isActive ? "#007BFF" : "#333", textDecoration: "none" })}>
          Number Systems Lab
        </NavLink>
      </nav>
    </div>
  );
};

export default ProfitLoss;
