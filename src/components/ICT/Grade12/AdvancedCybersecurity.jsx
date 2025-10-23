import React from "react";

const AdvancedCybersecurity = () => {
  return (
    <div className="advanced-cybersecurity-grade12">
      <h1>🔒 Advanced Cybersecurity - Grade 12</h1>
      <p>Explore advanced concepts in cybersecurity, threat analysis, and defense strategies.</p>

      <div className="content-section">
        <h2>Cybersecurity Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Threat Analysis</h3>
            <p>Understanding and analyzing cyber threats</p>
            <ul>
              <li>Malware analysis</li>
              <li>Vulnerability assessment</li>
              <li>Risk analysis</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Network Security</h3>
            <p>Advanced network protection techniques</p>
            <ul>
              <li>Firewall configuration</li>
              <li>IDS/IPS systems</li>
              <li>Secure network architecture</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Cryptographic Systems</h3>
            <p>Advanced encryption and cryptographic protocols</p>
            <ul>
              <li>Public key infrastructure</li>
              <li>Digital signatures</li>
              <li>Blockchain security</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Cybersecurity Tools & Techniques</h2>
        <div className="tools">
          <div className="tool">
            <h3>Penetration Testing</h3>
            <p>Ethical hacking and vulnerability testing methodologies</p>
          </div>

          <div className="tool">
            <h3>Forensic Analysis</h3>
            <p>Digital forensics and incident response</p>
          </div>

          <div className="tool">
            <h3>Security Auditing</h3>
            <p>Comprehensive security assessment and compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCybersecurity;