import React from "react";

const MobileAppDev = () => {
  return (
    <div className="mobile-app-dev-grade11">
      <h1>📱 Mobile App Development - Grade 11</h1>
      <p>Introduction to mobile application development for iOS and Android.</p>

      <div className="content-section">
        <h2>Mobile Development Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>App Design Principles</h3>
            <p>User interface and user experience design</p>
            <ul>
              <li>UI/UX principles</li>
              <li>Wireframing</li>
              <li>Prototyping</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Cross-Platform Development</h3>
            <p>Developing apps for multiple platforms</p>
            <ul>
              <li>React Native</li>
              <li>Flutter</li>
              <li>Hybrid apps</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>App Store Deployment</h3>
            <p>Publishing and distributing mobile apps</p>
            <ul>
              <li>App store guidelines</li>
              <li>Testing and debugging</li>
              <li>Version management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>Development Tools</h2>
        <div className="applications">
          <div className="application">
            <h3>Development Environments</h3>
            <p>IDEs and development tools</p>
          </div>

          <div className="application">
            <h3>APIs and Services</h3>
            <p>Integrating external services</p>
          </div>

          <div className="application">
            <h3>Database Integration</h3>
            <p>Local and cloud storage solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppDev;