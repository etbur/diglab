import React from "react";

const ServerManagement = () => {
  return (
    <div className="server-management-grade11">
      <h1>🖥️ Server Management - Grade 11</h1>
      <p>Introduction to server administration and network infrastructure.</p>

      <div className="content-section">
        <h2>Server Administration</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Operating Systems</h3>
            <p>Server operating system management</p>
            <ul>
              <li>Linux server administration</li>
              <li>Windows Server</li>
              <li>System configuration</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Network Services</h3>
            <p>Essential network services setup</p>
            <ul>
              <li>DNS configuration</li>
              <li>DHCP setup</li>
              <li>Web server deployment</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Security Management</h3>
            <p>Server security and access control</p>
            <ul>
              <li>User management</li>
              <li>Firewall configuration</li>
              <li>Backup and recovery</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>System Administration</h2>
        <div className="applications">
          <div className="application">
            <h3>Performance Monitoring</h3>
            <p>System monitoring and optimization</p>
          </div>

          <div className="application">
            <h3>Automation</h3>
            <p>Scripting and automation tools</p>
          </div>

          <div className="application">
            <h3>Troubleshooting</h3>
            <p>Problem diagnosis and resolution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerManagement;