import React, { useState, useEffect, useRef } from "react";

const TEXT_OPTIONS = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests are a fun way to improve speed.",
  "React makes building UIs simple and powerful.",
  "Practice makes perfect when learning to type.",
  "Ethiopia has diverse languages and cultures.",
  "Every time you finish a sentence, a new one loads automatically.",
  "You can select a time limit before typing begins.",
];

const TypingSpeed = () => {
  const [sampleText, setSampleText] = useState("");
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState(60); // user selects
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(null);
  const [totalWords, setTotalWords] = useState(0);
  const inputRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    loadNewText();
  }, []);

  useEffect(() => {
    if (startTime && !isFinished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [startTime]);

  const loadNewText = () => {
    const random = TEXT_OPTIONS[Math.floor(Math.random() * TEXT_OPTIONS.length)];
    setSampleText(random);
    setInput("");
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (!isFinished) {
      setInput(value);

      // If full sentence typed correctly
      if (value === sampleText) {
        const words = value.trim().split(/\s+/).length;
        setTotalWords((prev) => prev + words);
        setInput("");
        loadNewText();
      }
    }
  };

  const finishTest = () => {
    setIsFinished(true);

    // Count remaining unfinished words
    const remainingWords = input.trim().split(/\s+/).filter(Boolean).length;
    const finalWords = totalWords + remainingWords;
    const timeSpent = (duration - timeLeft) / 60;
    const calculatedWpm = Math.round(finalWords / timeSpent);

    setTotalWords(finalWords);
    setWpm(calculatedWpm);
  };

  const resetTest = () => {
    setIsFinished(false);
    setStartTime(null);
    setInput("");
    setTimeLeft(duration);
    setWpm(null);
    setTotalWords(0);
    clearInterval(intervalRef.current);
    loadNewText();
    inputRef.current.focus();
  };

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value, 10);
    setDuration(newDuration);
    setTimeLeft(newDuration);
    resetTest();
  };

  return (
    <div style={styles.container}>
      <h1>Typing Speed Test Lab - Ethiopia</h1>

      <div style={styles.controls}>
        <label>
          Set Test Time:
          <select
            value={duration}
            onChange={handleDurationChange}
            style={styles.select}
            disabled={startTime !== null}
          >
            <option value={30}>30 sec</option>
            <option value={60}>60 sec</option>
            <option value={90}>90 sec</option>
            <option value={300}>300 sec</option>
          </select>
        </label>
        <div><strong>Time Left:</strong> {timeLeft}s</div>
      </div>

      <div style={styles.sampleText}>
        {sampleText.split("").map((char, idx) => {
          let color;
          if (idx < input.length) {
            color = char === input[idx] ? "green" : "red";
          } else {
            color = "#333";
          }
          return (
            <span key={idx} style={{ color }}>
              {char}
            </span>
          );
        })}
      </div>

      <textarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        rows="5"
        cols="60"
        disabled={isFinished || timeLeft === 0}
        style={styles.textarea}
      />

      {isFinished && (
        <div style={styles.results}>
          <p><strong>Total words typed:</strong> {totalWords}</p>
          <p><strong>Your speed:</strong> {wpm} WPM</p>
          <button onClick={resetTest} style={styles.button}>Try Again</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#f4f8fa",
    borderRadius: "12px",
    textAlign: "center",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    alignItems: "center",
    padding: "10px",
  },
  select: {
    marginLeft: "10px",
    padding: "5px",
    fontSize: "14px",
  },
  sampleText: {
    fontSize: "18px",
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    textAlign: "left",
    lineHeight: "1.6",
    minHeight: "80px",
  },
  textarea: {
    fontSize: "16px",
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  results: {
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default TypingSpeed;
