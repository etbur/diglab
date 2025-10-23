import React from "react";

const ArtificialIntelligence = () => {
  return (
    <div className="artificial-intelligence-grade12">
      <h1>🤖 Artificial Intelligence - Grade 12</h1>
      <p>Explore the fundamentals of AI, machine learning, and intelligent systems.</p>

      <div className="content-section">
        <h2>AI Fundamentals</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3>Machine Learning</h3>
            <p>Algorithms that learn from data</p>
            <ul>
              <li>Supervised learning</li>
              <li>Unsupervised learning</li>
              <li>Reinforcement learning</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>Neural Networks</h3>
            <p>Deep learning and neural architectures</p>
            <ul>
              <li>Convolutional networks</li>
              <li>Recurrent networks</li>
              <li>Transformer models</li>
            </ul>
          </div>

          <div className="topic-card">
            <h3>AI Ethics</h3>
            <p>Responsible AI development and deployment</p>
            <ul>
              <li>Bias and fairness</li>
              <li>Privacy concerns</li>
              <li>AI safety</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-section">
        <h2>AI Applications</h2>
        <div className="applications">
          <div className="application">
            <h3>Computer Vision</h3>
            <p>Image recognition and analysis systems</p>
          </div>

          <div className="application">
            <h3>Natural Language Processing</h3>
            <p>Text understanding and generation</p>
          </div>

          <div className="application">
            <h3>Robotics & Automation</h3>
            <p>Intelligent systems and autonomous agents</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtificialIntelligence;