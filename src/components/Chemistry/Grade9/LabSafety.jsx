// src/App.js
import React, { useState } from "react";

const sections = {
  home: {
    title: "Welcome to Grade 9 Chemistry Lab Ethiopia",
    content: (
      <>
        <p>
          Explore the basics of chemistry: elements, compounds, mixtures, indicators, and lab safety.
          This interactive learning tool is designed for Grade 9 students.
        </p>
      </>
    ),
  },
  elements: {
    title: "Elements",
    content: (
      <>
        <p>
          Elements are pure substances consisting of only one type of atom. Examples include oxygen, hydrogen, and gold.
        </p>
        <ul>
          <li>Cannot be broken down into simpler substances.</li>
          <li>Represented by chemical symbols (e.g., O, H, Au).</li>
          <li>Found on the Periodic Table.</li>
        </ul>
      </>
    ),
  },
  compounds: {
    title: "Compounds",
    content: (
      <>
        <p>
          Compounds are substances formed when two or more elements chemically combine.
        </p>
        <ul>
          <li>Have fixed ratios (e.g., H₂O is water).</li>
          <li>Properties are different from their elements.</li>
          <li>Can be broken down by chemical reactions.</li>
        </ul>
      </>
    ),
  },
  mixtures: {
    title: "Mixtures",
    content: (
      <>
        <p>
          Mixtures contain two or more substances physically combined.
        </p>
        <ul>
          <li>No fixed ratio.</li>
          <li>Components keep their properties.</li>
          <li>Can be separated physically (e.g., filtration).</li>
        </ul>
      </>
    ),
  },
  indicators: {
    title: "Indicators (Litmus, Universal)",
    content: (
      <>
        <p>
          Indicators are chemicals used to determine the pH of substances.
        </p>
        <ul>
          <li>Litmus paper turns red in acids, blue in bases.</li>
          <li>Universal indicator shows a range of colors depending on pH.</li>
          <li>Used to classify substances as acidic, basic, or neutral.</li>
        </ul>
      </>
    ),
  },
  labsafety: {
    title: "Lab Safety",
    content: (
      <>
        <p>Always follow lab safety rules to protect yourself and others:</p>
        <ul>
          <li>Wear goggles, gloves, and lab coats.</li>
          <li>Know where safety equipment is located.</li>
          <li>Handle chemicals carefully.</li>
          <li>Report accidents immediately.</li>
          <li>Keep your workspace clean and organized.</li>
        </ul>
      </>
    ),
  },
};

function Nav({ currentSection, setCurrentSection }) {
  return (
    <nav style={{ marginBottom: 20, textAlign: "center" }}>
      {Object.keys(sections).map((key) => (
        <button
          key={key}
          onClick={() => setCurrentSection(key)}
          style={{
            margin: "0 8px",
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: currentSection === key ? "#007bff" : "#eee",
            color: currentSection === key ? "white" : "#333",
            border: "none",
            borderRadius: 4,
          }}
        >
          {sections[key].title}
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");

  const section = sections[currentSection];

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "20px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fafafa",
      }}
    >
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ textAlign: "center" }}>Grade 9 Chemistry Lab Ethiopia</h1>
      </header>

      <Nav currentSection={currentSection} setCurrentSection={setCurrentSection} />

      <main>
        <h2 style={{ color: "#007bff", marginBottom: 16 }}>{section.title}</h2>
        <div style={{ fontSize: 18, lineHeight: 1.6 }}>{section.content}</div>
      </main>

      <footer
        style={{
          textAlign: "center",
          marginTop: 40,
          paddingTop: 10,
          color: "#666",
          fontSize: 14,
          borderTop: "1px solid #ddd",
        }}
      >
        © {new Date().getFullYear()} Grade 9 Chemistry Lab Ethiopia
      </footer>
    </div>
  );
}
