// Import React and useState for managing component state
import React, { useState } from "react";

// Import parse function from mathjs to parse and evaluate algebraic expressions
import { parse } from "mathjs";

// Import NavLink for navigation (optional, depending on your routing)
import { NavLink } from "react-router-dom";

const AlgebraicExpressions = () => {
  // State to store the algebraic expression input by the user
  const [expression, setExpression] = useState("2*x + 7");

  // State to store the value of variable x input by the user
  const [xValue, setXValue] = useState("");

  // State to store the final result after evaluation
  const [result, setResult] = useState(null);

  // State to store step-by-step explanation as array of strings
  const [steps, setSteps] = useState([]);

  // State to store any error messages
  const [error, setError] = useState(null);

  // Function to evaluate the expression with the given x value and generate steps
  const handleEvaluate = () => {
    // Clear previous error, result, and steps
    setError(null);
    setResult(null);
    setSteps([]);

    // Convert xValue to number
    const xNum = Number(xValue);

    // Validate x input is a number
    if (isNaN(xNum)) {
      setError("Please enter a valid numeric value for x.");
      return;
    }

    try {
      // Step 1: Show the original expression
      const step1 = `Original expression: ${expression}`;

      // Step 2: Substitute x with value, wrapping value in parentheses
      // Use regex to replace all occurrences of 'x' as a standalone variable
      const substitutedExpr = expression.replace(/\bx\b/g, `(${xNum})`);
      const step2 = `Substitute x = ${xNum}: ${substitutedExpr}`;

      // Parse substituted expression for safe evaluation
      const exprParsed = parse(substitutedExpr);

      // Evaluate the substituted expression
      const evalResult = exprParsed.evaluate();

      // Step 3: Try to simplify step (manual for simple expressions)
      // For example, split by '+' and evaluate terms if possible for demonstration
      // This is basic and assumes simple linear expression for demo purposes

      // We'll attempt to evaluate multiplication parts inside the expression and show partial result
      // Find parts matching multiplication like "number * (number)"
      const mulMatches = substitutedExpr.match(/(\d+)\*\(\d+\)/g);

      let step3 = "";
      let step3Expr = substitutedExpr;

      if (mulMatches && mulMatches.length > 0) {
        mulMatches.forEach((mul) => {
          // Evaluate each multiplication found
          const val = parse(mul).evaluate();
          // Replace multiplication with its value in the expression string
          step3Expr = step3Expr.replace(mul, val);
        });
        step3 = `Calculate multiplications: ${step3Expr}`;
      } else {
        step3 = `Expression after substitution: ${substitutedExpr}`;
      }

      // Step 4: Final result
      const step4 = `Final result: ${evalResult}`;

      // Update states
      setResult(evalResult);
      setSteps([step1, step2, step3, step4]);
    } catch (err) {
      setError("Invalid algebraic expression. Please check your input.");
    }
  };

  // JSX: Render the interactive UI with step by step explanation
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <h1>Algebraic Expressions Lab Ethiopia</h1>

      {/* Input for algebraic expression */}
      <section>
        <label htmlFor="exprInput" style={{ fontWeight: "bold" }}>
          Enter an algebraic expression in variable <em>x</em>:
        </label>
        <input
          id="exprInput"
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)} // Update expression on input change
          style={{
            width: "100%",
            padding: 8,
            marginTop: 8,
            marginBottom: 16,
            fontSize: 16,
          }}
          placeholder="e.g. 2*x + 7"
        />
      </section>

      {/* Input for value of x */}
      <section>
        <label htmlFor="xInput" style={{ fontWeight: "bold" }}>
          Enter value for <em>x</em>:
        </label>
        <input
          id="xInput"
          type="text"
          value={xValue}
          onChange={(e) => setXValue(e.target.value)} // Update xValue on input change
          style={{
            width: "100%",
            padding: 8,
            marginTop: 8,
            marginBottom: 16,
            fontSize: 16,
          }}
          placeholder="e.g. 3"
        />
      </section>

      {/* Evaluate button */}
      <button
        onClick={handleEvaluate} // Call handleEvaluate when clicked
        style={{
          padding: "10px 20px",
          fontSize: 16,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: 4,
        }}
      >
        Evaluate
      </button>

      {/* Display error message if any */}
      {error && (
        <p style={{ marginTop: 20, color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {/* Display final result if available */}
      {result !== null && !error && (
        <p style={{ marginTop: 20, fontSize: 18 }}>
          Result: <strong>{result.toString()}</strong>
        </p>
      )}

      {/* Display step-by-step solution */}
      {steps.length > 0 && (
        <div
          style={{
            marginTop: 30,
            backgroundColor: "#f9f9f9",
            padding: 20,
            borderRadius: 8,
          }}
        >
          <h2>Step-by-Step Solution:</h2>
          <ol>
            {steps.map((step, index) => (
              <li key={index} style={{ marginBottom: 10 }}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      
    </div>
  );
};

export default AlgebraicExpressions;
