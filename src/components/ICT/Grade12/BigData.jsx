import React from "react";

const BigData = () => {
  return (
    <div className="big-data-grade12">
      <h1>📊 Big Data Analytics - Grade 12</h1>
      <p>Learn to handle, process, and analyze large-scale data sets.</p>

      <div className="content-section">
        <h2>Data Management</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Data Storage</h3>
            <p>Large-scale data storage solutions</p>
            <ul>
              <li>Distributed databases</li>
              <li>Data warehouses</li>
              <li>NoSQL databases</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Data Processing</h3>
            <p>Techniques for processing large datasets</p>
            <ul>
              <li>MapReduce</li>
              <li>Stream processing</li>
              <li>Batch processing</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Data Analytics</h3>
            <p>Extracting insights from big data</p>
            <ul>
              <li>Predictive analytics</li>
              <li>Data mining</li>
              <li>Machine learning</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Big Data Tools</h2>
        <div className="tools">
          <div className="tool">
            <h3>Hadoop Ecosystem</h3>
            <p>Distributed computing and storage framework</p>
          </div>

          <div className="tool">
            <h3>Spark</h3>
            <p>Fast big data processing engine</p>
          </div>

          <div className="tool">
            <h3>Data Visualization</h3>
            <p>Tools for presenting data insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigData;