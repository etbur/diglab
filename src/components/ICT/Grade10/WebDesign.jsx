import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./WebDesign.css";

const WebDesign = () => {
  // State for the code editor
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>Ethiopian Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }
    header {
      background-color: #046a38;
      color: #fcd116;
      padding: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to Ethiopia</h1>
  </header>
  <main>
    <p>This is a sample website about Ethiopian culture.</p>
  </main>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Add your CSS here */
header {
  border-bottom: 2px solid #fcd116;
}

main {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px auto;
}`);

  const [jsCode, setJsCode] = useState(`// Add JavaScript interactivity
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  header.addEventListener('click', function() {
    alert('Selam from Ethiopia!');
  });
});`);

  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("html");
  const [showPreview, setShowPreview] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [fontSize, setFontSize] = useState(14);
  const [isRunning, setIsRunning] = useState(false);

  // Ethiopian web design templates
  const templates = [
    {
      name: "Tourism Site",
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Explore Ethiopia</title>
  <style>
    body { font-family: 'Abyssinica SIL', serif; background: #f8f3e6; }
    .banner { 
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                 url('https://via.placeholder.com/1200x400');
      height: 400px;
      background-size: cover;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="banner">
    <h1>Discover Ethiopia's Wonders</h1>
  </div>
</body>
</html>`
    },
    {
      name: "Coffee Shop",
      html: `<!DOCTYPE html>
<html>
<head>
  <title>Ethiopian Coffee</title>
  <style>
    body { background: #4a2c12; color: #f8dcb4; }
    .coffee-card {
      background: #5d3a1a;
      border: 2px solid #f8dcb4;
      border-radius: 8px;
      padding: 20px;
      margin: 20px;
    }
  </style>
</head>
<body>
  <div class="coffee-card">
    <h2>Traditional Ethiopian Coffee</h2>
    <p>Served with incense ceremony</p>
  </div>
</body>
</html>`
    }
  ];

  // Update output in real-time
  useEffect(() => {
    const updateOutput = () => {
      const fullCode = `
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `;
      setOutput(fullCode);
    };

    const debounce = setTimeout(() => {
      updateOutput();
    }, 500);

    return () => clearTimeout(debounce);
  }, [htmlCode, cssCode, jsCode]);

  // Run JS code
  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      try {
        const iframe = document.getElementById('preview-frame');
        iframe.contentWindow.eval(jsCode);
      } catch (error) {
        console.error("JavaScript error:", error);
      }
      setIsRunning(false);
    }, 100);
  };

  // Apply template
  const applyTemplate = (templateHtml) => {
    setHtmlCode(templateHtml);
    setActiveTab("html");
  };

  return (
    <div className={`web-design-lab ${selectedTheme}`}>
      <header>
        <h1>Web Design & HTML/CSS Basics Lab Ethiopia</h1>
        <p>Interactive coding environment for learning web development</p>
      </header>

      <div className="controls">
        <div className="left-controls">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className={showPreview ? "active" : ""}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button onClick={runCode} disabled={isRunning}>
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>
        
        <div className="right-controls">
          <select 
            value={selectedTheme} 
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="green">Green Theme</option>
          </select>
          
          <select
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          >
            <option value={12}>Small Text</option>
            <option value={14}>Medium Text</option>
            <option value={16}>Large Text</option>
          </select>
        </div>
      </div>

      <div className="editor-container">
        <div className="code-editor" style={{ fontSize: `${fontSize}px` }}>
          <div className="tabs">
            <button 
              className={activeTab === "html" ? "active" : ""}
              onClick={() => setActiveTab("html")}
            >
              HTML
            </button>
            <button 
              className={activeTab === "css" ? "active" : ""}
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
            <button 
              className={activeTab === "js" ? "active" : ""}
              onClick={() => setActiveTab("js")}
            >
              JavaScript
            </button>
          </div>
          
          <div className="editor-content">
            {activeTab === "html" && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                spellCheck="false"
              />
            )}
            {activeTab === "css" && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                spellCheck="false"
              />
            )}
            {activeTab === "js" && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                spellCheck="false"
              />
            )}
          </div>
        </div>
        
        {showPreview && (
          <div className="preview-pane">
            <h3>Live Preview</h3>
            <iframe
              id="preview-frame"
              title="output"
              sandbox="allow-scripts"
              srcDoc={output}
            />
          </div>
        )}
      </div>

      <div className="templates-section">
        <h3>Ethiopian Web Templates</h3>
        <div className="template-grid">
          {templates.map((template, index) => (
            <div 
              key={index} 
              className="template-card"
              onClick={() => applyTemplate(template.html)}
            >
              <div className="template-preview" dangerouslySetInnerHTML={{ __html: template.html }} />
              <div className="template-name">{template.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="learning-resources">
        <h3>Web Design Learning Resources</h3>
        <div className="resource-grid">
          <NavLink to="/html-basics" className="resource-card">
            <h4>HTML Basics</h4>
            <p>Learn the structure of web pages</p>
          </NavLink>
          <NavLink to="/css-fundamentals" className="resource-card">
            <h4>CSS Fundamentals</h4>
            <p>Style your web pages beautifully</p>
          </NavLink>
          <NavLink to="/ethiopian-web-design" className="resource-card">
            <h4>Ethiopian Design Patterns</h4>
            <p>Cultural design elements</p>
          </NavLink>
          <NavLink to="/responsive-design" className="resource-card">
            <h4>Responsive Design</h4>
            <p>Make sites work on all devices</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WebDesign;