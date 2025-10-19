// filepath: e:\cpanels\diglab\src\components\ICT\Grade12\CustomWork.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaTrash, FaChevronLeft } from "react-icons/fa";

const defaultTypes = [
  "Software Engineering",
  "Advanced Cybersecurity",
  "Artificial Intelligence",
  "Big Data",
  "Network Security",
];

const CustomWork = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(defaultTypes[0]);
  const [description, setDescription] = useState("");
  const [works, setWorks] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ictCustomWorks");
      if (stored) setWorks(JSON.parse(stored));
    } catch {
      setWorks([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ictCustomWorks", JSON.stringify(works));
    } catch {}
  }, [works]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newWork = {
      id: Date.now(),
      title: title.trim(),
      type,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    };
    setWorks((prev) => [newWork, ...prev]);
    setTitle("");
    setDescription("");
    setType(defaultTypes[0]);
  };

  const handleDelete = (id) => {
    setWorks((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="ict-custom-work" style={{ padding: 20 }}>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <NavLink to="/ict/grade12" className="back-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <FaChevronLeft /> Back to Dashboard
        </NavLink>
        <h2 style={{ margin: 0 }}>Create Custom Simulation</h2>
      </div>

      <form onSubmit={handleAdd} className="custom-work-form" style={{ marginBottom: 24, maxWidth: 700 }}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a short title"
            required
            className="input"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="select" style={{ padding: 8 }}>
            {defaultTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description / instructions"
            rows={4}
            className="textarea"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit" className="btn primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px" }}>
          <FaPlusCircle /> Add Custom Work
        </button>
      </form>

      <section className="custom-work-list" style={{ maxWidth: 900 }}>
        <h3 style={{ marginTop: 0 }}>Saved Custom Simulations</h3>
        {works.length === 0 ? (
          <p>No custom simulations yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {works.map((w) => (
              <li key={w.id} style={{ border: "1px solid #e0e0e0", padding: 12, marginBottom: 8, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>{w.title}</strong>
                  <div style={{ fontSize: 13, color: "#555" }}>{w.type} • {new Date(w.createdAt).toLocaleString()}</div>
                  {w.description && <div style={{ marginTop: 6 }}>{w.description}</div>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => handleDelete(w.id)} title="Delete" className="btn danger" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 8px" }}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CustomWork;