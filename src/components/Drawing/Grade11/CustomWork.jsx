import React, { useState } from "react";

const CustomWork = () => {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("technical_drawing");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [projects, setProjects] = useState([]);

  const projectTypes = {
    technical_drawing: "Technical Drawing Project",
    cad_modeling: "CAD Modeling Project",
    design_project: "Design Engineering Project"
  };

  const difficulties = {
    beginner: "Beginner (Basic drawings)",
    intermediate: "Intermediate (Detailed drawings)",
    advanced: "Advanced (Complex assemblies)"
  };

  const createProject = () => {
    if (projectName.trim() && description.trim()) {
      const newProject = {
        id: Date.now(),
        name: projectName,
        type: projectTypes[projectType],
        description,
        difficulty: difficulties[difficulty],
        status: "planning",
        createdAt: new Date().toISOString(),
        progress: 0,
        tasks: [],
        grade: "Grade 11",
        deliverables: []
      };

      setProjects(prev => [...prev, newProject]);
      setProjectName("");
      setDescription("");
    }
  };

  const updateProjectStatus = (projectId, status) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId ? { ...project, status } : project
    ));
  };

  const updateProgress = (projectId, progress) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId ? { ...project, progress: Math.max(0, Math.min(100, progress)) } : project
    ));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const addTask = (projectId, taskName) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, tasks: [...project.tasks, { id: Date.now(), name: taskName, completed: false }] }
        : project
    ));
  };

  const toggleTask = (projectId, taskId) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : project
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "planning": return "#ffa500";
      case "designing": return "#007bff";
      case "drafting": return "#28a745";
      case "reviewing": return "#ffc107";
      case "completed": return "#28a745";
      default: return "#6c757d";
    }
  };

  return (
    <div className="custom-work-grade11">
      <h1>🎨 Technical Drawing Custom Work - Grade 11</h1>
      <p>Create and manage your own technical drawing projects.</p>

      <div className="project-creator">
        <h2>Create Drawing Project</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Project Name:</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>

          <div className="form-group">
            <label>Project Type:</label>
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
              {Object.entries(projectTypes).map(([key, type]) => (
                <option key={key} value={key}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Difficulty Level:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {Object.entries(difficulties).map(([key, level]) => (
                <option key={key} value={key}>{level}</option>
              ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project"
              rows="4"
            />
          </div>
        </div>

        <button onClick={createProject} className="create-btn">
          Create Project
        </button>
      </div>

      <div className="projects-list">
        <h2>Your Projects</h2>
        {projects.length === 0 ? (
          <p>No projects created yet. Start by creating your first project above!</p>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <div className="project-meta">
                    <span className="grade-badge">{project.grade}</span>
                    <span
                      className="status"
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    >
                      {project.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="project-details">
                  <p><strong>Type:</strong> {project.type}</p>
                  <p><strong>Difficulty:</strong> {project.difficulty}</p>
                  <p><strong>Description:</strong> {project.description}</p>
                  <p><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>

                  <div className="progress-section">
                    <label>Progress: {project.progress}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={project.progress}
                      onChange={(e) => updateProgress(project.id, parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="project-tasks">
                  <h4>Tasks</h4>
                  <div className="add-task">
                    <input
                      type="text"
                      placeholder="Add task"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          addTask(project.id, e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                  <ul className="task-list">
                    {project.tasks.map(task => (
                      <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(project.id, task.id)}
                        />
                        {task.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-actions">
                  <select
                    value={project.status}
                    onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                  >
                    <option value="planning">Planning</option>
                    <option value="designing">Designing</option>
                    <option value="drafting">Drafting</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomWork;