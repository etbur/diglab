import React, { useState } from "react";

const CustomWork = () => {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("advanced_algebra");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [projects, setProjects] = useState([]);

  const projectTypes = {
    advanced_algebra: "Advanced Algebra Project",
    calculus_applications: "Calculus Applications Project",
    geometry_problems: "Geometry Problem Solving Project",
    statistics_analysis: "Statistics Analysis Project"
  };

  const difficulties = {
    intermediate: "Intermediate (Grade 11 level)",
    advanced: "Advanced (Complex problems)"
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
        deliverables: [],
        standards: []
      };

      setProjects(prev => [...prev, newProject]);
      // Reset form
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

  const addDeliverable = (projectId, deliverable) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, deliverables: [...project.deliverables, deliverable] }
        : project
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "planning": return "#ffa500";
      case "research": return "#007bff";
      case "development": return "#28a745";
      case "testing": return "#ffc107";
      case "review": return "#dc3545";
      case "completed": return "#28a745";
      default: return "#6c757d";
    }
  };

  const projectTemplates = [
    {
      type: "advanced_algebra",
      title: "Polynomial Equations Project",
      description: "Solve complex polynomial equations and analyze their properties"
    },
    {
      type: "calculus_applications",
      title: "Real-world Calculus Applications",
      description: "Apply differentiation and integration to real-world problems"
    },
    {
      type: "geometry_problems",
      title: "Advanced Geometry Problems",
      description: "Solve complex geometric problems involving proofs and constructions"
    },
    {
      type: "statistics_analysis",
      title: "Data Analysis Project",
      description: "Collect, analyze, and interpret statistical data from real sources"
    }
  ];

  const advancedTopics = [
    {
      subject: "Abstract Algebra",
      topics: ["Groups and fields", "Polynomial rings", "Linear algebra applications"]
    },
    {
      subject: "Advanced Calculus",
      topics: ["Limits and continuity", "Series and sequences", "Multivariable calculus"]
    },
    {
      subject: "Discrete Mathematics",
      topics: ["Graph theory", "Combinatorics", "Number theory"]
    },
    {
      subject: "Applied Mathematics",
      topics: ["Mathematical modeling", "Optimization problems", "Numerical methods"]
    }
  ];

  return (
    <div className="custom-work-grade11">
      <h1>🧮 Advanced Mathematics Custom Work</h1>
      <p>Create and manage advanced mathematics projects for Grade 11 professional work.</p>

      <div className="advanced-topics">
        <h2>Advanced Mathematical Topics</h2>
        <div className="topics-grid">
          {advancedTopics.map((subject, index) => (
            <div key={index} className="subject-card">
              <h4>{subject.subject}</h4>
              <ul>
                {subject.topics.map((topic, idx) => (
                  <li key={idx}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="project-templates">
        <h2>Project Templates</h2>
        <div className="templates-grid">
          {projectTemplates.map((template, index) => (
            <div key={index} className="template-card" onClick={() => {
              setProjectType(template.type);
              setProjectName(template.title);
              setDescription(template.description);
            }}>
              <h4>{template.title}</h4>
              <p>{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="project-form">
        <h2>Create New Project</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
            {Object.entries(projectTypes).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            {Object.entries(difficulties).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <button onClick={createProject} className="create-btn">Create Project</button>
      </div>

      <div className="projects-list">
        <h2>Your Projects</h2>
        {projects.length === 0 ? (
          <p>No projects created yet. Start by creating your first advanced mathematics project!</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <div className="project-info">
                <p><strong>Type:</strong> {project.type}</p>
                <p><strong>Difficulty:</strong> {project.difficulty}</p>
                <p><strong>Description:</strong> {project.description}</p>
              </div>

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

              <div className="project-deliverables">
                <h4>Project Deliverables</h4>
                <div className="add-deliverable">
                  <input
                    type="text"
                    placeholder="Add deliverable (e.g., Research paper, Solution set, Presentation)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        addDeliverable(project.id, e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <ul className="deliverables-list">
                  {project.deliverables.map((deliverable, index) => (
                    <li key={index}>{deliverable}</li>
                  ))}
                </ul>
              </div>

              <div className="project-tasks">
                <h4>Mathematical Tasks & Milestones</h4>
                <div className="add-task">
                  <input
                    type="text"
                    placeholder="Add mathematical task or milestone"
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
                  <option value="research">Research</option>
                  <option value="development">Development</option>
                  <option value="testing">Testing</option>
                  <option value="review">Review</option>
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
          ))
        )}
      </div>

      <div className="career-pathways">
        <h2>Career Pathways in Advanced Mathematics</h2>
        <div className="careers-grid">
          <div className="career">
            <h4>Mathematician</h4>
            <p>Pure mathematical research and theory development</p>
            <ul>
              <li>Abstract mathematics</li>
              <li>Research publications</li>
              <li>Academic positions</li>
            </ul>
          </div>
          <div className="career">
            <h4>Data Scientist</h4>
            <p>Statistical analysis and machine learning</p>
            <ul>
              <li>Big data analytics</li>
              <li>Predictive modeling</li>
              <li>Algorithm development</li>
            </ul>
          </div>
          <div className="career">
            <h4>Actuary</h4>
            <p>Risk assessment and financial mathematics</p>
            <ul>
              <li>Insurance mathematics</li>
              <li>Financial modeling</li>
              <li>Risk analysis</li>
            </ul>
          </div>
          <div className="career">
            <h4>Operations Research Analyst</h4>
            <p>Optimization and decision analysis</p>
            <ul>
              <li>Linear programming</li>
              <li>Simulation modeling</li>
              <li>Decision support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomWork;