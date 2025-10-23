import React from "react";

const NetworkSecurity = () => {
  return (
    <div className="network-security-grade12">
      <h1>🌐 Network Security - Grade 12</h1>
      <p>Master network security principles, protocols, and defense mechanisms.</p>

      <div className="content-section">
        <h2>Network Security Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Network Protocols</h3>
            <p>Secure communication protocols and standards</p>
            <ul>
              <li>SSL/TLS</li>
              <li>IPsec</li>
              <li>Secure protocols</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Access Control</h3>
            <p>Authentication and authorization mechanisms</p>
            <ul>
              <li>Multi-factor authentication</li>
              <li>Role-based access control</li>
              <li>Zero trust architecture</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Threat Detection</h3>
            <p>Monitoring and detecting network threats</p>
            <ul>
              <li>Intrusion detection systems</li>
              <li>Network monitoring</li>
              <li>Security information and event management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Security Implementation</h2>
        <div className="implementations">
          <div className="implementation">
            <h3>Firewall Configuration</h3>
            <p>Setting up and managing network firewalls</p>
          </div>

          <div className="implementation">
            <h3>VPN Setup</h3>
            <p>Virtual private network configuration and management</p>
          </div>

          <div className="implementation">
            <h3>Wireless Security</h3>
            <p>Securing wireless networks and devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSecurity;