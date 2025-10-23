import React from "react";

const CloudComputing = () => {
  return (
    <div className="cloud-computing-grade11">
      <h1>☁️ Cloud Computing - Grade 11</h1>
      <p>Introduction to cloud computing concepts and services.</p>

      <div className="content-section">
        <h2>Cloud Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Cloud Service Models</h3>
            <p>IaaS, PaaS, and SaaS explained</p>
            <ul>
              <li>Infrastructure as a Service</li>
              <li>Platform as a Service</li>
              <li>Software as a Service</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Cloud Deployment Models</h3>
            <p>Public, private, and hybrid clouds</p>
            <ul>
              <li>Public cloud benefits</li>
              <li>Private cloud security</li>
              <li>Hybrid cloud flexibility</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Cloud Security</h3>
            <p>Security considerations in cloud environments</p>
            <ul>
              <li>Data encryption</li>
              <li>Access control</li>
              <li>Compliance standards</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Cloud Services</h2>
        <div className="applications">
          <div className="application">
            <h3>Storage Solutions</h3>
            <p>Cloud storage and backup services</p>
          </div>

          <div className="application">
            <h3>Compute Resources</h3>
            <p>Virtual machines and serverless computing</p>
          </div>

          <div className="application">
            <h3>Database Services</h3>
            <p>Cloud-hosted database solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudComputing;