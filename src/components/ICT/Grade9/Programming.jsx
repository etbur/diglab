import React, { useState, useEffect, useRef } from "react";

const BLOCKS = [
  { id: "move", label: "Move Forward" },
  { id: "left", label: "Turn Left" },
  { id: "right", label: "Turn Right" },
  { id: "repeat", label: "Repeat x3" },
];

const DIRECTIONS = ["UP", "RIGHT", "DOWN", "LEFT"];

const ProgrammingLab = () => {
  // States for UI
  const [view, setView] = useState("blocks"); // 'blocks' or 'code'
  const [program, setProgram] = useState([]); // Array of commands
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [position, setPosition] = useState({ x: 2, y: 2 }); // Robot starts middle grid
  const [direction, setDirection] = useState(0); // 0=UP,1=RIGHT,2=DOWN,3=LEFT
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef(null);

  // Sync code with blocks when blocks change and we're not running
  useEffect(() => {
    if (view === "blocks" && !isRunning) {
      const codeText = program
        .map((cmd, idx) => {
          if (cmd === "move") return "moveForward();";
          if (cmd === "left") return "turnLeft();";
          if (cmd === "right") return "turnRight();";
          if (cmd === "repeat") {
            // Look ahead if next exists and is a command, wrap in repeat block
            if (program[idx + 1]) {
              return `repeat(3, () => {`;
            }
            return "repeat(3, () => {";
          }
          return "";
        })
        .join("\n") + (program.includes("repeat") ? "\n});" : "");
      setCode(codeText);
    }
  }, [program, view, isRunning]);

  // Parse code text to program array
  const parseCodeToProgram = (text) => {
    if (isRunning) return;
    const lines = text.split("\n").map((l) => l.trim());
    let cmds = [];
    let insideRepeat = false;
    for (let line of lines) {
      if (line.startsWith("moveForward")) cmds.push("move");
      else if (line.startsWith("turnLeft")) cmds.push("left");
      else if (line.startsWith("turnRight")) cmds.push("right");
      else if (line.startsWith("repeat")) insideRepeat = true;
      else if (line === "});") insideRepeat = false;
      else if (insideRepeat && line.startsWith("moveForward")) {
        cmds.push("repeat");
        cmds.push("move");
      } else if (insideRepeat && line.startsWith("turnLeft")) {
        cmds.push("repeat");
        cmds.push("left");
      } else if (insideRepeat && line.startsWith("turnRight")) {
        cmds.push("repeat");
        cmds.push("right");
      }
    }
    return cmds;
  };

  // Add block command
  const addBlock = (blockId) => {
    if (isRunning) return;
    setProgram([...program, blockId]);
  };

  // Reset robot position and direction
  const resetRobot = () => {
    if (isRunning) return;
    setPosition({ x: 2, y: 2 });
    setDirection(0);
    setStepIndex(0);
  };

  // Clear program & reset
  const clearProgram = () => {
    if (isRunning) return;
    setProgram([]);
    setCode("");
    resetRobot();
  };

  // Execute single command
  const executeCommand = (cmd) => {
    if (cmd === "move") {
      setPosition((pos) => {
        let { x, y } = pos;
        if (direction === 0 && y > 0) y -= 1;
        else if (direction === 1 && x < 4) x += 1;
        else if (direction === 2 && y < 4) y += 1;
        else if (direction === 3 && x > 0) x -= 1;
        return { x, y };
      });
    } else if (cmd === "left") {
      setDirection((d) => (d + 3) % 4);
    } else if (cmd === "right") {
      setDirection((d) => (d + 1) % 4);
    }
  };

  // Run program with step timing
  useEffect(() => {
    if (!isRunning) return;

    if (stepIndex >= program.length) {
      setIsRunning(false);
      setStepIndex(0);
      return;
    }

    const currentCmd = program[stepIndex];

    if (currentCmd === "repeat") {
      if (stepIndex + 1 < program.length) {
        const nextCmd = program[stepIndex + 1];
        let repeatCount = 3;
        let count = 0;

        const repeatInterval = setInterval(() => {
          executeCommand(nextCmd);
          count++;
          if (count >= repeatCount) {
            clearInterval(repeatInterval);
            setStepIndex((i) => i + 2);
          }
        }, 600);

        return () => clearInterval(repeatInterval);
      } else {
        setStepIndex(stepIndex + 1);
      }
    } else {
      timerRef.current = setTimeout(() => {
        executeCommand(currentCmd);
        setStepIndex((i) => i + 1);
      }, 600);
    }

    return () => clearTimeout(timerRef.current);
  }, [isRunning, stepIndex, program, direction]);

  // Handle code editor input changes
  const onCodeChange = (e) => {
    setCode(e.target.value);
    const cmds = parseCodeToProgram(e.target.value);
    if (cmds.length > 0) setProgram(cmds);
  };

  // Experiment instructions like textbook
  const instructions = (
    <div style={styles.instructions}>
      <h2>Lab Experiment: Basic Programming with Scratch & Code Editor</h2>
      <p>
        In this experiment, you will learn to program a robot on a 5x5 grid.
        The robot can move forward and turn left or right.
      </p>
      <p><b>Objective:</b> Write a program that moves the robot and changes its direction.</p>
      <p><b>How to use:</b></p>
      <ul>
        <li>Use the <b>Blocks View</b> to add commands visually.</li>
        <li>Use the <b>Code Editor</b> to write or edit commands in JavaScript-like syntax.</li>
        <li>Use the <b>Run Program</b> button to see the robot execute commands.</li>
        <li>Try using the <b>Repeat</b> block to repeat commands 3 times.</li>
        <li>Reset and clear your program as needed.</li>
      </ul>
      <p>
        The robot starts in the center of the grid facing <b>upwards</b>. Try to create a path with the commands.
      </p>
    </div>
  );

  return (
    <div style={styles.container}>
      {instructions}

      <div style={styles.tabBar}>
        <button
          style={view === "blocks" ? styles.activeTab : styles.tab}
          onClick={() => setView("blocks")}
          disabled={isRunning}
        >
          Blocks View
        </button>
        <button
          style={view === "code" ? styles.activeTab : styles.tab}
          onClick={() => setView("code")}
          disabled={isRunning}
        >
          Code Editor
        </button>
      </div>

      {view === "blocks" && (
        <>
          <div style={styles.blocks}>
            {BLOCKS.map((block) => (
              <button
                key={block.id}
                onClick={() => addBlock(block.id)}
                style={styles.blockButton}
                disabled={isRunning}
                title={`Add ${block.label}`}
              >
                {block.label}
              </button>
            ))}
            <button
              onClick={clearProgram}
              style={{ ...styles.blockButton, backgroundColor: "#d32f2f" }}
              disabled={isRunning}
              title="Clear all commands"
            >
              Clear Program
            </button>
            <button
              onClick={resetRobot}
              style={styles.blockButton}
              disabled={isRunning}
              title="Reset robot position"
            >
              Reset Robot
            </button>
          </div>

          <div style={styles.programArea}>
            <h3>Program Commands:</h3>
            {program.length === 0 ? (
              <p style={{ fontStyle: "italic" }}>Add commands by clicking blocks above.</p>
            ) : (
              <ol>
                {program.map((cmd, i) => (
                  <li key={i}>
                    {cmd === "move" && "Move Forward"}
                    {cmd === "left" && "Turn Left"}
                    {cmd === "right" && "Turn Right"}
                    {cmd === "repeat" && "Repeat x3"}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      )}

      {view === "code" && (
        <div style={styles.codeEditorContainer}>
          <textarea
            value={code}
            onChange={onCodeChange}
            placeholder={`Write your code here, e.g.
moveForward();
turnLeft();
repeat(3, () => {
  moveForward();
});
`}
            style={styles.codeEditor}
            disabled={isRunning}
          />
        </div>
      )}

      <button
        onClick={() => {
          if (program.length === 0) return alert("Add some commands first!");
          setIsRunning(true);
          setStepIndex(0);
          setPosition({ x: 2, y: 2 });
          setDirection(0);
        }}
        style={styles.runButton}
        disabled={isRunning}
      >
        Run Program
      </button>

      {isRunning && <p>Running program... Please wait.</p>}

      <h3>Robot Grid:</h3>
      <div style={styles.grid}>
        {[...Array(5)].map((_, row) => (
          <div key={row} style={styles.gridRow}>
            {[...Array(5)].map((_, col) => {
              const isRobot = position.x === col && position.y === row;
              const arrow = ["↑", "→", "↓", "←"][direction];
              return (
                <div key={col} style={styles.gridCell}>
                  {isRobot ? <span style={styles.robot}>{arrow}</span> : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 700,
    margin: "20px auto",
    padding: 20,
    backgroundColor: "#f0f4f8",
    borderRadius: 12,
    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
  },
  instructions: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    boxShadow: "inset 0 0 5px #ccc",
  },
  tabBar: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  tab: {
    backgroundColor: "#e0e0e0",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "600",
    margin: "0 10px",
    borderRadius: 8,
    transition: "background-color 0.3s",
  },
  activeTab: {
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "default",
    fontWeight: "700",
    margin: "0 10px",
    borderRadius: 8,
  },
  blocks: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 15,
  },
  blockButton: {
    padding: "10px 16px",
    fontSize: 14,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
    minWidth: 120,
    transition: "background-color 0.2s",
  },
  programArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    minHeight: 80,
    maxHeight: 160,
    overflowY: "auto",
    marginBottom: 20,
    border: "1px solid #ccc",
  },
  codeEditorContainer: {
    marginBottom: 20,
  },
  codeEditor: {
    width: "100%",
    height: 150,
    fontFamily: "monospace",
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid #bbb",
    padding: 12,
    resize: "vertical",
  },
  runButton: {
    padding: "12px 25px",
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginBottom: 20,
  },
  grid: {
    display: "inline-block",
    border: "2px solid #333",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  gridRow: {
    display: "flex",
  },
  gridCell: {
    width: 50,
    height: 50,
    border: "1px solid #ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  robot: {
    fontSize: 32,
    color: "#1976d2",
    userSelect: "none",
    transition: "transform 0.4s ease",
  },
};

export default ProgrammingLab;
