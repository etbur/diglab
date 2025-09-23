import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LabRouter from "./routes/LabRouter";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles/style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="app-body">
          <Sidebar />
          <main className="app-content">
            <LabRouter />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
