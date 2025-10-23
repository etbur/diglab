import React from "react";

const Statistics = () => {
  return (
    <div className="statistics-grade11">
      <h1>📊 Statistics - Grade 11</h1>
      <p>Introduction to statistical analysis and data interpretation.</p>

      <div className="content-section">
        <h2>Descriptive Statistics</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Measures of Central Tendency</h3>
            <p>Mean, median, and mode</p>
            <ul>
              <li>Arithmetic mean</li>
              <li>Median calculation</li>
              <li>Mode identification</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Measures of Dispersion</h3>
            <p>Range, variance, and standard deviation</p>
            <ul>
              <li>Range and interquartile range</li>
              <li>Variance calculation</li>
              <li>Standard deviation</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Data Visualization</h3>
            <p>Graphs and charts for data representation</p>
            <ul>
              <li>Histograms</li>
              <li>Box plots</li>
              <li>Scatter plots</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Statistical Analysis</h2>
        <div className="applications">
          <div className="application">
            <h3>Data Collection</h3>
            <p>Methods for gathering statistical data</p>
          </div>

          <div className="application">
            <h3>Probability Basics</h3>
            <p>Introduction to probability concepts</p>
          </div>

          <div className="application">
            <h3>Real-world Applications</h3>
            <p>Statistics in everyday life</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;