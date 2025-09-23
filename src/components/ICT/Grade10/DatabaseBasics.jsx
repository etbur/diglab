import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./DatabaseBasics.css";

const DatabaseBasics = () => {
  // Simulation state
  const [tables, setTables] = useState([
    {
      name: "Students",
      columns: ["id", "name", "age", "grade"],
      data: [
        [1, "Abebe Kebede", 20, "A"],
        [2, "Meron Girma", 22, "B"],
        [3, "Tewodros Lemma", 21, "A"],
      ],
    },
    {
      name: "Courses",
      columns: ["code", "title", "credit_hours"],
      data: [
        ["CS101", "Introduction to Programming", 3],
        ["CS201", "Database Systems", 4],
        ["CS301", "Web Development", 3],
      ],
    },
  ]);
  const [activeTable, setActiveTable] = useState(0);
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [queryError, setQueryError] = useState("");
  const [executionTime, setExecutionTime] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryHistory, setQueryHistory] = useState([]);
  const [showDiagram, setShowDiagram] = useState(true);
  const [activeTab, setActiveTab] = useState("query");

  // Sample database diagram nodes and connections
  const diagramNodes = [
    { id: 1, type: "table", name: "Students", x: 100, y: 100 },
    { id: 2, type: "table", name: "Courses", x: 400, y: 100 },
    { id: 3, type: "table", name: "Enrollments", x: 250, y: 300 },
  ];

  const diagramConnections = [
    { from: 1, to: 3, type: "one-to-many" },
    { from: 2, to: 3, type: "one-to-many" },
  ];

  // Execute query
  const executeQuery = () => {
    if (!query.trim()) return;
    
    setIsExecuting(true);
    setQueryError("");
    const startTime = performance.now();
    
    try {
      // Simple query parser for demonstration
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes("select") && lowerQuery.includes("from")) {
        // Basic SELECT query simulation
        const tableNameMatch = query.match(/from\s+(\w+)/i);
        const tableName = tableNameMatch ? tableNameMatch[1] : "";
        const table = tables.find(t => t.name.toLowerCase() === tableName.toLowerCase());
        
        if (!table) {
          throw new Error(`Table '${tableName}' not found`);
        }
        
        // Simple WHERE clause simulation
        let resultData = [...table.data];
        if (lowerQuery.includes("where")) {
          const conditionMatch = query.match(/where\s+(.+)/i);
          if (conditionMatch) {
            const condition = conditionMatch[1].trim();
            // Simple age condition simulation
            if (condition.includes("age >")) {
              const value = parseInt(condition.split(">")[1]);
              const ageIndex = table.columns.indexOf("age");
              if (ageIndex !== -1) {
                resultData = resultData.filter(row => row[ageIndex] > value);
              }
            }
            // Simple name condition simulation
            else if (condition.includes("name like")) {
              const pattern = condition.split("like")[1].trim().replace(/'/g, "");
              const nameIndex = table.columns.indexOf("name");
              if (nameIndex !== -1) {
                resultData = resultData.filter(row => 
                  row[nameIndex].toLowerCase().includes(pattern.toLowerCase())
                );
              }
            }
          }
        }
        
        setQueryResult({
          columns: table.columns,
          data: resultData,
        });
        
        // Add to history
        setQueryHistory(prev => [{ query, time: new Date() }, ...prev.slice(0, 9)]);
      } 
      else if (lowerQuery.includes("insert into")) {
        // Basic INSERT simulation
        const tableNameMatch = query.match(/insert into\s+(\w+)/i);
        const tableName = tableNameMatch ? tableNameMatch[1] : "";
        const tableIndex = tables.findIndex(t => t.name.toLowerCase() === tableName.toLowerCase());
        
        if (tableIndex === -1) {
          throw new Error(`Table '${tableName}' not found`);
        }
        
        const valuesMatch = query.match(/values\s*\(([^)]+)\)/i);
        if (!valuesMatch) {
          throw new Error("Invalid INSERT syntax");
        }
        
        const values = valuesMatch[1].split(",").map(v => v.trim().replace(/'/g, ""));
        const newData = [...tables[tableIndex].data, values];
        
        setTables(prev => {
          const newTables = [...prev];
          newTables[tableIndex].data = newData;
          return newTables;
        });
        
        setQueryResult({
          message: `1 row inserted into ${tableName}`,
        });
        
        setQueryHistory(prev => [{ query, time: new Date() }, ...prev.slice(0, 9)]);
      }
      else {
        throw new Error("Unsupported query type");
      }
    } catch (error) {
      setQueryError(error.message);
      setQueryResult(null);
    } finally {
      const endTime = performance.now();
      setExecutionTime(endTime - startTime);
      setIsExecuting(false);
    }
  };

  // Sample queries for quick selection
  const sampleQueries = [
    "SELECT * FROM Students",
    "SELECT name, grade FROM Students WHERE age > 20",
    "SELECT * FROM Students WHERE name LIKE '%ebe%'",
    "INSERT INTO Students VALUES (4, 'Selamawit Yohannes', 19, 'B')",
    "SELECT * FROM Courses",
  ];

  return (
    <div className="database-lab">
      <header>
        <h1>Database Basics Simulation Lab - Ethiopia</h1>
        <p className="subtitle">
          Interactive database learning environment with Ethiopian student data samples
        </p>
      </header>

      <div className="lab-container">
        <div className="sidebar">
          <div className="database-tables">
            <h3>Database Tables</h3>
            <ul>
              {tables.map((table, index) => (
                <li 
                  key={table.name}
                  className={index === activeTable ? "active" : ""}
                  onClick={() => setActiveTable(index)}
                >
                  {table.name} ({table.data.length} rows)
                </li>
              ))}
            </ul>
          </div>

          {showDiagram && (
            <div className="database-diagram">
              <h3>ER Diagram</h3>
              <div className="diagram-container">
                {diagramNodes.map(node => (
                  <div 
                    key={node.id}
                    className={`diagram-node ${node.type}`}
                    style={{ left: node.x, top: node.y }}
                  >
                    {node.name}
                  </div>
                ))}
                {diagramConnections.map((conn, index) => {
                  const fromNode = diagramNodes.find(n => n.id === conn.from);
                  const toNode = diagramNodes.find(n => n.id === conn.to);
                  return (
                    <svg key={index} className="connection-line">
                      <line
                        x1={fromNode.x + 100}
                        y1={fromNode.y + 20}
                        x2={toNode.x}
                        y2={toNode.y + 20}
                        stroke="#00aa00"
                        strokeWidth="2"
                      />
                      <text 
                        x={(fromNode.x + toNode.x) / 2} 
                        y={(fromNode.y + toNode.y) / 2}
                        fill="#fff"
                        fontSize="12"
                      >
                        {conn.type}
                      </text>
                    </svg>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="main-content">
          <div className="tabs">
            <button 
              className={activeTab === "query" ? "active" : ""}
              onClick={() => setActiveTab("query")}
            >
              SQL Query
            </button>
            <button 
              className={activeTab === "data" ? "active" : ""}
              onClick={() => setActiveTab("data")}
            >
              Table Data
            </button>
            <button 
              className={activeTab === "history" ? "active" : ""}
              onClick={() => setActiveTab("history")}
            >
              Query History
            </button>
          </div>

          {activeTab === "query" && (
            <div className="query-section">
              <div className="query-editor">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter SQL query (e.g., SELECT * FROM Students)"
                  rows="5"
                />
                <div className="query-controls">
                  <button onClick={executeQuery} disabled={isExecuting}>
                    {isExecuting ? "Executing..." : "Execute"}
                  </button>
                  <button onClick={() => setQuery("")}>Clear</button>
                  <div className="execution-time">
                    {executionTime > 0 && `Executed in ${executionTime.toFixed(2)}ms`}
                  </div>
                </div>

                <div className="sample-queries">
                  <h4>Sample Queries:</h4>
                  <ul>
                    {sampleQueries.map((sample, index) => (
                      <li key={index} onClick={() => setQuery(sample)}>
                        {sample}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="query-results">
                {queryError && (
                  <div className="error-message">
                    Error: {queryError}
                  </div>
                )}
                {queryResult && (
                  <>
                    {queryResult.message ? (
                      <div className="success-message">
                        {queryResult.message}
                      </div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            {queryResult.columns.map(col => (
                              <th key={col}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="data-viewer">
              <h2>{tables[activeTable].name} Table</h2>
              <div className="table-info">
                <p>Columns: {tables[activeTable].columns.join(", ")}</p>
                <p>Row count: {tables[activeTable].data.length}</p>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      {tables[activeTable].columns.map(col => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tables[activeTable].data.map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="history-viewer">
              <h2>Query History</h2>
              {queryHistory.length === 0 ? (
                <p>No queries executed yet</p>
              ) : (
                <ul>
                  {queryHistory.map((item, index) => (
                    <li key={index}>
                      <div className="query-time">
                        {item.time.toLocaleTimeString()}
                      </div>
                      <div className="query-text">
                        {item.query}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="learning-resources">
        <h3>Database Learning Resources</h3>
        <ul>
          <li>
            <NavLink to="/sql-basics">SQL Basics Tutorial</NavLink>
          </li>
          <li>
            <NavLink to="/database-design">Database Design Principles</NavLink>
          </li>
          <li>
            <NavLink to="/ethiopian-tech">Ethiopian Tech Community</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseBasics;