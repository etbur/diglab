import React from "react";

const Probability = () => {
  return (
    <div className="probability-grade12">
      <h1>🎲 Probability - Grade 12</h1>
      <p>Advanced probability theory, distributions, and statistical inference.</p>

      <div className="content-section">
        <h2>Probability Distributions</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Discrete Distributions</h3>
            <p>Probability models for discrete random variables</p>
            <ul>
              <li>Binomial distribution</li>
              <li>Poisson distribution</li>
              <li>Geometric distribution</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Continuous Distributions</h3>
            <p>Probability models for continuous variables</p>
            <ul>
              <li>Normal distribution</li>
              <li>Exponential distribution</li>
              <li>Uniform distribution</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Sampling Theory</h3>
            <p>Statistical sampling and inference</p>
            <ul>
              <li>Central limit theorem</li>
              <li>Sampling distributions</li>
              <li>Confidence intervals</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Hypothesis Testing</h3>
            <p>Statistical testing and decision making</p>
          </div>

          <div className="application">
            <h3>Risk Analysis</h3>
            <p>Probability in business and finance</p>
          </div>

          <div className="application">
            <h3>Quality Control</h3>
            <p>Statistical process control</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Probability;