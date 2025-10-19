import React, { useState } from "react";

const SCENARIOS = [
  {
    id: 1,
    title: "Scenario 1: Suspicious Email",
    description: `You receive an email that looks like it's from your bank. It asks you to click a link to "verify your account" immediately.
Is this safe to do?`,
    options: [
      {
        text: "Click the link and enter your details.",
        safe: false,
        explanation:
          "⚠️ This is a phishing attempt! Banks never ask for sensitive information via email. Clicking links can steal your data or infect your device.",
      },
      {
        text: "Ignore the email and contact the bank directly by phone or website.",
        safe: true,
        explanation:
          "✅ Correct! Contacting the bank directly keeps your information safe and helps confirm if the email was legitimate.",
      },
    ],
  },
  {
    id: 2,
    title: "Scenario 2: Public Wi-Fi",
    description: `You want to check your emails at a cafe using free public Wi-Fi. What should you do to protect your information?`,
    options: [
      {
        text: "Connect and log in normally without any protection.",
        safe: false,
        explanation:
          "⚠️ Unsafe! Public Wi-Fi networks can be insecure, allowing hackers to see your data.",
      },
      {
        text: "Use a Virtual Private Network (VPN) before connecting.",
        safe: true,
        explanation:
          "✅ Great! A VPN encrypts your data, protecting it from hackers on public networks.",
      },
    ],
  },
  {
    id: 3,
    title: "Scenario 3: Software Updates",
    description: `You see a pop-up on your computer telling you your antivirus is out of date. It asks you to click 'Update' now. What should you do?`,
    options: [
      {
        text: "Click the pop-up and download the update immediately.",
        safe: false,
        explanation:
          "⚠️ Be careful! Pop-ups can be fake and install malware. Always update software through official apps or websites.",
      },
      {
        text: "Open your antivirus software manually and update from there.",
        safe: true,
        explanation:
          "✅ Correct! Updating through the official software ensures safety.",
      },
    ],
  },
  {
    id: 4,
    title: "Scenario 4: Password Security",
    description: `You are creating a new password for your online account. Which is the safest choice?`,
    options: [
      {
        text: "Using your birthdate or '123456' because they are easy to remember.",
        safe: false,
        explanation:
          "⚠️ Weak passwords can be easily guessed or hacked.",
      },
      {
        text: "Use a long password with letters, numbers, and symbols.",
        safe: true,
        explanation:
          "✅ Strong passwords help protect your account from unauthorized access.",
      },
    ],
  },
  {
    id: 5,
    title: "Scenario 5: Social Media Privacy",
    description: `You want to share your holiday photos on social media. What should you consider before posting?`,
    options: [
      {
        text: "Post everything publicly without checking privacy settings.",
        safe: false,
        explanation:
          "⚠️ Public posts can be seen by anyone, including strangers, which can risk your privacy.",
      },
      {
        text: "Adjust privacy settings to share only with friends you trust.",
        safe: true,
        explanation:
          "✅ Good practice! Control who sees your posts to stay safe online.",
      },
    ],
  },
];

const InternetSafety = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentScenario = SCENARIOS[currentIndex];

  const onSelectOption = (option) => {
    if (showExplanation) return; // prevent multiple selects
    setSelectedOption(option);
    setShowExplanation(true);
    if (option.safe) setScore((prev) => prev + 1);
  };

  const onNext = () => {
    if (currentIndex + 1 < SCENARIOS.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const onRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <main style={styles.container} role="main" aria-label="Internet Safety Simulator">
      <h1 style={styles.heading}>Internet Safety Simulator</h1>

      {!completed ? (
        <section style={styles.card} aria-live="polite" aria-atomic="true">
          <h2 tabIndex="0" style={styles.scenarioTitle}>{currentScenario.title}</h2>
          <p style={styles.description}>{currentScenario.description}</p>

          <div style={styles.options}>
            {currentScenario.options.map((option, i) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={i}
                  onClick={() => onSelectOption(option)}
                  disabled={showExplanation}
                  aria-pressed={isSelected}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: isSelected
                      ? option.safe
                        ? "#4caf50"
                        : "#e53935"
                      : "#1976d2",
                    cursor: showExplanation ? "default" : "pointer",
                  }}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          {showExplanation && selectedOption && (
            <div
              role="alert"
              style={{
                ...styles.explanation,
                color: selectedOption.safe ? "#2e7d32" : "#b71c1c",
              }}
            >
              {selectedOption.explanation}
              <button
                onClick={onNext}
                style={styles.nextButton}
                aria-label={
                  currentIndex + 1 === SCENARIOS.length
                    ? "See results"
                    : "Next scenario"
                }
              >
                {currentIndex + 1 === SCENARIOS.length
                  ? "See Results"
                  : "Next Scenario"}
              </button>
            </div>
          )}

          <footer style={styles.footer}>
            Scenario {currentIndex + 1} of {SCENARIOS.length}
          </footer>
        </section>
      ) : (
        <section style={styles.resultsCard} aria-live="polite" aria-atomic="true">
          <h2 tabIndex="0">Experiment Complete!</h2>
          <p>
            You answered <strong>{score}</strong> out of <strong>{SCENARIOS.length}</strong> correctly.
          </p>
          <p>Remember: Practicing internet safety keeps you and your information secure online.</p>
          <button onClick={onRestart} style={styles.restartButton} aria-label="Restart experiment">
            Restart Experiment
          </button>
        </section>
      )}
    </main>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 700,
    margin: "3rem auto",
    padding: "1rem",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
    color: "#222",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  scenarioTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.15rem",
    lineHeight: 1.6,
    marginBottom: "2rem",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  optionButton: {
    fontSize: "1rem",
    padding: "12px 18px",
    borderRadius: "6px",
    border: "none",
    color: "white",
    transition: "background-color 0.3s ease",
  },
  explanation: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
  },
  nextButton: {
    marginTop: "1rem",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px 22px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  footer: {
    fontSize: "0.9rem",
    color: "#555",
    textAlign: "right",
  },
  resultsCard: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  restartButton: {
    marginTop: "1.5rem",
    backgroundColor: "#388e3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "12px 28px",
    cursor: "pointer",
    fontSize: "1.1rem",
    transition: "background-color 0.3s ease",
  },
};

export default InternetSafety;
