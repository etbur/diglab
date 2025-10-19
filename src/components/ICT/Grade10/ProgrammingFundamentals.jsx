import React, { useState, useEffect } from "react";

const LanguageSimulator = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [pyodide, setPyodide] = useState(null);

  // Default code examples for each language
  const examples = {
    javascript: {
      helloWorld: `// JavaScript Hello World
console.log("Hello, Ethiopia!");`,
      fibonacci: `// Fibonacci Sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci of 10:", fibonacci(10));`,
      calculator: `// Simple Calculator
const num1 = 10;
const num2 = 5;
const operator = '*';

let result;
switch(operator) {
  case '+': result = num1 + num2; break;
  case '-': result = num1 - num2; break;
  case '*': result = num1 * num2; break;
  case '/': result = num1 / num2; break;
  default: console.log("Invalid operator!");
}

console.log("Result:", result);`
    },
    python: {
      helloWorld: `# Python Hello World
print("Hello, Ethiopia!")`,
      fibonacci: `# Fibonacci Sequence
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print("Fibonacci of 10:", fibonacci(10))`,
      calculator: `# Simple Calculator
num1 = 10
num2 = 5
operator = '*'

if operator == '+': result = num1 + num2
elif operator == '-': result = num1 - num2
elif operator == '*': result = num1 * num2
elif operator == '/': result = num1 / num2
else: print("Invalid operator!")

print("Result:", result)`
    },
    java: {
      helloWorld: `// Java Hello World
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Ethiopia!");
    }
}`,
      fibonacci: `// Fibonacci Sequence
public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci of 10: " + fibonacci(10));
    }
}`,
      calculator: `// Simple Calculator
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        System.out.print("Enter operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);
        
        double result;
        switch(operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            default: System.out.println("Invalid operator!"); return;
        }
        
        System.out.println("Result: " + result);
    }
}`
    },
    cpp: {
      helloWorld: `// C++ Hello World
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Ethiopia!" << endl;
    return 0;
}`,
      fibonacci: `// Fibonacci Sequence
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    cout << "Fibonacci of 10: " << fibonacci(10) << endl;
    return 0;
}`,
      calculator: `// Simple Calculator
#include <iostream>
using namespace std;

int main() {
    double num1, num2;
    char operator;
    
    cout << "Enter first number: ";
    cin >> num1;
    
    cout << "Enter second number: ";
    cin >> num2;
    
    cout << "Enter operator (+, -, *, /): ";
    cin >> operator;
    
    double result;
    switch(operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
        default: cout << "Invalid operator!" << endl; return 1;
    }
    
    cout << "Result: " << result << endl;
    return 0;
}`
    },
    html: {
      helloWorld: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello, Ethiopia!</h1>
    <p>Welcome to HTML programming</p>
</body>
</html>`,
      calculator: `<!DOCTYPE html>
<html>
<head>
    <title>Calculator</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        .calculator { 
            border: 1px solid #ccc; 
            padding: 20px; 
            width: 300px;
            border-radius: 5px;
        }
        input, button { margin: 5px 0; padding: 8px; }
    </style>
</head>
<body>
    <div class="calculator">
        <h2>Calculator</h2>
        <input type="number" id="num1" placeholder="First number">
        <input type="number" id="num2" placeholder="Second number">
        <select id="operator">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
        </select>
        <button onclick="calculate()">Calculate</button>
        <p id="result">Result: </p>
    </div>

    <script>
        function calculate() {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            const operator = document.getElementById('operator').value;
            
            let result;
            switch(operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num1 / num2; break;
                default: result = 'Invalid operator';
            }
            
            document.getElementById('result').innerText = 'Result: ' + result;
        }
    </script>
</body>
</html>`
    }
  };

  // Set default code when language changes
  useEffect(() => {
    setCode(examples[language]?.helloWorld || "");
    setOutput("");
  }, [language]);

  // Load Pyodide for Python
  useEffect(() => {
    const loadPyodide = async () => {
      const pyodideModule = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
      });
      await pyodideModule.loadPackage("numpy");
      setPyodide(pyodideModule);
    };

    if (language === "python" && !pyodide) {
      loadPyodide();
    }
  }, [language, pyodide]);

  const runCode = async () => {
    if (!code.trim()) {
      setOutput("Error: Empty code!");
      return;
    }

    setIsLoading(true);
    setOutput("");
    const startTime = performance.now();

    try {
      let result;
      
      // JavaScript Execution (real)
      if (language === "javascript") {
        result = new Function(code)();
        setOutput(result !== undefined ? String(result) : "Code executed (no output)");
      }
      // Python Execution (real via Pyodide)
      else if (language === "python") {
        if (!pyodide) {
          setOutput("Python runtime is still loading. Please wait...");
          return;
        }
        result = await pyodide.runPythonAsync(code);
        setOutput(String(result !== undefined ? result : "Code executed (no output)"));
      }
      // HTML Preview
      else if (language === "html") {
        const previewWindow = window.open("", "_blank");
        previewWindow.document.write(code);
        previewWindow.document.close();
        setOutput("HTML rendered in new tab");
      }
      // Java/C++ Simulation
      else {
        // Simulate compilation delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Extract expected output patterns
        const printLines = code.match(/System\.out\.println\([^)]+\);|cout << [^;]+;/g);
        let simulatedOutput = "";
        
        if (printLines) {
          printLines.forEach(line => {
            const content = line.match(/System\.out\.println\(([^)]+)\);|cout << ([^;]+);/);
            simulatedOutput += (content[1] || content[2]).replace(/["']/g, "") + "\n";
          });
        }

        // Handle input simulation
        if (code.includes("Scanner") || code.includes("cin")) {
          simulatedOutput += 
`Enter first number: 10
Enter second number: 5
Enter operator (+, -, *, /): *
Result: 50`;
        }

        // Handle specific examples
        if (code.includes("fibonacci(10)")) {
          simulatedOutput = "Fibonacci of 10: 55";
        }

        setOutput(simulatedOutput || `Simulated ${language} output:\nProgram executed successfully`);
      }
    } catch (err) {
      setOutput(`${language} Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setExecutionTime(performance.now() - startTime);
    }
  };

  const loadExample = (exampleKey) => {
    setCode(examples[language]?.[exampleKey] || "");
    setOutput("");
  };

  const clearCode = () => {
    setCode(examples[language]?.helloWorld || "");
    setOutput("");
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
      color: darkMode ? '#ffffff' : '#000000',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: darkMode ? '#4fc3f7' : '#1976d2' }}>
        <span role="img" aria-label="code">💻</span> {language.toUpperCase()} Simulator
      </h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000'
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
        </select>

        <button onClick={() => loadExample('helloWorld')}>Hello World</button>
        <button onClick={() => loadExample('fibonacci')}>Fibonacci</button>
        <button onClick={() => loadExample('calculator')}>Calculator</button>
        <button onClick={clearCode}>Reset</button>
        <button onClick={() => setDarkMode(!darkMode)} style={{ marginLeft: 'auto' }}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <div style={{
          backgroundColor: darkMode ? '#252526' : '#ffffff',
          border: darkMode ? '1px solid #444' : '1px solid #ddd',
          borderRadius: '4px',
          padding: '15px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{language.toUpperCase()} Code</h3>
            <small>
              {language === 'javascript' ? 'Real execution' : 
               language === 'python' ? 'Python via Pyodide' : 
               language === 'html' ? 'Rendered in new tab' : 'Simulated execution'}
            </small>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: '100%',
              height: '400px',
              fontFamily: '"Courier New", monospace',
              fontSize: '16px',
              backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
              color: darkMode ? '#d4d4d4' : '#000000',
              border: darkMode ? '1px solid #444' : '1px solid #ddd',
              padding: '10px',
              borderRadius: '4px',
              resize: 'vertical',
              marginTop: '10px'
            }}
            spellCheck="false"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={runCode}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {isLoading ? '⏳ Running...' : `▶️ Run ${language.toUpperCase()}`}
          </button>
          {executionTime > 0 && (
            <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
              <small>Execution time: {executionTime.toFixed(0)}ms</small>
            </div>
          )}
        </div>

        <div style={{
          backgroundColor: darkMode ? '#252526' : '#ffffff',
          border: darkMode ? '1px solid #444' : '1px solid #ddd',
          borderRadius: '4px',
          padding: '15px'
        }}>
          <h3 style={{ marginTop: 0 }}>Output</h3>
          <pre style={{
            backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            minHeight: '100px',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto'
          }}>
            {isLoading ? 'Running...' : output || 'Output will appear here...'}
          </pre>
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: darkMode ? '#333' : '#e3f2fd',
        borderRadius: '4px'
      }}>
        <h3>Execution Details</h3>
        <ul>
          <li>
            <strong>JavaScript</strong>: Runs directly in your browser
          </li>
          <li>
            <strong>Python</strong>: Executed via Pyodide (WebAssembly Python)
          </li>
          <li>
            <strong>HTML</strong>: Rendered in a new browser tab
          </li>
          <li>
            <strong>Java/C++</strong>: Simulated output (real execution requires compiler)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSimulator;