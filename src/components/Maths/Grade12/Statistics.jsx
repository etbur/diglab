import React from "react";

const Statistics = () => {
  return (
    <div className="statistics-grade12">
      <h1>📊 Statistics - Grade 12</h1>
      <p>Advanced statistical analysis, inference, and data interpretation.</p>

      <div className="content-section">
        <h2>Statistical Methods</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Descriptive Statistics</h3>
            <p>Summarizing and describing data</p>
            <ul>
              <li>Measures of central tendency</li>
              <li>Measures of dispersion</li>
              <li>Data visualization</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Inferential Statistics</h3>
            <p>Making inferences about populations</p>
            <ul>
              <li>Hypothesis testing</li>
              <li>Confidence intervals</li>
              <li>Regression analysis</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Non-parametric Methods</h3>
            <p>Statistical tests without distribution assumptions</p>
            <ul>
              <li>Chi-square tests</li>
              <li>Sign tests</li>
              <li>Rank correlation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Data Analysis</h3>
            <p>Analyzing real-world datasets</p>
          </div>

          <div className="application">
            <h3>Research Methods</h3>
            <p>Designing and analyzing experiments</p>
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

export default Statistics;